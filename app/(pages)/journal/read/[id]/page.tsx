'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useApi } from '@/app/context/ApiContext'
import { toast } from 'react-toastify'

interface Journal {
    id: number;
    title: string;
    content: string;
    mood: string;
    date: string;
}

const JournalPage = () => {
    const router = useRouter();
    const params = useParams();
    const api = useApi();

    const [journal, setJournal] = useState<Journal | null>(null);

    const fetchJournal = async () => {
        try {
            const response = await api.fetch(api.endpoints.journalDetail(params.id as string));
            const result = await response.json();
            setJournal(result.data);
        } catch (error) {
            console.error('Error fetching journal:', error);
            toast.error('Failed to load journal entry');
            router.push('/journal');
        }
    };

    useEffect(() => {
        fetchJournal();
    }, [params.id, api]);

    if (!journal) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getMoodEmoji = (mood: string) => {
        const moods: { [key: string]: string } = {
            happy: '😊',
            excited: '🎉',
            calm: '😌',
            neutral: '😐',
            sad: '😢',
            anxious: '😰',
            angry: '😠',
            grateful: '🙏'
        };
        return moods[mood] || '😐';
    };

    return (
        <div className="min-h-screen mx-5">
            <div className="w-full">
                <div className="mt-8 w-full mx-auto">
                    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                        {/* Header Section */}
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
                            <div className="flex items-center justify-between mb-4">
                                <time className="text-sm text-gray-600 dark:text-gray-400" dateTime={journal.date}>
                                    {formatDate(journal.date)}
                                </time>
                                <div className="text-2xl" title={`Feeling ${journal.mood}`}>
                                    {getMoodEmoji(journal.mood)}
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">
                                {journal.title}
                            </h1>
                        </div>

                        {/* Content Section */}
                        <div className="p-6">
                            <div className="prose prose-blue max-w-none dark:text-gray-400">
                                {journal.content.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default JournalPage