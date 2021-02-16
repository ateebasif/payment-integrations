import React, { useState } from "react";

import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import StarRateIcon from "@material-ui/icons/StarRate";
import "./style.css";
import {
  createMuiTheme,
  // makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Card,
  makeStyles,
  Typography,
  Button,
  Grid,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "40%",
    // width: "25%",
    maxWidth: "100%",
    width: "70%",
    // float: "center",
    // [theme.breakpoints.down("lg")]: {
    //   maxWidth: "100%",
    //   width: "80%",a
    // },
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      width: "80%",
    },
  },
  planTxt: {
    color: "#253D5B",
    marginLeft: "1rem",
    // fontWeight: "bold",
  },
  expandBtn: {
    marginLeft: "6rem",
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
  startIcon: {
    color: "yellow",
    fontSize: "35px",
    marginTop: "12px",
    marginLeft: "-7px",
  },
  plansDiv: {
    "&:hover": {
      //   background: "#efefef",
      cursor: "pointer",
      color: "#f8006f !important",
    },
  },
  firstPlan: {
    cursor: "pointer",
    border: "2px solid #00C4E8",
    borderRadius: 8,
    padding: "10px",
    color: "#0D2941",
    width: "100%",
    // background: "#00C4E8",
  },
  monthTxt: {
    marginTop: "-1.2rem",
    marginLeft: "-3rem",
    [theme.breakpoints.down("lg")]: {
      // marginLeft: "-0.2rem",
    },
  },
  yearDiv: {
    marginLeft: "3rem",
    // [theme.breakpoints.down("lg")]: {
    //   marginLeft: "2rem",
    // },

    [theme.breakpoints.down("md")]: {
      // marginLeft: "16rem",
    },
    [theme.breakpoints.down("xs")]: {
      // marginLeft: "0rem",
    },
  },
  yearTxt: {
    color: "#00c4e8",
    marginLeft: "6rem",
  },
  secondPlan: {
    cursor: "pointer",
    border: "2px solid #00C4E8",
    borderRadius: 8,
    padding: "10px",
    color: "#0D2941",
    width: "100%",
    marginTop: "1rem",
  },
  quarterDiv: {
    marginLeft: "1rem",
  },
  quarterTxt: {
    color: "#00c4e8",
    marginLeft: "58px",
  },
}));

