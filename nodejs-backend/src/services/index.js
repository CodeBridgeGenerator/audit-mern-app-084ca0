
const audits = require("./audits/audits.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    
  app.configure(audits);
    // ~cb-add-configure-service-name~
};
