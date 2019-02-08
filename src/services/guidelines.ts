import {baseUrl, defaultHeader} from './client';

const path = '/guidelines';

export const getGuidelines = async(startLineId: number, endLineId: number) => {
  const queryParams = `?start_gate_id=${startLineId}&end_gate_id=${endLineId}`;
  const requestUrl = baseUrl + path + queryParams;

  const res = await fetch(requestUrl, {
    headers: defaultHeader,
    method: 'get',
  });

  const data = await res.json();

  return data;
};
