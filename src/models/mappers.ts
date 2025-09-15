import type { TaskDto } from "@/api/types";
import type { Task } from "./Task.ts";

export function toTask(dto: TaskDto): Task {
    return {
        id: dto.id,
        title: dto.title,
        description: dto.description ?? null,
        priority: dto.priority,
        status: dto.status,
        dueDateIso: dto.dueDate ?? null,
        dueTimeIso: dto.dueTime ?? null,
        categoryIds: dto.categoryIds ?? [],
        labelIds: dto.labelIds ?? [],

        createdAtIso: dto.createdAt,
        updatedAtIso: dto.updatedAt
    }
}

export function fromTask(task: Task): Partial<TaskDto> {
    return {
        id: task.id ?? null, 
        title: task.title, 
        description: task.description ?? undefined,
        priority: task.priority,
        status: task.status, 
        dueDate: task.dueDateIso ?? null,
        dueTime: task.dueTimeIso ?? null,
        categoryIds: task.categoryIds,
        labelIds: task.labelIds,
    }
}