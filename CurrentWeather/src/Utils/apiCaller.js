import Config from 'react-native-config';
import {API_CALLER_TIMEOUT} from '../Constants';
import { create } from 'apisauce'

const apiBaseUrl = Config.API_BASEURL;

const APICaller = (
  method = 'get',
  reqUrl,
  data = {},
  headers = {
    'content-type': 'application/json',
    Accept: 'application/json',
  },
) => {
  return new Promise(async (resolve, reject) => {
    let baseURL =apiBaseUrl;
    if (__DEV__)
      console.log(baseURL, 'data', data, 'method', method, 'header', headers);

    let options = {
      method,
      baseURL,
      data,
      headers,
      timeout: API_CALLER_TIMEOUT,
    };
    const api = create({...options})
    if (method.toLowerCase() === 'get') delete options['data'];
    api
    .get(reqUrl)
      .then(response => {
        if (__DEV__) console.log('%c{res}', 'color: green', ' => ', response); // eslint-disable-line no-console
        resolve(response);      
      })
      .catch(error => {
        if (__DEV__)
          console.log(
            '%c{err}',
            'color: red',
            ` => [${apiBaseUrl}/${reqUrl}] >>`,
            error,
          ); // eslint-disable-line no-console

        reject(error);
      });
  });
};
export default APICaller;
