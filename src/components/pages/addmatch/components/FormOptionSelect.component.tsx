// import { CustomTheme } from "@Root/theme/Theme"
import React, { SyntheticEvent } from "react"
// import { createUseStyles, useTheme } from "react-jss"
import { CharAutocompleteOption, FormItemOnChange, FormItemState } from "../AddMatch.helpers"
import { Autocomplete, TextField } from '@mui/material'
// import { useTheme } from "@mui/material"
export type FormOptionSelectRuleNames =
    'label'             |
    'select'            |
    'container_dirty'   | 
    'container_invalid' |
    'container_valid'   |
    'container'

interface FormOptionSelectProps {
    onChange: (
        e:unknown, 
        formItemOnChange:FormItemOnChange
    ) => void,
    formItemState: FormItemState,
    options: CharAutocompleteOption
}

export const FormOptionSelect: React.FC<FormOptionSelectProps> = ({ ...props }: FormOptionSelectProps) => {
    const formItemState = props.formItemState
    const options = props.options
    const handleChange = (e: (SyntheticEvent<Element, Event>), value: CharAutocompleteOption | null) => { 
        props.onChange(e,{
            name: formItemState.name,
            value: value.key
        }) 
    }
    return (
        <>
            <label>
                {formItemState.label}
            </label>
            <Autocomplete
                autoSelect
                disablePortal={true}
                onChange={handleChange}
                options={options}
                getOptionLabel={(option:CharAutocompleteOption) =>  option.key}
                renderInput={params => (
                    <TextField {...params} label={props.formItemState.label} variant="outlined" />)}
                style={{ width: 270 }}
            />        

            <div> Is valid? : { (formItemState.valid) ? "Yes!": "No!" } </div>
            {(formItemState.validationErrors.length > 0) &&
                formItemState.validationErrors.map((err, i) => (
                    <p key={i} style={{ color: "white" }}>
                        Validation Failed for: {err}
                    </p>
                ))
            }  
        </>
    )
}