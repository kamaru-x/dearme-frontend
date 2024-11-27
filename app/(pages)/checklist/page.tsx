'use client'

import React, { useState } from 'react'
import Header from '@/app/components/Header'
import OverviewCard from '@/app/components/OverviewCard'

const page = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: "Go to gym", completed: false },
        { id: 2, text: "Wash clothes", completed: false },
        { id: 3, text: "Meditate for 10 minutes", completed: false },
        { id: 4, text: "Read a book", completed: false },
        { id: 5, text: "Clean room", completed: false },
        { id: 6, text: "Drink 8 glasses of water", completed: false },
        { id: 7, text: "Take vitamins", completed: false },
        { id: 8, text: "Practice coding", completed: false },
        { id: 9, text: "Call family", completed: false },
    ]);

    const [previousDays] = useState([
        '2024-01-14',
        '2024-01-13',
        '2024-01-12',
        '2024-01-11',
        '2024-01-10',
        '2024-01-09',
    ]);

    const [activeTab, setActiveTab] = useState('today');

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).toUpperCase();
    };

    return (
        <div className="min-h-screen mx-5">
            <div className="w-full">
                <Header page="checklist"/>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <OverviewCard color="bg-gradient-to-r from-green-400 to-green-500" icon="fas fa-list-ol" title="Good Day's" value="65"/>
                    <OverviewCard color="bg-gradient-to-r from-red-400 to-red-500" icon="fas fa-list-ol" title="Bad Day's" value="360"/>
                </div>

                <div className="mt-8">
                    <div className="mt-6">
                        <div className="flex space-x-4">
                            <button 
                                onClick={() => setActiveTab('today')}
                                className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200 ${
                                    activeTab === 'today' 
                                    ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' 
                                    : 'text-gray-600 bg-white'
                                }`}
                            >
                                TODAY
                            </button>
                            <button 
                                onClick={() => setActiveTab('previous')}
                                className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200 ${
                                    activeTab === 'previous' 
                                    ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' 
                                    : 'text-gray-600 bg-white'
                                }`}
                            >
                                PREVIOUS
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                        {activeTab === 'today' && todos.map((todo) => (
                            <button
                                key={todo.id}
                                onClick={() => toggleTodo(todo.id)}
                                className={`flex items-center justify-between p-4 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 ${
                                    todo.completed 
                                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' 
                                    : 'bg-white shadow-md hover:shadow-lg'
                                }`}
                            >
                                <div className="flex items-center">
                                    {todo.completed && (
                                        <i className="fas fa-check-circle text-lg mr-3"></i>
                                    )}
                                    <h3 className={`text-sm font-medium ${
                                        todo.completed ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        {todo.text}
                                    </h3>
                                </div>
                            </button>
                        ))}
                        {activeTab === 'previous' && previousDays.map((date) => (
                            <button
                                key={date}
                                onClick={() => {/* Handle date click */}}
                                className="flex items-center justify-center p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg"
                            >
                                <h3 className="text-sm font-medium text-gray-900">
                                    {formatDate(date)}
                                </h3>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page