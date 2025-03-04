import { MatchLinkTypeFullNameToShortName } from "@Common/enums/matchLinkType.enum"
import IMatchData from "@MatchService/MatchData.type"
import { AllowedFormValue, FormItemOnChange, FormItemState, FormState } from "../AddMatch.helpers"

export const notRequired = (formItem:Record<string, FormItemState>) => {
  const entry = Object.keys(formItem)[0]
  formItem[entry].required = false
  return formItem
}


export const checkRequired = (formState:FormState) => {
  const required_and_not_dirty = Object.keys(formState).reduce((requiredItemsAcc, cur) => {
    const formItem = formState[cur]
    if (!formItem.dirty && formItem.required) {
      return [...requiredItemsAcc, cur]
    } else {
      return requiredItemsAcc
    }
  }, [] as string[])
  return required_and_not_dirty
}

export const checkValid = (formState: FormState) => {
  let areAllValid = true

  const stateWithValidationErrors = Object.keys(formState).reduce((acc, key) => {
    acc[key] = { ...formState[key], validationErrors: [] }

    const validationErrors = formState[key].validators.reduce((acc, validator) => {

      if (!validator(formState[key].value as string)) {
        acc = [...acc, validator.name]
        areAllValid = false
      }
      return acc
    }, [] as string[])

    acc[key].validationErrors = validationErrors
    acc[key].valid = validationErrors.length == 0

    return acc
  }, {} as Record<keyof FormState, FormItemState>)


  return { stateWithValidationErrors, areAllValid }
}

export const undecoratedHandleChange = (
  setAreAllValidFunc: React.Dispatch<React.SetStateAction<boolean>>,
  setFormStateFunc: React.Dispatch<React.SetStateAction<FormState>>
) => (
  _event: unknown, 
  formItemOnChange: FormItemOnChange | null, 
  
) => {
  if (!formItemOnChange) {
    return
  }
  const newValue = formItemOnChange.value;
  const inputName = formItemOnChange.name;

  setFormStateFunc((prevState) => {
    const newState = {
      ...prevState,
      [inputName]: {
        ...prevState[inputName],
        value: newValue,
        dirty: true
      }
    };
    const { stateWithValidationErrors, areAllValid } = checkValid(newState)
    setAreAllValidFunc(areAllValid)
    return stateWithValidationErrors
  })
}

export const formDataToPostData = (formState: FormState) => {
  const data = Object.keys(formState).reduce((acc, key) => {
    acc[key] = formState[key].toPostData(formState[key].value)
    return acc
  }, {} as Record<keyof FormState, AllowedFormValue>)

  if (data.type === MatchLinkTypeFullNameToShortName.FC2) {
    data.timestamp = null
  }
  // Ugh
  return data as unknown as IMatchData
}