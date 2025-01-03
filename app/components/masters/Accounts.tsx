import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Account {
    id: number;
    date: string;
    type: string;
    type_value: string;
    name: string;
    bank: string;
    number: string;
}

interface Props {
    api: any;
    showDeleteModal: (itemType: string, onConfirm: () => void) => void;
}

const Accounts = ({ api, showDeleteModal }: Props) => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [accountData, setAccountData] = useState({type: '', name: '', bank: '', number: ''});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setAccountData({
            ...accountData,
            [name]: value
        })
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

    const createAccount = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.fetch(api.endpoints.listAccounts, {method: 'POST', body: JSON.stringify(accountData)})
            const result = await response.json()

            if (response.ok) {
                setAccountData({type: '', name: '', bank: '', number: ''})
                fetchAccounts()
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.log('Error creating account:', error)
            toast.error('Failed to create account')
        }
    }

    const deleteAccount = async (id: number) => {
        try {
            const response = await api.fetch(api.endpoints.accountDetail(id), {method: 'DELETE'})
            const result = await response.json()

            if (response.ok) {
                fetchAccounts()
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.log('Error deleting account:', error)
            toast.error('Failed to delete account')
        }
    }

    const handleDeleteClick = (itemType: string, id: number, deleteFunction: () => void) => {
        showDeleteModal(itemType, deleteFunction);
    };

    React.useEffect(() => {
        fetchAccounts();
    }, [api]);

    return (
        <>
            <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Create New Account</h3>
                <form onSubmit={createAccount} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input type="text" id="name" name="name" value={accountData.name} onChange={handleChange} placeholder="Account Name" className="form-input w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"/>
                        <input type="text" id="bank" name="bank" value={accountData.bank} onChange={handleChange} placeholder="Bank Name" className="form-input w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"/>
                        <select name="type" id="type" value={accountData.type} onChange={handleChange} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                            <option value="" className="dark:bg-gray-700">Select Type</option>
                            <option value="savings" className="dark:bg-gray-700">Savings</option>
                            <option value="slary_account" className="dark:bg-gray-700">Salary Account</option>
                            <option value="primary_account" className="dark:bg-gray-700">Primary Account</option>
                            <option value="secondary_account" className="dark:bg-gray-700">Secondary Account</option>
                        </select>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>

            {accounts && accounts.length > 0 ? (

                <div className="overflow-x-auto pb-2">
                    <table className="w-full min-w-[640px]">
                        <tbody className="space-y-3 mb-5">
                            {accounts.map((account: Account, index: number) => (
                                <tr key={index} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg mb-3">
                                    <td className="min-w-24 text-center text-sm text-gray-900 dark:text-gray-200 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="min-w-48 text-center text-sm text-gray-900 dark:text-gray-200 whitespace-nowrap">
                                        {account.name}
                                    </td>
                                    <td className="min-w-48 text-center text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                        {account.bank}
                                    </td>
                                    <td className="min-w-48 text-center text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                        {account.type_value}
                                    </td>
                                    <td className="min-w-48 text-center text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                        {account.number}
                                    </td>
                                    <td className="min-w-24 text-right flex items-center space-x-2 whitespace-nowrap">
                                        <button 
                                            onClick={() => handleDeleteClick('account', account.id, () => deleteAccount(account.id))}
                                            className="p-1 text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition-colors duration-150"
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

                <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">No bank accounts available</p>
                </div>

            )}
        </>
    )
}

export default Accounts