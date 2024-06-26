require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  connectToServer,
  clearAllCollections,
} = require("./config/mongodb.config");
const { handleError } = require("./middlewares/error.middleware");
const { accountRouter } = require("./routes");

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://192.168.0.107:5173",
    "https://ignix-aerolink.vercel.app",
    "https://ignix-aerolink.netlify.app",
  ],
  methods: "GET,POST,PUT,DELETE,PATCH,UPDATE,HEAD",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));

//yellow-f// DEFAULT ROUTE
app.get("/connection/test", async (req, res) => {
  res.send({ status: true, message: "API is working" });
});
app.delete("/connection/reset", async (req, res) => {
  clearAllCollections();
  res.send({ status: true, message: "All Collections Cleared" });
});

app.use("/static", express.static("public"));

app.use("/account", accountRouter);

app.use(handleError);
connectToServer(app, port);
