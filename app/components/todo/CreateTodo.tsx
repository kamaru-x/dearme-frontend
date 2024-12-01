'use client'

import React, { useState } from 'react'
import { useApi } from '@/app/context/ApiContext'
import { toast } from 'react-toastify'

interface CreateTodoProps {
    setCreate: (value: boolean) => void;
    onSuccess?: () => void;
}

const CreateTodo = ({ setCreate, onSuccess }: CreateTodoProps) => {
    const api = useApi()
    const [todoData, setTodoData] = useState({
        title: '',
        priority: 'normal'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setTodoData({
            ...todoData,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.fetch(api.endpoints.listTodos, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todoData)
            })
            
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to create todo')
            }
            
            const result = await response.json()
            setTodoData({ title: '', priority: 'normal' })
            toast.success(result.message || 'Todo created successfully')
            onSuccess?.()
        } catch (error) {
            console.error('Error creating todo:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to create todo')
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <form className="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title"
                            value={todoData.title}
                            onChange={handleChange}
                            className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400" 
                            placeholder="Enter todo title"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                        <select 
                            id="priority" 
                            name="priority"
                            value={todoData.priority}
                            onChange={handleChange}
                            className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        >
                            <option value="high" className="dark:bg-gray-700">High</option>
                            <option value="normal" className="dark:bg-gray-700">Normal</option>
                            <option value="low" className="dark:bg-gray-700">Low</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button 
                        type="button"
                        onClick={() => setCreate(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Create Todo
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTodo