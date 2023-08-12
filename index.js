import express from "express";
import bodyParser from "body-parser";
import RoleBasedAccess from "./role.js";

const app = express();

const roleAccess = RoleBasedAccess({
  role: [
    { role: "admin", Privilages: ["add", "edit", "delete", "update"] },
    { role: "user", Privilages: ["view", "add"] },
    { role: "guest", Privilages: ["view"] },
  ],
  secretKey: "secret-key",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/secret-key', (req, res) => {
  
})

app.get("/", roleAccess("admin"), (req, res) => {
  res.send("hey");
});

app.listen(3000, () => {
  console.log("running");
});
