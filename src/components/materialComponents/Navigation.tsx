import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: "0 0 5rem 0"
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

export default function Navigation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: "rgba(255, 179, 103, 0.8)" }}>
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ textAlign: "left" }}
          >
            Nugget, Bisquit, Nugget in a Bisquit
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
