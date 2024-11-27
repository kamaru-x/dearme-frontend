'use client'

import React from 'react'

interface CreateTodoProps {
    setCreate: (value: boolean) => void;
}

const CreateTodo = ({ setCreate }: CreateTodoProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCreate(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <form className="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="title" name="title" className="form-input" placeholder="Enter transaction title"/>
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                        <select id="type" name="type" className="form-select">
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select id="category" name="category" className="form-select">
                            <option value="salary">Salary</option>
                            <option value="groceries">Groceries</option>
                            <option value="transportation">Transportation</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                        <input type="number" id="amount" name="amount" className="form-input" placeholder="Enter amount"/>
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" id="date" name="date" className="form-input"/>
                    </div>
                </div>

                <div className="flex justify-center md:justify-end space-x-3 mt-5">
                    <button type="button" className="btn-secondary" onClick={() => setCreate(false)}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                        Create Todo
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTodo