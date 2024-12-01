'use client'

import React from 'react'
import { useApi } from '@/app/context/ApiContext'

interface TransactionFiltersProps {
    onFilterChange: (filters: {
        fromDate: string;
        toDate: string;
        category: string;
    }) => void;
}

interface Category {
    id: number;
    type: string;
    name: string;
}

const TransactionFilters = ({ onFilterChange }: TransactionFiltersProps) => {
    const api = useApi()
    const [categories, setCategories] = React.useState<Category[]>([])
    const [filters, setFilters] = React.useState<{fromDate: string, toDate: string, category: string}>({
        fromDate: '',
        toDate: '',
        category: ''
    })

    const fetchCategories = async () => {
        try {
            const response = await api.fetch(api.endpoints.listCategories);
            const result = await response.json();
            setCategories(result.data || []);
        } catch (error) {
            console.log('Error fetching categories:', error)
            setCategories([])
        }
    }

    React.useEffect(() => {
        fetchCategories()
    }, [api])

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        const newFilters = {
            ...filters,
            [name]: value
        }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
                <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">From Date</label>
                <input 
                    type="date" 
                    id="fromDate" 
                    name="fromDate"
                    value={filters.fromDate}
                    onChange={handleFilterChange}
                    className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 w-full"
                />
            </div>

            <div>
                <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">To Date</label>
                <input 
                    type="date" 
                    id="toDate" 
                    name="toDate"
                    value={filters.toDate}
                    onChange={handleFilterChange}
                    className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 w-full"
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <select 
                    id="category" 
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 w-full"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id} className="dark:bg-gray-700">
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default TransactionFilters
