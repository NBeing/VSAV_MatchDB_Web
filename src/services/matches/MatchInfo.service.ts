import api from "@Common/http.common";
import IMatchData from "@MatchService/MatchData.type"
import { AxiosError } from "axios";

const BASE_URL = `/vsav_info/matches/`

export interface MatchListResponse {
  count: number,
  next: string,
  previous: null,
  results: IMatchData[]
}
export interface GetAllProps {
  page? : number,
}
export const EMPTY_MATCHLIST = {
  count: 0,
  next: '',
  previous: null,
  results: []
}

class MatchInfoService {

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
