import { CharFullNameToShortName } from "@Common/enums/charNames.enum";
import { validators } from "@Common/util/validators.util"
import { MatchLinkTypeShortNameToFullName } from "@Common/enums/matchLinkType.enum";


export const CharOptionsWithNone = [...Object.keys(CharFullNameToShortName)]

export const allCharOptions = [
    ...CharOptionsWithNone.map(key => ({
        key: key,
        value: key,
        display: key,
    }))
]


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

export const TYPE_DEFAULT = {
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
      toPostData: (value: string) => value
  }
}
export const URL_DEFAULT = {
  url: {
      name: "url",
      type: "text",
      label: "Content URL",
      value: '',
      dirty: false,
      valid: false,
      validators: [validators.isYoutube],
      required: true,
      validationErrors: [],
      toPostData: (value: string) => value
  }
}

export const TIMESTAMP_DEFAULT = {
  timestamp: {
      name: "timestamp",
      type: "number",
      label: "Timestamp",
      value: -1,
      dirty: false,
      valid: false,
      validators: [validators.isInt, validators.isGtEqZero],
      required: true,
      validationErrors: [],
      toPostData: (value: number) => value
  }
}
export const P1_CHAR_DEFAULT = {
  p1_char: {
      name: "p1_char",
      type: "select",
      label: "Player 1 Character",
      value: null,
      dirty: false,
      valid: false,
      validators: [validators.isNotNoneOption],
      required: true,
      validationErrors: [],
      options: allCharOptions,
      toPostData: (value: unknown) => CharFullNameToShortName[value as string]
  }
}
export const P2_CHAR_DEFAULT = {
  p2_char: {
      name: "p2_char",
      type: "select",
      label: "Player 2 Character",
      value: null,
      dirty: false,
      valid: false,
      validators: [validators.isNotNoneOption],
      required: true,
      validationErrors: [],
      options: allCharOptions,
      toPostData: (value: unknown) => CharFullNameToShortName[value as string]

  }
}

export const WINNING_CHAR_DEFAULT = {
  winning_char: {
      name: "winning_char",
      type: "select",
      label: "Winning Character",
      value: null,
      dirty: false,
      valid: false,
      validators: [validators.isNotNoneOption],
      required: true,
      validationErrors: [],
      options: allCharOptions,
      toPostData: (value: unknown) => CharFullNameToShortName[value as string]
  }
}
export const P1_NAME_DEFAULT = {
  p1_name: {
      name: "p1_name",
      type: "text",
      label: "Player 1",
      value: '',
      dirty: false,
      valid: false,
      validators: [validators.isStringOrNull],
      required: false,
      validationErrors: [],
      toPostData: (value: string) => value

  }
}
export const P2_NAME_DEFAULT = {
  p2_name: {
      name: "p2_name",
      type: "text",
      label: "Player 2",
      value: '',
      dirty: false,
      valid: false,
      validators: [validators.isStringOrNull],
      required: false,
      validationErrors: [],
      toPostData: (value: string) => value
  }
}