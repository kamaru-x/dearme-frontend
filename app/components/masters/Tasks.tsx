import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Api } from '@/app/context/ApiContext'

interface Task {
    id: number;
    title: string;
    order: number;
}

interface ApiResponse {
    status: 'success' | 'error';
    message: string;
    data?: any;
}

interface Props {
    api: Api;
    showDeleteModal: (itemType: string, onConfirm: () => void) => void;
}

interface SortableTaskProps {
    id: number;
    index: number;
    task: Task;
    onDelete: (id: number) => Promise<void>;
    showDeleteModal: (itemType: string, onConfirm: () => void) => void;
}

const SortableTask = ({ task, index, onDelete, showDeleteModal }: SortableTaskProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg mb-3 cursor-move"
        >
            <div className="min-w-24 text-center text-sm text-gray-900 dark:text-gray-200 whitespace-nowrap">
                {index + 1}
            </div>
            <div className="min-w-48 text-center text-sm text-gray-900 dark:text-gray-200 whitespace-nowrap">
                {task.title}
            </div>
            <div className="min-w-24 text-right flex items-center space-x-2 whitespace-nowrap">
                <button 
                    onClick={() => showDeleteModal('task', () => onDelete(task.id))}
                    className="p-1 text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition-colors duration-150"
                    title="Delete task"
                >
                    <i className="fas fa-trash-alt w-5 h-5"></i>
                </button>
            </div>
        </div>
    );
};

const Tasks: React.FC<Props> = ({ api, showDeleteModal }) => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [taskData, setTaskData] = useState({title: ''})

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setTaskData({
            ...taskData,
            [name]: value
        })
    }

    const fetchTasks = async () => {
        try {
            const response = await api.fetch(api.endpoints.listTasks);
            const result = await response.json();
            setTasks(result.data || []);
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

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        
        if (over && active.id !== over.id) {
            setTasks((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                
                const newItems = arrayMove(items, oldIndex, newIndex);
                
                // Update backend
                const taskOrders = newItems.map((task, index) => ({
                    id: task.id,
                    order: index
                }));

                api.fetch(api.endpoints.updateTaskOrder, {
                    method: 'PUT',
                    body: JSON.stringify({ task_orders: taskOrders })
                }).then((response: Response) => response.json())
                .then((result: ApiResponse) => {
                    if (result.status === 'error') {
                        toast.error(result.message);
                        fetchTasks(); // Revert to original order if update fails
                    } else {
                        toast.success('Task order updated successfully');
                    }
                })
                .catch((error: Error) => {
                    console.log('Error updating task order:', error);
                    toast.error('Failed to update task order');
                    fetchTasks(); // Revert to original order if update fails
                });

                return newItems;
            });
        }
    };

    React.useEffect(() => {fetchTasks();}, [api]);

    return (
        <>
            <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Create New Task</h3>
                <form className="space-y-4" onSubmit={createTask}>
                    <div className="grid grid-cols-12 gap-4">
                        <input type="text" id="title" name="title" value={taskData.title} onChange={handleChange} placeholder="Task Title" className="form-input col-span-12 md:col-span-9 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"/>
                        <button type="submit" className="col-span-12 md:col-span-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
            <div className="overflow-x-auto">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={tasks.map((task) => task.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-3 mb-5">
                            {tasks.map((task, index) => (
                                <SortableTask
                                    key={task.id}
                                    id={task.id}
                                    index={index}
                                    task={task}
                                    onDelete={deleteTask}
                                    showDeleteModal={showDeleteModal}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </>
    )
}

export default Tasks