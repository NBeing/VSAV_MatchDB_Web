import MatchInfoService from "@MatchService/MatchInfo.service";
import React, { useState } from "react";
import IMatchData from "@MatchService/MatchData.type";
import {
  FormState,
  AllowedFormValue,
} from "@Components/pages/addmatch/AddMatch.helpers";
import { Button, Card, Icon, InputAdornment } from "@mui/material";
import { CharFullNameToShortName } from "@Common/enums/charNames.enum";
import { Box } from "@mui/system";
import { TYPE_DEFAULT, URL_DEFAULT } from "@Pages/addmatch/components/FormDefaults.const";
import { FormTextInput } from "@Pages/addmatch/components/FormTextInput.component";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { checkRequired, checkValid, undecoratedHandleChange } from '@Pages/addmatch/components/FormHelpers'

const SEARCH_FORM_BY_URL = {
  ...TYPE_DEFAULT,
  ...URL_DEFAULT
}

export interface SearchByUrlProps { }
export const SearchByUrl: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(SEARCH_FORM_BY_URL)
  const [areAllValid, setAreAllValid] = useState(false)
  const handleChange = undecoratedHandleChange(setAreAllValid, setFormState)

  const formDataToPostData = (formState: FormState) => {
    const data = Object.keys(formState).reduce((acc, key) => {
      acc[key] = formState[key].value
      return acc
    }, {} as Record<keyof FormState, AllowedFormValue>)

    data.p1_char = CharFullNameToShortName[formState.p1_char.value as string]
    data.p2_char = CharFullNameToShortName[formState.p2_char.value as string]
    data.winning_char = CharFullNameToShortName[formState.winning_char.value as string]
    // Ugh
    return data as unknown as IMatchData
  }

  const [submitErrors, setSubmitErrors] = useState<string[]>([])
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const required_and_not_dirty = checkRequired(formState)
    if (required_and_not_dirty.length) {
      setSubmitErrors(required_and_not_dirty)
      return
    }

    const { areAllValid } = checkValid(formState)
    setAreAllValid(areAllValid)
    if ( areAllValid ){
      const postData: IMatchData = formDataToPostData(formState)
      try {
        await MatchInfoService.create(postData)
      } catch (e) {
        console.log("Errors:", e)
      }
    }

  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black', padding: "20px" }}>
      <Box sx={{ display: 'flex', flexGrow: 1, maxWidth: "500px", padding: "20px" }}>
        <form onSubmit={onSubmit} style={{ flexGrow: 1 }}>

          <FormTextInput
            onChange={e => handleChange(e, formState.url)}
            formItemState={formState.url}
            startAdornment={(
              <InputAdornment position="start">
                <Icon>
                  <YouTubeIcon />
                </Icon>
              </InputAdornment>
            )}
          ></FormTextInput>
          {
            submitErrors.length > 0 &&
            <div>
              <p>
                The following fields were required but not supplied:
              </p>
              {submitErrors.map((error, i) => <div key={i}> {error}</div>)}
            </div>
          }
          <Button
            type="submit"
            disabled={!areAllValid}
            fullWidth
          > Submit </Button>
        </form>
      </Box>
    </Card>
  );
}
