const config = require("./relay.config");

module.exports = Object.assign(config, {
  persistConfig: {
    file: "src/__persisted__/queries.json",
  },
});
