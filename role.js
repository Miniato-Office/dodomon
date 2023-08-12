import jwt from "jsonwebtoken";
import { createError, errorHandler } from "./errorHandling.js";

function RoleBasedAccess({ role, secretKey }) {
  function access(role) {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    return (req, res, next) => {
      try {
        const authBearer = req.headers.authorization?.split(" ")[0];
        const authToken = req.headers.authorization?.split(" ")[1];

        if (!authToken) {
          throw createError(401, "Auth header missing");
        } else {
          if (authBearer === "Bearer") {
            let decoded = jwt.verify(authToken, secretKey);

            if (decoded?.role === role) {
              next();
            } else {
              res.send("No Access");
            }
          }
          else {
            throw createError(400, "Invalid Token")
          }
        }
      } catch (error) {
        errorHandler(res, error);
      }
    };
  }
  return access;
}

export default RoleBasedAccess;
