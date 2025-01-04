'use client'

import React from 'react'
import { useDeleteModal } from '@/app/context/DeleteModalContext'
import { toast } from 'react-toastify'

interface Transfer{
    id: number,
    date: string,
    from_account: number,
    from_account_name: string,
    to_account: number,
    to_account_name: string,
    amount: number
}

interface TransferTableProps {
    show_btn: boolean;
    transfers: Transfer[];
    onUpdate: () => void;
    api: any;
}

const SelfTransferTable = ({ show_btn, transfers, api, onUpdate}: TransferTableProps) => {
    const { showDeleteModal } = useDeleteModal()

    const deleteTransfer = async (id: number) => {
        try {
            const response = await api.fetch(api.endpoints.transferDetail(id), {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete transfer');
            }

            const result = await response.json();
            toast.success(result.message || 'Transfer deleted successfully');
            onUpdate();
        } catch (error) {
            console.error('Error deleting trnsfer:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to delete transfer');
        }
    }

    const handleDeleteClick = (itemType: string, id: number, deleteFunction: () => void) => {
        showDeleteModal(itemType, deleteFunction);
    };

    return (
        <div className="mt-8">
            {transfers && transfers.length > 0 ? (
                <div className="overflow-x-auto pb-2">
                    <table className="w-full min-w-[640px]">
                        <tbody className="space-y-3 mb-5">
                            {transfers.map((transfer, index) => (
                                <tr key={index + 1} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg mb-3">
                                    <td className="w-20 text-left text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="w-32 text-center whitespace-nowrap">
                                        <span className='text-sm font-medium'>
                                            {transfer.date}
                                        </span>
                                    </td>
                                    <td className="w-32 text-center whitespace-nowrap">
                                        <span className='text-sm font-medium text-yellow-600 dark:text-yellow-400'>
                                            {transfer.from_account_name}
                                        </span>
                                    </td>
                                    <td className="w-32 text-center whitespace-nowrap">
                                        <span className='text-sm font-medium text-blue-600 dark:text-blue-400'>
                                            {transfer.to_account_name}
                                        </span>
                                    </td>
                                    <td className="w-32 text-center whitespace-nowrap">
                                        <span className='text-sm font-medium text-green-600 dark:text-green-400'>
                                            ₹{transfer.amount}
                                        </span>
                                    </td>
                                    {show_btn === true && (
                                        <td className="w-24 text-right flex items-center space-x-2 whitespace-nowrap">
                                            <button
                                                onClick={() => handleDeleteClick('transfer', transfer.id, () => deleteTransfer(transfer.id))}
                                                className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-150"
                                                title="Delete transfer"
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
                    <p className="text-gray-600 dark:text-gray-400 text-lg">No transfers available</p>
                </div>
            )}
        </div>
    )
}

export default SelfTransferTable
