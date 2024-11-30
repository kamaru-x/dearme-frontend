'use client'

import React, { useState } from 'react'
import Header from '@/app/components/Header'
import OverviewCard from '@/app/components/OverviewCard'
import TodoTable from '@/app/components/TodoTable'
import CreateTodo from '@/app/components/CreateTodo'

const page = () => {
    const [create, setCreate] = useState(false)

    return (
        <div className="min-h-screen mx-5">
            <div className="w-full">
                <Header page="todo"/>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <OverviewCard color="bg-gradient-to-r from-red-400 to-red-500" icon="fas fa-circle-check" title="High Priority" value="10"/>
                    <OverviewCard color="bg-gradient-to-r from-yellow-400 to-yellow-500" icon="fas fa-circle-check" title="Normal Priority" value="10"/>
                    <OverviewCard color="bg-gradient-to-r from-blue-400 to-blue-500" icon="fas fa-circle-check" title="Low Priority" value="10"/>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{create ? 'Create Todo' : 'Thinks to do'}</h2>
                        {!create && (
                            <button className="btn-primary" onClick={() => setCreate(true)}>
                                Create Todo
                            </button>
                        )}
                    </div>

                    {create ? <CreateTodo setCreate={setCreate} /> : <TodoTable/>}
                </div>
            </div>
        </div>
    )
}

export default page