// from tdorseys SO answer
// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
// https://regexr.com/3u0d4
const re = /(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i

const isYoutube = (url: string):boolean=> re.test(url)
const getYoutubeID = (url:string):string | null => url ? url.match(re)![7] : null

// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name:string, url:string) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const getYoutubeTimestamp = (url:string) => {
    return getParameterByName('t', url)
}

export default {
    isYoutube,
    getYoutubeID,
    getYoutubeTimestamp
}
