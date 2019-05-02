import {baseUrl, defaultHeader} from './client';

const path = '/stations/train_lines';

export const getTrainLines = async(id: number) => {
  const queryParams = `?station_id=${id}`;
  const requestUrl = baseUrl + path + queryParams;

  const res = await fetch(requestUrl, {
    headers: defaultHeader,
    method: 'get',
  });

  const data = await res.json();

  if (res.status !== 200) throw new Error(data.result);

  return data;
};

