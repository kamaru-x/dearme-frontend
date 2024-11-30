'use client'

import { createContext, useContext } from 'react'

interface ApiEndpoints {
    test: string;
    login: string;
    tokenRefresh: string;
    listAccounts: string;
    accountDetail: (id: number) => string;
    listCategories: string;
    categoryDetail: (id: number) => string;
    listTransactions: string;
    transactionDetail: (id: number) => string;
    listTasks: string;
    taskDetail: (id: number) => string;
    listTodos: string;
    todoDetail: (id: number) => string;
    listChecklists: string;
    checklistDetail: (date: string) => string;
    listJournals: string;
    journalDetail: (date: string) => string;
}

interface Api {
    baseUrl: string;
    endpoints: ApiEndpoints;
    getHeaders: (withAuth?: boolean) => HeadersInit;
    fetch: (endpoint: string, options?: RequestInit & { withAuth?: boolean }) => Promise<Response>;
}

const api: Api = {
    baseUrl: 'http://localhost:8000/api',
    endpoints: {
        test: '/test/',
        login: '/token/',
        tokenRefresh: '/token/refresh/',
        listAccounts: '/accounts/',
        accountDetail: (id: number) => `/accounts/${id}/`,
        listCategories: '/categories/',
        categoryDetail: (id: number) => `/categories/${id}/`,
        listTransactions: '/transactions/',
        transactionDetail: (id: number) => `/transactions/${id}/`,
        listTasks: '/tasks/',
        taskDetail: (id: number) => `/tasks/${id}/`,
        listTodos: '/todos/',
        todoDetail: (id: number) => `/todos/${id}/`,
        listChecklists: '/checklists/',
        checklistDetail: (date: string) => `/checklists/${date}/`,
        listJournals: '/journals/',
        journalDetail: (date: string) => `/journals/${date}/`,
    },
    getHeaders: (withAuth: boolean = true): HeadersInit => {
        const headers: HeadersInit = {
            'Content-Type': 'application/json'
        };

        if (withAuth) {
            const token = document.cookie.split('token=')[1]?.split(';')[0];
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        return headers;
    },
    fetch: async (endpoint: string, options: RequestInit & { withAuth?: boolean } = {}) => {
        const { withAuth = true, headers, ...rest } = options;
        return fetch(`${api.baseUrl}${endpoint}`, {
            headers: {
                ...api.getHeaders(withAuth),
                ...headers
            },
            ...rest
        });
    }
}

const ApiContext = createContext(api)

export const useApi = () => useContext(ApiContext)

export function ApiProvider({ children }: { children: React.ReactNode }) {
    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}
