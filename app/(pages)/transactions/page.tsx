'use client'

import React, { useState } from 'react'
import TransactionTable from '@/app/components/TransactionTable'
import CreateTransaction from '@/app/components/CreateTransaction'
import Header from '@/app/components/Header'
import OverviewCard from '@/app/components/OverviewCard'
import 'react-toastify/dist/ReactToastify.css'

interface Transaction{
    id: number,
    date: string,
    title: string,
    type: string,
    account_name: string,
    category_name: string,
    amount: number
}

const TransactionsPage = () => {
    const [create, setCreate] = useState(false)

    return (
        <div className="min-h-screen mx-5">
            <div className="w-full">
                <Header page="transactions"/>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <OverviewCard color="bg-gradient-to-r from-green-400 to-green-500" icon="fas fa-indian-rupee-sign" title="Total Income" value="₹2,500"/>
                    <OverviewCard color="bg-gradient-to-r from-red-400 to-red-500" icon="fas fa-indian-rupee-sign" title="Total Expense" value="₹1,200"/>
                    <OverviewCard color="bg-gradient-to-r from-yellow-400 to-yellow-500" icon="fas fa-indian-rupee-sign" title="Total Balance" value="₹1,300"/>
                </div>
                
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{create ? 'Create Transaction' : 'All Transactions'}</h2>
                        {!create && (
                            <button className="btn-primary" onClick={() => setCreate(true)}>
                                Create Transaction
                            </button>
                        )}
                    </div>

                    {create ? <CreateTransaction setCreate={setCreate} /> : <TransactionTable show_btn={true}/>}
                </div>
            </div>
        </div>
    )
}

export default TransactionsPage
