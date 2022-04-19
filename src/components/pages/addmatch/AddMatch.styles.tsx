import { CustomTheme } from '@Root/theme/Theme'
import { createUseStyles } from 'react-jss'
import { AddMatchProps } from './AddMatch.component'

export type RuleNames =
  'title' |
  'description' |
  'container' |
  'form'

export const useStyles = createUseStyles<RuleNames, AddMatchProps, CustomTheme>({
  title: ({
    // background: 'black'
  }),
  description: {},
  container: ({
    // background: 'black'
  }),
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  }
})
