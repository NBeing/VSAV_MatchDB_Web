import api from "@Common/http.common";
import IMatchData from "@MatchService/MatchData.type"

const BASE_URL = `/vsav_info/matches/`

class MatchInfoService {

  async getAll(): Promise<Array<IMatchData>> {
    const { data } = await api.get<Array<IMatchData>>(BASE_URL);
    return data 
  }

  async get(id:string): Promise<IMatchData> {
    const { data } = await api.get<IMatchData>(`${BASE_URL}${id}`);
    return data
  }

  async create(match: IMatchData): Promise<IMatchData> {
    const { data } = await api.post<IMatchData>(`${BASE_URL}`, match);
    return data
  }

  async update(match: IMatchData, id: string): Promise<IMatchData> {
    const { data } = await api.put<IMatchData>(`${BASE_URL}${id}/`, match);
    return data
  }

  async delete(id:string): Promise<IMatchData> {
    const { data } = await api.delete<IMatchData>(`${BASE_URL}${id}`);
    return data
  }
}
export default new MatchInfoService();
