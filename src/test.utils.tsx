import React, {FC, ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import nock from 'nock'
import { ThemeProvider } from 'react-jss'
import {theme} from "@Theme/Theme"


const AllTheProviders: FC = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

nock.disableNetConnect()

export * from '@testing-library/react'
export {customRender as render}