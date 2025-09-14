import { useQuery } from "@tanstack/react-query";
import { api } from "./client";
import type { Page, TaskDto } from "./types";

export function useTasks(
    page: number = 0,
    size: number = 20, 
    sort: stirng = 'createdAt,desc',
    filters: Record<string, any> = {}
) {
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
        queryFn: () => api<Page<TaskDto>>(`/tasks?${searchParams.toString()}`)
    })
}
