'use client';

import Link from 'next/link';

const Header = ({ page }: { page: string }) => {

    return (
        <nav className="bg-white rounded-xl shadow-md my-5">
            <div className="flex overflow-x-auto scrollbar-hide p-2 lg:flex-nowrap lg:overflow-hidden">
                <Link href="/dashboard/" className={`flex flex-1 items-center justify-center space-x-2 px-4 py-2 rounded-lg 
                    ${page === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 group focus:bg-blue-50 focus:text-blue-600'}`}>
                    <i className="fas fa-home text-gray-500 group-hover:text-blue-600"></i>
                    <span className="text-sm text-gray-600 group-hover:text-blue-600">Dashboard</span>
                </Link>

                <Link href="/transactions/" className={`flex flex-1 items-center justify-center space-x-2 px-4 py-2 rounded-lg 
                    ${page === 'transactions' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 group focus:bg-blue-50 focus:text-blue-600'}`}>
                    <i className="fas fa-credit-card text-gray-500 group-hover:text-blue-600"></i>
                    <span className="text-sm text-gray-600 group-hover:text-blue-600">Transactions</span>
                </Link>

                <Link href="/todo" className={`flex flex-1 items-center justify-center space-x-2 px-4 py-2 rounded-lg 
                    ${page === 'todo' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 group focus:bg-blue-50 focus:text-blue-600'}`}>
                    <i className="fas fa-circle-check text-gray-500 group-hover:text-blue-600"></i>
                    <span className="text-sm text-gray-600 group-hover:text-blue-600">Todo</span>
                </Link>

                <Link href="/checklist/" className={`flex flex-1 items-center justify-center space-x-2 px-4 py-2 rounded-lg 
                    ${page === 'checklist' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 group focus:bg-blue-50 focus:text-blue-600'}`}>
                    <i className="fas fa-clipboard-list text-gray-500 group-hover:text-blue-600"></i>
                    <span className="text-sm text-gray-600 group-hover:text-blue-600">Checklist</span>
                </Link>

                <Link href="/journal/" className={`flex flex-1 items-center justify-center space-x-2 px-4 py-2 rounded-lg 
                    ${page === 'journals' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 group focus:bg-blue-50 focus:text-blue-600'}`}>
                    <i className="fas fa-book text-gray-500 group-hover:text-blue-600"></i>
                    <span className="text-sm text-gray-600 group-hover:text-blue-600">Journals</span>
                </Link>

                <Link href="/masters/" className={`flex flex-1 items-center justify-center space-x-2 px-4 py-2 rounded-lg 
                    ${page === 'masters' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 group focus:bg-blue-50 focus:text-blue-600'}`}>
                    <i className="fas fa-bullseye text-gray-500 group-hover:text-blue-600"></i>
                    <span className="text-sm text-gray-600 group-hover:text-blue-600">Masters</span>
                </Link>
            </div>
        </nav>
    );
};

export default Header;
