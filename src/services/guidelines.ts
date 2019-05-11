import {baseUrl, defaultHeader} from './client';
import { MapData, newDate } from '../dummydata/mapData';


const path = '/guidelines';

export const getGuidelines = async(startLineId: number, endLineId: number, flg = false) => {
  const queryParams = `?start_gate_id=${startLineId}&end_gate_id=${endLineId}`;
  const requestUrl = baseUrl + path + queryParams;

  const res = await fetch(requestUrl, {
    headers: defaultHeader,
    method: 'get',
  });

  let data = await res.json();
  if (flg) data = MapData;

  return data;
};
