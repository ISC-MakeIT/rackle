import { baseUrl, defaultHeader} from './client';

const path = '/stations';

export const getStation = async() => {
  const requestUrl = baseUrl + path;

  const res = await fetch(requestUrl, {
    headers: defaultHeader,
    method: 'get',
  });
  const data = await res.json();

  if (res.status !== 200) throw new Error(data.result);

  return data;
};