function Planindex({ setIsPlanSelected, setSelectedPlanPrice }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);

  const [selectedFirstPlan, setSelectedFirstPlan] = useState(false);
  const [selectedSecondPlan, setSelectedSecondPlan] = useState(false);
  const [selectedThirdPlan, setSelectedThirdPlan] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(true);

  const [firstPlanBackground, seTfirstPlanBackground] = useState({
    background: "",
    color: "",
  });

  const [secondPlanBackground, seTsecondPlanBackground] = useState({
    background: "",
    color: "",
  });

  const [thirdPlanBackground, seTthirdPlanBackground] = useState({
    background: "",
    color: "",
  });

  const btn = expanded ? "expanded" : "x";

  const handleOnclick = () => {
    setExpanded(!expanded);
    setSelectedPlan(true);
    setSelectedFirstPlan(false);
    setSelectedSecondPlan(false);
    setSelectedThirdPlan(false);
  };

  const handleFirstPlan = () => {
    setIsPlanSelected(true);
    setSelectedPlanPrice(90.99);
    console.log("clicked first plan");
    const clickStyle = "#00C4E8";
    // seTfirstPlanBackground("#00C4E8");
    seTfirstPlanBackground({
      background: "#00C4E8",
      color: "#fff",
    });
    seTsecondPlanBackground({
      background: "",
      color: "",
    });
    seTthirdPlanBackground({
      background: "",
      color: "",
    });

    setSelectedFirstPlan(true);
    setSelectedPlan(false);
    setExpanded(false);
  };

  const handleSecondtPlan = () => {
    setIsPlanSelected(true);
    setSelectedPlanPrice(36.99);

    console.log("clicked second plan");

    seTfirstPlanBackground({
      background: "",
      color: "",
    });
    seTthirdPlanBackground({
      background: "",
      color: "",
    });

    seTsecondPlanBackground({
      background: "#00C4E8",
      color: "#fff",
    });

    setSelectedSecondPlan(true);
    setSelectedPlan(false);
    setExpanded(false);
  };

  const handleThirdPlan = () => {
    setIsPlanSelected(true);
    setSelectedPlanPrice(14.99);
    console.log("clicked third plan");
    seTfirstPlanBackground({
      background: "",
      color: "",
    });
    seTsecondPlanBackground({
      background: "",
      color: "",
    });

    seTthirdPlanBackground({
      background: "#00C4E8",
      color: "#fff",
    });

    setSelectedThirdPlan(true);
    setSelectedPlan(false);
    setExpanded(false);
  };

  const mountedStyle = {
    animation: "inAnimation 250ms ease-in",
    // animationFillMode: "forwards",
  };
  const unmountedStyle = {
    animation: "outAnimation 270ms ease-out",
    animationFillMode: "forwards",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", marginBottom: "-1.2rem" }}>
        <div style={{ display: "flex" }}>
          <CheckCircleOutlineIcon className={classes.tickIcon} />
          <h2 className={classes.planTxt}>Choose Your Plan</h2>
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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        // style={{ minHeight: "100vh" }}
      >
        <div className={classes.root}>
          {/*<FirstPlan /> */}

          <div style={{ display: "flex", marginBottom: "-10px" }}>
            <p>Includes</p>{" "}
            <p
              style={{
                color: "#42ADD5",
                // fontFamily: "Fira Sans Bold, sans-serif",
              }}
            >
              14 Days free trial.
            </p>{" "}
            <p>Cancel Anytime.</p>
          </div>

          {selectedFirstPlan && (
            <div style={selectedFirstPlan ? mountedStyle : unmountedStyle}>
              {" "}
              <FirstPlan />{" "}
            </div>
          )}
          {selectedSecondPlan && (
            <div style={selectedSecondPlan ? mountedStyle : unmountedStyle}>
              <SecondPlan />{" "}
            </div>
          )}
          {selectedThirdPlan && (
            <div style={selectedThirdPlan ? mountedStyle : unmountedStyle}>
              <ThirdPlan />{" "}
            </div>
          )}

          {selectedPlan && (
            <div style={selectedPlan ? mountedStyle : unmountedStyle}>
              <div
                onClick={handleFirstPlan}
                className={classes.firstPlan}
                style={{
                  // display: "flex",
                  // background: firstPlanBackground,
                  background: firstPlanBackground.background,
                  color: firstPlanBackground.color,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginTop: "-10px",
                  }}
                >
                  <StarRateIcon className={classes.startIcon} />
                  <p>BEST VALUE</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    marginTop: "-1.7rem",
                    marginBottom: "-0.9rem",
                  }}
                >
                  <div style={{ float: "left" }}>
                    <h2>$7.58 USD</h2>
                    <p className={classes.monthTxt}>/MONTH</p>
                  </div>

                  <div className={classes.yearDiv}>
                    <h2
                      className={classes.yearTxt}
                      style={{ color: firstPlanBackground.color }}
                    >
                      Yearly
                    </h2>
                    <p style={{ marginTop: "-1.4rem" }}>
                      $90.99 USD Billed Yearly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {expanded && (
            <div
              style={expanded ? mountedStyle : unmountedStyle}
              onClick={handleSecondtPlan}
            >
              <div
                className={classes.secondPlan}
                style={{
                  background: secondPlanBackground.background,
                  color: secondPlanBackground.color,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginTop: "-10px",
                  }}
                >
                  <StarRateIcon className={classes.startIcon} />
                  <p>MOST POPULAR</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    marginTop: "-1.7rem",
                    marginBottom: "-0.9rem",
                  }}
                >
                  <div style={{ marginLeft: "-2.9px" }}>
                    <h2>$12.33 USD</h2>
                    <p className={classes.monthTxt}>/MONTH</p>
                  </div>

                  <div className={classes.quarterDiv}>
                    <h2
                      className={classes.quarterTxt}
                      style={{ color: secondPlanBackground.color }}
                    >
                      QUARTERLY
                    </h2>
                    <p style={{ marginTop: "-1.3rem" }}>
                      $36.99 USD Billed Quarterly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* third plan */}

          {expanded && (
            <div
              style={expanded ? mountedStyle : unmountedStyle}
              onClick={handleThirdPlan}
            >
              <div
                className={classes.secondPlan}
                style={{
                  background: thirdPlanBackground.background,
                  color: thirdPlanBackground.color,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginTop: "-1.7rem",
                    marginBottom: "-0.9rem",
                  }}
                >
                  <div style={{ marginLeft: "-2.9px", marginTop: "10px" }}>
                    <h2>$14.99 USD</h2>
                    <p className={classes.monthTxt}>/MONTH</p>
                  </div>

                  <div
                    className={classes.quarterDiv}
                    style={{ marginTop: "10px" }}
                  >
                    <h2
                      className={classes.quarterTxt}
                      style={{ color: thirdPlanBackground.color }}
                    >
                      MONTHLY
                    </h2>
                    <p style={{ marginTop: "-1.3rem" }}>
                      $14.99 USD Billed Monthly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* third plan */}
        </div>
      </Grid>
    </div>
  );
}

