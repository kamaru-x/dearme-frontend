'use client'

import React, { useState, useEffect, FormEvent } from 'react'
import Header from '@/app/components/Header'
import { useApi } from '@/app/context/ApiContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDeleteModal } from '@/app/context/DeleteModalContext'

interface Account {
    id: number;
    date: string;
    name: string;
    bank: string;
    number: string;
}

interface Category {
    id: number;
    type: string;
    name: string;
}

interface Task {
    id: number;
    title: string;
}

const Page = () => {
    const api = useApi()
    const { showDeleteModal } = useDeleteModal()
    const [accounts, setAccounts] = useState<Account[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [tasks, setTasks] = useState<Task[]>([])

    const [accountData, setAccountData] = useState({name: '', bank: '', number: ''})
    const [categoryData, setCategoryData] = useState({type: '', name: ''})
    const [taskData, setTaskData] = useState({title: ''})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        
        if (activeTab === 'ACCOUNTS') {
            setAccountData({
                ...accountData,
                [name]: value
            })
        } else if (activeTab === 'CATEGORIES') {
            setCategoryData({
                ...categoryData,
                [name]: value
            })
        } else if (activeTab === 'CHECKLIST') {
            setTaskData({
                ...taskData,
                [name]: value
            })
        }
    }

    const handleDeleteClick = (itemType: string, id: number, deleteFunction: () => void) => {
        showDeleteModal(itemType, deleteFunction);
    };

    const fetchAccounts = async () => {
        try {
            const response = await api.fetch(api.endpoints.listAccounts);
            const result = await response.json();
            setAccounts(result.data || []);
            // toast.success(result.message)
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
                setAccountData({name: '', bank: '', number: ''})
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

    const fetchCategories = async () => {
        try {
            const response = await api.fetch(api.endpoints.listCategories);
            const result = await response.json();
            setCategories(result.data || []);
            // toast.success(result.message)
        } catch (error) {
            console.log('Error fetching categories:', error)
            setCategories([])
            toast.error('Failed to fetch categories')
        }
    }

    const createCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.fetch(api.endpoints.listCategories, {method: 'POST', body: JSON.stringify(categoryData)})
            const result = await response.json()

            if (response.ok) {
                setCategoryData({type: '', name: ''})
                fetchCategories();
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.log('Error creating category:', error)
            toast.error('Failed to create category')
        }
    }

    const deleteCategory = async (id: number) => {
        try {
            const response = await api.fetch(api.endpoints.categoryDetail(id), {method: 'DELETE'})
            const result = await response.json()

            if (response.ok) {
                fetchCategories()
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.log('Error deleting category:', error)
            toast.error('Failed to delete category')
        }
    }

    const fetchTasks = async () => {
        try {
            const response = await api.fetch(api.endpoints.listTasks);
            const result = await response.json();
            setTasks(result.data || []);
            // toast.success(result.message)
        } catch (error) {
            console.log('Error fetching tasks:', error)
            setTasks([])
            toast.error('Failed to fetch tasks')
        }
    }

    const createTask = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.fetch(api.endpoints.listTasks, {method: 'POST', body: JSON.stringify(taskData)})
            const result = await response.json()

            if (response.ok) {
                setTaskData({title: ''})
                fetchTasks();
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.log('Error creating task:', error)
            toast.error('Failed to create task')
        }
    }

    const deleteTask = async (id: number) => {
        try {
            const response = await api.fetch(api.endpoints.taskDetail(id), {method: 'DELETE'})
            const result = await response.json()

            if (response.ok) {
                fetchTasks()
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.log('Error deleting task:', error)
            toast.error('Failed to delete task')
        }
    }

    React.useEffect(() => {
        fetchAccounts();
        fetchCategories();
        fetchTasks();
    }, [api]);

    const [activeTab, setActiveTab] = useState('ACCOUNTS');

    return (
        <div className="min-h-screen mx-5">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full">
                <Header page="masters"/>

                {/* Tabs */}
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-8">
                    <button onClick={() => setActiveTab('ACCOUNTS')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200
                        ${ activeTab === 'ACCOUNTS' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white': 'text-gray-600 bg-white'}`}> BANK ACCOUNTS
                    </button>

                    <button onClick={() => setActiveTab('CATEGORIES')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200
                        ${ activeTab === 'CATEGORIES' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' : 'text-gray-600 bg-white'}`}>TRANSACTION CATEGORIES
                    </button>

                    <button onClick={() => setActiveTab('CHECKLIST')} className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200
                        ${ activeTab === 'CHECKLIST' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' : 'text-gray-600 bg-white' }`}>CHECKLIST ITEMS
                    </button>
                </div>

                {/* Content */}
                <div className="mt-8">
                    {activeTab === 'ACCOUNTS' ? (
                        <>
                            {/* Account Creation Form */}
                            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Account</h3>
                                <form onSubmit={createAccount} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <input type="text" id="name" name="name" value={accountData.name} onChange={handleChange} placeholder="Account Name" className="form-input w-full"/>
                                        <input type="text" id="bank" name="bank" value={accountData.bank} onChange={handleChange} placeholder="Bank Name" className="form-input w-full"/>
                                        <input type="text" id="number" name="number" value={accountData.number} onChange={handleChange} placeholder="Account Number" className="form-input w-full"/>
                                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            Create Account
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Accounts Table */}
                            {accounts && accounts.length > 0 ? (

                                <div className="overflow-x-auto pb-2">
                                    <table className="w-full min-w-[640px]">
                                        <tbody className="space-y-3 mb-5">
                                            {accounts.map((account: Account, index: number) => (
                                                <tr key={index} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg mb-3">
                                                    <td className="min-w-24 text-center text-sm text-gray-900 whitespace-nowrap">
                                                        {index + 1}
                                                    </td>
                                                    <td className="min-w-48 text-center text-sm text-gray-900 whitespace-nowrap">
                                                        {account.name}
                                                    </td>
                                                    <td className="min-w-48 text-center text-sm text-gray-600 whitespace-nowrap">
                                                        {account.bank}
                                                    </td>
                                                    <td className="min-w-48 text-center text-sm text-gray-600 whitespace-nowrap">
                                                        {account.number}
                                                    </td>
                                                    <td className="min-w-24 text-right flex items-center space-x-2 whitespace-nowrap">
                                                        <button 
                                                            onClick={() => handleDeleteClick('account', account.id, () => deleteAccount(account.id))}
                                                            className="p-1 text-red-600 hover:text-red-800 transition-colors duration-150"
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

                                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
                                    <p className="text-gray-600 text-lg">No bank accounts available</p>
                                </div>

                            )}
                        </>
                    ) : activeTab === 'CATEGORIES' ? (

                        <>
                            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Category</h3>
                                <form onSubmit={createCategory} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <select name="type" id="type" value={categoryData.type} onChange={handleChange} className="form-select">
                                            <option value="">Select Type</option>
                                            <option value="credit">Credit</option>
                                            <option value="debit">Debit</option>
                                        </select>
                                        <input type="text" id="name" name="name" value={categoryData.name} onChange={handleChange} placeholder="Category Name" className="form-input w-full"/>
                                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            Create Category
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {categories && categories.length > 0 ? (
                                <div className="overflow-x-auto pb-2">
                                    <table className="w-full min-w-[640px]">
                                        <tbody className="space-y-3 mb-5">
                                            {categories.map((category: Category, index: number) => (
                                                <tr key={index} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg mb-3">
                                                    <td className="min-w-24 text-center text-sm text-gray-900 whitespace-nowrap">
                                                        {index + 1}
                                                    </td>
                                                    <td className="min-w-48 text-center text-sm text-gray-900 whitespace-nowrap">
                                                        {category.type}
                                                    </td>
                                                    <td className="min-w-48 text-center text-sm text-gray-600 whitespace-nowrap">
                                                        {category.name}
                                                    </td>
                                                    <td className="min-w-24 text-right flex items-center space-x-2 whitespace-nowrap">
                                                        <button 
                                                            onClick={() => handleDeleteClick('category', category.id, () => deleteCategory(category.id))}
                                                            className="p-1 text-red-600 hover:text-red-800 transition-colors duration-150"
                                                            title="Delete category"
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
                                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
                                    <p className="text-gray-600 text-lg">No categories available</p>
                                </div>
                            )}
                        </>

                    ) : activeTab === 'CHECKLIST' ? (

                        <>
                            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Task</h3>
                                <form className="space-y-4" onSubmit={createTask}>
                                    <div className="grid grid-cols-12 gap-4">
                                        <input type="text" id="title" name="title" value={taskData.title} onChange={handleChange} placeholder="Task Title" className="form-input col-span-12 md:col-span-9 w-full"/>
                                        <button type="submit" className="col-span-12 md:col-span-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            Create Task
                                        </button>
                                    </div>
                                </form>
                            </div>

                            { tasks && tasks.length > 0 ? (
                                <div className="overflow-x-auto pb-2">
                                    <table className="w-full min-w-[640px]">
                                        <tbody className="space-y-3 mb-5">
                                            {tasks.map((task: Task, index: number) => (
                                                <tr key={index} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg mb-3">
                                                    <td className="min-w-24 text-center text-sm text-gray-900 whitespace-nowrap">
                                                        {index + 1}
                                                    </td>
                                                    <td className="min-w-48 text-center text-sm text-gray-900 whitespace-nowrap">
                                                        {task.title}
                                                    </td>
                                                    <td className="min-w-24 text-right flex items-center space-x-2 whitespace-nowrap">
                                                        <button 
                                                            onClick={() => handleDeleteClick('task', task.id, () => deleteTask(task.id))}
                                                            className="p-1 text-red-600 hover:text-red-800 transition-colors duration-150"
                                                            title="Delete task"
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
                                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
                                    <p className="text-gray-600 text-lg">No checklist available</p>
                                </div>
                            )}
                        </>

                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Page