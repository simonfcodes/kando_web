import { useFilters } from '../context/FiltersContext'
import { FilterField } from './FilterField'

export function SidebarFilters() {
    const { status, priority, overdue, sort, setFilters } = useFilters()

    return (        
        <div className='sticky top-0 space-y-5 rounded-lg border p-4 bg-white'>
            <FilterField
                type='select'
                label='Status'
                value={status}
                placeholder='All'
                options={[
                    { value: 'TODO', label: 'TODO' },
                    { value: 'DONE', label: 'DONE'}
                ]}
                onChange={(v) => setFilters({ status: v })}
            />

            <FilterField
                type='select'
                label='Priority'
                value={priority}
                placeholder='All'
                options={[
                    { value: 'HIGH', label: 'HIGH' },
                    { value: 'MEDIUM', label: 'MEDIUM'},
                    { value: 'LOW', label: 'LOW'}
                ]}
                onChange={(v) => setFilters({ priority: v })}
            />

            <FilterField
                type='switch'
                label='Overdue'
                checked={overdue}
                onChange={(v) => setFilters({ overdue: v})}
            />

            <FilterField
                type='select'
                label='Sort'
                value={sort}
                options={[
                    { value: 'createdAt,desc', label: 'Created Desc' },
                    { value: 'createdAt,asc', label: 'Created Asc' },
                    { value: 'updatedAt,desc', label: 'Updated Desc' },
                    { value: 'updatedAt,asc', label: 'Updated Asc' },
                    { value: 'dueDate,desc', label: 'Due Date Desc' },
                    { value: 'dueDate,asc', label: 'Due Date Asc' }
                ]}
                onChange={(v) => setFilters({ sort: v })}
                triggerClassName="w-full"
            />

            <button
                className="text-sm text-muted-foreground underline"
                onClick={() =>
                    setFilters({ status: undefined, priority: undefined, overdue: false, sort: "createdAt,desc" })
                }
            >
                Clear filters
            </button>
        </div>
        
    )
}