import React, { useEffect, useState } from 'react'

export const Async = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true)
    }, 1000)

  }, [])
  return (
    <div>
      <h1>Hello world</h1>
      {isButtonVisible && <button>button</button>}
    </div>

  )
}
