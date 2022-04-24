import React, { useRef, useState } from "react"
import { FormItemOnChange, FormItemState, VideoDetails } from "../AddMatch.helpers"
import { useDebouncedEffect } from "@Common/hooks/useDebouncedEffect"
import MatchInfoService from "@MatchService/MatchInfo.service"
import YoutubeUtil from "@Common/util/youtube.util"
import { VideoDetailsDisplay } from "./VideoDetails.component"
import YouTube from "react-youtube"
import useInterval from "@Common/hooks/useInterval"

interface YoutubeEmbedProps {
  updateTimestamp: (timestamp: number) => void,
  formState: Record<string, FormItemState>
}
export const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ ...props }: YoutubeEmbedProps) => {
  const { updateTimestamp, formState } = props
  const ytReference = useRef(null);

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
          uploader: uploader,
          dateUploaded: date_uploaded,
          videoTitle: video_title,
          youtubeId: YoutubeUtil.getYoutubeID(formState.url.value as string)
        }
      })
      setLoadingVideoDetail((state) => ({ ...state, isLoaded: true }))
    }
  }, [formState.url], 2000)

  const ytOnPause = (event) => {
    console.log(event.target)
    // event.target.seekTo(Math.floor(event.target.getCurrentTime() + 10))
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, formItemState: FormItemOnChange) => {
      onChange(e, {
        name: formItemState.name,
        value: e.target.value
      })
    }
    }
  const [runInterval, setRunInterval] = useState(false)
  useInterval(
    () => {
      if (ytReference.current !== null) {
        updateTimestamp(Math.floor(ytReference.current.getCurrentTime()))
      }
    },
    // Delay in milliseconds or null to stop it
    runInterval ? 500 : null
  )
  const ytOnReady = (event) => {
    console.log("on ready Event", event.target)
    // Update reference value:
    ytReference.current = event.target;
    setRunInterval(true)
  }

  return (
    <>
      {loadingVideoDetail.isLoaded &&
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
            opts={{width: "100%", height: "900px", playerVars: {autoPlay: 1}}}                        // defaults -> {}
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
      }
    </>
  )
}