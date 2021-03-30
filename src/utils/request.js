// import { fetch } from 'whatwg-fetch';

export default (url, options) => fetch(url, options).then(r => r.json());
