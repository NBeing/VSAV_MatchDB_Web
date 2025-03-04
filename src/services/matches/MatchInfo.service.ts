import api from "@Common/http.common";
import IMatchData from "@MatchService/MatchData.type"

const BASE_URL = `/vsav_info/matches/`

export type MatchListResponse = {
  count: number
  next: string
  previous: null
  results: IMatchData[]
}

export type GetAllProps = {
  page? : number,
}

export const EMPTY_MATCHLIST:MatchListResponse = {
  count: 0,
  next: '',
  previous: null,
  results: []
}

interface IVideoDetail {
  uploader: string,
  date_uploaded: string,
  video_title: string
}
interface IMatchInfoService {
  getPage   : (page_num: number) => Promise<MatchListResponse>
  getById   : (id:string) => Promise<IMatchData>
  create    : (match: IMatchData) => Promise<IMatchData>
  update    : (match: IMatchData, id: string) => Promise<IMatchData>
  delete    : (id:string) => Promise<IMatchData>
  ytDetails : (url:string) => Promise<IVideoDetail>
}

export type RetrievalFuncType = (config:MatchInfoServiceConfig) => Promise<IMatchData>

export type MatchInfoServiceConfig = {
  p1_char? : string,
  p2_char? : string,
  winning_char?: string, 
  page?    : number
}

class MatchInfoService implements IMatchInfoService {
  
  async ytDetails(url:string): Promise<IVideoDetail> {
    console.log(`Looking for: ${url}`)
    try {
      const endpoint = BASE_URL + `get-yt-info/?url=${url}`
      const { data } = await api.post<IVideoDetail>(endpoint, {url})
      return data 
    } catch (e) {
      throw new Error(JSON.stringify(e))
    }
  }

  async getPage(page_num: number): Promise<MatchListResponse> {
    try {
      const endpoint = BASE_URL + `?page=${page_num}`
      const { data } = await api.get<MatchListResponse>(endpoint)
      return data 
    } catch (e) {
      throw new Error(JSON.stringify(e))
    }
  }

  async getById(id:string): Promise<IMatchData> {
    try {
      const endpoint = `${BASE_URL}${id}`
      const { data } = await api.get<IMatchData>(endpoint);
      return data
    } catch (e) {
      throw new Error(JSON.stringify(e))
    }
  }
  async getByMatchup(config:MatchInfoServiceConfig):Promise<IMatchData> {
    try {
      const { p1_char , p2_char , page } = config
      const endpoint = `${BASE_URL}get-matchup/?char1=${p1_char}&char2=${p2_char}${page ? `page=${page}` : ''}`
      const { data } = await api.get<IMatchData>(endpoint);
      return data
    } catch (e) {
      throw new Error(JSON.stringify(e))
    }
  }
  async getByCharacter(char: string):Promise<IMatchData> {
    try {
      const endpoint = `${BASE_URL}by-character/?char=${char}`
      const { data } = await api.get<IMatchData>(endpoint);
      return data
    } catch (e) {
      throw new Error(JSON.stringify(e))
    }
  }
  async getByUrl(url:string): Promise<IMatchData> {
    try {
      const endpoint = `${BASE_URL}by-url/?url=${url}`
      const { data } = await api.get<IMatchData>(endpoint);
      return data
    } catch (e) {
      throw new Error(JSON.stringify(e))
    }
  }

  async create(match: IMatchData): Promise<IMatchData> {
    try {
      const endpoint = `${BASE_URL}`
      const { data } = await api.post<IMatchData>(endpoint, match);
      return data
    } catch (e) {
      throw new Error(JSON.stringify(e))
    }
  }

  async update(match: IMatchData, id: string): Promise<IMatchData> {
    try {
      const endpoint = `${BASE_URL}${id}/`
      const { data } = await api.put<IMatchData>(endpoint, match);
      return data
    } catch (e) {
      throw new Error(JSON.stringify(e))
    }
  }

  async delete(id:string): Promise<IMatchData> {
    try {
      const endpoint = `${BASE_URL}${id}`
      const { data } = await api.delete<IMatchData>(endpoint);
      return data
    } catch (e) {
      throw new Error(JSON.stringify(e))
    }
  }
}
export default new MatchInfoService();
