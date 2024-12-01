'use client'

import React , { useState } from 'react'
import { toast } from 'react-toastify'
import { useApi } from '@/app/context/ApiContext'

interface CreateTransactionProps {
    setCreate: (value: boolean) => void;
    fetchTransactions: () => void;
}

interface Category {
    id: number;
    type: string;
    name: string;
}

interface Account {
    id: number;
    date: string;
    name: string;
    bank: string;
    number: string;
}

const CreateTransaction = ({ setCreate, fetchTransactions }: CreateTransactionProps) => {
    const api = useApi()
    const [categories, setCategories] = useState<Category[]>([])
    const [accounts, setAccounts] = useState<Account[]>([]);

    const [transactionData, setTransactionData] = useState({title: '', type: '', category: '', amount: 0, date: ''})

    const fetchCategories = async (type?: string) => {
        try {
            const url = type ? `${api.endpoints.listCategories}?type=${type}` : api.endpoints.listCategories;
            const response = await api.fetch(url);
            const result = await response.json();
            setCategories(result.data || []);
        } catch (error) {
            console.log('Error fetching categories:', error)
            setCategories([])
            toast.error('Failed to fetch categories')
        }
    }

    const fetchAccounts = async () => {
        try {
            const response = await api.fetch(api.endpoints.listAccounts);
            const result = await response.json();
            setAccounts(result.data || []);
        } catch (error) {
            console.error('Error fetching accounts data:', error);
            setAccounts([]);
            toast.error('Failed to fetch accounts')
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setTransactionData({
            ...transactionData,
            [name]: value
        })

        if (name === 'type' && value) {
            fetchCategories(value);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.fetch(api.endpoints.listTransactions,{method: 'POST', body: JSON.stringify(transactionData)})
            const result = await response.json()
            if (response.ok) {
                setTransactionData({title: '', type: '', category: '', amount: 0, date: ''})
                toast.success(result.message)
                setCreate(false)
                fetchTransactions()
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.error('Error creating transaction:', error);
            toast.error('Failed to create transaction');
        }
    };

    React.useEffect(() => {
        fetchCategories();
        fetchAccounts();
    }, [api]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <form className="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input onChange={handleChange} type="text" id="title" name="title" className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400" placeholder="Enter transaction title"/>
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                        <input onChange={handleChange} type="date" id="date" name="date" className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"/>
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                        <select onChange={handleChange} id="type" name="type" className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                            <option value="">Select Type</option>
                            <option value="credit" className="dark:bg-gray-700">Credit</option>
                            <option value="debit" className="dark:bg-gray-700">Debit</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <select onChange={handleChange} id="category" name="category" className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id} className="dark:bg-gray-700">
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="account" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Account</label>
                        <select onChange={handleChange} id="account" name="account" className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                            <option value="">Select Account</option>
                            {accounts.map((account) => (
                                <option key={account.id} value={account.id} className="dark:bg-gray-700">
                                    {account.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                        <input onChange={handleChange} type="number" id="amount" name="amount" className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400" placeholder="Enter amount"/>
                    </div>

                </div>

                <div className="flex justify-center md:justify-end space-x-3 mt-5">
                    <button type="button" className="btn-red dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-600" onClick={() => setCreate(false)}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary dark:bg-blue-600 dark:hover:bg-blue-700">
                        Create Transaction
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTransaction
