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

    transactionOverview: string;
    transactionReport: string;
    accountsOverview: string;

    listTransactions: string;
    transactionDetail: (id: number) => string;

    listTransfers: string;
    transferDetail: (id: number) => string;

    listTasks: string;
    taskDetail: (id: number) => string;
    updateTaskOrder: string;

    listTodos: string;
    todoDetail: (id: number) => string;

    checkList: string;
    checklistDetail: (id: number) => string;

    previousDays: string;
    previousDayTasks: string;

    listJournals: string;
    journalDetail: (date: string) => string;
}

export interface Api {
    baseUrl: string;
    endpoints: ApiEndpoints;

    getHeaders: (withAuth?: boolean) => HeadersInit;
    fetch: (endpoint: string, options?: RequestInit & { withAuth?: boolean }) => Promise<Response>;
}

const api: Api = {
    baseUrl: 'https://dearme.pythonanywhere.com/api',
    // baseUrl: 'http://127.0.0.1:8000/api',

    endpoints: {
        test: '/test/',
        login: '/token/',
        tokenRefresh: '/token/refresh/',

        listAccounts: '/accounts/',
        accountDetail: (id: number) => `/accounts/${id}/`,

        listCategories: '/categories/',
        categoryDetail: (id: number) => `/categories/${id}/`,

        transactionOverview: '/transactions/overview/',
        accountsOverview:  '/transactions/accounts/',
        transactionReport: '/transactions/report/',
        listTransactions: '/transactions/',
        transactionDetail: (id: number) => `/transaction/${id}/`,

        listTransfers: '/transfers/',
        transferDetail: (id: number) => `/transfer/${id}/`,

        listTasks: '/tasks/',
        taskDetail: (id: number) => `/tasks/${id}/`,
        updateTaskOrder: '/tasks/update-order/',

        listTodos: '/todos/',
        todoDetail: (id: number) => `/todos/${id}/`,

        checkList: '/checklist/',
        checklistDetail: (id: number) => `/checklist/${id}/`,

        previousDays: '/previous/',
        previousDayTasks: '/previous/tasks/',

        listJournals: '/journals/',
        journalDetail: (date: string) => `/journals/${date}/`,
    },

    getHeaders: (withAuth: boolean = true): HeadersInit => {
        const headers: HeadersInit = {
            'Accept': 'application/json',
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
