
import React from "react"
import { FormItemState } from "../AddMatch.helpers"

type FormValidationDisplayProps = {
    formItemState: FormItemState,
}

export const FormValidationDisplay: React.FC<FormValidationDisplayProps> = ({ ...props }: FormValidationDisplayProps) => {
    const formItemState: FormItemState = props.formItemState

    return (
        <>
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