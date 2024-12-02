'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApi } from '@/app/context/ApiContext';
import { toast } from 'react-toastify';

interface DayTask {
    id: number;
    task_title: string;
    completed: boolean;
}

const DayTasksPage = () => {
    const params = useParams();
    const date = params.date as string;
    const api = useApi();
    const [tasks, setTasks] = useState<DayTask[]>([]);

    const fetchTasks = async () => {
        try {
            const response = await api.fetch(`${api.endpoints.previousDayTasks}?date=${date}`);
            const result = await response.json();
            setTasks(result || []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error('Failed to fetch tasks for this day');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [date, api]);

    return (
        <div className="min-h-screen mx-5">
            <div className="w-full mx-auto pt-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Tasks for {date}
                    </h1>
                    <Link href="/checklist?tab=previous" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Back to Checklist
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {tasks.map((task) => (
                        <div key={task.id} className={`p-4 rounded-lg shadow-md ${task.completed ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-red-400 to-red-500'} text-white`}>
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">
                                    {task.task_title}
                                </h3>
                                <i className={`fas ${task.completed ? 'fa-check-circle' : 'fa-times-circle'} text-lg`}></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DayTasksPage;
