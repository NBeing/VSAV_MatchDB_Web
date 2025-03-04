import React, { useMemo, useState } from "react";
import { Card } from "@mui/material";
import { Box } from "@mui/system";
import { SEARCH_TYPE_NAMES } from "./SearchBar.helpers";
import { SearchByMatchup } from "./SearchForms/SearchByMatchup";
import { SearchTypeToggle, ToggleOption } from "./SearchTypeToggle";
import { SearchByUrl } from "./SearchForms/SearchByUrl";
import { MatchInfoServiceConfig } from "@MatchService/MatchInfo.service";
import IMatchData from "@MatchService/MatchData.type";

const BY_URL = {
  key: SEARCH_TYPE_NAMES.BY_URL,
  value: SEARCH_TYPE_NAMES.BY_URL,
  display: SEARCH_TYPE_NAMES.BY_URL
}
const BY_MU = {
  key: SEARCH_TYPE_NAMES.BY_MU,
  value: SEARCH_TYPE_NAMES.BY_MU,
  display: SEARCH_TYPE_NAMES.BY_MU
}
type RetrievalFuncType = (config:MatchInfoServiceConfig) => Promise<IMatchData>
export interface SearchBarProps { }
export const SearchBar: React.FC = () => {
  const [searchType, setSearchType] = useState<ToggleOption | null>(BY_MU)

  const [matchListingRetrievalFunc, setMatchListingRetrievalFunc] = useState<RetrievalFuncType | null>(null)
  const [matchListingRetrievalConfig, setMatchListingRetrievalConfig] = useState<MatchInfoServiceConfig | null>(null)
  const onChangeSearchType = (e: unknown, toggleOption: ToggleOption | null) => {
    console.log("form item on change", toggleOption)
    setSearchType(toggleOption)
  }

  const SEARCH_OPTIONS = [BY_URL, BY_MU,]
  const handleSetMatchListingRetrievalFunc = ( retrievalFunc: RetrievalFuncType, config:MatchInfoServiceConfig) => {
    setMatchListingRetrievalFunc(retrievalFunc)
  } 
  const formComponent = useMemo(() => {
    if ( searchType?.key === SEARCH_TYPE_NAMES.BY_MU ) {
      return <SearchByMatchup setMatchListingRetrievalFunc={handleSetMatchListingRetrievalFunc}/>
    } 
    if ( searchType?.key === SEARCH_TYPE_NAMES.BY_URL) {
      return <SearchByUrl />
    }
  }, [searchType]) 

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'black' }}>
      <Box sx={{ display: 'flex', flexGrow: 1, maxWidth: "500px" }}>
        <SearchTypeToggle
          onChange={onChangeSearchType}
          options={SEARCH_OPTIONS}
          defaultValue={BY_MU}
        />
      </Box>
        {formComponent}
    </Card>
  );
}
