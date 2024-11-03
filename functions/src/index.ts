import admin = require("firebase-admin");
import {addBlog} from "./funcs/addBlog";
import {deleteBlog} from "./funcs/deleteBlog";

try {
  admin.initializeApp();
} catch (error) {
  error;
}

exports.addBlog = addBlog;

exports.deleteBlog = deleteBlog;