export default Planindex;

function FirstPlan() {
  const classes = useStyles();
  const [firstPlanBackground, seTfirstPlanBackground] = useState({
    background: "#00C4E8",
    color: "#fff",
  });

  const handleFirstPlan = () => {
    console.log("clicked first plan");
    const clickStyle = "#00C4E8";
    // seTfirstPlanBackground("#00C4E8");
    seTfirstPlanBackground({
      background: "#00C4E8",
      color: "#fff",
    });
    // seTsecondPlanBackground({
    //   background: "",
    //   color: "",
    // });
  };

  return (
    <div>
      <div
        // onClick={handleFirstPlan}
        className={classes.firstPlan}
        style={{
          // display: "flex",
          // background: firstPlanBackground,
          background: firstPlanBackground.background,
          color: firstPlanBackground.color,
        }}
      >
        <div
          style={{
            display: "flex",
            marginTop: "-10px",
          }}
        >
          <StarRateIcon className={classes.startIcon} />
          <p>BEST VALUE</p>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "-1.7rem",
            marginBottom: "-0.9rem",
          }}
        >
          <div style={{ float: "left" }}>
            <h2>$7.58 USD</h2>
            <p className={classes.monthTxt}>/MONTH</p>
          </div>

          <div className={classes.yearDiv}>
            <h2
              className={classes.yearTxt}
              style={{ color: firstPlanBackground.color }}
            >
              Yearly
            </h2>
            <p style={{ marginTop: "-1.4rem" }}>$90.99 USD Billed Yearly</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecondPlan() {
  const classes = useStyles();
  const [secondPlanBackground, seTsecondPlanBackground] = useState({
    background: "#00C4E8",
    color: "#fff",
  });

  return (
    <div
      style={
        {
          // float: "left",
        }
      }
      // onClick={handleSecondtPlan}
    >
      <div
        className={classes.secondPlan}
        style={{
          background: secondPlanBackground.background,
          color: secondPlanBackground.color,
        }}
      >
        <div
          style={{
            display: "flex",
            marginTop: "-10px",
          }}
        >
          <StarRateIcon className={classes.startIcon} />
          <p>MOST POPULAR</p>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "-1.7rem",
            marginBottom: "-0.9rem",
          }}
        >
          <div style={{ marginLeft: "-2.9px" }}>
            <h2>$12.33 USD</h2>
            <p className={classes.monthTxt}>/MONTH</p>
          </div>

          <div className={classes.quarterDiv}>
            <h2
              className={classes.quarterTxt}
              style={{ color: secondPlanBackground.color }}
            >
              QUARTERLY
            </h2>
            <p style={{ marginTop: "-1.3rem" }}>$36.99 USD Billed Quarterly</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThirdPlan() {
  const classes = useStyles();
  const [thirdPlanBackground, seTthirdPlanBackground] = useState({
    background: "#00C4E8",
    color: "#fff",
  });

  return (
    <div
      style={
        {
          // float: "left",
        }
      }
      // onClick={handleThirdPlan}
    >
      <div
        className={classes.secondPlan}
        style={{
          background: thirdPlanBackground.background,
          color: thirdPlanBackground.color,
        }}
      >
        <div
          style={{
            display: "flex",
            marginTop: "-1.7rem",
            marginBottom: "-0.9rem",
          }}
        >
          <div style={{ marginLeft: "-2.9px", marginTop: "10px" }}>
            <h2>$14.99 USD</h2>
            <p className={classes.monthTxt}>/MONTH</p>
          </div>

          <div className={classes.quarterDiv} style={{ marginTop: "10px" }}>
            <h2
              className={classes.quarterTxt}
              style={{ color: thirdPlanBackground.color }}
            >
              MONTHLY
            </h2>
            <p style={{ marginTop: "-1.3rem" }}>$14.99 USD Billed Monthly</p>
          </div>
        </div>
      </div>
    </div>
  );
}
