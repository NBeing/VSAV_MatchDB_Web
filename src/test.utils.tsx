import React, {FC, ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import nock from 'nock'

nock.disableNetConnect()

const AllTheProviders: FC = ({children}) => {
  return (
      <BrowserRouter>
        {children}
      </BrowserRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}