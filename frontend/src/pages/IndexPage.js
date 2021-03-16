import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
export const IndexPage = () => {
  
  const history = useHistory()
  useEffect(() => {
    history.push('/dashboard')
    return () => {}
  }, [history])
  return <div></div>
}
