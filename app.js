const express = require("express");
const cors = require("cors");
const { Database } = require("./src/config");
const { handleError } = require("./src/middlewares/error.middleware");
const { AccountRouter } = require("./src/routers");
const { ResponseEntity } = require("./src/helpers");

class App {
  app = express();
  port = null;

  constructor() {
    // app = express();
    this.port = process.env.PORT || 8000;
  }

  configure() {
    const corsOptions = {
      origin: [
        "http://localhost:5173",
        "http://192.168.29.15:5173",
        "https://ignix-aerolink.vercel.app",
        "https://ignix-aerolink.netlify.app",
        "https://aerolinkonline.netlify.app",
      ],
      methods: "GET,POST,PUT,DELETE,PATCH,UPDATE,HEAD",
      allowedHeaders:
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      credentials: true,
    };
    // Section: Middlewares
    this.app.use(express.json());
    this.app.use(cors(corsOptions));

    // Section: Default Routes
    this.app.use((req, res, next) => {
      console.log("==========================================");
      console.log(`Request: ${req.method} ${req.url}`);
      console.log("------------------------------------------");
      next();
    });
    this.app.use("/public", express.static("public"));
    this.app.head("/", async (req, res) => {
      new ResponseEntity.Ok(res).setMessage("Uptime Robot Hit Working").send();
    });
    this.app.get("/connection/test", async (req, res) => {
      res.send({ status: true, message: "API is working" });
    });
    this.app.delete("/connection/reset", async (req, res) => {
      clearAllCollections();
      res.send({ status: true, message: "All Collections Cleared" });
    });

    // Section: Service Routes
    this.app.use("/account", new AccountRouter().configure().getRouter());

    // Section: Error Handler
    this.app.use(handleError);
  }

  async start() {
    try {
      const db = new Database();
      await db.connect();

      this.app.listen(this.port, () => {
        console.log("Server is live on port: " + this.port);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

// const app = new App();
module.exports = App;
