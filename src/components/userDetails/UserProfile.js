import React, { useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "../firebase";
import DoneIcon from "@material-ui/icons/Done";
import UpdateUserInfo from "./UpdateUserInfo";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // tick Circel
  iconOuterDiv: {
    display: "flex",
    marginLeft: "2rem",
    marginTop: "5px",
  },
  iconDiv: {
    background: "#fd7661",
    borderRadius: 100,
    width: 20,
    height: 20,
    marginTop: "1.3rem",
    marginRight: "1rem",
  },
  tickIcon: {
    color: "#fff",
    fontSize: 13,
    fontWeight: 20,
    marginTop: "3px",
  },
  headingTxt: {
    color: "#fff",
  },
  // tick Circel

  // userDetailsDiv
  userDetailsDiv: {
    background: "#fff",
    borderRadius: 5,
    width: "86%",
    height: "60%",
    marginLeft: "2.4rem",
    paddingTop: "10px",
  },
  // userDetailsDiv
}));

function UserProfile() {
  const classes = useStyles();
  const [updateInfo, setUpdateInfo] = useState(false);
  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  let userProfileRef;
  if (user != null) {
    if (auth.currentUser != null) {
      userProfileRef = firebase
        .firestore()
        .collection("usersProfile")
        .where("uid", "==", user ? auth.currentUser.uid : "");
    }
  }
  const [userData] = useCollectionData(userProfileRef, { idField: "id" });

  console.log("userDataa while login", userData);

  let firstName, lastName, email, userDocId;

  if (userData != undefined) {
    firstName = userData[0].firstName;
    lastName = userData[0].lastName;
    email = userData[0].email;
    userDocId = userData[0].id;
  }

  const tickCircle = () => {
    return (
      <div className={classes.iconOuterDiv}>
        <div className={classes.iconDiv}>
          <DoneIcon className={classes.tickIcon} />
        </div>
        <h3 className={classes.headingTxt}> Create Your Account</h3>
      </div>
    );
  };

  if (updateInfo) {
    return (
      <UpdateUserInfo
        firstName={firstName}
        lastName={lastName}
        email={email}
        setUpdateInfo={setUpdateInfo}
        userDocId={userDocId}
      />
    );
  }

  return (
    <div>
      {tickCircle()}
      {/* User Details Div */}
      <div className={classes.userDetailsDiv}>
        <h4>
          {firstName} {lastName}
        </h4>
        <h5>{email}</h5>
        <div>
          <Button
            style={{ marginBottom: "10px", color: "#f17b6d" }}
            onClick={() => setUpdateInfo(true)}
          >
            Edit Information
          </Button>
        </div>
      </div>
      {/* User Details Div */}
    </div>
  );
}

export default UserProfile;
