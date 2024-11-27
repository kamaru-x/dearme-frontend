'use client'

import { createContext, useContext } from 'react'

const api = {
    baseUrl: 'http://localhost:8000/api',
    endpoints: {
        test: '/test/',
        login: '/token/',
        listAccounts: '/accounts/',
        accountDetail: (id: number) => `/accounts/${id}/`,
    }
}

const ApiContext = createContext(api)

export const useApi = () => useContext(ApiContext)

export function ApiProvider({ children }: { children: React.ReactNode }) {
    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}
