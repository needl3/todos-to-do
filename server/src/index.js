const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, ".env")});


// Configure the app
const app = require("./config/app");

// Connect to database
require("./config/database").connect((e, s) => {
    if (e) {
        console.log(e)
        console.error("[-] Cannot connect to database");
        process.exit(1)
    }
    console.log("[+] Connected to database");
});


// Configure the backend server
const server = require("http").createServer(app);
const host = process.env.HOST || "localhost";
const port = process.env.PORT || "5000";

// Start listening for requests
server.listen({ host, port }, () => {
    console.log("[+] Listening on http://" + host + ":" + port);
});
