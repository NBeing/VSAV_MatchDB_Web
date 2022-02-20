// from tdorseys SO answer
// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
// https://regexr.com/3u0d4
const re = /(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i

const isYoutube = (url: string):boolean=> re.test(url)
const getYoutubeID = (url:string):string | null => url ? url.match(re)![7] : null

export default {
    isYoutube,
    getYoutubeID
}
