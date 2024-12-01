'use client'

import React, { useState } from 'react'
import TransactionTable from '@/app/components/transactions/TransactionTable'
import Transaction from '@/app/components/transactions/Transaction'
import Header from '@/app/components/Header'
import OverviewCard from '@/app/components/OverviewCard'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useApi } from '@/app/context/ApiContext'
import TransactionFilters from '@/app/components/transactions/TransactionFilters'

interface Transaction{
    id: number,
    date: string,
    title: string,
    type: 'credit' | 'debit',
    account: number,
    account_name: string,
    category: number,
    category_name: string,
    amount: number
}

interface TransactionOverview {
    credited: number
    debited: number
    balance: number
}

const TransactionsPage = () => {
    const api = useApi();
    const [create, setCreate] = useState(false)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [overview, setOverview] = useState<TransactionOverview>({credited: 0, debited: 0, balance: 0})
    const [filters, setFilters] = useState<{fromDate: string, toDate: string, category: string}>({fromDate: '', toDate: '', category: ''})
    const [editTransaction, setEditTransaction] = useState<Transaction | null>(null)

    const fetchTransactions = async () => {
        try {
            let url = api.endpoints.listTransactions;
            const queryParams = [];
            
            if (filters.fromDate) queryParams.push(`from_date=${filters.fromDate}`);
            if (filters.toDate) queryParams.push(`to_date=${filters.toDate}`);
            if (filters.category) queryParams.push(`category=${filters.category}`);
            
            if (queryParams.length > 0) {
                url += '?' + queryParams.join('&');
            }

            const response = await api.fetch(url)
            const result = await response.json()
            setTransactions(result.data || [])
            setOverview({credited: result.credited || 0, debited: result.debited || 0, balance: result.balance || 0})
        } catch (error) {
            console.log('Error fetching transactions:', error)
            setTransactions([])
            setOverview({credited: 0, debited: 0, balance: 0})
            toast.error('Failed to fetch transactions')
        }
    }

    React.useEffect(() => {
        fetchTransactions()
    }, [api, filters])

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters)
    }

    const handleEdit = (transaction: Transaction) => {
        setEditTransaction(transaction);
        setCreate(true);
    }

    return (
        <div className="min-h-screen mx-5">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full">
                <Header page="transactions"/>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <OverviewCard color="bg-gradient-to-r from-green-400 to-green-500" icon="fas fa-indian-rupee-sign" title="Total Income" value={overview.credited}/>
                    <OverviewCard color="bg-gradient-to-r from-red-400 to-red-500" icon="fas fa-indian-rupee-sign" title="Total Expense" value={overview.debited}/>
                    <OverviewCard color="bg-gradient-to-r from-yellow-400 to-yellow-500" icon="fas fa-indian-rupee-sign" title="Total Balance" value={overview.balance}/>
                </div>

                <div className="mt-8">
                    <TransactionFilters onFilterChange={handleFilterChange} />
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                            {create ? (editTransaction ? 'Edit Transaction' : 'Create Transaction') : 'All Transactions'}
                        </h2>
                        {!create && (
                            <button 
                                className="btn-primary" 
                                onClick={() => {
                                    setEditTransaction(null);
                                    setCreate(true);
                                }}
                            >
                                Create Transaction
                            </button>
                        )}
                    </div>

                    {create ? (
                        <Transaction 
                            setCreate={setCreate} 
                            fetchTransactions={fetchTransactions} 
                            editData={editTransaction}
                        />
                    ) : (
                        <TransactionTable 
                            show_btn={true} 
                            transactions={transactions} 
                            api={api} 
                            onUpdate={fetchTransactions}
                            onEdit={handleEdit}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TransactionsPage
