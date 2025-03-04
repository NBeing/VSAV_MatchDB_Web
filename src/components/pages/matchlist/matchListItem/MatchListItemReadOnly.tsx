import React from 'react'
import { CharNamesEnumDisplay, CharShortNameToPortrait } from '@Common/enums/charNames.enum'
import IMatchData from '@MatchService/MatchData.type'
import { Box, Button, Card, List, ListItem, Tooltip } from '@mui/material'
import YouTubeIcon from '@mui/icons-material/YouTube'
import VersusIcon from "@Root/assets/images/versus.png"

interface MatchListItemReadOnlyProps {
  match: IMatchData,
  key: number,
  onYoutubeSelected: (match: IMatchData) => void
}

export function MatchListItemReadOnly(
  { ...props }: MatchListItemReadOnlyProps
) {
  const { match, onYoutubeSelected } = props
  const onClickYoutube = () => {
    onYoutubeSelected(match)
    console.log("on click youtube")
  }
  return (
    
    <Card
      sx={{
        maxWidth: "700px",
        margin: "1em",
        padding: "1em"
      }}>
      <List>

        <ListItem style={{justifyContent: 'space-around'}}>
          <Box style={{ alignSelf: 'flex-start' }}>
            <Tooltip title={
              CharNamesEnumDisplay[match.p1_char] !== '' && 
              (<p style={{ width: "fit-content", margin: "auto"}}> 
                  {CharNamesEnumDisplay[match.p1_char]}
                </p>)
              }>
              <img src={CharShortNameToPortrait[match.p1_char]}  />
            </Tooltip>
          </Box>
          <Box>
            <img src={VersusIcon} />
          </Box>
          <Box style={{ alignSelf: 'flex-end', alignItems:"center", justifyContent:"center" }}>
          <Tooltip title={
              CharNamesEnumDisplay[match.p2_char] !== '' && 
              (<p style={{ width: "fit-content", margin: "auto"}}> 
                  {CharNamesEnumDisplay[match.p2_char]}
                </p>)
              }>
             <img 
              src={CharShortNameToPortrait[match.p2_char]} 
              style={{
                // ["-webkit-transform"]: "scaleX(-1)",
                transform: "scaleX(-1)",
              }}
             />
            </Tooltip>
          </Box>

        </ListItem>
        <div>
          {match.video_title && (
          <p style={{ width: "fit-content", margin: "auto"}}>
            Title: {match.video_title}
          </p>)}
          {match.uploader && (
            <p style={{ width: "fit-content", margin: "auto"}}>
              Channel: {match.uploader}
            </p>)}

          {match.date_uploaded && 
          (<p style={{ width: "fit-content", margin: "auto"}}>
            Uploaded To YT On: {match.date_uploaded.split(" ")[0]}
          </p>)}
        </div>


        <ListItem>
          <Tooltip title={`${match.url}`}>
          <Button 
          fullWidth
            variant="outlined"
            onClick={onClickYoutube}
          >
              <YouTubeIcon style={{ fontSize: "4em"}}/><span>Open in Viewer</span>
          </Button>
          </Tooltip>
        </ListItem>

      </List>
    </Card>
  )
}
