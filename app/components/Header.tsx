'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    const currentPage = pathname.split('/')[1] || 'dashboard';

    return (
        <nav className="bg-white dark:bg-gray-800 rounded-xl shadow-md my-5 mx-5">
            <div className="flex overflow-x-auto scrollbar-hide p-2 lg:flex-nowrap lg:overflow-hidden justify-between items-center">
                <div className="flex flex-1 overflow-x-auto scrollbar-hide">
                    <Link href="/dashboard/" className={`flex flex-1 items-center justify-center space-x-2 px-4 py-2 rounded-lg 
                        ${currentPage === 'dashboard' 
                            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 group focus:bg-blue-50 dark:focus:bg-blue-900/50 focus:text-blue-600 dark:focus:text-blue-400'}`}>
                        <i className="fas fa-home text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"></i>
                        <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Dashboard</span>
                    </Link>

                    <Link href="/accounts/" className={`flex flex-1 items-center justify-center space-x-2 px-4 py-2 rounded-lg 
                        ${currentPage === 'accounts' 
                            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 group focus:bg-blue-50 dark:focus:bg-blue-900/50 focus:text-blue-600 dark:focus:text-blue-400'}`}>
                        <i className="fas fa-credit-card text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"></i>
                        <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Accounts</span>
                    </Link>

                    <Link href="/todo" className={`flex flex-1 items-center justify-center space-x-2 px-4 py-2 rounded-lg 
                        ${currentPage === 'todo' 
                            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 group focus:bg-blue-50 dark:focus:bg-blue-900/50 focus:text-blue-600 dark:focus:text-blue-400'}`}>
                        <i className="fas fa-circle-check text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"></i>
                        <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Todo</span>
                    </Link>

                    <Link href="/journal" className={`flex flex-1 items-center justify-center space-x-2 px-4 py-2 rounded-lg 
                        ${currentPage === 'journal' 
                            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 group focus:bg-blue-50 dark:focus:bg-blue-900/50 focus:text-blue-600 dark:focus:text-blue-400'}`}>
                        <i className="fas fa-book text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"></i>
                        <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Journal</span>
                    </Link>

                    <Link href="/checklist" className={`flex flex-1 items-center justify-center space-x-2 px-4 py-2 rounded-lg 
                        ${currentPage === 'checklist' 
                            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 group focus:bg-blue-50 dark:focus:bg-blue-900/50 focus:text-blue-600 dark:focus:text-blue-400'}`}>
                        <i className="fas fa-list-check text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"></i>
                        <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Checklist</span>
                    </Link>

                    <Link href="/masters" className={`flex flex-1 items-center justify-center space-x-2 px-4 py-2 rounded-lg 
                        ${currentPage === 'masters' 
                            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 group focus:bg-blue-50 dark:focus:bg-blue-900/50 focus:text-blue-600 dark:focus:text-blue-400'}`}>
                        <i className="fas fa-bullseye text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"></i>
                        <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Masters</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
