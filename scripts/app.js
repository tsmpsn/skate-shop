// require(['require'], function (require) {
//     var http = require("https");
//     console.log("ran print in APP");

//     var options = {
//       "method": "GET",
//       "hostname": "api.browse.ai",
//       "port": null,
//       "path": "/v1/teams/b4966b9d-3444-49da-89d8-730f14a1bbbb/tasks/",
//       "headers": {
//         "authorization": "Bearer 98c4412d-5f19-47c6-b559-38bee923e3d7"
//       }
//     };
//     var req = http.request(options, function (res) {
//       var chunks = [];
    
//       res.on("data", function (chunk) {
//         chunks.push(chunk);
//       });
    
//       res.on("end", function () {
//         var body = Buffer.concat(chunks);
//         console.log(body.toString());
//       });
//     });
    
//     req.end();
// });

// console.log("before https");
// import { request } from "https";
// console.log("after https");


// var options = {
//   "method": "GET",
//   "hostname": "api.browse.ai",
//   "port": null,
//   "path": "/v1/teams/b4966b9d-3444-49da-89d8-730f14a1bbbb/tasks/",
//   "headers": {
//     "authorization": "Bearer 98c4412d-5f19-47c6-b559-38bee923e3d7"
//   }
// };
// var req = request(options, function (res) {
//   var chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });

// req.end();