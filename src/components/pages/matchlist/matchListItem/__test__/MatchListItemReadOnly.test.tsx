import React from 'react'
import { CharNamesEnum } from '@Common/enums/charNames.enum'
import { MatchLinkTypeEnum } from '@Common/enums/matchLinkType.enum'
import IMatchData from '@MatchService/MatchData.type'
import {render, cleanup, screen} from '@Root/test.utils'
import { MatchListItemReadOnly } from '../MatchListItemReadOnly'

afterEach(cleanup)
beforeEach(() => {})


const match:IMatchData = {
    "id": "5dd6a189-674a-4f5a-b859-66b0db7cff6d",
    "type": MatchLinkTypeEnum.VI,
    "url": "https://youtu.be/Cm9UTXJZgzw",
    "p1_char": CharNamesEnum.FE,
    "p2_char": CharNamesEnum.GA,
    "winning_char": CharNamesEnum.GA,
    "p1_name": "",
    "p2_name": "",
    "timestamp": 183,
    "date_uploaded": "2020-12-26T00:00:00Z",
    "video_title": "",
    "uploader": "TESTER"
}

const data_test_ids = [
    "MatchListItemReadOnly-title",
    "MatchListItemReadOnly-link",
    "MatchListItemReadOnly-p1_char",
    "MatchListItemReadOnly-p2_char",
    "MatchListItemReadOnly-winning_char",
    "MatchListItemReadOnly-p1_name",
    "MatchListItemReadOnly-p2_name",
    "MatchListItemReadOnly-timestamp",
    "MatchListItemReadOnly-date_uploaded",
    "MatchListItemReadOnly-video_title",
    "MatchListItemReadOnly-uploader",
    "MatchListItemReadOnly-date_uploaded"
]
describe("MatchListItemReadOnly Component", () => {
   test('Displays All Props in list', async () => {
       const { getByTestId } = render(<MatchListItemReadOnly match={match} key={1}/>)
        data_test_ids.forEach( async (testid:string) => {
                const cur_test = await getByTestId(testid)
                expect(cur_test).toBeInTheDocument()
        })
    })
})