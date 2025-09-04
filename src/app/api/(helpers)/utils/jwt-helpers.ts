import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

export const generateToken = (
  payload: JwtPayload,
  secret: Secret,
  expiresIn: SignOptions["expiresIn"]
) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};
