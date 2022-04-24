import React from "react"
import { FormItemOnChange, FormItemState } from "../AddMatch.helpers"
import { FormTextInput } from "./FormTextInput.component"
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Icon, InputAdornment } from "@mui/material"

interface FormYoutubeInputProps {
  onChange: (event: unknown, formItemOnChange: FormItemOnChange) => void,
  formState: Record<string, FormItemState>
}
export const FormYoutubeInput: React.FC<FormYoutubeInputProps> = ({ ...props }: FormYoutubeInputProps) => {
  const { onChange, formState } = props
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, formItemState: FormItemOnChange) => {
    onChange(e, {
      name: formItemState.name,
      value: e.target.value
    })
  }
  return (
    <>
      <FormTextInput
        onChange={e => handleChange(e, formState.url)}
        formItemState={formState.url}
        startAdornment={(
          <InputAdornment position="start">
            <Icon>
              <YouTubeIcon/>
            </Icon>
          </InputAdornment>
        )}
      ></FormTextInput>
      <FormTextInput 
        onChange={e => handleChange(e, formState.timestamp)} 
        formItemState={formState.timestamp}
        startAdornment={(
          <InputAdornment position="start">
            <Icon>
              <AccessTimeIcon/>
            </Icon>
          </InputAdornment>
        )}></FormTextInput>
      {/* {loadingVideoDetail.isLoaded &&
        <>
          <VideoDetailsDisplay details={videoDetails} />
          <YouTube
            videoId={videoDetails.youtubeId}                  // defaults -> ''
            // id={string}                       // defaults -> ''
            // className={string}                // defaults -> ''
            // containerClassName={string}       // defaults -> ''
            // containerStyle={object}           // defaults -> {}
            // title={string}                    // defaults -> ''
            // loading={string}                  // defaults -> undefined
            // opts={obj}                        // defaults -> {}
            onReady={ytOnReady}                    // defaults -> noop
            // onPlay={func}                     // defaults -> noop
            onPause={ytOnPause}                    // defaults -> noop
          // onEnd={func}                      // defaults -> noop
          // onError={func}                    // defaults -> noop
          // onStateChange={func}              // defaults -> noop
          // onPlaybackRateChange={func}       // defaults -> noop
          // onPlaybackQualityChange={func}    // defaults -> noop
          />
        </>
      } */}
    </>
  )
}