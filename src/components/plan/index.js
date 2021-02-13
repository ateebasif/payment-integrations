import React, { useState } from "react";

import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    maxWidth: "40%",
    width: "25%",
    float: "center",
    [theme.breakpoints.down("md")]: {
      maxWidth: "60%",
      width: "40%",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      width: "90%",
    },
  },
  plansDiv: {
    "&:hover": {
      //   background: "#efefef",
      cursor: "pointer",
      color: "#f8006f !important",
    },
  },
}));

function Planindex() {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const btn = expanded ? "expanded" : "x";

  const handleOnclick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        // style={{ minHeight: "100vh" }}
      >
        <Card className={classes.root}>
          <CardContent>
            <div style={{ float: "right" }}>
              {" "}
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={handleOnclick}
              >
                {expanded ? <CloseIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </div>
            <div>
              <div
                className={classes.plansDiv}
                style={{
                  float: "left",
                }}
              >
                <p style={{ marginLeft: "-9.5rem", marginBottom: "-1.5rem" }}>
                  $0.66 PER DAY
                </p>
                <h2 style={{ fontSize: "25px" }}>$19.99 billed monthly</h2>
                <Divider style={{ width: "100%" }} />
              </div>
            </div>
            {expanded && (
              <div
                style={{
                  float: "left",
                }}
              >
                <div
                  style={{
                    float: "left",
                  }}
                  className={classes.plansDiv}
                >
                  <p style={{ marginLeft: "-9.5rem", marginBottom: "-1.5rem" }}>
                    $0.60 PER DAY
                  </p>
                  <h2 style={{}}>$54.99 billed every 3 months</h2>
                  <Divider />
                </div>

                <div
                  style={{
                    float: "left",
                  }}
                  className={classes.plansDiv}
                >
                  <div style={{ display: "flex" }}>
                    <p>BEST VALUE</p>
                    <p>$0.33 PER DAY</p>
                  </div>

                  <h2 style={{}}>$119.94 billed annually</h2>
                  <Divider />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default Planindex;
