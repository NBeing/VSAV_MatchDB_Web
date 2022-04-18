import { CustomTheme } from '@Root/theme/Theme'
import { createUseStyles } from 'react-jss'
import { AddMatchProps } from './AddMatch.component'

export type RuleNames =
  'title' |
  'textInput' |
  'description' |
  'container' |
  'form' |
  'select'


export const useStyles = createUseStyles<RuleNames, AddMatchProps, CustomTheme>({
  title: ({ theme }) => ({
    background: theme.background || 'black'
  }),
  textInput: {
    color: "white",
    // alignSelf: "flex-start",
    // '& input':{
    //   alignSelf: "stretch",
    // } 
  },
  select: {},
  description: {},
  container: ({ theme }) => ({
    backgroundColor: 'black' || theme.background,
  }),
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  }
})
