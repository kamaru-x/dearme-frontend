interface Transaction {
    id: number;
    title: string;
    date: string;
    type: 'income' | 'expense';
    category: string;
    amount: number;
}

interface TransactionTableProps {
    show_btn: boolean;
}

const TransactionTable = ({ show_btn }: TransactionTableProps) => {
    const transactions: Transaction[] = [
        {
            id: 1,
            title: "October month Half salary",
            date: '2024-02-20',
            type: 'income',
            category: 'Salary',
            amount: 50000
        },
        {
            id: 2,
            title: "October month Half salary",
            date: '2024-02-19',
            type: 'expense',
            category: 'Groceries',
            amount: 2500
        },
        {
            id: 3,
            title: "October month Half salary",
            date: '2024-02-18',
            type: 'expense',
            category: 'Transportation',
            amount: 1000
        },
    ];

    return (
        <div className="mt-8">
            <div className="overflow-x-auto pb-2">
                <table className="w-full min-w-[640px]">
                    <tbody className="space-y-3 mb-5">
                        {transactions.map((transaction) => (
                            <tr 
                                key={transaction.id} 
                                className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg mb-3"
                            >
                                <td className="min-w-20 text-left text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                    #{transaction.id}
                                </td>
                                <td className="min-w-32 text-left text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                                    {transaction.title}
                                </td>
                                <td className="min-w-48 text-center whitespace-nowrap">
                                    <span className={`text-sm font-medium ${
                                        transaction.type === 'income' 
                                            ? 'text-green-600 dark:text-green-400' 
                                            : 'text-red-600 dark:text-red-400'
                                    }`}>
                                        {transaction.type}
                                    </span>
                                </td>
                                <td className="min-w-32 text-center text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                    {transaction.category}
                                </td>
                                <td className="min-w-32 text-center text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                    {transaction.date}
                                </td>
                                <td className="min-w-32 text-center whitespace-nowrap">
                                    <span className={`text-sm font-medium ${
                                        transaction.type === 'income' 
                                            ? 'text-green-600 dark:text-green-400' 
                                            : 'text-red-600 dark:text-red-400'
                                    }`}>
                                        ${Math.abs(transaction.amount).toLocaleString()}
                                    </span>
                                </td>
                                {show_btn === true && (
                                    <td className="min-w-24 text-right flex items-center space-x-2 whitespace-nowrap">
                                        <button 
                                            className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-150" 
                                            title="Edit transaction"
                                        >
                                            <i className="fas fa-pen-to-square w-5 h-5"></i>
                                        </button>
                                        <button 
                                            className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-150" 
                                            title="Delete transaction"
                                        >
                                            <i className="fas fa-trash-alt w-5 h-5"></i>
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionTable;
