import React from 'react'
import nock from 'nock'
import {render, cleanup, waitFor, screen } from '@Root/test.utils'
import * as MockResponses from "./MatchList.resp"
import { MatchList } from "@Pages/matchlist/MatchList.component"
import { fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

afterEach(()=>{
   cleanup()
   nock.cleanAll()
})
beforeEach(() => {})

const server =  "http://localhost:8000/"

const getConfiguredNockObj = () => {
   return nock(`${server}`)
         .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true' 
         })
}
const renderComponent = () => render(<MatchList/>)

describe("MatchList Component", () => {

   test('Makes initial match page get', async () => {

      renderComponent()

      const init_scope = getConfiguredNockObj()
         .get('/vsav_info/matches/')
         .query({page : 1})
         .reply(200, MockResponses.initialPage)

      const match = await screen.findByText(/Timestamp: 89/)

      expect(match).toBeInTheDocument()
      init_scope.done()
   })

   test("Makes get request on next page btn press", async () => {

      renderComponent()


      const init_scope = getConfiguredNockObj()
         .get('/vsav_info/matches/')
         .query({page : 1})
         .reply(200, MockResponses.initialPage)

      const match1 = await screen.findByText(/Timestamp: 89/)

      expect(match1).toBeInTheDocument()
      init_scope.done()

      const second_page_scope = getConfiguredNockObj()
         .get('/vsav_info/matches/')
         .query({page : 2})
         .reply(200, MockResponses.secondPage)
      
      
      await act(async() => {
         const nextbtn = await screen.findByTestId('matchList-next-page')
         fireEvent.click(nextbtn)         
      })

      const match = await screen.findByText(/Timestamp: 477/)

      expect(match).toBeInTheDocument()

      second_page_scope.done()

   })
})