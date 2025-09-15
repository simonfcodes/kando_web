type BaseProps = {
    label: string
    className?: string
}

type SelectOption = {
    value: string
    label: string
}

type SelectField = BaseProps & {
    type: 'select'
    value?: string
    placeholder?: string
    options: SelectOption[]
    onChange: (value: string | undefined) => void
    triggerClassName?: string
}

type SwitchField = BaseProps & {
    type: 'switch'
    checked: boolean
    onChange: (checked: boolean) => void
    id?: string
}

type TextField = BaseProps & {
    type: 'text'
    value: string
    placeholder?: string
    onChange: (value: string) => void
    inputClassName?: string
}

export type FilterFieldProps = SelectField | SwitchField | TextField