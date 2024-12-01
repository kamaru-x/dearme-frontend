'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/app/components/Header'
import { useRouter, useParams } from 'next/navigation'

interface Journal {
    title: string;
    content: string;
    mood: string;
    date: string;
}

const ReadJournalPage = () => {
    const router = useRouter();
    const params = useParams();
    const [journal, setJournal] = useState<Journal | null>(null);

    useEffect(() => {
        // TODO: Fetch journal data based on params.id
        // For now, using mock data
        const mockJournal = {
            title: 'A Day of Reflection and Growth',
            content: `Today was a remarkable day filled with moments of deep reflection. As I sat in my favorite coffee shop, watching the world go by, I couldn't help but think about how far I've come.

The morning started with a beautiful sunrise that painted the sky in shades of pink and orange. It felt like nature's way of reminding me to appreciate the small things in life.

I spent most of the day working on personal projects, each task bringing its own set of challenges and rewards. There's something incredibly satisfying about pushing through obstacles and seeing progress, no matter how small.

In the evening, I took a long walk in the park, letting my thoughts wander. The cool breeze and the sound of rustling leaves provided the perfect backdrop for contemplation.

Looking back, I realize that every experience, whether good or challenging, has contributed to who I am today. I'm grateful for this journey of self-discovery and growth.

Tomorrow brings new opportunities, and I'm excited to embrace whatever comes my way. For now, I'll cherish these moments of peace and reflection.`,
            mood: 'grateful',
            date: '2024-01-15'
        };
        setJournal(mockJournal);
    }, [params.id]);

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

    if (!journal) {
        return (
            <div className="min-h-screen mx-5">
                <div className="w-full">
                    <Header page="journals" />
                    <div className="mt-8 text-center">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen mx-5">
            <div className="w-full">
                <Header page="journals" />

                <div className="mt-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {journal.title}
                                </h1>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                    <span>{formatDate(journal.date)}</span>
                                    <span>{getMoodEmoji(journal.mood)} {journal.mood}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => router.push('/journal/list')}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                            >
                                <i className="fas fa-arrow-left mr-2"></i>
                                Back to List
                            </button>
                        </div>
                        
                        <div className="prose dark:prose-invert max-w-none">
                            {journal.content.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadJournalPage;
