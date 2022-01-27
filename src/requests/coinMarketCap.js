
/* Example in Node.js ES6 using request-promise */

//const rp = require('request-promise');
export const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '5000',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': 'ab728d41-328b-41c7-a25c-d3e814aef330'
  },
  json: true,
  gzip: true
};

export const apiKeyHeader = {
  'X-CMC_PRO_API_KEY': 'ab728d41-328b-41c7-a25c-d3e814aef330'
};

// rp(requestOptions).then(response => {
//   console.log('API call response:', response);
// }).catch((err) => {
//   console.log('API call error:', err.message);
// });