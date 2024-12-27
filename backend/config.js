const { SECRET_JWT_KEY = "secret_key_awesome_incredible", PORT = 3000 } =
  process.env;

module.exports = { SECRET_JWT_KEY, PORT };
