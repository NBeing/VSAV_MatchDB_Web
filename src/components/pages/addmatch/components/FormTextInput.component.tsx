import React, { ReactNode } from "react"
import { FormItemOnChange, FormItemState } from "../AddMatch.helpers"
import { Box, TextField } from '@mui/material'
import { IconButton, InputAdornment } from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel';

interface FormTextInputProps {
    onChange: (
        event: (React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>), 
        formItemOnChange:FormItemOnChange
    ) => void,
    formItemState: FormItemState,
    startAdornment?: ReactNode
}

export const FormTextInput: React.FC<FormTextInputProps> = ({ ...props }: FormTextInputProps) => {
    const formItemState = props.formItemState
    const {name, value, type, valid, validationErrors, dirty } = formItemState
    type EventType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    const handleChange = (e: EventType) => { 
        props.onChange(e, {
            name: formItemState.name,
            value: e.target.value
        })
    }

    const handleClickResetUrl = () => {
        handleChange({target: {value: ''}} as EventType)
    }
    
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
        }}>

            <TextField
                fullWidth
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                error={ ((dirty && !valid) === true )}
                helperText={ (dirty && !valid) ? `Failed ${validationErrors}` : ' '}
                variant="outlined"
                label={formItemState.label}
                InputProps={{endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={handleClickResetUrl}
                      >
                        {formItemState.value !== '' ? <CancelIcon /> : (<></>)}
                      </IconButton>
                    </InputAdornment>
                    ), 
                   startAdornment: props.startAdornment}}
            />
        </Box>
    )
}