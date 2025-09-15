import { useTasks } from "@/api/hooks";
import { TaskTile } from "./TaskTile";
import type { PagedTasks } from "@/api/hooks";

export function TaskBoard() {
    const todo = useTasks(0, 50, 'createdAt,asc', { status: 'TODO', overdue: false})
    const overdue = useTasks(0, 50, 'dueDate,asc', { status: 'TODO', overdue: true})
    const done = useTasks(0, 50, 'updatedAt,desc', { status: 'DONE'})

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KanbanColumn title="To Do" query={todo} />
            <KanbanColumn title="Overdue" query={overdue} />
            <KanbanColumn title="Done" query={done} />
        </section>
    )
}

function KanbanColumn({ title, query}: { title: string, query: PagedTasks}) {
    const { data, isLoading, error } = query
    return (
        <section className="border rounded p-3 bg-gray-50">
            <h2 className="font-semibold mb-2">{title}</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-600">Error loading tasks</p>}
            <ul className="space-y-2">
                {data?.content?.map((task) => (
                    <TaskTile key={task.id} task={task} />
                ))}
            </ul>
        </section>
    )
}