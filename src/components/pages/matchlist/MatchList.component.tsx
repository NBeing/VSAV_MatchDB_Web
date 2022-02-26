import React, { useEffect, } from 'react'

import MatchInfoService, {MatchListResponse} from '@MatchService/MatchInfo.service';
import { EMPTY_MATCHLIST } from '@MatchService/MatchInfo.service';

import { MatchListItemReadOnly } from '@Pages/matchlist/matchListItem/MatchListItemReadOnly';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  title: {},
  nextPage: {},
  listing_container: {},
  description: {}
})
export function MatchList() {
    const classes = useStyles()
    const [listData, setListData] = React.useState<MatchListResponse>(EMPTY_MATCHLIST)
    const [page, setPage] = React.useState<number>(1)
    
    useEffect(() => {
        const fetchData = async() => await MatchInfoService.getPage(page).then(
          res => setListData(res)
        )
        fetchData()
          .catch()
    }, [page])
    
    async function nextPage(event: React.MouseEvent) {
        event.preventDefault()
        setPage(page + 1)
      }
      
    return (
      <div>
        <h3 className={classes.title}> Look at the matches</h3>
        <p className={classes.description}> Current Page {page}</p>

        <button
          className={ classes.nextPage} 
          data-testid="matchList-next-page" 
          onClick={nextPage}
        >Next Page</button>

        <div 
          data-testid="matchList-listing"
          className={classes.listing_container}
        >
            { listData?.results.map((match, id) => MatchListItemReadOnly({match, id}))}
        </div>
      </div> 
    )
  }