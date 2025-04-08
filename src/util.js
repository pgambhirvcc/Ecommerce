import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getUserInfo = async (userId) => {
  const q = query(
    collection(db, "users"), // replace with your collection name
    where("uniqueId", "==", userId)
  );

  const querySnapshot = await getDocs(q);

  const snapshot = querySnapshot.docs[0];
  const data = snapshot.data();

  return data;
};
