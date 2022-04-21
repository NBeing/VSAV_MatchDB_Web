import React from "react"
import { FormItemOnChange, FormItemState } from "../AddMatch.helpers"
import { Box, TextField } from '@mui/material'
import { FormValidationDisplay } from "./FormValidationDisplay.component"

interface FormTextInputProps {
    onChange: (
        event: (React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>), 
        formItemOnChange:FormItemOnChange
    ) => void,
    formItemState: FormItemState
}

export const FormTextInput: React.FC<FormTextInputProps> = ({ ...props }: FormTextInputProps) => {
    const formItemState = props.formItemState
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 
        props.onChange(e, {
            name: formItemState.name,
            value: e.target.value
        })
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row' 
        }}>

            <TextField
                name={formItemState.name}
                value={props.formItemState.value}
                onChange={handleChange}
                type={formItemState.type}
                label={formItemState.label}
            />
            <FormValidationDisplay formItemState={formItemState}></FormValidationDisplay>
        </Box>
    )
}