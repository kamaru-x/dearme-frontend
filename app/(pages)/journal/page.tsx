'use client'

import React, { useState } from 'react'
import Header from '@/app/components/Header'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter();
    const [journals] = useState([
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
        { 
            id: 4, 
            title: "Learning and Growing", 
            date: "2024-01-11", 
            mood: "motivated",
            content: "Spent the day learning new skills and pushing my boundaries. Every small step forward is progress..."
        },
        { 
            id: 5, 
            title: "Finding Peace", 
            date: "2024-01-10", 
            mood: "calm",
            content: "Today was all about mindfulness and finding inner peace. Sometimes the quietest moments teach us the most..."
        },
        { 
            id: 6, 
            title: "Making Progress", 
            date: "2024-01-09", 
            mood: "satisfied",
            content: "Another productive day working towards my goals. Small victories add up to big achievements..."
        },
        { 
            id: 7, 
            title: "Grateful Moments", 
            date: "2024-01-08", 
            mood: "grateful",
            content: "Taking time to appreciate all the blessings in my life. Gratitude really does change everything..."
        },
        { 
            id: 8, 
            title: "Future Plans", 
            date: "2024-01-07", 
            mood: "hopeful",
            content: "Mapping out my future and setting new goals. The possibilities are endless when you dare to dream big..."
        },
        { 
            id: 9, 
            title: "Personal Growth", 
            date: "2024-01-06", 
            mood: "inspired",
            content: "Reflecting on how far I've come and excited about where I'm heading. Growth is a beautiful journey..."
        },
        { 
            id: 10, 
            title: "Daily Thoughts", 
            date: "2024-01-05", 
            mood: "thoughtful",
            content: "Some days are for deep thinking and self-discovery. Today was one of those days..."
        }
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
        <div className="min-h-screen mx-5">
            <div className="w-full">
                <Header page="journals"/>
                
                <div className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div onClick={() => router.push('/journal/new')} className="flex items-center p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-500/50 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg group text-left w-full">
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
                                <div key={journal.id} onClick={() => router.push(`/journal/${journal.id}`)} className="flex items-center p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg group text-left w-full">
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
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page