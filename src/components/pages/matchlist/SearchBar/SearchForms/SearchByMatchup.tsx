import MatchInfoService, { MatchInfoServiceConfig, RetrievalFuncType } from "@MatchService/MatchInfo.service";
import React, { useEffect, useMemo, useState } from "react";
import IMatchData from "@MatchService/MatchData.type";
import {
  FormState,
  AllowedFormValue,
} from "@Components/pages/addmatch/AddMatch.helpers";
import { FormOptionSelect } from "@Components/pages/addmatch/components/FormOptionSelect.component";
import { Button, Card, Checkbox, FormControlLabel } from "@mui/material";
import { FormToggle } from "@Components/pages/addmatch/components/FormToggle";
import { CharFullNameToShortName } from "@Common/enums/charNames.enum";
import { Box } from "@mui/system";
import { allCharOptions } from "@Pages/addmatch/components/FormDefaults.const";
import { P1_CHAR_DEFAULT, P2_CHAR_DEFAULT, WINNING_CHAR_DEFAULT } from "@Pages/addmatch/components/FormDefaults.const"
import { checkRequired, checkValid, notRequired, undecoratedHandleChange } from "@Pages/addmatch/components/FormHelpers";

const SEARCH_FORM_BY_MU = {
  ...P1_CHAR_DEFAULT,
  ...P2_CHAR_DEFAULT,
  ...notRequired(WINNING_CHAR_DEFAULT),
}


export interface SearchByMatchupProps {
  setMatchListingRetrievalFunc: (retrievalFunc: RetrievalFuncType, config: MatchInfoServiceConfig) => void,
}

export const SearchByMatchup: React.FC<SearchByMatchupProps> = (props: SearchByMatchupProps) => {
  const { setMatchListingRetrievalFunc } = props
  const [formState, setFormState] = useState<FormState>(SEARCH_FORM_BY_MU)
  const [areAllValid, setAreAllValid] = useState(false)
  const [searchByWinner, setSearchByWinner] = useState(false)
  
  const handleChange = undecoratedHandleChange(setAreAllValid, setFormState)

  // Update the options for the winning character when p1 or p2 char
  const winningCharOptions = useMemo(() => {
    return allCharOptions.filter(charOption => {
      if (charOption.key == formState.p1_char.value || charOption.key == formState.p2_char.value) {
        return charOption
      }
    })
  }, [formState.p1_char, formState.p2_char])

  // Set the winning char to null automatically when p1 or p2 changes
  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      "winning_char": {
        ...prevState["winning_char"],
        value: null,
        dirty: true
      }
    }))
  }, [formState.p1_char.value, formState.p2_char.value])


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

    const postData: IMatchData = formDataToPostData(formState)
    try {
      const { p1_char, p2_char, winning_char } = postData
      // const results = await MatchInfoService.getByMatchup(postData.p1_char, postData.p2_char)
      const config = { p1_char, p2_char , winning_char }
      setMatchListingRetrievalFunc(MatchInfoService.getByMatchup, config)
    } catch (e) {
      console.log("Errors:", e)
    }
  }
  const handleSearchByWinner = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setSearchByWinner(checked)
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black', padding: "20px" }}>
      <Box sx={{ display: 'flex', flexGrow: 1, maxWidth: "500px", padding: "20px" }}>
        <form onSubmit={onSubmit} style={{ flexGrow: 1 }}>

          <FormOptionSelect
            onChange={handleChange}
            options={allCharOptions}
            formItemState={formState.p1_char}
          />
          <FormOptionSelect
            onChange={handleChange}
            options={allCharOptions}
            formItemState={formState.p2_char}
          />
          <FormControlLabel
            value="top"
            control={
              <Checkbox
                sx={{ '& .MuiSvgIcon-root': { fontSize: 46 } }}
                color="primary"
                checked={searchByWinner}
                onChange={handleSearchByWinner}
              />
            }
            label="Search by Winner"
          />

          {(formState.p1_char.value && formState.p2_char.value) &&
            <FormToggle
              onChange={handleChange}
              options={winningCharOptions}
              formItemState={formState.winning_char}
              defaultValue={null}
            >{formState.p1_char.value}{formState.p2_char.value}</FormToggle>
          }
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
