import React from "react"
import { CustomTheme } from "@Root/theme/Theme"
import { createUseStyles, useTheme } from "react-jss"
import { FormItemOnChange, FormItemState } from "../AddMatch.helpers"
import { Input } from '@mui/material'
export type FormTextInputRuleNames =
    'label' |
    'textInput'

interface FormTextInputProps {
    onChange: (
        event: (React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>), 
        formItemOnChange:FormItemOnChange
    ) => void,
    formItemState: FormItemState
}

export const useStyles = createUseStyles<FormTextInputRuleNames, FormTextInputProps, CustomTheme>({
    label: {},
    textInput: {},
})

export const FormTextInput: React.FC<FormTextInputProps> = ({ ...props }: FormTextInputProps) => {
    const theme: CustomTheme = useTheme<CustomTheme>()
    const classes = useStyles({ ...props, theme })
    const formItemState = props.formItemState
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 
        props.onChange(e, {
            name: formItemState.name,
            value: e.target.value
        })
    }

    return (
        <>
            <label className={classes.label}>
                {formItemState.label}
            </label>
            <Input
                className={classes.textInput}
                name={formItemState.name}
                value={props.formItemState.value}
                onChange={handleChange}
                type={formItemState.type}
            />
            <div> Is valid? : { (formItemState.valid) ? "Yes!": "No!" } </div>
            {(formItemState.validationErrors.length > 0) &&
                formItemState.validationErrors.map((err, i) => (
                    <p key={i}>
                        Validation Failed for: {err}
                    </p>
                ))
            }    
        </>
    )
}