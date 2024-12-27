'use client'

import React, {useState} from 'react'
import { toast } from 'react-toastify'

interface Report{
    year: number,
    month: string,
    transactions: string,
    credit: number,
    debit: number,
    balance: number
}

interface ReportProps {
    api : any,
}

const Report = ({api}: ReportProps) => {
    const [reports, setReports] = useState<Report[]>([])

    const fetchReports = async () => {
        try {
            let url = api.endpoints.transactionReport;    
            const response = await api.fetch(url)
            const result = await response.json()
            setReports(result.data || [])
        } catch (error) {
            console.log('Error fetching reports:', error)
            setReports([])
            toast.error('Failed to fetch reports')
        }
    }

    React.useEffect(() => {
        fetchReports()
    }, [api])

    return (
        <div className="mt-8">
            {reports && reports.length > 0 ? (
                <div className="overflow-x-auto pb-2">
                    <table className="w-full min-w-[640px]">
                        <tbody className="space-y-3 mb-5">
                            {reports.map((report, index) => (
                                <tr key={index + 1} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg mb-3">
                                    <td className="w-20 text-left text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="w-48 text-center text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                        {report.year}
                                    </td>
                                    <td className="w-48 text-center text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                        {report.month}
                                    </td>
                                    <td className="w-48 text-center text-sm text-green-900 dark:text-green-500 whitespace-nowrap">
                                        {report.credit}
                                    </td>
                                    <td className="w-48 text-center text-sm text-red-900 dark:text-red-500 whitespace-nowrap">
                                        {report.debit}
                                    </td>
                                    <td className="w-48 text-center text-sm text-yellow-900 dark:text-yellow-500 whitespace-nowrap">
                                        {report.balance}
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

export default Report