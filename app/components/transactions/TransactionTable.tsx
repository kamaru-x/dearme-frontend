'use client'

import React from 'react'
import { useDeleteModal } from '@/app/context/DeleteModalContext'
import { toast } from 'react-toastify'

interface Transaction{
    id: number,
    date: string,
    title: string,
    type: 'credit' | 'debit',
    account: number,
    account_name: string,
    category: number,
    category_name: string,
    amount: number
}

interface TransactionTableProps {
    show_btn: boolean;
    transactions: Transaction[];
    api: any;
    onUpdate: () => void;
}

const TransactionTable = ({ show_btn, transactions, api, onUpdate }: TransactionTableProps) => {
    const { showDeleteModal } = useDeleteModal()

    const deleteTransaction = async (id: number) => {
        try {
            const response = await api.fetch(api.endpoints.transactionDetail(id), {
                method: 'DELETE'
            })
            const result = await response.json()
    
            if (response.ok) {
                toast.success(result.message)
                onUpdate()
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.log('Error deleting transaction:', error)
            toast.error('Failed to delete transaction')
        }
    }

    const handleDeleteClick = (itemType: string, id: number, deleteFunction: () => void) => {
        showDeleteModal(itemType, deleteFunction);
    };

    return (
        <div className="mt-8">
            {transactions && transactions.length > 0 ? (
                <div className="overflow-x-auto pb-2">
                    <table className="w-full min-w-[640px]">
                        <tbody className="space-y-3 mb-5">
                            {transactions.map((transaction, index) => (
                                <tr key={index + 1} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg mb-3">
                                    <td className="w-20 text-left text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="w-48 text-center text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                        {transaction.title}
                                    </td>
                                    <td className="w-32 text-center whitespace-nowrap">
                                        <span className={`text-sm font-medium ${transaction.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {transaction.type}
                                        </span>
                                    </td>
                                    <td className="w-32 text-center text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                        {transaction.category_name}
                                    </td>
                                    <td className="w-32 text-center text-sm text-blue-500 dark:text-blue-400 whitespace-nowrap">
                                        {transaction.account_name}
                                    </td>
                                    <td className="w-32 text-center text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                        {transaction.date}
                                    </td>
                                    <td className="w-32 text-center whitespace-nowrap">
                                        <span className={`text-sm font-medium ${transaction.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                            ₹{transaction.amount}
                                        </span>
                                    </td>
                                    {show_btn === true && (
                                        <td className="w-24 text-right flex items-center space-x-2 whitespace-nowrap">
                                            <button className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-150" title="Edit transaction">
                                                <i className="fas fa-pen-to-square w-5 h-5"></i>
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick('transaction', transaction.id, () => deleteTransaction(transaction.id))} 
                                                className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-150" 
                                                title="Delete transaction"
                                            >
                                                <i className="fas fa-trash-alt w-5 h-5"></i>
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">No transactions available</p>
                </div>
            )}
        </div>
    );
};

export default TransactionTable;
