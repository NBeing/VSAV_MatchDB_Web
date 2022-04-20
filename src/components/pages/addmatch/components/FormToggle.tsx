import React from "react"
import { CharAutocompleteOption, FormItemOnChange, FormItemState } from "../AddMatch.helpers"
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
// import { useTheme } from "@mui/material"

interface FormToggleProps {
    onChange: (e: unknown, formItemOnChange:FormItemOnChange) => void,
    formItemState: FormItemState,
    options: CharAutocompleteOption
}

export const FormToggle: React.FC<FormToggleProps> = ({ ...props }: FormToggleProps) => {
    const formItemState = props.formItemState
    const options = props.options
    const [contentType, setContentType] = React.useState<CharAutocompleteOption | null>(options[0].key);

    const handleContentType = (
        event: React.MouseEvent<HTMLElement>,
        newContentType: CharAutocompleteOption,
      ) => {
        setContentType(newContentType);
        props.onChange(event, {
            name: formItemState.name,
            value: newContentType.key
        })
      };

    return (
        <>
             <ToggleButtonGroup
                value={contentType}
                exclusive
                color="primary"
                onChange={handleContentType}
            >
                <ToggleButton value={options[0].key}>
                    { options[0].display }
                </ToggleButton>
                <ToggleButton value={options[1].key}>
                    { options[1].display }
                </ToggleButton>   
            </ToggleButtonGroup>
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