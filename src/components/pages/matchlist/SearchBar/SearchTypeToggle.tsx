import React from "react"
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

export type ToggleOption = {key: string, value: string, display:string}
interface SearchTypeToggle {
    onChange: (e: unknown, toggleOption:ToggleOption | null) => void,
    options: ToggleOption[],
    defaultValue: {key: string, value: string, display:string}
}

export const SearchTypeToggle: React.FC<SearchTypeToggle> = ({ ...props }: SearchTypeToggle) => {
    const { options, defaultValue }  = props
    const [toggleValue, setToggleValue] = React.useState(defaultValue);

    const handleOnChange = (
        event: React.MouseEvent<HTMLElement>,
        toggleValue: ToggleOption,
      ) => {

        setToggleValue(toggleValue);
        props.onChange(event, toggleValue)
      };

    return (
        <ToggleButtonGroup
            fullWidth
            value={toggleValue}
            exclusive
            color="primary"
            onChange={handleOnChange}
            style={{marginBottom: "40px"}}
        >
            { options.map( (option) => {
                return (
                    <ToggleButton key={option.key} value={option}>
                        { option.key }
                    </ToggleButton>
                )
            }) }
        </ToggleButtonGroup>
    )
}