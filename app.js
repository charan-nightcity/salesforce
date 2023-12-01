const _ = require('lodash');
const express = require('express');
const axios = require('axios');
const app = express();

const ids = [
  '0012w00000n7wKVAAY',
  '001C5000008KkhzIAC'
];

app.get('/salesforceData', async (req, res) => {
  const config = {
    method: 'get',
    url: `https://yellowmessenger--ymuat.sandbox.my.salesforce.com/services/data/v59.0/query/?q=SELECT%20FIELDS%28ALL%29%2C%20%28SELECT%20FIELDS%28ALL%29%20FROM%20Cases%20LIMIT%2010%29%2C%20%28SELECT%20FIELDS%28ALL%29%20FROM%20Contacts%20LIMIT%2010%29%20FROM%20Account%20WHERE%20Id%3D%27${_.get(req, 'query.accountId', '0012w00000n7wKVAAY')}%27`,
    headers: { 
      'Authorization': 'Bearer 00D7200000235jZ!AQEAQGAg7P7f9YsrisZpg4Dvt0oQblQuVc68XCF714enLGqcMMic0A42IaA0mNOCUczyXRwPAXh8DVb1IHj87tP.KISj9stj', 
      'X-PrettyPrint': '1',
      'Cookie': 'BrowserId=fPD-Fo-oEe6rxNc3KNhflg; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
    }
  };

  try {
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching data from Salesforce');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

