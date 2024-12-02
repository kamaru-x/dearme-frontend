'use client'

import React, { useState, useEffect } from 'react'
import OverviewCard from '../../components/OverviewCard'
import TransactionTable from '../../components/transactions/TransactionTable'
import TodoTable from '../../components/todo/TodoTable'
import Header from '../../components/Header'
import ThemeToggle from '../../components/ThemeToggle'
import { useApi } from '@/app/context/ApiContext'

interface Transaction {
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

interface Todo {
    id: number;
    title: string;
    completed: boolean;
    priority: 'high' | 'normal' | 'low';
}

interface Stats {
    credited: number;
    debited: number;
    balance: number;
    completedTodos: number;
    totalTodos: number;
}

const Page = () => {
    const api = useApi();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [stats, setStats] = useState<Stats>({
        credited: 0,
        debited: 0,
        balance: 0,
        completedTodos: 0,
        totalTodos: 0
    });

    const getTodayDateString = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const getMonthDateRange = () => {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return {
            fromDate: firstDay.toISOString().split('T')[0],
            toDate: lastDay.toISOString().split('T')[0]
        };
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Get today's date for filtering
                const today = getTodayDateString();
                const { fromDate, toDate } = getMonthDateRange();

                // Fetch today's transactions for the table
                const transResponse = await api.fetch(`${api.endpoints.listTransactions}?from_date=${today}&to_date=${today}`);
                const transResult = await transResponse.json();
                setTransactions(transResult.data || []);
                
                // Fetch this month's transactions for the overview
                const monthTransResponse = await api.fetch(`${api.endpoints.listTransactions}?from_date=${fromDate}&to_date=${toDate}`);
                const monthTransResult = await monthTransResponse.json();
                
                // Fetch todos
                const todosResponse = await api.fetch(api.endpoints.listTodos);
                const todosResult = await todosResponse.json();
                const allTodos = todosResult.data || [];
                
                // Filter incomplete todos
                const incompleteTodos = allTodos.filter((todo: Todo) => !todo.completed);
                setTodos(incompleteTodos);
                
                // Set stats using this month's transactions
                setStats({
                    credited: monthTransResult.credited || 0,
                    debited: monthTransResult.debited || 0,
                    balance: monthTransResult.balance || 0,
                    completedTodos: allTodos.filter((todo: Todo) => todo.completed).length,
                    totalTodos: allTodos.length
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, [api]);

    return (
        <div className="min-h-screen mx-5">
            <div className="w-full">
                <Header page="dashboard"/>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <OverviewCard 
                        color="bg-gradient-to-r from-green-400 to-green-500" 
                        icon="fas fa-indian-rupee-sign" 
                        title="This Month's Income" 
                        value={`₹${stats.credited.toLocaleString()}`}
                    />
                    <OverviewCard 
                        color="bg-gradient-to-r from-red-400 to-red-500" 
                        icon="fas fa-indian-rupee-sign" 
                        title="This Month's Expense" 
                        value={`₹${stats.debited.toLocaleString()}`}
                    />
                    <OverviewCard 
                        color="bg-gradient-to-r from-yellow-400 to-yellow-500" 
                        icon="fas fa-circle-check" 
                        title="Completed Todos" 
                        value={`${stats.completedTodos} / ${stats.totalTodos}`}
                    />
                </div>

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Today's Transactions</h2>
                    </div>

                    <TransactionTable 
                        show_btn={false} 
                        transactions={transactions} 
                        api={api} 
                        onUpdate={() => {}} 
                        onEdit={() => {}}
                    />
                </div>

                <div className='mt-8 pb-8'>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Pending Tasks</h2>
                    </div>
                    <TodoTable todos={todos}/>
                </div>
            </div>

            <ThemeToggle />
        </div>
    )
}

export default Page