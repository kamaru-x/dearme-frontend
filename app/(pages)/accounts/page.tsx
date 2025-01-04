'use client'

import React, { useState } from 'react'
import TransactionTable from '@/app/components/transactions/TransactionTable'
import Transaction from '@/app/components/transactions/Transaction'
import Overview from '@/app/components/transactions/Overview'
import Report from '@/app/components/transactions/Report'
import TransactionFilters from '@/app/components/transactions/TransactionFilters'
import OverviewCard from '@/app/components/OverviewCard'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useApi } from '@/app/context/ApiContext'
import Accounts from '@/app/components/transactions/Accounts'
import SelfTransferTable from '@/app/components/transfer/SelfTransferTable'
import SelfTransfer from '@/app/components/transfer/SelfTransfer'

interface Transaction{
    id: number,
    date: string,
    title: string,
    type: string,
    type_value: string,
    account: number,
    account_name: string,
    category: number,
    category_name: string,
    amount: number
}

interface Transfer{
    id: number,
    date: string,
    from_account: number,
    from_account_name: string,
    to_account: number,
    to_account_name: string,
    amount: number
}

interface TransactionOverview {
    credited: number
    debited: number
    balance: number
    savings: number
}

const TransactionsPage = () => {
    const api = useApi();
    const [activeTab, setActiveTab] = useState('ACCOUNTS OVERVIEW');
    const [create, setCreate] = useState(false)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [transfers, setTransfers] = useState<Transfer[]>([])
    const [overview, setOverview] = useState<TransactionOverview>({credited: 0, debited: 0, balance: 0, savings: 0})
    const [filters, setFilters] = useState<{fromDate: string, toDate: string, account: string, category: string}>({fromDate: '', toDate: '', account: '', category: ''})
    const [editTransaction, setEditTransaction] = useState<Transaction | null>(null)

    const fetchTransactions = async () => {
        try {
            let url = api.endpoints.listTransactions;
            const queryParams = [];

            if (filters.fromDate) queryParams.push(`from_date=${filters.fromDate}`);
            if (filters.toDate) queryParams.push(`to_date=${filters.toDate}`);
            if (filters.category) queryParams.push(`category=${filters.category}`);
            if (filters.account) queryParams.push(`account=${filters.account}`);

            if (queryParams.length > 0) {
                url += '?' + queryParams.join('&');
            }

            const response = await api.fetch(url)
            const result = await response.json()
            setTransactions(result.data || [])
            setOverview({credited: result.credited || 0, debited: result.debited || 0, balance: result.balance || 0, savings: result.savings || 0})
        } catch (error) {
            console.log('Error fetching transactions:', error)
            setTransactions([])
            setOverview({credited: 0, debited: 0, balance: 0, savings: 0})
            toast.error('Failed to fetch transactions')
        }
    }

    const fetchTransfers = async () => {
        try {
            let url = api.endpoints.listTransfers;
            const response = await api.fetch(url)
            const result = await response.json()
            setTransfers(result.data || [])
        } catch (error) {
            console.log('Error fetching transfers:', error)
            setTransfers([])
            toast.error('Failed to fetch transfers')
        }
    }

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters)
    }

    const handleEdit = (transaction: Transaction) => {
        setEditTransaction(transaction);
        setCreate(true);
    }

    React.useEffect(() => {
        fetchTransactions()
        fetchTransfers()
    }, [api, filters])

    return (
        <div className="min-h-screen mx-5">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                    <OverviewCard color="bg-gradient-to-r from-green-400 to-green-500" icon="fas fa-indian-rupee-sign" title="Total Income" value={overview.credited}/>
                    <OverviewCard color="bg-gradient-to-r from-red-400 to-red-500" icon="fas fa-indian-rupee-sign" title="Total Expense" value={overview.debited}/>
                    <OverviewCard color="bg-gradient-to-r from-yellow-400 to-yellow-500" icon="fas fa-indian-rupee-sign" title="Total Balance" value={overview.balance}/>
                    <OverviewCard color="bg-gradient-to-r from-blue-400 to-blue-500" icon="fas fa-indian-rupee-sign" title="Total Savings" value={overview.savings}/>
                </div>

                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-8">
                    <button onClick={() => setActiveTab('ACCOUNTS OVERVIEW')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200
                        ${ activeTab === 'ACCOUNTS OVERVIEW' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white': 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800'}`}> ACCOUNTS OVERVIEW
                    </button>

                    <button onClick={() => setActiveTab('TRANSACTION OVERVIEW')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200
                        ${ activeTab === 'TRANSACTION OVERVIEW' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white': 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800'}`}> TRANSACTION OVERVIEW
                    </button>

                    <button onClick={() => setActiveTab('MONTH')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200
                        ${ activeTab === 'MONTH' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800' }`}>MONTHLY REPORT
                    </button>

                    <button onClick={() => setActiveTab('SELF TRANSFER')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200
                        ${ activeTab === 'SELF TRANSFER' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800' }`}>SELF TRANSFER
                    </button>

                    <button onClick={() => setActiveTab('TRANSACTIONS')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200
                        ${ activeTab === 'TRANSACTIONS' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800' }`}>TRANSACTIONS
                    </button>
                </div>

                <div className="mt-8">
                    {activeTab === 'TRANSACTION OVERVIEW' ? (
                        <>
                            <Overview api={api}/>
                        </>
                    ) : activeTab === 'MONTH' ? (
                        <>
                            <Report api={api}/>
                        </>
                    ) : activeTab === 'ACCOUNTS OVERVIEW'? (
                        <>
                            <Accounts api={api}/>
                        </>
                    ) : activeTab === 'SELF TRANSFER' ? (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    {create ? 'Create Transfer' : 'All Self Transfers'}
                                </h2>
                                {!create && (
                                    <button className="btn-primary" onClick={() => {setEditTransaction(null); setCreate(true);}}>
                                        Create Transfer
                                    </button>
                                )}
                            </div>

                            {create ? (
                                <SelfTransfer setCreate={setCreate} fetchTransfers={fetchTransfers}/>
                            ) : (
                                <SelfTransferTable show_btn={true} transfers={transfers} api={api} onUpdate={fetchTransfers}/>
                            )}
                        </>
                    ) : activeTab === "TRANSACTIONS" ? (
                        <>
                            <TransactionFilters onFilterChange={handleFilterChange} />
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    {create ? (editTransaction ? 'Edit Transaction' : 'Create Transaction') : 'All Transactions'}
                                </h2>
                                {!create && (
                                    <button className="btn-primary" onClick={() => {setEditTransaction(null); setCreate(true);}}>
                                        Create Transaction
                                    </button>
                                )}
                            </div>

                            {create ? (
                                <Transaction setCreate={setCreate} fetchTransactions={fetchTransactions} editData={editTransaction}/>
                            ) : (
                                <TransactionTable show_btn={true} transactions={transactions} api={api} onUpdate={fetchTransactions} onEdit={handleEdit}/>
                            )}
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default TransactionsPage
