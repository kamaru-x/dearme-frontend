'use client';

import { useState, useEffect } from 'react';
import { useApi } from '@/app/context/ApiContext';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

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

export default function ChecklistContent() {
    const api = useApi();
    const searchParams = useSearchParams();
    const [tasks, setTasks] = useState<ChecklistItem[]>([]);
    const [previousDays, setPreviousDays] = useState<PreviousDay[]>([]);
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'today');
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
                {/* Your existing JSX content */}
            </div>
        </div>
    );
}
