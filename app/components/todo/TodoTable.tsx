'use client'

import React, { useState, useCallback } from 'react';
import { useApi } from '@/app/context/ApiContext';
import { toast } from 'react-toastify';

interface Todo {
    id: number;
    title: string;
    priority: 'high' | 'normal' | 'low';
    completed: boolean;
}

interface TodoTableProps {
    todos: Todo[];
    onUpdate?: () => void;
}

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'high':
            return 'text-red-600 dark:text-red-400'
        case 'normal':
            return 'text-yellow-600 dark:text-yellow-400'
        case 'low':
            return 'text-blue-600 dark:text-blue-400'
        default:
            return 'text-gray-600 dark:text-gray-400'
    }
}

const TodoTable = ({ todos, onUpdate }: TodoTableProps) => {
    const api = useApi();
    const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
    const [pressedTodoId, setPressedTodoId] = useState<number | null>(null);

    const toggleComplete = async (todoId: number) => {
        try {
            const response = await api.fetch(api.endpoints.todoDetail(todoId), {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: true })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update todo');
            }

            const result = await response.json();
            toast.success(result.message || 'Todo updated successfully');
            onUpdate?.();
        } catch (error) {
            console.error('Error updating todo:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to update todo');
        }
    };

    const handlePressStart = useCallback((todoId: number) => {
        setPressedTodoId(todoId);
        const timer = setTimeout(() => {
            toggleComplete(todoId);
            setPressedTodoId(null);
        }, 1000); // 1 second hold
        setPressTimer(timer);
    }, []);

    const handlePressEnd = useCallback(() => {
        if (pressTimer) {
            clearTimeout(pressTimer);
            setPressTimer(null);
        }
        setPressedTodoId(null);
    }, [pressTimer]);

    return (
        <div className="mt-8">
            {todos && todos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {todos.map((todo) => (
                        <div 
                            key={todo.id} 
                            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg ${pressedTodoId === todo.id ? 'scale-95' : ''} cursor-pointer`}
                            onMouseDown={() => !todo.completed && handlePressStart(todo.id)}
                            onMouseUp={handlePressEnd}
                            onMouseLeave={handlePressEnd}
                            onTouchStart={() => !todo.completed && handlePressStart(todo.id)}
                            onTouchEnd={handlePressEnd}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <span className={`text-sm ${todo.completed ? 'line-through' : ''} ${getPriorityColor(todo.priority)}`}>
                                        {todo.title}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    {todo.completed && (
                                        <i className="fas fa-check text-green-500 dark:text-green-400"></i>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">No todos available</p>
                </div>
            )}
        </div>
    );
};

export default TodoTable;
