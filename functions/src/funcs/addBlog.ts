import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import admin = require("firebase-admin");
import {getFirestore} from "firebase-admin/firestore";

try {
  admin.initializeApp();
} catch (error) {
  error;
}

export const addBlog = onRequest(async (req: any, res: any) => {
  const {formData, content, coverImage, uid} = req.query;
  const {title, coverDescription} = formData;
  const db = getFirestore();

  const collectionRef = db.collection("users").doc(uid).collection("blog");

  try {
    const docRef = await collectionRef.add({
      title: title,
      coverImage: coverImage,
      coverDescription: coverDescription,
      blogContent: content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(200).send({status: "success", data: docRef.id});
  } catch (error: any) {
    return res
      .status(500)
      .send({status: "error", message: error.message, data: null});
  }
});
