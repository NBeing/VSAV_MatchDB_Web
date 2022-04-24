import React, { SyntheticEvent } from "react"
import { FormOnChangeData, FormItemOnChange, FormItemState } from "../AddMatch.helpers"
import { Autocomplete, Box, InputAdornment, TextField } from '@mui/material'
import { CharFullNameToIcon } from "@CommonEnums/charNames.enum"
import RandomCharIcon from "@Root/assets/icons/RandomChar_Icon.png"

interface FormOptionSelectProps {
    onChange: (
        e: unknown,
        formItemOnChange: FormItemOnChange | null
    ) => void,
    // onFormChange : (formItemState: FormItemState) => void,
    formItemState: FormItemState,
    options: FormOnChangeData[]
}
export const FormOptionSelect: React.FC<FormOptionSelectProps> = ({ ...props }: FormOptionSelectProps) => {
    const { formItemState, options } = props
    const handleChange = (e: (SyntheticEvent<Element, Event>), value: FormOnChangeData | null) => {
        props.onChange(e, {
            name: formItemState.name,
            value: value?.key !== null ? value?.key : null
        })
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            margin: '10px',
            marginBottom: '40px'
        }}>
            <Autocomplete
                autoSelect
                fullWidth
                disablePortal={false}
                onChange={handleChange}
                options={options}
                getOptionLabel={(option: FormOnChangeData) => option.key}
                renderOption={(props, option) => (
                    <Box {...props} sx={{ display: 'flex', flexDirection: 'row' }} key={option.key}>
                        <Box
                            sx={{
                                display: 'flex',
                                width: "50px",
                                flexDirection: 'row'
                            }}>
                            <div style={{ flexGrow: 1 }}></div>
                            <img src={CharFullNameToIcon[option.key]} style={{ alignSelf: 'flex-end' }} />
                        </Box>
                        <span style={{ marginLeft: '20px', fontSize: "30px" }}>{option.value}</span>
                    </Box>
                )
                }
                renderInput={params => (
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <>
                                    <InputAdornment position="start">
                                        <img style={{ width: "30px" }} src={RandomCharIcon}></img>
                                    </InputAdornment>
                                    {params.InputProps.startAdornment}
                                </>
                            )
                        }}
                        label={formItemState.label}
                        variant="outlined"
                    />)}
            />
        </Box>
    )
}