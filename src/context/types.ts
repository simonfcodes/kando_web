export type FilterState = {
    status?: string;
    priority?: string;
    overdue: boolean;
    sort: string;
}

export type FiltersContextValue = FilterState & {
    setFilters: (patch: Partial<FilterState>) => void;
}