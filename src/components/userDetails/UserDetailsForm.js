import React, { useState } from "react";
// import { Formik } from "formik";
import { Formik } from "formik";
import * as Yup from "yup";
import DatePick from "./DatePicker";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

import firebase from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Login from "./LoginForm";

// Configure JSS

import {
  Card,
  makeStyles,
  Typography,
  TextField,
  Button,
  FormHelperText,
  Box,
  Grid,
  Divider,
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
    maxWidth: "74%",
    marginLeft: "2rem",
  },
  textFieldInput: {
    // width: "120%",
    backgroundColor: "#0000000a",
    borderRadius: 8,
    marginBottom: "-8px",
  },
  nextBtn: {
    border: "2px solid #42ADD5",
    color: "#42ADD5",
    borderRadius: "20px",
    padding: "8px 10px",
    background: "#fff",
  },
}));

function UserDetailsForm({ isPlanSelected }) {
  console.log("isPlanSelected", isPlanSelected);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleOnclick = () => {
    if (isPlanSelected) {
      setExpanded(!expanded);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        // style={{ minHeight: "100vh" }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: "-1.2rem",
            marginLeft: "2rem",
          }}
        >
          <div style={{ display: "flex" }}>
            <CheckCircleOutlineIcon className={classes.tickIcon} />
            <h2 className={classes.planTxt}>Your Details</h2>
          </div>
          <div className={classes.expandBtn}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={handleOnclick}
            >
              {expanded ? <CloseIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </div>
        </div>
        {/*<Login />*/}

        {/* Form */}
        {expanded && (
          <div className={classes.formDiv}>
            {/* form start */}

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                date: "",
                email: "",
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
                  const firestore = firebase.firestore();
                  const auth = firebase.auth();
                  const userProfileRef = firestore.collection("usersProfile");

                  await firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                      values.email,
                      values.password
                    )
                    .then(async () => {
                      console.log("user created");

                      const { uid } = auth.currentUser;

                      await userProfileRef
                        .add({
                          firstName: values.firstName,
                          lastName: values.lastName,
                          date: values.date,
                          email: values.email,
                          uid,
                        })
                        .then(() => console.log("User Profile Creared"));
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

                  {/* Date  */}
                  <TextField
                    error={Boolean(touched.date && errors.date)}
                    fullWidth
                    // width="60%"
                    size="small"
                    helperText={touched.date && errors.date}
                    autoComplete="off"
                    // label="Email Address"
                    placeholder="Last Name"
                    margin="normal"
                    name="date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="date"
                    value={values.date}
                    variant="outlined"
                    InputProps={{
                      className: classes.textFieldInput,
                      position: "relative",

                      //   startAdornment: (
                      //     <InputAdornment position="start">
                      //       <PersonOutlineIcon />
                      //     </InputAdornment>
                      //   ),
                    }}
                  />
                  {/* End Date */}

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
                      Next
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>

            {/* end form start */}
          </div>
        )}
        {/* Form */}
      </Grid>
    </div>
  );
}

export default UserDetailsForm;
