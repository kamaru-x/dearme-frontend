'use client'

import { createContext, useContext } from 'react'

const api = {
  baseUrl: 'http://localhost:8000/api',
  endpoints: {
    login: '/token/',
    register: '/register/',
    entries: '/entries/',
    profile: '/user/profile/'
  }
}

const ApiContext = createContext(api)

export const useApi = () => useContext(ApiContext)

export function ApiProvider({ children }: { children: React.ReactNode }) {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}
