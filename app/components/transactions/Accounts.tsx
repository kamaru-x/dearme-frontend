'use client'

import React, {useState} from 'react'
import { toast } from 'react-toastify'

interface Account{
    name: string,
    bank: string,

    credited: number,
    debited: number,
    balance: number

    credit_transfer: number,
    debit_transfer: number,
}

interface AccountProps {
    api : any,
}


const Accounts = ({api}: AccountProps) => {
    const [accounts, setAccounts] = useState<Account[]>([])

    const fetchAccounts = async () => {
        try {
            let url = api.endpoints.accountsOverview;    
            const response = await api.fetch(url)
            console.log(response)
            const result = await response.json()
            console.log(result)
            setAccounts(result.data || [])
            console.log(result.data)
        } catch (error) {
            console.log('Error fetching accounts:', error)
            setAccounts([])
            toast.error('Failed to fetch accounts')
        }
    }

    React.useEffect(() => {
        fetchAccounts()
    }, [api])

    return (
        <div className="mt-8">
            {accounts && accounts.length > 0 ? (
                <div className="overflow-x-auto pb-2">
                    <table className="w-full min-w-[640px]">
                        <tbody className="space-y-3 mb-5">
                            {accounts.map((account, index) => (
                                <tr key={index + 1} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg mb-3">
                                    <td className="w-20 text-left text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="w-48 text-center text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                        {account.name}
                                    </td>
                                    <td className="w-48 text-center text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                        {account.bank}
                                    </td>
                                    <td className="w-32 text-center whitespace-nowrap">
                                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                            ₹{account.credited}
                                        </span>
                                    </td>
                                    <td className="w-32 text-center whitespace-nowrap">
                                        <span className="text-sm font-medium text-red-600 dark:text-red-400">
                                            ₹{account.debited}
                                        </span>
                                    </td>
                                    <td className="w-32 text-center whitespace-nowrap">
                                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                            ₹{account.credit_transfer}
                                        </span>
                                    </td>
                                    <td className="w-32 text-center whitespace-nowrap">
                                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                            ₹{account.debit_transfer}
                                        </span>
                                    </td>
                                    <td className="w-32 text-center whitespace-nowrap">
                                        <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                                            ₹{account.balance}
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
    )
}

export default Accounts