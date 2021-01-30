import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { fetchBackend } from "../../../utils";
import { COLORS } from "../../../constants/_constants/theme";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListIcon from "@material-ui/icons/List";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Questions from "./Questions/Questions";
import Summary from './Summary/Summary';
import Individual from './Individual/Individual';

import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
} from "@material-ui/core";

const PERSONALIZATION_STATES = {
  SUMMARY: {
    index: 0,
    displayName: "Summary",
    icon: <StarBorderIcon fontSize="small" />,
  },
  QUESTION: {
    index: 1,
    displayName: "Question",
    icon: <HelpOutlineIcon fontSize="small" />,
  },
  INDIVIDUAL: {
    index: 2,
    displayName: "Individual",
    icon: <ListIcon fontSize="small" />,
  },
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "14px",
    paddingBottom: "14px",
  },
  sidePanelLayout: {
    display: "flex",
    float: "left",
    flexDirection: "column",
    textAlign: "right",
    marginRight: "3em",
    width: "135px",
  },
  sidePanelButton: {
    textAlign: "right",
    whiteSpace: "nowrap",
  },
  sidePanelActiveButton: {
    textAlign: "right",
    whiteSpace: "nowrap",
    borderRight: `2px solid ${COLORS.BIZTECH_GREEN}`,
  },
  tabsLayout: {
    width: "80%",
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      margin: "unset",
    },
  },
  tabsContainer: {
    marginBottom: "2em",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.up("sm")]: {
      marginRight: "30px",
    },
  },
  mobileFilters: {
    overflow: "scroll",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    scrollbarWidth: "none",
    "-ms-overflow-style": "none",
  },
  chipFilter: {
    width: "100%",
    marginRight: "0.5em",
  },
}));

function Memberships() {
  const [personalizationIndex, setPersonalizationIndex] = useState(
    PERSONALIZATION_STATES.SUMMARY.index
  );

  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handlePersonalizationChange = (newIndex) => {
    setPersonalizationIndex(newIndex);
  };

  const [membershipData, setMembershipData] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    const getMemberships = async () => {
      const res = await fetchBackend(`/memberships`, "GET");
      if (isSubscribed) {
        setMembershipData(res);
      }
    };
    getMemberships();

    return () => (isSubscribed = false);
  }, []);

  return (
    <div>
      <Helmet>
        <title>BizTech Memberships</title>
      </Helmet>
      <div className={classes.container}>
        {/* Left panel for additional event filters (only on desktop view) */}
        {!isMobile && (
          <div className={classes.sidePanelLayout}>
            <Typography variant="h1">Memberships</Typography>
            <List>
              {Object.values(PERSONALIZATION_STATES).map((pState) => (
                <ListItem
                  key={pState.index}
                  className={
                    personalizationIndex === pState.index
                      ? classes.sidePanelActiveButton
                      : classes.sidePanelButton
                  }
                  onClick={() => handlePersonalizationChange(pState.index)}
                  button
                >
                  <ListItemText>
                    {pState.icon}&nbsp;{pState.displayName}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
        )}
        <div className={classes.tabsLayout}>
          {/* Upper tabs for filtering (only on desktop view) and searching for events */}
          <div className={classes.tabsContainer}></div>
          {/* Filters in mobile view */}
          {isMobile && (
            <div className={classes.mobileFilters}>
              {Object.values(PERSONALIZATION_STATES).map(
                (pState) =>
                  pState.displayName !== "Individual" && // don't render "All"
                  (personalizationIndex === pState.index ? (
                    <Chip
                      key={pState.displayName}
                      className={classes.chipFilter}
                      size="small"
                      color="primary"
                      label={pState.displayName}
                      onDelete={() =>
                        handlePersonalizationChange(
                          PERSONALIZATION_STATES.INDIVIDUAL.index
                        )
                      }
                    />
                  ) : (
                    <Chip
                      key={pState.displayName}
                      className={classes.chipFilter}
                      size="small"
                      color="secondary"
                      label={pState.displayName}
                      onClick={() => handlePersonalizationChange(pState.index)}
                    />
                  ))
              )}
            </div>
          )}

          {personalizationIndex === 0 && (
            <Summary membershipData={membershipData} />
          )}

          {personalizationIndex === 1 && (
            <Questions membershipData={membershipData} />
          )}
          {/* Questions Page */}

          {personalizationIndex === 2 && (
              <Individual membershipData={membershipData} />
          )}
        </div>
      </div>
    </div>
  );
}
export default Memberships;
