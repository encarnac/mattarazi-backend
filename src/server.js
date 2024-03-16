import express from "express";
import payload from "payload";

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;

// // Redirect root to Admin panel
// app.get("/", (_, res) => {
//   res.redirect("/admin");
// });

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here
  app.listen(PORT, async () => {
    payload.logger.info(`App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
  });
};

start();
