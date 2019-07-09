import bycrypt from "bcryptjs";

const hashPassword = password => {
  // check password
  if (password.length < 8) {
    throw new Error("password must be 8 characters or longer");
  }

  return bycrypt.hash(password, 10);
};

export { hashPassword as default };
