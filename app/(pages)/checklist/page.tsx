'use client';

import { useState, useEffect, useRef } from 'react';
import { useApi } from '@/app/context/ApiContext';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ChecklistItem {
    id: number;
    task: number;
    task_title: string;
    completed: boolean;
    date: string;
}

interface PreviousDay {
    date: string;
    completed: boolean;
}

const ChecklistPage = () => {
    const api = useApi();
    const router = useRouter();
    const [tasks, setTasks] = useState<ChecklistItem[]>([]);
    const [previousDays, setPreviousDays] = useState<PreviousDay[]>([]);
    const [activeTab, setActiveTab] = useState('today');
    const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
    const [pressingId, setPressingId] = useState<number | null>(null);

    const handlePressStart = (taskId: number) => {
        setPressingId(taskId);
        const timer = setTimeout(() => completeTask(taskId), 1000);
        setPressTimer(timer);
    };

    const handlePressEnd = () => {
        if (pressTimer) {
            clearTimeout(pressTimer);
            setPressTimer(null);
        }
        setPressingId(null);
    };

    const completeTask = async (taskId: number) => {
        try {
            const taskToUpdate = tasks.find(task => task.id === taskId);
            if (!taskToUpdate) return;

            const response = await api.fetch(api.endpoints.checklistDetail(taskId), {
                method: 'PUT',
                body: JSON.stringify({
                    ...taskToUpdate,
                    completed: !taskToUpdate.completed
                })
            });

            if (response.ok) {
                setTasks(tasks.map(task => 
                    task.id === taskId ? { ...task, completed: !task.completed } : task
                ));
                toast.success('Task status updated');
            } else {
                toast.error('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Failed to update task');
        }
    };

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

    const fetchPreviousDays = async () => {
        try {
            const response = await api.fetch(api.endpoints.previousDays);
            const result = await response.json();
            setPreviousDays(result.data || []);
        } catch (error) {
            console.error('Error fetching previous days:', error);
            toast.error('Failed to fetch previous days');
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchPreviousDays();
    }, [api]);

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
                                    className={`p-4 rounded-lg shadow-md cursor-pointer select-none ${
                                        task.completed
                                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                                        : 'bg-white dark:bg-gray-800'
                                    } ${pressingId === task.id ? 'scale-95' : ''} transition-all duration-200`}
                                    onMouseDown={() => handlePressStart(task.id)}
                                    onMouseUp={handlePressEnd}
                                    onMouseLeave={handlePressEnd}
                                    onTouchStart={() => handlePressStart(task.id)}
                                    onTouchEnd={handlePressEnd}
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
                            {previousDays.map((item) => (
                                <Link href={`/checklist/${item.date}`} key={item.date} onClick={() => setActiveTab('previous')}>
                                    <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.date}</h3>
                                            <i className={`fas ${item.completed ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'} text-lg`}></i>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChecklistPage;
