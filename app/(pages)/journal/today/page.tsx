'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApi } from '@/app/context/ApiContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

interface Journal {
    id?: number;
    title: string;
    content: string;
    mood: string;
    date: string;
}

const TodayJournalPage = () => {
    const router = useRouter();
    const api = useApi();
    const [journal, setJournal] = useState<Journal>({
        title: '', 
        content: '', 
        mood: 'neutral', 
        date: new Date().toISOString().split('T')[0]
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchTodayJournal();
    }, []);

    const fetchTodayJournal = async () => {
        try {
            const response = await api.fetch(api.endpoints.listJournals);
            const result = await response.json();
            const today = new Date().toISOString().split('T')[0];
            const todayJournal = result.data.find((j: Journal) => j.date === today);
            
            if (todayJournal) {
                setJournal(todayJournal);
                setIsUpdating(true);
            }
        } catch (error) {
            console.error('Error fetching journal:', error);
            toast.error('Failed to fetch journal');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = isUpdating ? 'PUT' : 'POST';
            const endpoint = isUpdating 
                ? `${api.endpoints.listJournals}${journal.id}/`
                : api.endpoints.listJournals;

            const response = await api.fetch(endpoint, {
                method,
                body: JSON.stringify(journal)
            });
            const result = await response.json();

            if (response.ok) {
                toast.success(isUpdating ? 'Journal updated successfully' : 'Journal created successfully');
                router.push('/journal/');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log('Error saving journal:', error);
            toast.error(isUpdating ? 'Failed to update journal' : 'Failed to create journal');
        }
    };

    if (isLoading) {
        return <div className="min-h-screen mx-5 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>;
    }

    return (
        <div className="min-h-screen mx-5">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full">
                <div className="mt-8">
                    <form onSubmit={handleSubmit} className="w-full mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {isUpdating ? 'Update Journal Entry' : 'New Journal Entry'}
                                </h1>
                                <Link href="/journal/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                    <i className="fas fa-arrow-left mr-2"></i>
                                    Back to List
                                </Link>
                            </div>

                            {/* Title Input */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={journal.title}
                                    onChange={(e) => setJournal({ ...journal, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 dark:placeholder-gray-400"
                                    placeholder="Give your journal entry a title..."
                                    required
                                />
                            </div>

                            {/* Mood Selection */}
                            <div className="mb-6">
                                <label htmlFor="mood" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    How are you feeling today?
                                </label>
                                <select
                                    id="mood"
                                    value={journal.mood}
                                    onChange={(e) => setJournal({ ...journal, mood: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                                    required
                                >
                                    <option value="happy">Happy 😊</option>
                                    <option value="excited">Excited 🎉</option>
                                    <option value="calm">Calm 😌</option>
                                    <option value="neutral">Neutral 😐</option>
                                    <option value="sad">Sad 😢</option>
                                    <option value="anxious">Anxious 😰</option>
                                    <option value="angry">Angry 😠</option>
                                    <option value="grateful">Grateful 🙏</option>
                                </select>
                            </div>

                            {/* Content Input */}
                            <div className="mb-6">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Journal Entry
                                </label>
                                <textarea
                                    id="content"
                                    value={journal.content}
                                    onChange={(e) => setJournal({ ...journal, content: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 min-h-[200px] resize-y dark:placeholder-gray-400"
                                    placeholder="Write your thoughts here..."
                                    required
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                                >
                                    {isUpdating ? 'Update Journal' : 'Create Journal'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TodayJournalPage;
