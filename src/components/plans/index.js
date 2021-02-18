import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  headingTxt: {
    color: "#fff",
    display: "flex",
    marginLeft: "2rem",
  },
  boxesDiv: {
    display: "flex",
    marginLeft: "2rem",
  },
  leftBox: {
    border: "1.5px solid #fff",
    padding: 5,
    paddingLeft: 15,
    paddingRight: 10,
    borderRadius: 5,
    display: "flex",
    flexFlow: "column",
    textAlign: "left",
    cursor: "pointer",
  },
  h4_2: {
    color: "#fff",
    marginTop: "-1rem",
    // paddingLeft: "5px",
  },
  rightBox: {
    border: "1.5px solid #fff",
    padding: 5,
    paddingLeft: 15,
    paddingRight: 10,
    borderRadius: 5,
    display: "flex",
    flexFlow: "column",
    textAlign: "left",
    marginLeft: "1.7rem",
    background: "#fff",
    cursor: "pointer",
  },
  h4_B2: {
    color: "#ff998a",
    marginTop: "-1rem",
    // paddingLeft: "5px",
  },
  offBox: {
    color: "#fff",
    background: "#fd7661",
    border: "1px solid #ff998a",
    position: "absolute",
    height: "24px",
    marginLeft: "19.8rem",
    borderRadius: 5,
    marginTop: "-1rem",
    paddingLeft: 5,
    paddingRight: 5,
  },

  //   Selected Left Box
  selectedLeftBox: {
    border: "1.5px solid #fff",
    borderRadius: 5,
    marginTop: "2rem",
    maxWidth: "84%",
    marginLeft: "2rem",
    textAlign: "left",
    paddingLeft: 15,
  },
  expandBtn: {
    marginTop: "-27px",
    marginLeft: "5rem",
  },
  //   Selected Left Box
  selectedRightBox: {
    border: "1.5px solid #fff",
    borderRadius: 5,
    marginTop: "2rem",
    maxWidth: "84%",
    marginLeft: "2rem",
    textAlign: "left",
    paddingLeft: 15,
    background: "#fff",
  },
  // selected right box
}));

function Plansindex() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState("");

  const [isLeftSelected, setIsLeftSelected] = useState(false);
  const [isRightSelected, setIsRightSelected] = useState(false);

  const selectedLeftBox = () => {
    return (
      <div className={classes.selectedLeftBox}>
        <div>
          <h3 style={{ color: "#fff" }}>6 MONTHS APP ACCESS</h3>
          <div style={{ display: "flex" }}>
            <h5 style={{ color: "#fff", marginTop: "-15px" }}>
              One-time Payment. No recurring charges.
            </h5>
            {/* expand button */}
            <div className={classes.expandBtn}>
              <IconButton
                style={{ color: "#fff" }}
                aria-label="upload picture"
                component="span"
                onClick={() => setIsLeftSelected(false)}
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
            {/* end expand button */}
          </div>
          <h1 style={{ color: "#fff", marginTop: "-14px" }}>$97.00</h1>
        </div>
      </div>
    );
  };

  // selected right box
  const selectedRightBox = () => {
    return (
      <div className={classes.selectedRightBox}>
        <div>
          <h3 style={{ color: "#ff998a" }}>6 MONTHS APP ACCESS</h3>
          <div style={{ display: "flex" }}>
            <h5 style={{ color: "#ff998a", marginTop: "-15px" }}>
              One-time Payment. No recurring charges.
            </h5>
            {/* expand button */}
            <div className={classes.expandBtn}>
              <IconButton
                style={{ color: "#ff998a" }}
                aria-label="upload picture"
                component="span"
                onClick={() => setIsRightSelected(false)}
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
            {/* end expand button */}
          </div>
          <h1 style={{ color: "#ff998a", marginTop: "-14px" }}>$149.00</h1>
        </div>
      </div>
    );
  };

  // selected right box

  if (isLeftSelected) {
    return selectedLeftBox();
  }

  if (isRightSelected) {
    return selectedRightBox();
  }

  return (
    <div>
      {" "}
      <h3 className={classes.headingTxt}> Select Your Plan</h3>
      {/* Box Div */}
      <div className={classes.boxesDiv}>
        {/* Left Box Div*/}
        <div
          className={classes.leftBox}
          onClick={() => setIsLeftSelected(true)}
        >
          <div>
            <h4 style={{ color: "#fff" }}>6 MONTHS</h4>
            <h4 className={classes.h4_2}>APP ACCESS</h4>
          </div>
          <div>
            <h1 style={{ color: "#fff", paddingBottom: "10px" }}>$97.00</h1>
          </div>
          <div>
            <h4 style={{ color: "#fff", marginTop: "0px" }}>
              One-time Payment
            </h4>
            <h4 className={classes.h4_2}>No recurring charges.</h4>
          </div>
        </div>
        {/* End Left Box Div*/}

        {/* Right Box Div */}
        <div
          className={classes.rightBox}
          onClick={() => setIsRightSelected(true)}
        >
          <div>
            <h4 style={{ color: "#ff998a" }}>12 MONTHS</h4>
            <h4 className={classes.h4_B2}>APP ACCESS</h4>
          </div>
          <div>
            <h1 style={{ color: "#ff998a", paddingBottom: "10px" }}>$149.00</h1>
          </div>
          <div>
            <h4 style={{ color: "#ff998a", marginTop: "0px" }}>
              One-time Payment
            </h4>
            <h4 className={classes.h4_B2}>No recurring charges.</h4>
          </div>
        </div>
        {/* End Right Box Div */}

        {/* off box */}
        <div className={classes.offBox}>
          <h4 style={{ marginTop: "2px" }}> SAVE 50%</h4>
        </div>
        {/* off box */}
      </div>
      {/* Box Div */}
    </div>
  );
}

export default Plansindex;
