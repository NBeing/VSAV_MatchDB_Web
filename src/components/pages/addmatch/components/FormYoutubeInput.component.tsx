import React, { useState } from "react"
// import { Box } from '@mui/material'
import { FormItemOnChange, FormItemState, VideoDetails } from "../AddMatch.helpers"
import { FormTextInput } from "./FormTextInput.component"
import { useDebouncedEffect } from "@Common/hooks/useDebouncedEffect"
import MatchInfoService from "@MatchService/MatchInfo.service"
import YoutubeUtil from "@Common/util/youtube.util"
import { VideoDetailsDisplay } from "./VideoDetails.component"

interface FormYoutubeInputProps {
    onChange: (
        event: (React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>), 
        formItemOnChange:FormItemOnChange
    ) => void,
    formItemState: Record<string, FormItemState>
}
export const FormYoutubeInput: React.FC<FormYoutubeInputProps> = ({ ...props }: FormYoutubeInputProps) => {
    const { onChange } = props
    const formState = props.formItemState
    
    const [loadingVideoDetail, setLoadingVideoDetail] = useState({ isLoading: false, isLoaded: false })
    const [videoDetails, setVideoDetails] = useState<VideoDetails>({} as VideoDetails)
    useDebouncedEffect(async () => {
      const url = formState.url.value as string
  
      if (url && YoutubeUtil.isYoutube(url)) {
        setLoadingVideoDetail((state) => ({ ...state, isLoading: true }))
        const { uploader, date_uploaded, video_title } = await MatchInfoService.ytDetails(url)
        setVideoDetails((state) => {
          return {
            ...state,
            uploader:  uploader,
            dateUploaded: date_uploaded ,
            videoTitle: video_title
          }
        })
        setLoadingVideoDetail((state) => ({ ...state, isLoaded: true }))
      }
    }, [formState.url, formState.type], 2000)

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, formItemState: FormItemOnChange) => { 
        onChange(e, {
            name: formItemState.name,
            value: e.target.value
        })
    }
    return (
        <>
            <FormTextInput onChange={e => handleChange(e, formState.url)} formItemState={formState.url}></FormTextInput>
            <FormTextInput onChange={e => handleChange(e, formState.timestamp)} formItemState={formState.timestamp}></FormTextInput>
            { loadingVideoDetail.isLoaded &&
                <VideoDetailsDisplay details={videoDetails}/>
            }
        </>
    )
}