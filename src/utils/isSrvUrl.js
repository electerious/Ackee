"use strict";

module.exports = (url) => {
  return url.split(":")[0].includes("srv");
};
