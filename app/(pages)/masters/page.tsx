'use client'

import React, { useState } from 'react'
import Header from '@/app/components/Header'

const page = () => {
    const [activeTab, setActiveTab] = useState('CHECKLIST');
    const [newChecklistItem, setNewChecklistItem] = useState('');
    const [newCategory, setNewCategory] = useState({
        name: '',
        type: 'EXPENSE' // or 'INCOME'
    });

    const [checklistItems, setChecklistItems] = useState([
        { id: 1, title: 'Morning Exercise', active: true },
        { id: 2, title: 'Read a Book', active: true },
        { id: 3, title: 'Meditation', active: true }
    ]);

    const [categories, setCategories] = useState([
        { id: 1, name: 'Groceries', type: 'EXPENSE' },
        { id: 2, name: 'Salary', type: 'INCOME' },
        { id: 3, name: 'Entertainment', type: 'EXPENSE' },
        { id: 4, name: 'Freelance', type: 'INCOME' }
    ]);

    const handleAddChecklistItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newChecklistItem.trim()) {
            setChecklistItems([
                ...checklistItems,
                {
                    id: checklistItems.length + 1,
                    title: newChecklistItem.trim(),
                    active: true
                }
            ]);
            setNewChecklistItem('');
        }
    };

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategory.name.trim()) {
            setCategories([
                ...categories,
                {
                    id: categories.length + 1,
                    name: newCategory.name.trim(),
                    type: newCategory.type
                }
            ]);
            setNewCategory({ name: '', type: 'EXPENSE' });
        }
    };

    const deleteChecklistItem = (id: number) => {
        setChecklistItems(checklistItems.filter(item => item.id !== id));
    };

    const deleteCategory = (id: number) => {
        setCategories(categories.filter(category => category.id !== id));
    };

    return (
        <div className="min-h-screen mx-5">
            <div className="w-full">
                <Header page="masters"/>

                {/* Tabs */}
                <div className="flex space-x-4 mt-8">
                    <button
                        onClick={() => setActiveTab('CHECKLIST')}
                        className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200 ${
                            activeTab === 'CHECKLIST'
                            ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
                            : 'text-gray-600 bg-white'
                        }`}
                    >
                        CHECKLIST ITEMS
                    </button>
                    <button
                        onClick={() => setActiveTab('CATEGORIES')}
                        className={`tab-button w-full py-2 rounded-lg shadow-md focus:outline-none transition-colors duration-200 ${
                            activeTab === 'CATEGORIES'
                            ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
                            : 'text-gray-600 bg-white'
                        }`}
                    >
                        TRANSACTION CATEGORIES
                    </button>
                </div>

                {/* Content */}
                <div className="mt-8">
                    {activeTab === 'CHECKLIST' ? (
                        <div>
                            {/* Add Checklist Item Form */}
                            <form onSubmit={handleAddChecklistItem} className="mb-6">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={newChecklistItem}
                                        onChange={(e) => setNewChecklistItem(e.target.value)}
                                        placeholder="Enter new checklist item..."
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        Add Item
                                    </button>
                                </div>
                            </form>

                            {/* Checklist Items Table */}
                            <div className="overflow-x-auto pb-2">
                                <table className="w-full min-w-[640px]">
                                    <tbody className="space-y-3 mb-5">
                                        {checklistItems.map((item) => (
                                            <tr key={item.id} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg mb-3">
                                                <td className="min-w-20 text-left text-sm text-gray-600 whitespace-nowrap">
                                                    #{item.id}
                                                </td>
                                                <td className="flex-1 text-left text-sm text-gray-900 whitespace-nowrap">
                                                    {item.title}
                                                </td>
                                                <td className="min-w-24 text-right flex items-center space-x-2 whitespace-nowrap">
                                                    <button 
                                                        onClick={() => deleteChecklistItem(item.id)}
                                                        className="p-1 text-red-600 hover:text-red-800 transition-colors duration-150" 
                                                        title="Delete item"
                                                    >
                                                        <i className="fas fa-trash-alt w-5 h-5"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {/* Add Category Form */}
                            <form onSubmit={handleAddCategory} className="mb-6">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                        placeholder="Enter category name..."
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                    <select
                                        value={newCategory.type}
                                        onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value })}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    >
                                        <option value="EXPENSE">Expense</option>
                                        <option value="INCOME">Income</option>
                                    </select>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        Add Category
                                    </button>
                                </div>
                            </form>

                            {/* Categories Table */}
                            <div className="overflow-x-auto pb-2">
                                <table className="w-full min-w-[640px]">
                                    <tbody className="space-y-3 mb-5">
                                        {categories.map((category) => (
                                            <tr key={category.id} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-lg mb-3">
                                                <td className="min-w-20 text-left text-sm text-gray-600 whitespace-nowrap">
                                                    #{category.id}
                                                </td>
                                                <td className="flex-1 text-left text-sm text-gray-900 whitespace-nowrap">
                                                    {category.name}
                                                </td>
                                                <td className="min-w-48 text-center whitespace-nowrap">
                                                    <span className={`text-sm font-medium ${
                                                        category.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                        {category.type}
                                                    </span>
                                                </td>
                                                <td className="min-w-24 text-right flex items-center space-x-2 whitespace-nowrap">
                                                    <button 
                                                        onClick={() => deleteCategory(category.id)}
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default page