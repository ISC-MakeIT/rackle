import { baseUrl, defaultHeader } from './client';

const path = '/stations/train_lines/gates';

export const getGates = async(stationId: number, lineId: number) => {
  const queryParams = `?station_id=${stationId}&train_line_id=${lineId}`;
  const requestUrl = baseUrl + path + queryParams;

  const res = await fetch(requestUrl, {
    headers: defaultHeader,
    method: 'get',
  });

  const data = await res.json();

  // if (res.status !== 200) throw new Error(data.result);

  return data.gates;
};


