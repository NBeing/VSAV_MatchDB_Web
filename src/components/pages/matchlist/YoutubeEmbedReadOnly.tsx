import React, { useRef, useState } from "react"
import { VideoDetails } from "@Components/pages/addmatch/AddMatch.helpers"
import { useDebouncedEffect } from "@Common/hooks/useDebouncedEffect"
import MatchInfoService from "@MatchService/MatchInfo.service"
import YoutubeUtil from "@Common/util/youtube.util"
import { VideoDetailsDisplay } from "@Components/pages/addmatch/components/VideoDetails.component"
import YouTube from "react-youtube"

interface YoutubeEmbedReadOnlyProps {
  url: string,
  timestamp: number
}
export const YoutubeEmbedReadOnly: React.FC<YoutubeEmbedReadOnlyProps> = ({ ...props }: YoutubeEmbedReadOnlyProps) => {
  const {  url, timestamp } = props
  const ytReference = useRef(null);

  const [loadingVideoDetail, setLoadingVideoDetail] = useState({ isLoading: false, isLoaded: false })
  const [videoDetails, setVideoDetails] = useState<VideoDetails>({} as VideoDetails)

  useDebouncedEffect(async () => {
    if (url && YoutubeUtil.isYoutube(url)) {
      setLoadingVideoDetail((state) => ({ ...state, isLoading: true }))
      const { uploader, date_uploaded, video_title } = await MatchInfoService.ytDetails(url)
      const result = await MatchInfoService.getByUrl(url)
      console.log("Result", result)
      setVideoDetails((state) => {
        return {
          ...state,
          uploader: uploader,
          dateUploaded: date_uploaded,
          videoTitle: video_title,
          youtubeId: YoutubeUtil.getYoutubeID(url as string)
        }
      })
      setLoadingVideoDetail((state) => ({ ...state, isLoaded: true }))
    }
  }, [url, timestamp], 2000)

  const ytOnReady = (event) => {
    console.log("on ready Event", event.target)
    // Update reference value:
    ytReference.current = event.target;
    event.target.seekTo(timestamp)
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
            opts={{width: "100%", height: "1000px", playerVars: {autoPlay: 1}}}                        // defaults -> {}
            onReady={ytOnReady}                    // defaults -> noop
            // onPlay={func}                     // defaults -> noop
            // onPause={ytOnPause}                    // defaults -> noop
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