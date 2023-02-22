import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {fauna} from '../../../services/fauna'
import {query as qry} from 'faunadb'

export default NextAuth({


  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope:'read:user'
    }),
    // ...add more providers here
  ],
  callbacks: {
    
    async session({session}) {
      try {
        const userActiveSubscription = await fauna.query(
          qry.Get(
            qry.Intersection([
              qry.Match(
                qry.Index('subscription_by_user_ref'),
                qry.Select(
                  "ref",
                  qry.Get(
                    qry.Match(
                      qry.Index('user_by_email'),
                      qry.Casefold(session.user.email)
                    )
                  )
                )
              ),
              qry.Match(
                qry.Index('subscription_by_status'), "active"
              )
            ])
          )
        )

        return { 
          ...session,
          activeSubscription: userActiveSubscription,
    
        }
      } catch {
      
        return { 
          ...session,
          activeSubscription: null,
          
        }
      }
  
    },
    async signIn({ user, account, profile }) {
      const {email} = user
      try {
        await fauna.query(
          qry.If(
            qry.Not(
              qry.Exists(
                qry.Match(
                  qry.Index('user_by_email'),
                  qry.Casefold(user.email)
                )
              )
            ),
            qry.Create(qry.Collection('users'),  {data:{email}}),
            qry.Get(qry.Match(qry.Index('user_by_email'),qry.Casefold(user.email)))
          ),
        
        )
      
        return true
        
      } catch  {
        return false
        
      }
    }
}
}
)
