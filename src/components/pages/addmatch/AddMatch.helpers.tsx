import { ReactNode } from "react";
import { GenericValidator } from "@Common/util/validators.util";
import { TYPE_DEFAULT, URL_DEFAULT, TIMESTAMP_DEFAULT, P1_CHAR_DEFAULT, P2_CHAR_DEFAULT, WINNING_CHAR_DEFAULT, P1_NAME_DEFAULT, P2_NAME_DEFAULT } from "./components/FormDefaults.const";

export type AllowedFormValue = string | number | readonly string[] | undefined | null
export type FormItemOnChange = {
    name: string,
    value: AllowedFormValue
}
export type VideoDetails = {
    uploader: string,
    dateUploaded: string,
    videoTitle: string,
    youtubeId: string
}

export type FormItemState = {
    name: string,
    type: string,
    label: string,
    value: AllowedFormValue,
    dirty: boolean,
    valid: boolean,
    validators: GenericValidator[],
    required: boolean,
    validationErrors: string[]
    options?: ReactNode[],
    toPostData: ((value: string) => string) | ((value: number) => number) | ((value: number) => string)
}

export type FormState = Record<string, FormItemState>

export type FormOnChangeData = {
    key: string,
    value: string,
    display: string
}

export const ADD_MATCH_FORM_DEFAULTS = {
    ...TYPE_DEFAULT,
    ...URL_DEFAULT,
    ...TIMESTAMP_DEFAULT,
    ...P1_CHAR_DEFAULT,
    ...P2_CHAR_DEFAULT,
    ...WINNING_CHAR_DEFAULT,
    ...P1_NAME_DEFAULT,
    ...P2_NAME_DEFAULT,
}
