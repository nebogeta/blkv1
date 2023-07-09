export const nodejs = `const axios = require("axios");

const options = {
    method: 'POST',
    url: 'https://blacklion.com/api/v1/expense',
    data: {
      Amount: '$99.99',
      Date: '06/06/2023',
      Description: 'Instacart',
      Group: '6430',
    },
    headers: {
      'Authorization': 'Session_Token',
    }
  };
  
axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});`

export const python = `import requests

url = 'https://blacklion.com/api/v1/expense'
authorization = 'Session_Token'
Amount = '$99.99'
Date = '00/00/0000'
Description = 'Instacart'
Group = '6430'

headers = {
    'Authorization': Session_Token
}

payload = {
    'Amount': $99.99,
    'Date': 00/00/0000,
    'Description': Instacart,
    'Group': 6430
}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f'Request failed with status code {response.status_code}')`