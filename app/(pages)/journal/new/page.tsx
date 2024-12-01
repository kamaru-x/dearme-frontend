'use client'

import React, { useState } from 'react'
import Header from '@/app/components/Header'
import { useRouter } from 'next/navigation'

const NewJournalPage = () => {
    const router = useRouter();
    const [journal, setJournal] = useState({
        title: '',
        content: '',
        mood: 'neutral',
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle journal submission
        console.log('Journal submitted:', journal);
        // Redirect back to journals page after submission
        router.push('/journal/list');
    };

    return (
        <div className="min-h-screen mx-5">
            <div className="w-full">
                <Header page="journals" />

                <div className="mt-8">
                    <form onSubmit={handleSubmit} className="w-full mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    New Journal Entry
                                </h1>
                                <button 
                                    type="button"
                                    onClick={() => router.push('/journal/list')}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                >
                                    <i className="fas fa-arrow-left mr-2"></i>
                                    Back to List
                                </button>
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

                            {/* Content Textarea */}
                            <div className="mb-6">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Your Thoughts
                                </label>
                                <textarea
                                    id="content"
                                    value={journal.content}
                                    onChange={(e) => setJournal({ ...journal, content: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 dark:placeholder-gray-400 min-h-[300px]"
                                    placeholder="Write your thoughts here..."
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                >
                                    Save Journal Entry
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewJournalPage;
