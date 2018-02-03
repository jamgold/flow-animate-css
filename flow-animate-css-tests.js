// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by flow-animate-css.js.
import { name as packageName } from "meteor/flow-animate-css";

// Write your tests here!
// Here is an example.
Tinytest.add('flow-animate-css - example', function (test) {
  test.equal(packageName, "flow-animate-css");
});
