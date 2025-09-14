import { Button} from './ui/button'
import type { TaskDto } from '@/api/types'
import { api } from '@/api/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function TaskTile( { task }: { task: TaskDto }) {
    const qc = useQueryClient();

    const markDone = useMutation({
        mutationFn: async () => {
            await api<void>(`/tasks/${task.id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status: 'DONE' })
            })
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['tasks'] })
        }
    })

    return (
        <li key={task.id} className="border rounded p-3">
            <header className="font-medium">{task.title}</header>
            <aside className="text-sm text-gray-600">{task.priority} • {task.status}</aside>
            {task.dueDate && <time className="text-sm">Due: {task.dueDate}{task.dueTime ? ` ${task.dueTime}` : ''}</time>}
            <footer>
                {task.status !== 'DONE' && (
                    <Button size="sm" variant="outline" onClick={() => markDone.mutate()} disabled={markDone.isPending}>
                        {markDone.isPending ? '...' : 'Mark Done'}
                    </Button>
                )}
            </footer>
        </li>
    )
}