import React from 'react'
import {render, cleanup} from '@Root/test.utils'
import App from '@Root/App/App'

afterEach(cleanup)

const server =  "http://localhost:8000"

describe("App Root Component", () => {
   test('should exist', async () => {
      const { getByTestId} = render(<App />)
      expect(getByTestId('app-wrapper')).toBeVisible()
   })
})