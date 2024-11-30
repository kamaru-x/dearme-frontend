'use client'

import React from 'react'

interface CreateTransactionProps {
    setCreate: (value: boolean) => void;
}

const CreateTransaction = ({ setCreate }: CreateTransactionProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCreate(false);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <form className="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input type="text" id="title" name="title" className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400" placeholder="Enter transaction title"/>
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                        <select id="type" name="type" className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                            <option value="income" className="dark:bg-gray-700">Income</option>
                            <option value="expense" className="dark:bg-gray-700">Expense</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <select id="category" name="category" className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                            <option value="salary" className="dark:bg-gray-700">Salary</option>
                            <option value="groceries" className="dark:bg-gray-700">Groceries</option>
                            <option value="transportation" className="dark:bg-gray-700">Transportation</option>
                            <option value="entertainment" className="dark:bg-gray-700">Entertainment</option>
                            <option value="other" className="dark:bg-gray-700">Other</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                        <input type="number" id="amount" name="amount" className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400" placeholder="Enter amount"/>
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                        <input type="date" id="date" name="date" className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"/>
                    </div>
                </div>

                <div className="flex justify-center md:justify-end space-x-3 mt-5">
                    <button type="button" className="btn-secondary dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-600" onClick={() => setCreate(false)}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary dark:bg-blue-600 dark:hover:bg-blue-700">
                        Create Transaction
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTransaction
