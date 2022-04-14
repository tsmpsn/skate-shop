const request = require('request');

const options = {
  method: 'GET',
  url: 'https://www.googleapis.com/drive/v3/files/fileId',
  headers: {Authorization: 'Bearer 98c4412d-5f19-47c6-b559-38bee923e3d7'}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// const http = require("https");



// const options = {
//   "method": "POST",
//   "hostname": "api.browse.ai",
//   "port": null,
//   "path": "/v1/teams/{teamId}/tasks",
//   "headers": {
//     "Authorization": "Bearer 98c4412d-5f19-47c6-b559-38bee923e3d7"
//   }
// };

// const req = http.request(options, function (res) {
//   const chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     const body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });

// req.write(JSON.stringify({
//   variables: {
//     originUrl: 'https://www.espressozone.com/espresso-machines/semi-automatic-espresso-machines'
//   }
// }));
// req.end();
