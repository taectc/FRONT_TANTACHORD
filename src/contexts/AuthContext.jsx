import { createContext, useState, useContext, useEffect } from 'react'

import { getMe } from '../api/tantachordApi'

const AuthContext = createContext()

export default function AuthContextProvider({children}) {

  const [user, setUser] = useState(null)

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (!token)
      return;
      
    getMe(token).then(rs => {
      setUser(rs.data)
    })
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>)
}

export const useAuth = () => {
  return useContext(AuthContext)
}