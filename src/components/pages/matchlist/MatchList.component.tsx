import React, { useEffect, } from 'react'

import {createUseStyles, useTheme} from 'react-jss'
import type { CustomTheme } from '@Theme/Theme'

import MatchInfoService, {MatchListResponse} from '@MatchService/MatchInfo.service'
import { EMPTY_MATCHLIST } from '@MatchService/MatchInfo.service'

import { MatchListItemReadOnly } from '@Pages/matchlist/matchListItem/MatchListItemReadOnly'
import IMatchData from '@MatchService/MatchData.type'

type RuleNames = 
  'nextPage'      |
  'listing'       |
  'description'   |
  'title'         |
  'listingContainer'

const useStyles = createUseStyles<RuleNames, MatchListProps, CustomTheme>({
  title: ({theme}) => ({
    background: theme.background || 'black'
  }),
  listing:  {},
  description: {},
  nextPage: {},
  listingContainer: {}
})

interface MatchListProps {}

export const MatchList:React.FC = ({...props}: MatchListProps) => {
  const theme:CustomTheme = useTheme<CustomTheme>()
  const classes = useStyles({...props, theme})

    const [listData, setListData] = React.useState<MatchListResponse>(EMPTY_MATCHLIST)
    const [page, setPage] = React.useState<number>(1)
    
    useEffect(() => {
        const fetchData = async() => await MatchInfoService.getPage(page).then(
          res => setListData(res)
        )
        fetchData()
          .catch()
    }, [page])
    
    function nextPage(event: React.MouseEvent) {
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

        {listData.results.length && <div 
          data-testid="matchList-listing"
          className={classes.listingContainer}
        >
            { listData.results.map((match:IMatchData, key) => 
              <MatchListItemReadOnly match={match} key={key} />)
            }
        </div>
      }
      </div> 
    )
  }