import { CustomTheme } from "@Root/theme/Theme"
import { Classes } from "jss"
import React, { ChangeEvent, ReactNode } from "react"
import { createUseStyles, useTheme } from "react-jss"
import { FormItemState } from "../AddMatch.helpers"
import { NativeSelect } from '@mui/material'

export type FormOptionSelectRuleNames =
    'label' |
    'select' |
    'container_dirty'   | 
    'container_invalid' |
    'container_valid'   |
    'container'

interface FormOptionSelectProps {
    onChange: (event:(ChangeEvent<HTMLSelectElement>)) => void,
    formItemState: FormItemState,
    options: ReactNode[]
}

export const useStyles = createUseStyles<FormOptionSelectRuleNames, FormOptionSelectProps, CustomTheme>({
    label: ({
        // background: 'black'
      }),
    select: {
        // minWidth: "250px",
        // color: "white",
        // border: "none",
    },
    container_dirty: {
        // color: "white",
        // borderColor: "yellow",
        // border: "2px solid",
    },
    container_invalid: {
        // color: "white",
        // borderColor: "red",
        // border: "2px solid",
    },
    container_valid: {
        // color: "white",
        // borderColor: "green",
        // border: "2px solid",
    },

    container: ({
        // background: 'black'
    }),
})

const getFormItemValidationStateClass = (formItemState:FormItemState, classes:Classes<FormOptionSelectRuleNames>) => {

    if ( !formItemState.dirty ){
        return classes.container
    } else if ( formItemState.valid && formItemState.dirty ){
        return classes.container_valid
    } else {
        return classes.container_invalid
     }
}
export const FormOptionSelect: React.FC<FormOptionSelectProps> = ({ ...props }: FormOptionSelectProps) => {
    const theme: CustomTheme = useTheme<CustomTheme>()
    const classes = useStyles({ ...props, theme })
    const handleChange = (e: (ChangeEvent<HTMLSelectElement>)) => { props.onChange(e) }
    const formItemState = props.formItemState
    const validityState = getFormItemValidationStateClass(formItemState, classes)
    const options = props.options

    return (
        <div className={validityState}>
            <label className={classes.label}>
                {formItemState.label}
            </label>
            <NativeSelect
                name={formItemState.name}
                value={props.formItemState.value}
                onChange={e => handleChange(e)}
            >
                {options}                
            </NativeSelect>
            <div style={{color: "white"}}> Is valid? : { (formItemState.valid) ? "Yes!": "No!" } </div>
            {(formItemState.validationErrors.length > 0) &&
                formItemState.validationErrors.map((err, i) => (
                    <p key={i} style={{ color: "white" }}>
                        Validation Failed for: {err}
                    </p>
                ))
            }    
        </div>
    )
}