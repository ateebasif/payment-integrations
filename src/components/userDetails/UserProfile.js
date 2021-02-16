import React from "react";
import firebase from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function UserProfile({ user, setLoginState }) {
  const firestore = firebase.firestore();
  const auth = firebase.auth();

  console.log("user in profile", user);
  let userProfileRef;
  if (user) {
    userProfileRef = firestore
      .collection("users")
      .where("uid", "==", auth.currentUser.uid);
  }

  //   const query = messageRef.orderBy("createdAt");

  //   const [userData] = useCollectionData(userProfileRef, { idField: "id" });
  const [userData] = useCollectionData(userProfileRef);

  console.log("userData", userData);

  return (
    <div>
      <h2>userData</h2>
      <h3>Welcome</h3>
      <h5>{userData && userData[0].firstName}</h5>
    </div>
  );
}

export default UserProfile;
