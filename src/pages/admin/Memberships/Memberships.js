import React, {
  useState, useEffect
} from "react";
import {
  Helmet
} from "react-helmet";
import {
  fetchBackend
} from "../../../utils";
import {
  COLORS
} from "../../../constants/_constants/theme";
import {
  makeStyles, useTheme
} from "@material-ui/core/styles";
import {
  FormControl, InputLabel, Select, MenuItem,
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import ListIcon from "@material-ui/icons/List";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Questions from "./Questions/Questions";
import Summary from "./Summary/Summary";
// import Individual from "./Individual/Individual";


const PERSONALIZATION_STATES = {
  SUMMARY: {
    displayName: "Summary",
    icon: <StarBorderIcon fontSize="small" />,
    component: <Summary />,
  },
  QUESTION: {
    displayName: "Question",
    icon: <HelpOutlineIcon fontSize="small" />,
    component: <Questions />,
  },
  // TODO: fix individual tab
  // INDIVIDUAL: {
  //   displayName: "Individual",
  //   icon: <ListIcon fontSize="small" />,
  //   component: <Individual />,
  // },
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    "& .MuiOutlinedInput-root, & .MuiOutlinedInput-root fieldset": {
      borderColor: `${COLORS.BIZTECH_GREEN}`,
    },
    "& .MuiInputLabel-outlined, & .MuiSelect-outlined, & .MuiSelect-icon": {
      color: `${COLORS.BIZTECH_GREEN}`,
    }
  },
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
  const [personalizationState, setPersonalizationState] = React.useState(
    PERSONALIZATION_STATES.SUMMARY
  );

  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handlePersonalizationChange = (newState) => {
    setPersonalizationState(newState);
  };

  const [membershipData, setMembershipData] = useState([]);

  const [selectedYear, setSelectedYear] = useState("2024"); // default year is 2024

  useEffect(() => {
    let isSubscribed = true;
    const getMemberships = async () => {
      const res = await fetchBackend(`/members?year=${selectedYear}`, "GET");
      // const res = await fetchBackend("/members", "GET");
      if (isSubscribed) {
        setMembershipData(res);
      }
    };
    getMemberships();

    return () => (isSubscribed = false);
  }, [selectedYear]);

  return (
    <div>
      <Helmet>
        <title>BizTech Memberships</title>
      </Helmet>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="year-label">Year</InputLabel>
        <Select
          labelId="year-label"
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
          label="Year"
        >
          <MenuItem value="2021">2021</MenuItem>
          <MenuItem value="2022">2022</MenuItem>
          <MenuItem value="2023">2023</MenuItem>
          <MenuItem value="2024">2024</MenuItem>
        </Select>
      </FormControl>

      <div className={classes.container}>
        {/* Left panel for additional event filters (only on desktop view) */}
        {!isMobile && (
          <div className={classes.sidePanelLayout}>
            <Typography variant="h1">Memberships</Typography>
            <List>
              {Object.values(PERSONALIZATION_STATES).map((pState) => (
                <ListItem
                  key={pState}
                  className={
                    personalizationState === pState
                      ? classes.sidePanelActiveButton
                      : classes.sidePanelButton
                  }
                  onClick={() => handlePersonalizationChange(pState)}
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
                  (personalizationState === pState ? (
                    <Chip
                      key={pState.displayName}
                      className={classes.chipFilter}
                      size="small"
                      color="primary"
                      label={pState.displayName}
                      onDelete={() =>
                        handlePersonalizationChange(
                          PERSONALIZATION_STATES.INDIVIDUAL
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
                      onClick={() => handlePersonalizationChange(pState)}
                    />
                  ))
              )}
            </div>
          )}

          {React.cloneElement(personalizationState.component, {
            membershipData,
          })}
        </div>
      </div>
    </div>
  );
}
export default Memberships;
