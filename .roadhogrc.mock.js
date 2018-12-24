import { delay } from "roadhog-api-doc";
import { user } from "./mock/user";

const noProxy = process.env.NO_PROXY === "true";
const proxy = {
  "GET /api/userMsg": (req, res) => {
      console.log(req.query);
    const { password, username } = req.body;
    const isOk = password === "888888" && username === "admin";
    res.send({ status:  isOk ? "ok" : "error", type: "account"});
  },
  "GET /api/userList": user
};
export default noProxy ? {} : delay(proxy, 1000);
