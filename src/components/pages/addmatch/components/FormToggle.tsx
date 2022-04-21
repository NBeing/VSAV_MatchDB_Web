import React from "react"
import { FormItemOnChange, FormItemState, AllowedFormValue } from "../AddMatch.helpers"
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FormValidationDisplay } from "./FormValidationDisplay.component"

interface FormToggleProps {
    onChange: (e: unknown, formItemOnChange:FormItemOnChange | null) => void,
    formItemState: FormItemState,
    options: {key: string, value: string, display:string}[],
    defaultValue: AllowedFormValue
}

export const FormToggle: React.FC<FormToggleProps> = ({ ...props }: FormToggleProps) => {
    const formItemState = props.formItemState
    const { options, defaultValue }  = props
    const [contentType, setContentType] = React.useState<AllowedFormValue | null>(defaultValue);

    const handleContentType = (
        event: React.MouseEvent<HTMLElement>,
        newContentType: AllowedFormValue,
      ) => {
        setContentType(newContentType);
        props.onChange(event, {
            name: formItemState.name,
            value: newContentType
        })
      };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row' 
        }}>
             <ToggleButtonGroup
                value={contentType}
                exclusive
                color="primary"
                onChange={handleContentType}
            >
                { options.map( (option) => {
                    return (
                        <ToggleButton key={option.key} value={option.key}>
                            { option.key }
                        </ToggleButton>
                    )
                }) }
            </ToggleButtonGroup>
            <FormValidationDisplay formItemState={formItemState}></FormValidationDisplay>
        </Box>
    )
}