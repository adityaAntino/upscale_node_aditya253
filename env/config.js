const environment = {}

const dev = require("./env-files/dev-env.json");

environment.dev = { ...dev }

module.exports = environment.dev