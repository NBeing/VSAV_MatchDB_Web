import { ReactNode } from "react";
import { CharFullNameToShortName } from "@Common/enums/charNames.enum";
import YoutubeUtil from "@Common/util/youtube.util"
import { MatchLinkTypeShortNameToFullName } from "@Common/enums/matchLinkType.enum";

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

export type GenericValidator =
    ((str: string) => boolean) |
    ((number: string) => boolean) |
    ((str: string) => boolean)

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
    options?: ReactNode[]
}

export type FormState = Record<string, FormItemState>

export type FormOnChangeData = {
    key: string,
    value: string,
    display: string
}

export const CharOptionsWithNone = [...Object.keys(CharFullNameToShortName)]

export const allCharOptions = [
    ...CharOptionsWithNone.map(key => ({
        key: key,
        value: key,
        display: key,
    }))
]
// Validators
const isInt: GenericValidator = (num: unknown) => Number.isInteger(parseInt(num as string))
const isGtEqZero: GenericValidator = (num: unknown) => (parseInt(num as string)) >= 0
const isStringOrNull: GenericValidator = (str: unknown) => typeof str == 'string'
const isNotNoneOption: GenericValidator = (option: unknown) => option !== null

export const ContentOptions = [
    {
        key: MatchLinkTypeShortNameToFullName.VI,
        value: MatchLinkTypeShortNameToFullName.VI,
        display: MatchLinkTypeShortNameToFullName.VI
    },
    {
        key: MatchLinkTypeShortNameToFullName.FC2,
        value: MatchLinkTypeShortNameToFullName.FC2,
        display: MatchLinkTypeShortNameToFullName.FC2
    }
]

export const INITIAL_FORM_STATE: FormState = {
    type: {
        name: "type",
        label: "Video Source",
        type: "select",
        value: MatchLinkTypeShortNameToFullName.VI,
        dirty: true, // Set dirty and valid true because VI will be the option most people want.
        valid: true,
        validators: [],
        validationErrors: [],
        required: true,
    },
    url: {
        name: "url",
        type: "text",
        label: "Content URL",
        value: '',
        dirty: false,
        valid: false,
        validators: [YoutubeUtil.isYoutube],
        required: true,
        validationErrors: []
    },
    timestamp: {
        name: "timestamp",
        type: "number",
        label: "Timestamp",
        value: -1,
        dirty: false,
        valid: false,
        validators: [isInt, isGtEqZero],
        required: true,
        validationErrors: []
    },
    p1_char: {
        name: "p1_char",
        type: "select",
        label: "Player 1 Character",
        value: null,
        dirty: false,
        valid: false,
        validators: [isNotNoneOption],
        required: true,
        validationErrors: [],
        options: allCharOptions
    },
    p2_char: {
        name: "p2_char",
        type: "select",
        label: "Player 2 Character",
        value: null,
        dirty: false,
        valid: false,
        validators: [isNotNoneOption],
        required: true,
        validationErrors: [],
        options: allCharOptions
    },
    winning_char: {
        name: "winning_char",
        type: "select",
        label: "Winning Character",
        value: null,
        dirty: false,
        valid: false,
        validators: [isNotNoneOption],
        required: true,
        validationErrors: [],
        options: allCharOptions
    },
    p1_name: {
        name: "p1_name",
        type: "text",
        label: "Player 1",
        value: '',
        dirty: false,
        valid: false,
        validators: [isStringOrNull],
        required: false,
        validationErrors: []
    },
    p2_name: {
        name: "p2_name",
        type: "text",
        label: "Player 2",
        value: '',
        dirty: false,
        valid: false,
        validators: [isStringOrNull],
        required: false,
        validationErrors: []
    }
}