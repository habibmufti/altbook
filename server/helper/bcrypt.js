import bcrypt from "bcrypt";

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function comparePassword(bodyPassword, dbPassword) {
  const compare = bcrypt.compareSync(bodyPassword, dbPassword);
  return compare;
}

export default { hashPassword, comparePassword };
