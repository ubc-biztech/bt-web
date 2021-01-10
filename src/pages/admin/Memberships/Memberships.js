import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { fetchBackend, updateEvents, updateRegisteredEvents } from '../../../utils'
import { withStyles } from '@material-ui/core/styles'
import { COLORS } from '../../../constants/_constants/theme'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import { sizing } from '@material-ui/system';
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ListIcon from '@material-ui/icons/List';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SearchIcon from '@material-ui/icons/Search';
import Pie from 'react-chartjs-2';
import PieChart from '../../../components/PieChart';
import HorizontalBarChart from '../../../components/HorizontalBarChart';
// import Data from '../../Data';
import * as myData from '../../../components/Data';

import {
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  InputBase,
  Chip
  } from '@material-ui/core'

  const cardStyle = ({
      width: '50%',
      height: '20%',
      margin: '15px 10px 15px 0'
  })


const PERSONALIZATION_STATES = {
    SUMMARY: {
      index: 0,
      displayName: 'Summary',
      icon: <StarBorderIcon fontSize='small' />
    },
    QUESTION: {
      index: 1,
      displayName: 'Question',
      icon: <HelpOutlineIcon fontSize='small' />
    },
    INDIVIDUAL: {
      index: 2,
      displayName: 'Individual',
      icon: <ListIcon fontSize='small' />
    }
  }

//   const charts = [
//               labels= ['university','highschool','other'],
//               datasets= [
//                 {
//                     label: 'students',
//                     data:,
//                     backgroundColor: ["rgba(75, 192, 192, 0.6)"]
//                 }
//               ]
//             ]

const useStyles = makeStyles(theme => ({
    paper: {
      [theme.breakpoints.down('sm')]: {
        backgroundColor: COLORS.BACKGROUND_COLOR
      }
    },  
    content: {
      padding: theme.spacing(3)
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: '14px',
      paddingBottom: '14px'
    },
    sidePanelLayout: {
      display: 'flex',
      float: 'left',
      flexDirection: 'column',
      textAlign: 'right',
      marginRight: '3em',
      width: '135px'
    },
    sidePanelButton: {
      textAlign: 'right',
      whiteSpace: 'nowrap'
    },
    sidePanelActiveButton: {
        textAlign: 'right',
        whiteSpace: 'nowrap',
        borderRight: `2px solid ${COLORS.BIZTECH_GREEN}`
      },
    tabsLayout: {
      width: '80%',
      margin: 'auto',
      [theme.breakpoints.up('sm')]: {
        margin: 'unset'
      }
    },
    tabsContainer: {
      marginBottom: '2em',
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.up('sm')]: {
        marginRight: '30px'
      }
    },
    tab: {
      fontSize: '0.9rem',
      marginLeft: '1em',
      marginRight: '1em',
      textTransform: 'none',
      maxWidth: '5em',
      width: '100%',
      color: `${COLORS.WHITE} !important`
    },
    search: {
      display: 'flex',
      height: '100%',
      maxWidth: '100%',
      background: 'white',
      borderRadius: '3em',
      marginLeft: 'auto',
      zIndex: '100'
    },
    searchIcon: {
      display: 'flex',
      background: 'white',
      borderRadius: '50%',
      padding: '0.5em',
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none'
      }
    },
    searchInput: {
      width: '0',
      color: COLORS.CARD_PAPER_COLOR,
      transition: theme.transitions.create('width')
    },
    searchInputActive: {
      width: '70vw',
      color: COLORS.CARD_PAPER_COLOR,
      transition: theme.transitions.create('width')
    },
    mobileFilters: {
      overflow: 'scroll',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      scrollbarWidth: 'none',
      '-ms-overflow-style': 'none'
    },
    chipFilter: {
      width: '100%',
      marginRight: '0.5em'
    },
    rows: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  })
)


