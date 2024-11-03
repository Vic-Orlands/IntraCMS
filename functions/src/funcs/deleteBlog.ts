import {onRequest} from "firebase-functions/v2/https";
import admin = require("firebase-admin");
import {getFirestore} from "firebase-admin/firestore";

try {
  admin.initializeApp();
} catch (error) {
  error;
}

export const deleteBlog = onRequest(async (req: any, res: any) => {
  const {uid, blogId} = req.query;
  if (!uid || !blogId) return res.status(400).send("Bad Request! id's missing");

  const db = getFirestore();
  const collectionRef =
        db.collection("users").doc(uid).collection("blog").doc(blogId);

  try {
    await collectionRef.delete();
    return res.status(200).send({status: "success", data: null});
  } catch (error: any) {
    return res
      .status(500)
      .send({status: "error", message: error.message, data: null});
  }
});
