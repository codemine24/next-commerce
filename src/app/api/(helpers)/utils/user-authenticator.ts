import httpStatus from "http-status";
import CustomizedError from "../error/customized-error";

const userAuthenticator = async (req: Request) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader)
    throw new CustomizedError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized"
    );
};

export default userAuthenticator;
