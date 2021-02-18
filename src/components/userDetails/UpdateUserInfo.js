import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";
import DoneIcon from "@material-ui/icons/Done";
import UserProfile from "./UserProfile";
import firebase from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Login from "./LoginForm";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  makeStyles,
  TextField,
  Button,
  FormHelperText,
  Box,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "40%",
    // width: "25%",
    maxWidth: "100%",
    width: "70%",

    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      width: "80%",
    },
  },

  tickIcon: {
    color: "#97c7c7",
    background: "#fff",
    marginTop: "25px",
    fontSize: "25px",
    // marginLeft: "4rem",
    [theme.breakpoints.down("md")]: {
      marginLeft: "2rem",
    },
  },
  expandBtn: {
    marginLeft: "9rem",
    marginTop: "10px",
  },
  planTxt: {
    color: "#253D5B",
    marginLeft: "1rem",
  },
  formDiv: {
    maxWidth: "79.8%",
    marginLeft: "6px",
    background: "#fff",
    borderRadius: 5,
    padding: 20,
  },
  textFieldInput: {
    // width: "120%",
    backgroundColor: "#0000000a",
    borderRadius: 8,
    marginBottom: "-8px",
  },
  nextBtn: {
    // border: "2px solid #42ADD5",
    // color: "#42ADD5",
    color: "#fff",
    borderRadius: "20px",
    padding: "8px 10px",
    // background: "#fff",
    background: "#fe7565",
    marginBottom: "1rem",
  },
  createAccount: {
    display: "flex",
    marginLeft: "2rem",
    color: "#fff",
    marginTop: "-1.8rem",
  },

  // tick Circel
  iconOuterDiv: {
    display: "flex",
    // paddingLeft: "2rem",
    // marginBottom: "-2rem",
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
  // tick Circel
}));

function UserDetailsForm({
  firstName,
  lastName,
  email,
  setUpdateInfo,
  userDocId,
}) {
  //   console.log("isPlanSelected", isPlanSelected);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  const firestore = firebase.firestore();

  let userProfileRef;
  if (user != null) {
    if (auth.currentUser != null) {
      userProfileRef = firestore
        .collection("usersProfile")
        .where("uid", "==", user ? auth.currentUser.uid : "");
    }
  }
  const [userData] = useCollectionData(userProfileRef);

  console.log("user Data in updateInfo", userData);

  console.log("user", user);

  const tickCircle = () => {
    return (
      <div className={classes.iconOuterDiv}>
        <div className={classes.iconDiv}>
          <DoneIcon className={classes.tickIcon} />
        </div>
        <h3 className={classes.headingTxt}> Your Information Updated</h3>
      </div>
    );
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      {/* Create Account Text */}
      <div className={classes.createAccount}>
        {isAccountCreated ? tickCircle() : <h3>Update Your Information</h3>}
      </div>
      {/* Create Account Text */}

      {isAccountCreated ? (
        <UserProfile userData={userData} />
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          // style={{ minHeight: "100vh" }}
        >
          {/* Form */}
          <div className={classes.formDiv}>
            {/* form start */}
            <Formik
              initialValues={{
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: "",
                submit: null,
              }}
              validationSchema={Yup.object().shape({
                // email: Yup.string()
                //   .email("Must be a valid email")
                //   .max(255)
                //   .required("Email is required"),
                // password: Yup.string()
                //   .max(255)
                //   .required("Password is required"),
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  console.log("submit pressesd");
                  const firestore = firebase.firestore();
                  const userProfileRef = firestore
                    .collection("usersProfile")
                    .doc(userDocId);

                  await userProfileRef
                    .update({
                      firstName: values.firstName,
                      lastName: values.lastName,
                      email: values.email,
                    })
                    .then(() => {
                      console.log("profile updated");

                      user.updateEmail(values.email).then(() => {
                        console.log("Email updated");
                        setUpdateInfo(false);

                        // user.updatePassword(values.password).then(() => {
                        //   console.log("password Updated");
                        // });
                      });
                    });

                  console.log("submit clicked", values);
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  //   className={clsx(classes.root, className)}
                  //   {...rest}
                >
                  {/* First Name */}
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    // width="60%"
                    size="small"
                    helperText={touched.firstName && errors.firstName}
                    autoComplete="off"
                    // label="Email Address"
                    placeholder="First Name"
                    margin="normal"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.firstName}
                    variant="outlined"
                    InputProps={{
                      className: classes.textFieldInput,
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* End First Name */}

                  {/* Last Name */}
                  <TextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    // width="60%"
                    size="small"
                    helperText={touched.lastName && errors.lastName}
                    autoComplete="off"
                    // label="Email Address"
                    placeholder="Last Name"
                    margin="normal"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.lastName}
                    variant="outlined"
                    InputProps={{
                      className: classes.textFieldInput,
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* End Last Name */}

                  {/* Email */}
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    // width="60%"
                    size="small"
                    helperText={touched.email && errors.email}
                    autoComplete="off"
                    // label="Email Address"
                    placeholder="Email"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                    InputProps={{
                      className: classes.textFieldInput,
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* End Email */}

                  {/* Password */}

                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    size="small"
                    helperText={touched.password && errors.password}
                    // label="Password"
                    placeholder="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                    InputProps={{
                      className: classes.textFieldInput,
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* ENd Password */}
                  {errors.submit && (
                    <Box mt={3}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Box>
                  )}
                  <Box mt={2}>
                    <Button
                      //   color="secondary"
                      className={classes.nextBtn}
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Update Info
                    </Button>
                    <h5
                      style={{
                        color: "#fe7565",
                        cursor: "pointer",
                        marginBottom: "-3px",
                        marginTop: "-3px",
                      }}
                      onClick={() => setUpdateInfo(false)}
                    >
                      Cancel Update
                    </h5>
                  </Box>
                </form>
              )}
            </Formik>

            {/* end form start */}
          </div>

          {/* Form */}
        </Grid>
      )}
    </div>
  );
}

export default UserDetailsForm;
