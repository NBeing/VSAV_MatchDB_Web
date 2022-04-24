import React from "react"
import { FormItemOnChange, FormItemState, AllowedFormValue } from "../AddMatch.helpers"
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'

interface FormToggleProps {
    onChange: (e: unknown, formItemOnChange:FormItemOnChange | null) => void,
    formItemState: FormItemState,
    options: {key: string, value: string, display:string}[],
    defaultValue: AllowedFormValue
}

export const FormToggle: React.FC<FormToggleProps> = ({ ...props }: FormToggleProps) => {
    const formItemState = props.formItemState
    const { options, defaultValue }  = props
    const [toggleValue, setToggleValue] = React.useState<AllowedFormValue | null>(defaultValue);

    const handleOnChange = (
        event: React.MouseEvent<HTMLElement>,
        toggleValue: AllowedFormValue,
      ) => {
        setToggleValue(toggleValue);
        props.onChange(event, {
            name: formItemState.name,
            value: toggleValue
        })
      };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row' 
        }}>
             <ToggleButtonGroup
                value={toggleValue}
                exclusive
                color="primary"
                onChange={handleOnChange}
            >
                { options.map( (option) => {
                    return (
                        <ToggleButton key={option.key} value={option.key}>
                            { option.key }
                        </ToggleButton>
                    )
                }) }
            </ToggleButtonGroup>
        </Box>
    )
}