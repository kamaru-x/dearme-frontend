'use client'

import React from 'react'
import OverviewCard from '../../components/OverviewCard'
import TransactionTable from '../../components/TransactionTable'
import TodoTable from '../../components/TodoTable'
import Header from '../../components/Header'
import ThemeToggle from '../../components/ThemeToggle'

const page = () => {
    return (
        <div className="min-h-screen mx-5">
            <div className="w-full">
                <Header page="dashboard"/>

                <div className="grid md:grid-cols-4 gap-6 mt-8">
                    <OverviewCard color="bg-gradient-to-r from-green-400 to-green-500" icon="fas fa-indian-rupee-sign" title="Today's Income" value="₹2,500"/>
                    <OverviewCard color="bg-gradient-to-r from-red-400 to-red-500" icon="fas fa-indian-rupee-sign" title="Today's Expense" value="₹1,200"/>
                    <OverviewCard color="bg-gradient-to-r from-yellow-400 to-yellow-500" icon="fas fa-circle-check" title="Completed Todos" value="0 / 10"/>
                    <OverviewCard color="bg-gradient-to-r from-blue-400 to-blue-500" icon="fas fa-list-ol" title="Completed Tasks" value="0 / 10"/>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Today Transactions</h2>
                    </div>

                    <TransactionTable show_btn={false}/>
                </div>

                <div className='mt-8'>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Thinks To Do</h2>
                    </div>
                    <TodoTable/>
                </div>
            </div>

            <ThemeToggle />
        </div>
    )
}

export default page