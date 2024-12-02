'use client';

import { useState, useEffect } from 'react';
import { useApi } from '@/app/context/ApiContext';
import { toast } from 'react-toastify';

interface ChecklistItem {
    id: number;
    task: number;
    task_title: string;
    completed: boolean;
    date: string;
}

const ChecklistPage = () => {
    const api = useApi();
    const [tasks, setTasks] = useState<ChecklistItem[]>([]);
    const [activeTab, setActiveTab] = useState('today');

    const fetchTasks = async () => {
        try {
            const response = await api.fetch(api.endpoints.checkList);
            const result = await response.json();
            setTasks(result.data || []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error('Failed to fetch checklist items');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Static dates for demonstration
    const dates = [
        { date: '2024-01-20', status: 'complete' },
        { date: '2024-01-19', status: 'incomplete' },
        { date: '2024-01-18', status: 'complete' },
        { date: '2024-01-17', status: 'incomplete' },
        { date: '2024-01-16', status: 'complete' },
        { date: '2024-01-15', status: 'incomplete' },
    ];

    return (
        <div className="min-h-screen mx-5">
            <div className="w-full">
                <div className="mt-8">
                    <div className="mt-6">
                        <div className="flex space-x-4">
                            <button onClick={() => setActiveTab('today')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200 
                                ${activeTab === 'today' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800'}`}>
                                TODAY
                            </button>
                            <button onClick={() => setActiveTab('previous')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200 
                                ${ activeTab === 'previous' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800'}`}>
                                PREVIOUS
                            </button>
                        </div>
                    </div>

                    {activeTab === 'today' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`p-4 rounded-lg shadow-md ${
                                        task.completed
                                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                                        : 'bg-white dark:bg-gray-800'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        {task.completed && (
                                            <i className="fas fa-check-circle text-lg mr-3"></i>
                                        )}
                                        <h3 className={`text-sm font-medium ${
                                            task.completed ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                                        }`}>
                                            {task.task_title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                            {dates.map((item) => (
                                <div key={item.date} 
                                    className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {new Date(item.date).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            }).toUpperCase()}
                                        </h3>
                                        <i className={`fas ${item.status === 'complete' ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'} text-lg`}></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChecklistPage;