'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Journal {
    id: number;
    title: string;
    date: string;
    mood: string;
    content: string;
}

const JournalList = () => {
    const router = useRouter();
    const [journals] = useState<Journal[]>([
        { 
            id: 2, 
            title: "New Beginnings", 
            date: "2024-01-13", 
            mood: "excited",
            content: "Starting fresh with new goals and aspirations. This year feels different, like everything is finally falling into place..."
        },
        { 
            id: 3, 
            title: "Overcoming Challenges", 
            date: "2024-01-12", 
            mood: "proud",
            content: "Faced some difficult obstacles today but managed to push through. It's amazing how much stronger we become when tested..."
        },
        // ... other journal entries
    ]);

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
        <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                    onClick={() => router.push('/journal/new')} 
                    className="flex items-center p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-500/50 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg group text-left w-full cursor-pointer"
                >
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
                </div>

                {journals.map((journal) => {
                    const date = formatDate(journal.date);
                    return (
                        <div 
                            key={journal.id} 
                            onClick={() => router.push(`/journal/read/${journal.id}`)}
                            className="flex items-center p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg group text-left w-full cursor-pointer"
                        >
                            <div className="flex-shrink-0 w-16 h-16 mr-6 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900/50 dark:to-gray-800/50 rounded-lg flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">{date.day}</span>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-300">{date.month}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                    {journal.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 truncate">
                                    {journal.content}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default JournalList;
