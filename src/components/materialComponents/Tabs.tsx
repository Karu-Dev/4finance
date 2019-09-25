import React from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Inputs } from "./../Inputs";
import { DisplayLoans } from "../DisplayLoans";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "rgba(48, 32, 17, 0.3)",
    width: 700,
    minHeight: 350,
    color: "lightgray"
  }
}));

export default function TabSelection() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "rgba(48, 32, 17, 0.3)" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="lightgray"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Take a loan" />
          <Tab label="Loan history" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Inputs></Inputs>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <DisplayLoans></DisplayLoans>
      </TabPanel>
    </div>
  );
}
