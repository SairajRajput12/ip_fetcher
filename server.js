// const express = require("express");
// const cors = require("cors");
// const os = require("os");
// const requestIp = require("request-ip");
// const app = express();
// app.set("trust proxy", true);

// app.use(
//   cors({
//     origin: "*",
//   })
// );

// app.get("/get-ip", (req, res) => {
//   const networkInterfaces = os.networkInterfaces();
//   const ipAddresses = [];

//   for (const name in networkInterfaces) {
//     const ifaceList = networkInterfaces[name];
//     if (ifaceList) {
//       for (const iface of ifaceList) {
//         if (iface.family === "IPv4" && !iface.internal) {
//           ipAddresses.push(iface.address);
//         }
//       }
//     }
//   }

//   res.json({ ip_address: ipAddresses[0] });
// });

// app.get("/get-user-ip", (req, res) => {
//   // const ip = req.ip;
//   // res.json({ ip: ip });

//   const clientIp =
//     req.headers["x-forwarded-for"] || req.connection.remoteAddress;
//   res.send({ ip: clientIp });
// });

// app.get("/get-client-ip", (req, res) => {
//   const forwarded = req.headers["x-forwarded-for"];

//   const ip = forwarded ? forwarded.split(",")[0] : req.socket.remoteAddress;
//   res.json({ ip: ip });
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

// // const express = require("express");
// // const cors = require("cors");
// // const os = require("os");

// // const app = express();

// // app.use(
// //   cors({
// //     origin: "http://localhost:4200",
// //   })
// // );

// // app.get("/get-ip", (req, res) => {
// //   const networkInterfaces = os.networkInterfaces();
// //   const ipAddresses = [];

// //   for (const name in networkInterfaces) {
// //     const ifaceList = networkInterfaces[name];
// //     if (ifaceList) {
// //       for (const iface of ifaceList) {
// //         if (iface.family === "IPv4" && !iface.internal) {
// //           ipAddresses.push(iface.address);
// //         }
// //       }
// //     }
// //   }

// //   res.json({ ip_address: ipAddresses[0] }); // ✅ Send first non-internal IPv4
// // });

// // app.listen(3000, () => {
// //   console.log("Server running on http://localhost:3000");
// // });

// new code

function getRealIp(req) {
  // Check common headers for the real IP
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || // For proxies/load balancers
    req.connection?.remoteAddress || // Direct connection
    req.socket?.remoteAddress || // Fallback for older Node.js versions
    req.connection?.socket?.remoteAddress; // Edge case fallback

  console.log(req.headers["x-forwarded-for"]);
  return ip;
}

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const userIp = getRealIp(req);
  res.json({ ip: userIp });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
