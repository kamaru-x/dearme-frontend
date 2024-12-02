'use client'

import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Accounts from '@/app/components/masters/Accounts'
import Categories from '@/app/components/masters/Categories'
import Tasks from '@/app/components/masters/Tasks'
import { useApi } from '@/app/context/ApiContext'
import { useDeleteModal } from '@/app/context/DeleteModalContext'

const Page = () => {

    const [activeTab, setActiveTab] = useState('ACCOUNTS');
    const api = useApi()
    const { showDeleteModal } = useDeleteModal()

    return (
        <div className="min-h-screen mx-5">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-8">
                    <button onClick={() => setActiveTab('ACCOUNTS')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200
                        ${ activeTab === 'ACCOUNTS' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white': 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800'}`}> BANK ACCOUNTS
                    </button>

                    <button onClick={() => setActiveTab('CATEGORIES')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200
                        ${ activeTab === 'CATEGORIES' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800'}`}>TRANSACTION CATEGORIES
                    </button>

                    <button onClick={() => setActiveTab('TASKS')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200
                        ${ activeTab === 'TASKS' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800' }`}>CHECKLIST ITEMS
                    </button>
                </div>

                <div className="mt-8">
                    {activeTab === 'ACCOUNTS' ? (
                        <Accounts api={api} showDeleteModal={showDeleteModal}/>
                    ) : activeTab === 'CATEGORIES' ? (
                        <Categories api={api} showDeleteModal={showDeleteModal}/>
                    ) : activeTab === 'TASKS' ? (
                        <Tasks api={api} showDeleteModal={showDeleteModal}/>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Page