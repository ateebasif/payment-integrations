import React, { useState } from "react";
import Plan from "./components/plan";
import Plans from "./components/plans/index";
import UserDetailsForm from "./components/userDetails/UserDetailsForm";
import StripePayment from "./components/stripePayment/index";
import PaypalPayment from "./components/paypaylPayment";
// import SelectPaymentMethod from "./components/selectPaymentMethod/SelectPaymentMethod";
// stripe imports
import BackgroundImg from "./img.jpg";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "./components/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import UserProfile from "./components/userDetails/UserProfile";
import Login from "./components/userDetails/LoginForm";

import WindowSize from "./components/WindowSize";
import CardContent from "@material-ui/core/CardContent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import {
  Card,
  makeStyles,
  Typography,
  Button,
  Grid,
  Divider,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    width: "72%",
    marginLeft: "2rem",
    marginTop: "2rem",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      width: "80%",
    },
  },
  discount: {
    marginRight: "6.2rem",
    color: "#6c757d !important",
  },

  formDiv: {
    marginLeft: "4.6rem",
    display: "flex",
  },
  inputStyle: {
    height: "25px",
    borderRadius: 6,
    backgroundColor: "#00000005",
    padding: "5px",
    border: "0.5px solid #00000024",
  },
  apllyBtn: {
    cursor: "pointer",
    marginLeft: "1rem",
    color: "#42ADD5",
  },

  rightSide: {
    // backgroundImage: `url(https:static-01.daraz.pk/p/5866ec828fccbea4ac5b214f673e29f4.jpg)`,
    backgroundImage: `url(${BackgroundImg})`,
    backgroundSize: "cover",
    borderRadius: "40px 0px 0px 40px",
    backgroundRepeat: "noRepeat",
    marginTop: "-2rem",
  },
  leftSide: {
    background: "#ff998a",
  },
  upSide: {
    // backgroundImage: `url(https:static-01.daraz.pk/p/5866ec828fccbea4ac5b214f673e29f4.jpg)`,
    backgroundImage: `url(${BackgroundImg})`,

    backgroundSize: "cover",
    borderRadius: "0px 0px 40px 40px",
    backgroundRepeat: "noRepeat",
    // height: "100vh",
    marginTop: "-2rem",
  },
  loginBtn: {
    marginTop: "1.5rem",
    marginRight: "1.5rem",
    background: "linear-gradient(#42ADD5, #77D6EC)",
    borderRadius: 26,
    color: "#fff",
    boxShadow: "0 5px 25px rgba(66, 173, 213, 0.25)",
    padding: 10,
    paddingTop: 12,
    paddingBottom: 12,
    width: 100,
  },
  homeBtn: {
    color: "#fff",
    marginTop: "1.5rem",
    fontSize: "18px",
    marginRight: "5px",
  },

  //  expand styling
  planTxt: {
    color: "#253D5B",
    marginLeft: "1rem",
    // fontWeight: "bold",
  },
  expandBtn: {
    marginLeft: "6rem",
    marginTop: "0.7rem",
  },
  tickIcon: {
    color: "#97c7c7",
    background: "#fff",
    marginTop: "25px",
    fontSize: "25px",
    marginLeft: "4.4rem",
    [theme.breakpoints.down("md")]: {
      marginLeft: "2rem",
    },
  },
  paymentSuccessDiv: {
    textAlign: "center",
  },
}));

// stripe promise
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

