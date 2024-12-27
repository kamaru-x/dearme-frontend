'use client'

import React, {useState} from 'react'
import { toast } from 'react-toastify'

interface Overview{
    category: string,
    type: 'credit' | 'debit',
    transactions: string,
    amount: number
}

interface OverviewProps {
    api : any,
}

const Overview = ({api} : OverviewProps) => {

    const [overviews, setOverviews] = useState<Overview[]>([])

    const fetchOverviews = async () => {
        try {
            let url = api.endpoints.transactionOverview;    
            const response = await api.fetch(url)
            const result = await response.json()
            setOverviews(result.data || [])
        } catch (error) {
            console.log('Error fetching overviews:', error)
            setOverviews([])
            toast.error('Failed to fetch overviews')
        }
    }

    React.useEffect(() => {
        fetchOverviews()
    }, [api])

    return (
        <div className="mt-8">
            {overviews && overviews.length > 0 ? (
                <div className="overflow-x-auto pb-2">
                    <table className="w-full min-w-[640px]">
                        <tbody className="space-y-3 mb-5">
                            {overviews.map((overview, index) => (
                                <tr key={index + 1} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg mb-3">
                                    <td className="w-20 text-left text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="w-48 text-center text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                        {overview.category}
                                    </td>
                                    <td className="w-48 text-center text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                        {overview.transactions}
                                    </td>
                                    <td className="w-32 text-center whitespace-nowrap">
                                        <span className={`text-sm font-medium ${overview.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {overview.type}
                                        </span>
                                    </td>
                                    <td className="w-32 text-center whitespace-nowrap">
                                        <span className={`text-sm font-medium ${overview.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                            ₹{overview.amount}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">No transactions found</p>
                </div>
            )}
        </div>
    );
}

export default Overview