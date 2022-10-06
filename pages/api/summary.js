import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        ok: false,
        message: "Permission denied",
      });
    }
    //compute DB summary
    const users = readUsersDB();
    let userRes = 0,
      adminRes = 0,
      sum = 0;
    for (const x of users) {
      if (x.isAdmin) {
        adminRes++;
      } else {
        userRes++;
        if (x.money > 0) {
          sum += x.money;
        }
      }
    }
    return res.json({ ok: true, userRes, adminRes, sum });
    //return response
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
