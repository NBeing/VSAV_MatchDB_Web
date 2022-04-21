import React from "react"
import { Box } from '@mui/material'
import { VideoDetails } from "../AddMatch.helpers"

interface VideoDetailProps {
    detail: string
}
export const VideoDetail: React.FC<VideoDetailProps> = ({ ...props }: VideoDetailProps) => {
    return (
        <>
            <span>{props.detail}</span>
        </>
    )
}

interface VideoDetailsProps {
    details: VideoDetails
}
export const VideoDetailsDisplay: React.FC<VideoDetailsProps> = ({ ...props }: VideoDetailsProps) => {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'background',
                    '&:hover': {
                    // backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}>
                    <span>{props.details.videoTitle}</span>
                    <span>{props.details.uploader}</span>
                    <span>{props.details.dateUploaded}</span>
            </Box>
        </>
    )
}