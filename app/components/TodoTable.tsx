'use client'

import { useState } from 'react';

interface Todo {
    id: number;
    title: string;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
}

const TodoTable = () => {
    const [todos, setTodos] = useState<Todo[]>([
        {
            id: 1,
            title: "Complete DearMe dashboard design",
            priority: 'high',
            completed: false
        },
        {
            id: 2,
            title: "Review monthly expenses",
            priority: 'medium',
            completed: false
        },
        {
            id: 3,
            title: "Plan weekend activities",
            priority: 'low',
            completed: true
        },
        {
            id: 4,
            title: "Plan weekend activities",
            priority: 'low',
            completed: true
        },
    ]);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'text-red-600 dark:text-red-400';
            case 'medium':
                return 'text-yellow-600 dark:text-yellow-400';
            case 'low':
                return 'text-blue-600 dark:text-blue-400';
            default:
                return 'text-gray-600 dark:text-gray-400';
        }
    };

    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {todos.map((todo) => (
                    <div 
                        key={todo.id} 
                        className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    className="form-checkbox h-4 w-4 text-blue-600 dark:text-blue-400 dark:bg-gray-700 dark:border-gray-600 transition duration-150 ease-in-out"
                                    onChange={() => {}}
                                />
                                <span className={`text-sm ${todo.completed ? 'line-through' : ''} ${getPriorityColor(todo.priority)}`}>
                                    {todo.title}
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button 
                                    className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-150" 
                                    title="Delete todo"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoTable;
