'use client'

import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useApi } from '@/app/context/ApiContext'

interface TransactionProps {
    setCreate: (value: boolean) => void;
    fetchTransfers: () => void;
}

interface Account {
    id: number;
    date: string;
    name: string;
    bank: string;
    number: string;
}

const SelfTransfer = ({ setCreate, fetchTransfers}: TransactionProps) => {
    const api = useApi()
    const [accounts, setAccounts] = useState<Account[]>([]);

    const [transferData, setTransferData] = useState({
        from_account: '',
        to_account: '',
        amount: 0,
    })

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
        setTransferData({
            ...transferData,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.fetch(api.endpoints.listTransfers, {method: 'POST', body: JSON.stringify(transferData)})
            const result = await response.json()

            if (response.ok) {
                setTransferData({from_account: '', to_account: '', amount: 0})
                fetchAccounts()
                setCreate(false);
                fetchTransfers();
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.log('Error creating account:', error)
            toast.error('Failed to create self transfer')
        }
    }

    React.useEffect(() => {
        fetchAccounts();
    }, [api]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <form className="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="from_account" className="block text-sm font-medium text-gray-700 dark:text-gray-300">From Account</label>
                        <select
                            onChange={handleChange}
                            id="from_account"
                            name="from_account"
                            value={transferData.from_account}
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
                        <label htmlFor="to_account" className="block text-sm font-medium text-gray-700 dark:text-gray-300">To Account</label>
                        <select
                            onChange={handleChange}
                            id="to_account"
                            name="to_account"
                            value={transferData.to_account}
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
                            value={transferData.amount}
                            className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            placeholder="Enter amount"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button type="button" onClick={() => setCreate(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                        Confirm Transfer
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SelfTransfer
