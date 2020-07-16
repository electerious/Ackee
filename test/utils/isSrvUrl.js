"use strict";

const test = require("ava");

const isSrvUrl = require("../../src/utils/isSrvUrl");
const standarConnectionString = "mongodb://localhost:27017/ackee";
const srvConnectionString =
  "mongodb+srv://username:badpw@cluster0-OMITTED.mongodb.net/ackee";

test("return standard connection string is false", async (t) => {
  t.is(isSrvUrl(standarConnectionString), false);
});

test("return srv connection string is false", async (t) => {
  t.is(isSrvUrl(srvConnectionString), true);
});
