// import { db } from "@/libs/firebase/config";
// import {
//   ref,
//   set,
//   get,
//   push,
//   //   update,
//   onValue,
//   serverTimestamp,
// } from "firebase/database";

// interface Content {
//   title: string;
//   coverImage: string | null;
//   coverDescription: string;
//   blogContent: string;
// }

// export interface AllContents {
//   title: string;
//   coverImage: string | null;
//   coverDescription: string;
//   blogContent: string;
//   createdAt: string;
//   updatedAt: string;
// }

// Create new content
// export async function uploadContent(data: Content, userId: string) {
//   try {
//     const contentRef = ref(db, "contents/" + userId);
//     const newContentRef = push(contentRef);

//     await set(newContentRef, {
//       ...data,
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//     });

//     return newContentRef.key;
//   } catch (error) {
//     console.error("Error creating content:", error);
//     throw error;
//   }
// }

// useEffect(
//     () =>
//       onSnapshot(collection(db, "users"), (snapshot) => {
//         snapshot.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots
//           console.log(doc.id, " => ", doc.data());
//         });
//       }),
//     []
//   );

// Get all contents
// export async function getAllContents() {
//   try {
//     const contentRef = ref(db, "contents");
//     const snapshot = await get(contentRef);

//     if (snapshot.exists()) {
//       const contents: AllContents[] = [];
//       snapshot.forEach((child) => {
//         contents.push({
//           id: child.key,
//           ...child.val(),
//         });
//       });
//       return contents;
//     }

//     return [];
//   } catch (error) {
//     console.error("Error getting contents:", error);
//     throw error;
//   }
// }

// Get single content by ID
// export async function getContentById(contentId: string) {
//   try {
//     const contentRef = ref(db, `contents/${contentId}`);
//     const snapshot = await get(contentRef);

//     if (snapshot.exists()) {
//       return {
//         id: snapshot.key,
//         ...snapshot.val(),
//       };
//     }

//     return null;
//   } catch (error) {
//     console.error("Error getting content:", error);
//     throw error;
//   }
// }

// Update content
//   async function updateContent(contentId, updates) {
//     try {
//       const contentRef = ref(db, `contents/${contentId}`);

//       await update(contentRef, {
//         ...updates,
//         updatedAt: new Date().toISOString(),
//       });

//       return contentId;
//     } catch (error) {
//       console.error("Error updating content:", error);
//       throw error;
//     }
//   }

// Delete content
//   async function deleteContent(contentId) {
//     try {
//       const contentRef = ref(db, `contents/${contentId}`);
//       await set(contentRef, null);
//       return contentId;
//     } catch (error) {
//       console.error("Error deleting content:", error);
//       throw error;
//     }
//   }

// Subscribe to content changes
// export function subscribeToContents(callback: any) {
//   const contentRef = ref(db, "contents");
//   return onValue(contentRef, (snapshot) => {
//     const contents: AllContents[] = [];
//     snapshot.forEach((child) => {
//       contents.push({
//         id: child.key,
//         ...child.val(),
//       });
//     });
//     callback(contents);
//   });
// }
