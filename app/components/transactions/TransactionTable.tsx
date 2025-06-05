'use client'

import React from 'react'
import { useDeleteModal } from '@/app/context/DeleteModalContext'
import { toast } from 'react-toastify'

interface Transaction{
    id: number,
    date: string,
    title: string,
    type: string,
    type_value: string,
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
    onEdit: (transaction: Transaction) => void;
}

const TransactionTable = ({ show_btn, transactions, api, onUpdate, onEdit }: TransactionTableProps) => {
    const { showDeleteModal } = useDeleteModal()

    const deleteTransaction = async (id: number) => {
        try {
            const response = await api.fetch(api.endpoints.transactionDetail(id), {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete transaction');
            }

            const result = await response.json();
            toast.success(result.message || 'Transaction deleted successfully');
            onUpdate();
        } catch (error) {
            console.error('Error deleting transaction:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to delete transaction');
        }
    }

    const handleDeleteClick = (itemType: string, id: number, deleteFunction: () => void) => {
        showDeleteModal(itemType, deleteFunction);
    };

    const onEditClick = (transaction: Transaction) => {
        onEdit(transaction);
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
                                    <td className="w-64 md:w-48 text-center text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                        {transaction.title}
                                    </td>
                                    <td className="w-32 text-center whitespace-nowrap">
                                        <span className={`text-sm font-medium ${transaction.type === 'credit' ? 'text-green-600 dark:text-green-400' : transaction.type === 'credit_transfer' || transaction.type === 'debit_transfer' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {transaction.type_value}
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
                                        <span className={`text-sm font-medium ${transaction.type === 'credit' ? 'text-green-600 dark:text-green-400' : transaction.type === 'credit_transfer' || transaction.type === 'debit_transfer' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                                            ₹{transaction.amount}
                                        </span>
                                    </td>
                                    {show_btn === true && (
                                        <td className="w-24 text-right flex items-center space-x-2 whitespace-nowrap">
                                            <button
                                                onClick={() => onEditClick(transaction)}
                                                className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-150"
                                                title="Edit transaction"
                                            >
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
