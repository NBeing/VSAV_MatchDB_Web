import React, { useEffect } from 'react'

import MatchInfoService, {MatchListResponse} from '@MatchService/MatchInfo.service';
import { EMPTY_MATCHLIST } from '@MatchService/MatchInfo.service';
import { CharNamesEnumDisplay } from '@Common/enums/charNames.enum';
import { MatchLinkTypeEnumDisplay } from '@Common/enums/matchLinkType.enum';

export function MatchList() {
    const [listData, setListData] = React.useState<MatchListResponse>(EMPTY_MATCHLIST)
    const [page, setPage] = React.useState<number>(1)
    
    useEffect(() => {
        MatchInfoService.getPage(page).then(
            res => setListData(res)
        )
    }, [page])
    
    async function nextPage(event: React.MouseEvent) {
        event.preventDefault()
        setPage(page + 1)
      }
      
    return (
      <div>
        <h3>Look at the matches</h3>
        <h3> Current Page {page}</h3>
        <button onClick={nextPage}>Next Page</button>
        <div>
            {
            listData.results.map(function(match, i){
                console.log(match)
                return (
                    <ul key={i}>
                        <li>Type:  {MatchLinkTypeEnumDisplay[match.type]}</li>
                        <li>Link: {match.url}</li>
                        <li>Player 1: {CharNamesEnumDisplay[match.p1_char]}</li>
                        <li>Player 2: {CharNamesEnumDisplay[match.p2_char]}</li>
                        <li>Winning Character: {match.winning_char}</li>
                        <li>Player 1 Name: {match.p1_name}</li>
                        <li>Player 2 Name: {match.p2_name}</li>
                        <li>Timestamp: {match.timestamp}</li>
                        <li>Date Uploaded: {match.date_uploaded}</li>
                        <li>Video Title: {match.video_title}</li>
                        <li>Uploaded By: {match.uploader}</li>
                    </ul>
                    )
                })
            }
        </div>
      </div> 
    )
  }