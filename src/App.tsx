import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from './api/client'
import type { TaskDto, Page } from './api/types'
import { Button } from './components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

import { TaskTile } from './components/TaskTile'
import { TaskBoard } from './components/TaskBoard'


// function useTasks(page: number = 0, size: number = 10, sort: string = 'createdAt,desc') {
//     return useQuery({
//         queryKey: ['tasks', page, size, sort],
//         queryFn: () => api<Page<TaskDto>>(`/tasks?page=${page}&size=${size}&sort=${sort}`)
//     })
// }

function useCreateTask() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: Partial<TaskDto>) => 
            api<TaskDto>('/tasks', {
                method: 'POST',
                body: JSON.stringify(payload)
            }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] })            
    })
}


function App() {
    
    // const { data, isLoading, error } = useTasks()
    const createTask = useCreateTask()
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-4">        
            <header className="flex items-center justify-between">                
                <h1 className='text-2xl font-semibold'>Kando Tasks</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Create Task</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>New Task</DialogTitle>
                        </DialogHeader>
                        <form className='space-y-4'
                            onSubmit={async (e) => {
                                e.preventDefault()
                                if(!title.trim()) return
                                await createTask.mutateAsync({
                                    title, 
                                    priority: "MEDIUM",
                                    status: "TODO"                                
                                })
                                setTitle('')
                                setOpen(false)
                            }}
                        >
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" disabled={createTask.isPending}>
                                    {createTask.isPending ? 'Saving...' : 'Save Task'}
                                </Button>
                            </div>
                            {createTask.error && (
                                <p className='text-red-600 text-sm'>{(createTask.error as Error).message}</p>
                            )}
                        </form>
                    </DialogContent>
                </Dialog>
            </header>

            <TaskBoard />
        </div>
    )
}

export default App
