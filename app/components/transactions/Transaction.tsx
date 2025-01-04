'use client'

import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useApi } from '@/app/context/ApiContext'

interface TransactionProps {
    setCreate: (value: boolean) => void;
    fetchTransactions: () => void;
    editData?: {
        id: number;
        title: string;
        type: string;
        category: number;
        category_name?: string;
        account?: number;
        account_name?: string;
        amount: number;
        date: string;
    } | null;
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

const Transaction = ({ setCreate, fetchTransactions, editData }: TransactionProps) => {
    const api = useApi()
    const [categories, setCategories] = useState<Category[]>([])
    const [accounts, setAccounts] = useState<Account[]>([]);

    const [transactionData, setTransactionData] = useState({
        title: '',
        type: '',
        category: '',
        account: '',
        amount: 0,
        date: ''
    })

    useEffect(() => {
        if (editData) {
            setTransactionData({
                title: editData.title,
                type: editData.type,
                category: editData.category.toString(),
                account: editData.account?.toString() || '',
                amount: editData.amount,
                date: editData.date
            });
            if (editData.type) {
                fetchCategories(editData.type);
            }
        }
    }, [editData]);

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
            const url = editData
                ? api.endpoints.transactionDetail(editData.id)
                : api.endpoints.listTransactions;

            const method = editData ? 'PUT' : 'POST';

            // Format the data before sending
            const formattedData = {
                ...transactionData,
                amount: Number(transactionData.amount),
                category: Number(transactionData.category),
                account: Number(transactionData.account)
            };

            const response = await api.fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save transaction');
            }

            const result = await response.json();
            setTransactionData({title: '', type: '', category: '', account: '', amount: 0, date: ''});
            toast.success(result.message || 'Transaction saved successfully');
            setCreate(false);
            fetchTransactions();
        } catch (error) {
            console.error('Error saving transaction:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to save transaction');
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
                        <input
                            onChange={handleChange}
                            type="text"
                            id="title"
                            name="title"
                            value={transactionData.title}
                            className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                            placeholder="Enter transaction title"
                        />
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                        <input
                            onChange={handleChange}
                            type="date"
                            id="date"
                            name="date"
                            value={transactionData.date}
                            className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                        <select
                            onChange={handleChange}
                            id="type"
                            name="type"
                            value={transactionData.type}
                            className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        >
                            <option value="">Select Type</option>
                            <option value="credit" className="dark:bg-gray-700">Credit</option>
                            <option value="debit" className="dark:bg-gray-700">Debit</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <select
                            onChange={handleChange}
                            id="category"
                            name="category"
                            value={transactionData.category}
                            className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        >
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
                        <select
                            onChange={handleChange}
                            id="account"
                            name="account"
                            value={transactionData.account}
                            className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        >
                            <option value="">Select Account</option>
                            {accounts.map((account) => (
                                <option key={account.id} value={account.id} className="dark:bg-gray-700">
                                    {account.name} - {account.bank}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                        <input
                            onChange={handleChange}
                            type="number"
                            id="amount"
                            name="amount"
                            value={transactionData.amount}
                            className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter amount"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => setCreate(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        {editData ? 'Update' : 'Create'} Transaction
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Transaction