function App() {
  const classes = useStyles();

  const [height, width] = WindowSize();

  // console.log("height", height);
  // console.log("width", width);

  const [isPlanSelected, setIsPlanSelected] = useState(true);
  const [selectedPlanPrice, setSelectedPlanPrice] = useState(0);

  const [isPaymentSuccessfull, setIsPaymentSuccessfull] = useState(false);

  const [loginState, setLoginState] = useState(false);
  const [signUpState, setSignUpState] = useState(false);

  // Fire base
  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  console.log("selectedPlanPrice", selectedPlanPrice);
  console.log("user", user);

  const handleLoginView = () => {
    console.log("handleView");

    if (signUpState) {
      return <UserDetailsForm isPlanSelected={isPlanSelected} />;
    }
    return (
      <Login setLoginState={setLoginState} setSignUpState={setSignUpState} />
    );
  };

  const handleUserDetailsView = () => {
    if (user) {
      // setLoginState(false);
      return <UserProfile user={user} />;
    }

    return <UserDetailsForm isPlanSelected={isPlanSelected} />;
  };

  // console.log(".env", process.env.REACT_APP_PUBLISHABLE_KEY);
  const firestore = firebase.firestore();

  let userProfileRef;
  if (user) {
    userProfileRef = firestore
      .collection("usersProfile")
      .where("uid", "==", auth.currentUser.uid);
  }
  const [userData] = useCollectionData(userProfileRef);

  console.log("user Data in appppppp", userData);

  const paymentSuccessfullView = () => {
    return (
      <div className={classes.paymentSuccessDiv}>
        <h1>Hello {userData && userData[0].firstName}</h1>
        <h1 style={{ color: "green" }}>your payment is SuccessFull!</h1>
      </div>
    );
  };

  return (
    <div style={{ paddingTop: "2rem", background: "#ff998a" }}>
      <Grid container>
        {/* Left Side view */}

        <Grid item xs={12} sm={12} md={4} className={classes.leftSide}>
          <div
            style={{ overflow: "scroll", height: "97vh", maxHeight: "97vh" }}
          >
            {isPaymentSuccessfull ? (
              paymentSuccessfullView()
            ) : (
              <div>
                <div style={{ textAlign: "center" }}>
                  {/*     <Plans
                    setIsPlanSelected={setIsPlanSelected}
                    setSelectedPlanPrice={setSelectedPlanPrice}
                  /> */}

                  {/* Plans */}
                  <Plans />
                  {/* End Plans */}

                  {/* Discount Field */}
                  {/*    <div className={classes.discount}>
                    <p>or enter your discount code here:</p>

                    <div className={classes.formDiv}>
                      <input
                        type="text"
                        placeholder="Discount Code"
                        className={classes.inputStyle}
                        style={{}}
                      />
                      <Button className={classes.apllyBtn}>Apply</Button>
                    </div>
                  </div> */}

                  {/* ENd Discount Field */}

                  {/* Login, Signup View and user Details view after Login  */}

                  {loginState ? handleLoginView() : handleUserDetailsView()}

                  {/* End Login, Signup View and user Details view after Login  */}

                  {/* Payments Method View */}
                </div>

                <SelectPaymentMethod
                  user={user}
                  selectedPlanPrice={selectedPlanPrice}
                  setIsPaymentSuccessfull={setIsPaymentSuccessfull}
                />
              </div>
            )}
          </div>
          {/* End Payments Method View */}
        </Grid>

        {/* Left Side view */}

        {width >= 960 && (
          <Grid item xs={12} sm={12} md={8} className={classes.rightSide}>
            <div style={{ height: "97.3vh" }}>
              <div style={{ float: "right" }}>
                <Button className={classes.homeBtn}> Home</Button>
                {user ? (
                  <Button
                    className={classes.loginBtn}
                    onClick={() => auth.signOut()}
                  >
                    SignOut
                  </Button>
                ) : (
                  <Button
                    className={classes.loginBtn}
                    onClick={() => {
                      setLoginState(true);
                      setSignUpState(false);
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </Grid>
        )}
      </Grid>

      {/* 
      <div>
        <PaypalPayment />
      </div> */}
    </div>
  );
}

export default App;

// payment methods component Paypal and Stripe

function SelectPaymentMethod({
  user,
  selectedPlanPrice,
  setIsPaymentSuccessfull,
}) {
  // console.log("prop test", test);
  const classes = useStyles();
  const [pay, setPay] = useState(false);
  const [stri, setStri] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleOnclick = () => {
    // if (selectedPlanPrice != 0) setExpanded(!expanded);
    if (user) setExpanded(!expanded);
  };

  const handleChange = (e) => {
    console.log("change", e.target.value);

    if (e.target.value === "paypal") {
      setPay(true);
      setStri(false);
    } else if (e.target.value === "creditCard") {
      setPay(false);
      setStri(true);
    }
  };
  return (
    <div style={{ marginBottom: "4rem", marginTop: "1.5rem" }}>
      {/* Expand area */}
      <div style={{ display: "flex", marginBottom: "-1.2rem" }}>
        <div style={{ display: "flex" }}>
          <CheckCircleOutlineIcon className={classes.tickIcon} />
          <h2 className={classes.planTxt}>Payment Details</h2>
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
      {/* End Expand area */}
      {expanded && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          // style={{ minHeight: "100vh" }}
        >
          <div className={classes.root}>
            <FormControl component="fieldset">
              {/*   <FormLabel component="legend">labelPlacement</FormLabel> */}
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="creditCard"
                  control={<Radio color="primary" />}
                  label="Credit Card"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="paypal"
                  control={<Radio color="primary" />}
                  label="Paypal"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>

            <br />
            <div>
              {pay && (
                <PaypalPayment
                  selectedPlanPrice={selectedPlanPrice}
                  setIsPaymentSuccessfull={setIsPaymentSuccessfull}
                />
              )}{" "}
              {stri && (
                <Elements stripe={stripePromise}>
                  <StripePayment
                    selectedPlanPrice={selectedPlanPrice}
                    setIsPaymentSuccessfull={setIsPaymentSuccessfull}
                  />{" "}
                </Elements>
              )}
            </div>
          </div>
        </Grid>
      )}
    </div>
  );
}

//  <Elements stripe={stripePromise}>
//    <StripePayment />
//  </Elements>;
