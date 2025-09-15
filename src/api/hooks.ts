import { useQuery, useMutation, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import { api } from "./client";
import { toTask } from "@/models/mappers";

import type { Filter, Page, TaskDto } from "./types";
import type { Task } from "@/models/Task";

export function useTasks(
    page: number = 0,
    size: number = 20, 
    sort: string = 'createdAt,desc',
    filters: Filter = {}
): UseQueryResult<Page<Task>> {
    const searchParams = new URLSearchParams({
        page: String(page),
        size: String(size),
        sort
    })
    for (const [key, val] of Object.entries(filters)) {
        if (val !== undefined) searchParams.set(key, String(val))
    }

    return useQuery({
        queryKey: ['tasks', page, size, sort, filters],
        queryFn: async () => {
            const paged = await api<Page<TaskDto>>(`/tasks?${searchParams.toString()}`)
            const content: Task[] = paged.content.map(toTask)
            return { ...paged, content }
        }
    })
}

export type PagedTasks = UseQueryResult<Page<Task>>;

export function useCreateTask() {
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