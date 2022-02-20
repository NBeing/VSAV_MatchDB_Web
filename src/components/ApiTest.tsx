import React from 'react'

import MatchInfoService, {EMPTY_MATCHLIST, MatchListResponse} from '@MatchService/MatchInfo.service';
import IMatchData from '@MatchService/MatchData.type';

import { CharNamesEnum } from "@CommonEnums/charNames.enum";
import { MatchLinkTypeEnum } from "@CommonEnums/matchLinkType.enum";

const dummy_match_data = {
    type: MatchLinkTypeEnum.VI,
    url: "https://youboob.com",
    p1_char: CharNamesEnum.SA,
    p2_char: CharNamesEnum.AU,
    p1_name: "me",
    p2_name: "you",
    winning_char: CharNamesEnum.SA,
    timestamp: Math.floor(Math.random()* 100)
}
export function ApiTest() {
    const [postData,   setPostData]   = React.useState<IMatchData|null>(null)
    const [updateData, setUpdateData] = React.useState<IMatchData|null>(null)
    const [listData,   setListData]   = React.useState<MatchListResponse>(EMPTY_MATCHLIST)
    const [deleteData, setDeleteData] = React.useState<IMatchData|null>(null)
    const [getData,    setGetData]    = React.useState<IMatchData|null>(null)

    async function doPost(event: React.MouseEvent) {
      event.preventDefault()
      const matchData = await MatchInfoService.create(dummy_match_data)
      setPostData(matchData)
    }
    async function doGet(event: React.MouseEvent) {
        event.preventDefault()
        const matchData = await MatchInfoService.getById("cb3431ff-91cc-46f3-a2ba-64d1e1c1967e")
        setGetData(matchData)
    }
      async function doList(event: React.MouseEvent) {
        event.preventDefault()
        const matchData = await MatchInfoService.getPage(1)
        setListData(matchData)
    }
    async function doDelete(event: React.MouseEvent) {
        event.preventDefault()
        const matchData = await MatchInfoService.delete("cb3431ff-91cc-46f3-a2ba-64d1e1c1967e")
        setDeleteData(matchData)
    }
    async function doUpdate(event: React.MouseEvent) {
        event.preventDefault()
        const matchData = await MatchInfoService.update({
            type: MatchLinkTypeEnum.VI,
            url: "https://youboob.com",
            p1_char: CharNamesEnum.SA,
            p2_char: CharNamesEnum.BI,
            p1_name: "me",
            p2_name: "you",
            winning_char: CharNamesEnum.SA,
            timestamp: Math.floor(Math.random()* 100)
        }, "cb3431ff-91cc-46f3-a2ba-64d1e1c1967e")
        setUpdateData(matchData)
    }
    return (
      <div>
        <h3>Protected Page, Goodbye to you if u no has</h3>;
        <button onClick={doPost}>Test Post!</button>
        <pre>
            {JSON.stringify(postData, null, 2)}
        </pre>
        <button onClick={doGet}>Test Get!</button>
        <pre>
            {JSON.stringify(getData, null, 2)}
        </pre>
        <button onClick={doList}>Test List!</button>
        <pre>
            {JSON.stringify(listData, null, 2)}
        </pre>
        <button onClick={doDelete}>Test Delete!</button>
        <pre>
            {JSON.stringify(deleteData, null, 2)}
        </pre>
        <button onClick={doUpdate}>Test Update!</button>
        <pre>
            {JSON.stringify(updateData, null, 2)}
        </pre>
      </div> 
    )
  }