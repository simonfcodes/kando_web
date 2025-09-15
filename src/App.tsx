import { useState } from 'react'

import { Button } from './components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

import { useCreateTask } from './api/hooks'
import { TaskBoard } from './components/TaskBoard'
import { SidebarFilters } from './components/SidebarFilters';
import { FiltersProvider } from './context/FiltersContext';


function CreateTaskDialog() {
    const createTask = useCreateTask()
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')

    return (
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
    )
}


function App() {

    return (
        <FiltersProvider>
            <div className="max-w-6xl mx-auto p-6">
                {/* Two-column grid: 16rem sidebar + remaining content */}
                <div className="grid grid-cols-[16rem_1fr] gap-6">
                    {/* Header occupies only the right column, first row */}
                    <header className="col-start-2 row-start-1 mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">Kando Tasks</h1>
                        <CreateTaskDialog />
                    </header>

                    {/* Sidebar starts on the next row, left column → lines up with board top */}
                    <aside className="col-start-1 row-start-2">
                        <SidebarFilters /> 
                    </aside>

                    {/* Kanban board: next row, right column */}
                    <main className="col-start-2 row-start-2">
                        <TaskBoard />
                    </main>
                </div>
            </div>
        </FiltersProvider>
    )
}

export default App