export default function Memberships (props) {
  const [isSearch, setIsSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [personalizationIndex, setPersonalizationIndex] = useState(PERSONALIZATION_STATES.SUMMARY.index)

  const history = useHistory()
  const classes = useStyles()
  const searchInput = useRef()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const handlePersonalizationChange = (newIndex) => {
      setPersonalizationIndex(newIndex)
  }

  const handleStartSearch = () => {
    setIsSearch(true)
    searchInput.current.focus()
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }
//   const getMembershipData = async () => {
//     fetchBackend(`/memberships`, 'GET')
//         .then(async response => {
//             console.log(response)
//         })
// }


  const [chartData, setChartData] = useState({});
  const chart = () => {
      setChartData({
          labels: ['I am a current/prospective UBC student','I am a current/prospective UBC student','I am a high school student','Other'],
          datasets: [
            {
                label: 'students',
                data:[80,15,7,3],
                backgroundColor: ['#AEC4F4','#96FF50','#F2C94C','#56CCF2'],
                borderWidth: 0
            }
          ]
      })
  }
  useEffect(() => {
    chart()
    // getMembershipData();
  }, [])

    return (
      <div>
      <Helmet>
        <title>BizTech Memberships</title>
      </Helmet>
      <div className={classes.container}>

        {/* Left panel for additional event filters (only on desktop view) */}
        {!isMobile &&
          <div className={classes.sidePanelLayout}>
            <Typography variant='h1'>Memberships</Typography>
            <List>
              {Object.values(PERSONALIZATION_STATES).map(pState => (
                <ListItem
                  key={pState.index}
                  className={personalizationIndex === pState.index
                    ? classes.sidePanelActiveButton
                    : classes.sidePanelButton}
                  onClick={() => handlePersonalizationChange(pState.index)}
                  button
                >
                  <ListItemText>{pState.icon}&nbsp;{pState.displayName}</ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
        }

        <div className={classes.tabsLayout}>
          {/* Upper tabs for filtering (only on desktop view) and searching for events */}
          <div className={classes.tabsContainer}>

            {/* The search button */}
            <div className={classes.search}>
              <IconButton className={classes.searchIcon} onClick={handleStartSearch}>
                <SearchIcon style={{ color: COLORS.CARD_PAPER_COLOR }}/>
              </IconButton>
              <InputBase
                inputRef={searchInput}
                placeholder='Search…'
                classes={{ input: isSearch ? classes.searchInputActive : classes.searchInput }}
                onChange={handleSearchChange}
                onBlur={() => setIsSearch(false)}
              />
            </div>
          </div>

          {/* Filters in mobile view */}
          {isMobile &&
            <div className={classes.mobileFilters}>
              
              {Object.values(PERSONALIZATION_STATES).map((pState) =>
                pState.displayName !== 'Individual' && // don't render "All"
                (personalizationIndex === pState.index
                  ? <Chip
                    key={pState.displayName}
                    className={classes.chipFilter}
                    size='small'
                    color='primary'
                    label={pState.displayName}
                    onDelete={() => handlePersonalizationChange(PERSONALIZATION_STATES.INDIVIDUAL.index)}/>
                  : <Chip
                    key={pState.displayName}
                    className={classes.chipFilter}
                    size='small'
                    color='secondary'
                    label={pState.displayName}
                    onClick={() => handlePersonalizationChange(pState.index)}/>
                )
              )}
            </div>
          }
        <Paper className={classes.paper}>
        <div className={classes.content}>
        <Typography variant='h2'>600 Responses</Typography>

            {/* 1. type of student */}
            <Box m={2} py={2} px={4}>
                <Card className={classes.card} style={cardStyle} style={{backgroundColor: '#293B61'}}>
                    <Box py={3} px={4}> <Typography align='left' variant='h6'> Type of Member</Typography> </Box>
                    <div>
                        <PieChart data={myData.membershipTypeData}/>
                    </div>
                </Card>
            </Box>

            {/* 2. academic year level */}
            <Box m={2} py={2} px={4}>
                <Card className={classes.card} style={cardStyle} style={{backgroundColor: '#293B61'}}>
                    <Box py={3} px={4}> <Typography align='left' variant='h6'> Academic Year Level</Typography> </Box>
                    <div>
                        <PieChart data={myData.academicYearLevelData}/>
                    </div>
                </Card>
            </Box>

            {/* 4. international student */}
            <Box m={2} py={2} px={4}>
                <Card className={classes.card} style={cardStyle} style={{backgroundColor: '#293B61'}}>
                    <Box py={3} px={4}> <Typography align='left' variant='h6'> Are you an international student?</Typography> </Box>
                    <div>
                        <PieChart data={myData.internationalStudentData}/>
                    </div>
                </Card>
            </Box>

            {/* 5. topics discussed in future */}
            <Box m={2} py={2} px={4}>
                <Card className={classes.card} style={cardStyle} style={{backgroundColor: '#293B61'}}>
                    <Box py={3} px={4}> <Typography align='left' variant='h6'> What topics did you want to see the most discussed in the future?</Typography> </Box>
                    <div>
                        <HorizontalBarChart data={myData.topicsData} max={30}/>
                    </div>
                </Card>
            </Box>

            {/* 6. how did you hear about us */}
            <Box m={2} py={2} px={4}>
                <Card className={classes.card} style={cardStyle} style={{backgroundColor: '#293B61'}}>
                    <Box py={3} px={4}> <Typography align='left' variant='h6'> How did you hear about us?</Typography> </Box>
                    <div>
                        <HorizontalBarChart data={myData.hearAboutUsData} max={7}/>
                    </div>
                </Card>
            </Box>

            

        </div>
        </Paper>
          
          

        </div>
      </div>
    </div>
    )
}