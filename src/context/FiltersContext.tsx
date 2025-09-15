import { createContext, useContext, useState,  } from "react"
import type { ReactNode } from "react"
import type { FilterState, FiltersContextValue } from "./types"

const FiltersContext = createContext<FiltersContextValue | undefined>(undefined)

export function FiltersProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<FilterState>({
        status: undefined,
        priority: undefined,
        overdue: false,
        sort: 'createdAt, desc'
    })

    const setFilters = (patch: Partial<FilterState>) => {
        setState((prev) => ({...prev, ...patch}))
    }

    const value: FiltersContextValue = {...state, setFilters}
    return (
        <FiltersContext.Provider value={value}>
            {children}
        </FiltersContext.Provider>
    )
}

export function useFilters() {
    const ctx = useContext(FiltersContext)
    if (!ctx) throw new Error('useFilters must be used within a FiltersProvider')
    return ctx
}