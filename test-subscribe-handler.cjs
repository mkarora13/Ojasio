const handler = require('./api/subscribe.ts').default; 

const req = {
  method: 'POST',
  body: { email: 'newer3@test.com' }
};

const res = {
  status: function(s) {
    console.log("Status:", s);
    return this;
  },
  json: function(j) {
    console.log("JSON:", j);
  }
};

handler(req, res).catch(console.error);
