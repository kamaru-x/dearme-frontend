'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/app/components/Header'
import { useRouter, useParams } from 'next/navigation'

const JournalPage = () => {
    const router = useRouter();
    const params = useParams();
    const isNewEntry = params.id === 'new';

    const [journal, setJournal] = useState({
        title: '',
        content: '',
        mood: 'neutral',
        date: new Date().toISOString().split('T')[0]
    });

    // For existing journal entries, fetch data based on ID
    useEffect(() => {
        if (!isNewEntry) {
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
        }
    }, [params.id, isNewEntry]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle journal submission
        console.log('Journal submitted:', journal);
        // Redirect back to journals page after submission
        router.push('/journal');
    };

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
                <Header page="journals" />

                {isNewEntry ? (
                    // New Entry Form
                    <div className="mt-8">
                        <form onSubmit={handleSubmit} className="w-full mx-auto">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
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
                                    >
                                        <option value="happy" className="dark:bg-gray-700">Happy 😊</option>
                                        <option value="excited" className="dark:bg-gray-700">Excited 🎉</option>
                                        <option value="calm" className="dark:bg-gray-700">Calm 😌</option>
                                        <option value="neutral" className="dark:bg-gray-700">Neutral 😐</option>
                                        <option value="sad" className="dark:bg-gray-700">Sad 😢</option>
                                        <option value="anxious" className="dark:bg-gray-700">Anxious 😰</option>
                                        <option value="angry" className="dark:bg-gray-700">Angry 😠</option>
                                        <option value="grateful" className="dark:bg-gray-700">Grateful 🙏</option>
                                    </select>
                                </div>

                                {/* Content Textarea */}
                                <div className="mb-6">
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Your Thoughts
                                    </label>
                                    <textarea
                                        id="content"
                                        value={journal.content}
                                        onChange={(e) => setJournal({ ...journal, content: e.target.value })}
                                        rows={12}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 resize-none dark:placeholder-gray-400"
                                        placeholder="Write your thoughts here..."
                                        required
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => router.push('/journal')}
                                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                    >
                                        Save Journal
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    // Journal View
                    <div className="mt-8 w-fullmx-auto">
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
                )}
            </div>
        </div>
    )
}

export default JournalPage