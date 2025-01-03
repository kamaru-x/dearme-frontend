import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Category {
    id: number,
    type: string,
    type_value: string,
    name: string,
}

interface Props {
    api:any
    showDeleteModal: (itemType: string, onConfirm: () => void) => void;
}

const Categories = ({ api, showDeleteModal }: Props) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [categoryData, setCategoryData] = useState({type: '', name: ''})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setCategoryData({
            ...categoryData,
            [name]: value
        })
    }

    const fetchCategories = async () => {
        try {
            const response = await api.fetch(api.endpoints.listCategories);
            const result = await response.json();
            setCategories(result.data || []);
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

    const handleDeleteClick = (itemType: string, id: number, deleteFunction: () => void) => {
        showDeleteModal(itemType, deleteFunction);
    };

    React.useEffect(() => {
        fetchCategories();
    }, [api]);

    return (
        <>
            <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Create New Category</h3>
                <form onSubmit={createCategory} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select name="type" id="type" value={categoryData.type} onChange={handleChange} className="form-select dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                            <option value="" className="dark:bg-gray-700">Select Type</option>
                            <option value="credit" className="dark:bg-gray-700">Credit</option>
                            <option value="debit" className="dark:bg-gray-700">Debit</option>
                            <option value="credit_transfer" className="dark:bg-gray-700">Credit Transfer</option>
                            <option value="debit_transfer" className="dark:bg-gray-700">Debit Transfer</option>
                        </select>
                        <input type="text" id="name" name="name" value={categoryData.name} onChange={handleChange} placeholder="Category Name" className="form-input w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"/>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
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
                                <tr key={index} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg mb-3">
                                    <td className="min-w-24 text-center text-sm text-gray-900 dark:text-gray-200 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="min-w-48 text-center text-sm text-gray-900 dark:text-gray-200 whitespace-nowrap">
                                        <span className={`text-sm font-medium ${category.type === 'credit' ? 'text-green-600 dark:text-green-400' : category.type === 'credit_transfer' || category.type === 'debit_transfer' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {category.type_value}
                                        </span>
                                    </td>
                                    <td className="min-w-48 text-center text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                        {category.name}
                                    </td>
                                    <td className="min-w-24 text-right flex items-center space-x-2 whitespace-nowrap">
                                        <button 
                                            onClick={() => handleDeleteClick('category', category.id, () => deleteCategory(category.id))}
                                            className="p-1 text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition-colors duration-150"
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
                <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">No categories available</p>
                </div>
            )}
        </>
    )
}

export default Categories