import React, { ReactNode } from "react";
import { MatchLinkTypeEnum } from "@Common/enums/matchLinkType.enum";
import { CharNamesEnum, CharNamesEnumDisplay } from "@Common/enums/charNames.enum";

export enum NoneOption { NA = "NA" }
export const NoneOptionDisplay = { [NoneOption.NA]: "None Selected" }

export type CharNamesOptions = CharNamesEnum | NoneOption
export const CharNamesOptions = { ...NoneOption, ...CharNamesEnum }

export const CharNamesDisplayOptions = { ...NoneOptionDisplay, ...CharNamesEnumDisplay, }
export type AllowedFormValue = string | number | readonly string[] | undefined
export type FormItemState = {
    name: string,
    type: string,
    label: string,
    value: AllowedFormValue,
    dirty: boolean,
    valid: boolean,
    validators: ((allowedFormValue: AllowedFormValue) => boolean)[],
    required: boolean,
    validationErrors: string[]
    options?: ReactNode[]
}
import YoutubeUtil from "@Common/util/youtube.util"
export interface FormState {
    [key: string]: FormItemState
}
// Validators
const isInt = (num:unknown) => Number.isInteger(parseInt(num as string))
const isGtEqZero = (num:unknown) => (parseInt(num as string)) >= 0 
const isString = ( str : unknown) => typeof str == 'string'
const isNotNoneOption = ( option:CharNamesOptions) => option !== CharNamesOptions.NA  

export const allCharOptions = Object.keys(CharNamesOptions)
.map(key => {
  return (
    <option key={key} value={key}>
      {CharNamesDisplayOptions[key]}
    </option>
  )
})

export const INITIAL_FORM_STATE: FormState = {
    type: {
        name: "type",
        label: "Video Source",
        type: "select",
        value: MatchLinkTypeEnum.VI,
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
        validators: [isInt , isGtEqZero],
        required: true,
        validationErrors: []
    },
    p1_char: {
        name: "p1_char",
        type: "select",
        label: "Player 1 Character",
        value: CharNamesOptions.NA,
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
        value: CharNamesOptions.NA,
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
        value: CharNamesOptions.NA,
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
        validators: [isString],
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
        validators: [isString],
        required: false,
        validationErrors: []
    },
    videoTitle: {
        name: "video_title",
        type: "text",
        label: "Video Title",
        value: '',
        dirty: false,
        valid: false,
        validators: [isString],
        required: false,
        validationErrors: []
    },
    uploader: {
        name: "uploader",
        type: "text",
        label: "Uploaded By",
        value: '',
        dirty: false,
        valid: false,
        validators: [isString],
        required: false,
        validationErrors: []
    },
    dateUploaded: {
        name: "date_uploaded",
        type: "text",
        label: "Uploaded On",
        value: '',
        dirty: false,
        valid: false,
        validators: [isString],
        required: false,
        validationErrors: []
    }
}