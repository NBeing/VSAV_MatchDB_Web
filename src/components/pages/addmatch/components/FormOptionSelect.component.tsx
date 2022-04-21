import React, { SyntheticEvent } from "react"
import { FormOnChangeData, FormItemOnChange, FormItemState } from "../AddMatch.helpers"
import { Autocomplete, Box, TextField } from '@mui/material'
import { FormValidationDisplay } from "./FormValidationDisplay.component"


interface FormOptionSelectProps {
    onChange: (
        e:unknown, 
        formItemOnChange:FormItemOnChange | null
    ) => void,
    // onFormChange : (formItemState: FormItemState) => void,
    formItemState: FormItemState,
    options: FormOnChangeData[]
}

export const FormOptionSelect: React.FC<FormOptionSelectProps> = ({ ...props }: FormOptionSelectProps) => {
    const formItemState = props.formItemState
    const options = props.options
    const handleChange = (e: (SyntheticEvent<Element, Event>), value: FormOnChangeData | null) => { 
        props.onChange(e,{
            name: formItemState.name,
            value: value?.key !== null ? value?.key : null
        }) 
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row' 
        }}>
            <Autocomplete
                autoSelect
                disablePortal={false}
                onChange={handleChange}
                options={options}
                getOptionLabel={(option:FormOnChangeData) =>  option.key}
                renderInput={params => (
                    <TextField {...params} label={props.formItemState.label} variant="outlined" />)}
                style={{ width: 270 }}
            />
            <FormValidationDisplay formItemState={formItemState}></FormValidationDisplay>
        </Box>
    )
}