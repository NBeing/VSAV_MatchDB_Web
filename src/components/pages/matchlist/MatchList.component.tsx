import React, { useEffect, } from 'react'
import MatchInfoService, {MatchListResponse} from '@MatchService/MatchInfo.service'
import { EMPTY_MATCHLIST } from '@MatchService/MatchInfo.service'
import { MatchListItemReadOnly } from '@Pages/matchlist/matchListItem/MatchListItemReadOnly'
import IMatchData from '@MatchService/MatchData.type'
import { Box, Button, Card } from '@mui/material'
import { YoutubeEmbedReadOnly } from './YoutubeEmbedReadOnly'
import { SearchBar } from './SearchBar/SearchBar'

// interface MatchListProps {}

export const MatchList:React.FC = () => {

    const [listData, setListData] = React.useState<MatchListResponse>(EMPTY_MATCHLIST)
    const [page, setPage] = React.useState<number>(1)
    const [hasNextPage, setHasNextPage] = React.useState<boolean>(false)    
    const [hasPreviousPage, setHasPreviousPage] = React.useState<boolean>(false)
    const [currentYoutubeVideo, setCurrentYoutubePlaying] = React.useState({ url: '', timestamp: 0 })

    useEffect(() => {
        const fetchData = async() => await MatchInfoService.getPage(page).then(
          res => {
            setListData(res)
            setHasNextPage(!!res.next)
            setHasPreviousPage(!!res.previous)
          }
        )
        fetchData()
          .catch()
    }, [page])
    
    const nextPage = (event: React.MouseEvent) => {
        event.preventDefault()
        if(hasNextPage){
          setPage(page + 1)
        }
      }
    const previousPage = (event: React.MouseEvent) => {
        event.preventDefault()
        if(hasPreviousPage){
          setPage(page - 1)
        }
      }
    
    const onYoutubeSelected = ( match:IMatchData) => {
      const {url, timestamp} = match
      setCurrentYoutubePlaying({url, timestamp})
    }
      
    return (
      <>
        <SearchBar></SearchBar>
        <h3>Look at the matches</h3>
        <p> Current Page {page}</p>
        <Button
          disabled={!hasPreviousPage}
          variant="outlined"
          data-testid="matchList-next-page" 
          onClick={previousPage}
        >Previous Page</Button>

        <Button
          disabled={!hasNextPage}
          variant="outlined"
          data-testid="matchList-next-page" 
          onClick={nextPage}
        >Next Page</Button>
      <Card sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black', padding: "20px" }}>
      <Box sx={{ display: 'flex', flexGrow: 1, maxWidth: "500px", padding: "20px" }}>


        {listData.results.length && <div 
          data-testid="matchList-listing"
        >
            { listData.results.map((match:IMatchData, key) => 
              <MatchListItemReadOnly 
                match={match} 
                key={key}
                onYoutubeSelected={onYoutubeSelected}
              />)
            }
        </div>

      }
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 2 }}>
        <YoutubeEmbedReadOnly 
          url={currentYoutubeVideo.url} 
          timestamp={currentYoutubeVideo.timestamp} />
      </Box>
    </Card>
    </>
)
  }