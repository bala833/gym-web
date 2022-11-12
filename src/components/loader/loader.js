import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));
export function LoginLoader() {
  const classes = useStyles();
  return (
    <div>
      <div
        className={classes.root}
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    </div>
  );
}
