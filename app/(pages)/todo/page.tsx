'use client'

import React, { useState } from 'react'
import Header from '@/app/components/Header'
import OverviewCard from '@/app/components/OverviewCard'
import TodoTable from '@/app/components/todo/TodoTable'
import CreateTodo from '@/app/components/todo/CreateTodo'
import { useApi } from '@/app/context/ApiContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Todo{
    id: number,
    title: string,
    priority: 'high' | 'normal' | 'low',
    completed: boolean
}

interface TodoOverview {
    high: number,
    normal: number,
    low: number
}

const Page = () => {
    const api = useApi()
    const [create, setCreate] = useState(false)
    const [todos, setTodos] = useState<Todo[]>([])
    const [overview, setOverview] = useState<TodoOverview>({high: 0, normal: 0, low: 0})

    const fetchTodos = async () => {
        try {
            const response = await api.fetch(api.endpoints.listTodos)
            const result = await response.json()
            setTodos(result.data || [])
            setOverview({high: result.high || 0, normal: result.normal || 0, low: result.low || 0})
        } catch (error) {
            console.log('Error fetching todos:', error)
            setTodos([])
            setOverview({high: 0, normal: 0, low: 0})
            toast.error('Failed to fetch todos')
        }
    }

    React.useEffect(() => {
        fetchTodos()
    }, [api])

    return (
        <div className="min-h-screen mx-5">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full">
                <Header page="todo"/>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <OverviewCard color="bg-gradient-to-r from-red-400 to-red-500" icon="fas fa-circle-check" title="High Priority" value={overview.high}/>
                    <OverviewCard color="bg-gradient-to-r from-yellow-400 to-yellow-500" icon="fas fa-circle-check" title="Normal Priority" value={overview.normal}/>
                    <OverviewCard color="bg-gradient-to-r from-blue-400 to-blue-500" icon="fas fa-circle-check" title="Low Priority" value={overview.low}/>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{create ? 'Create Todo' : 'Things to do'}</h2>
                        {!create && (
                            <button className="btn-primary" onClick={() => setCreate(true)}>
                                Create Todo
                            </button>
                        )}
                    </div>

                    {create ? (
                        <CreateTodo 
                            setCreate={setCreate} 
                            onSuccess={() => {
                                setCreate(false);
                                fetchTodos();
                            }} 
                        />
                    ) : (
                        <TodoTable 
                            todos={todos} 
                            onUpdate={fetchTodos}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page