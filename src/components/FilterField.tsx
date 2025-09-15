import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Switch } from './ui/switch';

import type { FilterFieldProps } from "./filters.types";
import { Input } from "./ui/input";

export function FilterField(props: FilterFieldProps) {
    if (props.type === 'select') {
        const {label, className, value, placeholder = "All", options, onChange, triggerClassName } = props

        return (
            <div className={`space-y-2 ${className || ''}`}>
                <Label className="text-sm">{label}</Label>
                <Select value={value} onValueChange={(v) => onChange(v)}>
                    <SelectTrigger className={`${triggerClassName || 'w-36'}`}>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        )
    }

    if (props.type === 'text') {
        const { label, className, value, placeholder, onChange, inputClassName} = props
        const id = label.toLowerCase().replace(/\s+/g, "-")

        return (
            <div className={`space-y-2 ${className ?? ""}`}>
                <Label htmlFor={id} className="text-sm">
                    {label}    
                </Label>
                <Input id={id} value={value} placeholder={placeholder} className={inputClassName}
                    onChange={((e) => onChange(e.target.value))} />
            </div>
        )
    }

    if (props.type === 'switch') {
        const { label, className, checked, onChange, id } = props
        const switchId = id || label.toLowerCase().replace(/\s+/g, "-")

        return (
            <div className={`flex items-center justify-between ${className ?? ""}`}>
                <Label htmlFor={switchId} className="text-sm">
                    {label}
                </Label>
                <Switch id={switchId} checked={checked} onCheckedChange={(v) => onChange(!!v)} />
            </div>
        )
    }
}