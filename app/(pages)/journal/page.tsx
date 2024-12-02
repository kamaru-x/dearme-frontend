'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useApi } from '@/app/context/ApiContext';
import { toast } from 'react-toastify';

interface Journal {
    id: number;
    title: string;
    date: string;
    mood: string;
    content: string;
}

const JournalPage = () => {
    const api = useApi();
    const [journals, setJournals] = useState<Journal[]>([]);
    const [todayJournal, setTodayJournal] = useState<Journal | null>(null);

    const fetchJournals = async () => {
        try {
            const response = await api.fetch(api.endpoints.listJournals);
            const result = await response.json();
            const today = new Date().toISOString().split('T')[0];
            
            // Find today's journal and other journals
            const todayEntry = result.data.find((journal: Journal) => journal.date === today);
            const otherJournals = result.data.filter((journal: Journal) => journal.date !== today);
            
            setTodayJournal(todayEntry || null);
            setJournals(otherJournals);
        } catch (error) {
            console.error('Error fetching journals:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to fetch journals');
            setJournals([]);
            setTodayJournal(null);
        }
    };

    useEffect(() => {
        fetchJournals();
    }, [api]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            day: date.toLocaleDateString('en-US', { day: 'numeric' }),
            month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
            year: date.getFullYear()
        };
    };

    const today = formatDate(new Date().toISOString());

    return (
        <div className="min-h-screen mx-5">
            <div className="w-full">  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {!todayJournal ? (
                        <Link href="/journal/today" className="flex items-center p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-500/50 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg group text-left w-full">
                            <div className="flex-shrink-0 w-16 h-16 mr-6 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/50 rounded-lg flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{today.day}</span>
                                <span className="text-xs font-medium text-blue-500 dark:text-blue-300">{today.month}</span>
                            </div>
                            <div className="min-w-0 flex items-center">
                                <div>
                                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                                        Write Today's Journal
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                        Click to add your thoughts for today
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <Link href="/journal/today" className="flex items-center p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-500/50 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg group text-left w-full">
                            <div className="flex-shrink-0 w-16 h-16 mr-6 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/50 rounded-lg flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{today.day}</span>
                                <span className="text-xs font-medium text-blue-500 dark:text-blue-300">{today.month}</span>
                            </div>
                            <div className="min-w-0 flex items-center">
                                <div>
                                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                                        {todayJournal.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-1">
                                        {todayJournal.content}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    )}

                    {journals.map((journal) => {
                        const date = formatDate(journal.date);
                        return (
                            <Link key={journal.id} href={`/journal/read/${journal.id}`} className="flex items-center p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg group text-left w-full">
                                <div className="flex-shrink-0 w-16 h-16 mr-6 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/50 rounded-lg flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{date.day}</span>
                                    <span className="text-xs font-medium text-blue-500 dark:text-blue-300">{date.month}</span>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 truncate">
                                        {journal.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 line-clamp-1 text-sm mt-1">
                                        {journal.content}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default JournalPage