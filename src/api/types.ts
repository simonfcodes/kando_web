export type TaskDto = {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "TODO" | "DONE";
  dueDate?: string | null;
  dueTime?: string | null;
  categoryIds?: string[] | null;
  labelIds?: string[] | null;
  createdAt: string;
  updatedAt: string;
}

export type Page<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export type Filter = Record<string, string | boolean | number | undefined>;