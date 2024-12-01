'use client'

import React from 'react'
import Header from '@/app/components/Header'
import { useRouter } from 'next/navigation'
import JournalList from '@/app/components/journal/JournalList'

const JournalListPage = () => {
    return (
        <div className="min-h-screen mx-5">
            <div className="w-full">
                <Header page="journals"/>
                <JournalList />
            </div>
        </div>
    )
}

export default JournalListPage
