import { ReactElement,cloneElement } from "react"
import Link,{LinkProps} from 'next/link'
import { useRouter } from "next/router";



interface propsActiveLink extends LinkProps{
  children:ReactElement,
  ActiveClassName:string
}
export function ActiveLink({children, ActiveClassName, ...rest}:propsActiveLink){
  const {asPath}= useRouter();
  const className = asPath === rest.href ? ActiveClassName : ''


  return(<Link legacyBehavior {...rest}>
    {cloneElement(children,{
      className,
    })}
    </Link>)

}