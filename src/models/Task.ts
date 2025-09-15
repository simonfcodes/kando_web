export type Task = {
    id: string
    title: string
    description?: string

    priority: "HIGH" | "MEDIUM" | "LOW"
    status: "TODO" | "DONE"

    dueDateIso?: string | null // YYYY-MM-DD
    dueTimeIso?: string | null // HH:mm:ss

    categoryIds?: string[]
    labelIds?: string[]

    isOverdue?: boolean

    createdAtIso?: string
    updatedAtIso?: string
}