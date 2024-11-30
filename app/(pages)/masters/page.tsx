'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/app/components/Header'
import { useApi } from '@/app/context/ApiContext'

interface Account {
    id: number;
    date: string;
    name: string;
    bank: string;
    number: string;
}

const Page = () => {
    const api = useApi()
    const [accounts, setAccounts] = useState<Account[]>([])
    const [categories, setCategories] = useState([])
    const [checklist, setChecklist] = useState([])

    const [formData, setFormData] = useState({name: '', bank: '', number: ''})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData({
            ...formData,[name]: value
        })
    }

    const fetchAccounts = async () => {
        try {
            const response = await fetch(api.baseUrl + api.endpoints.listAccounts, {
                method: 'GET',
                headers: api.getHeaders()
            });
            const result = await response.json();
            setAccounts(result.data || []);
        } catch (error) {
            console.error('Error fetching accounts data:', error);
            setAccounts([]);
        }
    };

    const createAccount = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(api.baseUrl + api.endpoints.listAccounts, {
                method: 'POST',
                headers: api.getHeaders(),
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setFormData({name: '', bank: '', number: ''})
                fetchAccounts()
            }
        } catch (error) {
            console.log('Error creating account:', error)
        }
    }

    const deleteAccount = async (id: number) => {
        try {
            const response = await fetch(`${api.baseUrl}${api.endpoints.accountDetail(id)}`, {
                method: 'DELETE',
                headers: api.getHeaders()
            })

            if (response.ok) {
                fetchAccounts()
            }
        } catch (error) {
            console.log('Error deleting account:', error)
        }
    }

    React.useEffect(() => {
        fetchAccounts();
    }, [api]);

    const [activeTab, setActiveTab] = useState('ACCOUNTS');

    return (
        <div className="min-h-screen mx-5">
            <div className="w-full">
                <Header page="masters"/>

                {/* Tabs */}
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-8">
                    <button onClick={() => setActiveTab('ACCOUNTS')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200
                        ${ activeTab === 'ACCOUNTS' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white': 'text-gray-600 bg-white'}`}> BANK ACCOUNTS
                    </button>

                    <button onClick={() => setActiveTab('CATEGORIES')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200
                        ${ activeTab === 'CATEGORIES' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' : 'text-gray-600 bg-white'}`}>TRANSACTION CATEGORIES
                    </button>

                    <button onClick={() => setActiveTab('CHECKLIST')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200
                        ${ activeTab === 'CHECKLIST' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' : 'text-gray-600 bg-white' }`}>CHECKLIST ITEMS
                    </button>
                </div>

                {/* Content */}
                <div className="mt-8">
                    {activeTab === 'ACCOUNTS' ? (
                        <>
                            {/* Account Creation Form */}
                            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Account</h3>
                                <form onSubmit={createAccount} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Account Name" className="form-input w-full"/>
                                        <input type="text" id="bank" name="bank" value={formData.bank} onChange={handleChange} placeholder="Bank Name" className="form-input w-full"/>
                                        <input type="text" id="number" name="number" value={formData.number} onChange={handleChange} placeholder="Account Number" className="form-input w-full"/>
                                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            Create Account
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Accounts Table */}
                            {accounts ? (

                                <div className="overflow-x-auto pb-2">
                                    <table className="w-full min-w-[640px]">
                                        <tbody className="space-y-3 mb-5">
                                            {accounts.map((account: Account, index: number) => (
                                                <tr key={index} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg mb-3">
                                                    <td className="min-w-24 text-center text-sm text-gray-900 whitespace-nowrap">
                                                        {index + 1}
                                                    </td>
                                                    <td className="min-w-48 text-center text-sm text-gray-900 whitespace-nowrap">
                                                        {account.name}
                                                    </td>
                                                    <td className="min-w-48 text-center text-sm text-gray-600 whitespace-nowrap">
                                                        {account.bank}
                                                    </td>
                                                    <td className="min-w-48 text-center text-sm text-gray-600 whitespace-nowrap">
                                                        {account.number}
                                                    </td>
                                                    <td className="min-w-24 text-right flex items-center space-x-2 whitespace-nowrap">
                                                        <button
                                                            onClick={() => deleteAccount(account.id)}
                                                            className="p-1 text-red-600 hover:text-red-800 transition-colors duration-150"
                                                            title="Delete account"
                                                        >
                                                            <i className="fas fa-trash-alt w-5 h-5"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            ) : (

                                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
                                    <p className="text-gray-600 text-lg">No bank accounts available</p>
                                </div>

                            )}
                        </>
                    ) : activeTab === 'CATEGORIES' ? (

                        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
                            <p className="text-gray-600 text-lg">No categories available</p>
                        </div>

                    ) : activeTab === 'CHECKLIST' ? (

                        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
                            <p className="text-gray-600 text-lg">No checklist available</p>
                        </div>

                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Page