import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { fetchBackend, updateEvents, updateRegisteredEvents } from '../../../utils'
import { COLORS } from '../../../constants/_constants/theme'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ListIcon from '@material-ui/icons/List';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PieChart from '../../../components/PieChart';
import HorizontalBarChart from '../../../components/HorizontalBarChart';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Divider from '@material-ui/core/Divider'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { ReactComponent as LeftArrowIcon } from '../../../assets/leftarrow.svg'
import { ReactComponent as RightArrowIcon } from '../../../assets/rightarrow.svg'
import FormControl from '@material-ui/core/FormControl';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from 'react-dropdown-select';



import {
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  InputBase,
  Chip,
  SvgIcon
} from '@material-ui/core'
import { Transform } from '@material-ui/icons'


const cardStyle = ({
  backgroundCOlor: '#293B61',

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

const useStyles = makeStyles(theme => ({
  card: {
    margin: '15px 10px 15px 0px',
    backgroundColor: '#293B61'
  },
  paper: {
    [theme.breakpoints.down('sm')]: {
      backgroundColor: COLORS.BACKGROUND_COLOR
    },
    paddingBottom: '12px',
    marginTop: '60px'
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
  },
  questionsDropDown: {
    display: 'flex',
    justifyContent: 'center'
  },
  questionScrollBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navigateButton: {
    fontSize: 'large'
  },
  questionLabel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  individualDropDown: {
    background: '#d4e7fa',
    color: COLORS.BACKGROUND_COLOR,
  },
  numResponses: {
    color: '#AEC4F4',
    fontFamily: "Gilroy",
    fontStyle: 'normal',
    fontWeight: 'bold'
  }
})
)
const chartColors = (['#56CCF2', '#F2C027', '#6489F1', '#7AD040', '#0C73EA', '#E8FC67'])

function Memberships(props) {

  const {
    memberships,
    membershipsLoading
  } = props

  const [isSearch, setIsSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [personalizationIndex, setPersonalizationIndex] = useState(PERSONALIZATION_STATES.SUMMARY.index)
  const [questionIndex, setQuestionIndex] = useState(0)


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

  const handleQuestionChange = (event) => {
    setQuestionIndex(event.target.value)
  }

  const handleNavigateBefore = () => {
    questionIndex == 0 ? setQuestionIndex(7) : setQuestionIndex((questionIndex * 1) - 1);
    console.log(questionIndex)
  }

  const handleNavigateAfter = () => {
    questionIndex == 7 ? setQuestionIndex(0) : setQuestionIndex((questionIndex * 1) + 1);
    console.log(questionIndex)
  }

  const [membershipData, setMembershipData] = useState([])
  const [memberID, setMemberID] = useState(0)
  const [memberData, setMemberData] = useState([])

  const increaseMemberID = () => {
    if (memberID < membershipData.length) {
      setMemberID(memberID + 1)
    }
  }

  const decreaseMemberID = () => {
    if (memberID > 0) {
      setMemberID(memberID - 1)
    }
  }

  const selectMemberID = (num) => {
    setMemberID(num)
    console.log(membershipData.filter(x => x.id === memberID))
  }



  useEffect(() => {
    let isSubscribed = true
    const getMemberships = async () => {
      const res = await fetchBackend(`/memberships`, 'GET')
      if (isSubscribed) {
        setMembershipData(res);
      }
    }
    getMemberships()
    setMemberData(membershipData.filter(x => x.id === memberID))

    return () => isSubscribed = false

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
                    onDelete={() => handlePersonalizationChange(PERSONALIZATION_STATES.INDIVIDUAL.index)} />
                  : <Chip
                    key={pState.displayName}
                    className={classes.chipFilter}
                    size='small'
                    color='secondary'
                    label={pState.displayName}
                    onClick={() => handlePersonalizationChange(pState.index)} />
                )
              )}
            </div>
          }
          {personalizationIndex == 0 &&
            <Paper className={classes.paper}>
              <div className={classes.content}>
                <Box className={classes.numResponses} color='#AEC4F4' fontFamily="Gilroy" fontStyle='normal' fontWeight='bold' fontSize='26px'>{membershipData.length} Responses</Box>

                {/* 1. Type of Member */}
                <Box m={2} px={4}>
                  <Card className={classes.card}>
                    <Box pt={3} px={4}> <Typography align='left' variant='h6'> Type of Member</Typography> </Box>
                    <div >
                      <PieChart data={{
                        labels: ['UBC student', 'University student', 'High school student', 'Other'],
                        datasets: [
                          {
                            label: 'students',
                            data: [membershipData.filter(x => x.education == 'UBC').length,
                            membershipData.filter(x => x.education == 'UNI').length,
                            membershipData.filter(x => x.education == 'HS').length,
                            membershipData.filter(x => x.education == 'NA').length,],
                            backgroundColor: chartColors,
                            borderWidth: 0
                          }
                        ]
                      }}

                      />
                    </div>
                  </Card>
                </Box>

                {/* 2. Academic Year Level */}
                <Box m={2} px={4}>
                  <Card className={classes.card}>
                    <Box pt={3} px={4}> <Typography align='left' variant='h6'> Academic Year Level</Typography> </Box>
                    <div>
                      <PieChart data={{
                        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5+', 'Pre-university'],
                        datasets: [
                          {
                            label: 'students',
                            data: [membershipData.filter(x => x.year == '1').length,
                            membershipData.filter(x => x.year == '2').length,
                            membershipData.filter(x => x.year == '3').length,
                            membershipData.filter(x => x.year == '4').length,
                            membershipData.filter(x => x.year == '5+').length,
                            membershipData.filter(x => x.year == 'Grade 10').length +
                            membershipData.filter(x => x.year == 'Grade 11').length +
                            membershipData.filter(x => x.year == 'Grade 12').length +
                            membershipData.filter(x => x.year == 'Pre-university').length],
                            backgroundColor: chartColors,
                            borderWidth: 0
                          }
                        ]
                      }} />
                    </div>
                  </Card>
                </Box>

                {/* 3. Faculty */}
                <Box m={2} px={4}>
                  <Card className={classes.card}>
                    <Box pt={3} px={4}> <Typography align='left' variant='h6'> Faculty</Typography> </Box>
                    <div>
                      <PieChart data={{
                        labels: ['Commerce', 'Sciences', 'Arts', 'Engineering', 'LFS', 'Kinesiology'],
                        datasets: [
                          {
                            label: 'students',
                            data: [membershipData.filter(x => x.faculty == 'Commerce').length,
                            membershipData.filter(x => x.faculty == 'Sciences').length,
                            membershipData.filter(x => x.faculty == 'Arts').length,
                            membershipData.filter(x => x.faculty == 'Engineering').length,
                            membershipData.filter(x => x.faculty == 'LFS').length,
                            membershipData.filter(x => x.faculty == 'Kinesiology').length],
                            backgroundColor: chartColors,
                            borderWidth: 0
                          }
                        ]
                      }} />
                    </div>
                  </Card>
                </Box>

                {/* 4. Major */}
                <Box m={2} px={4} >
                  <Card className={classes.card}>
                    <Box pt={3} px={4} > <Typography align='left' variant='h6'> Major</Typography> </Box>
                    <HorizontalBarChart max={143} data={{
                      labels: ['Computer Science', 'BUCS', 'Undeclared', 'BTM', 'Finance', 'Marketing', 'COGS', 'Accounting', 'Electrical Engineering', 'OpLog'],
                      datasets: [
                        {
                          data: [membershipData.filter(x => x.major.toLowerCase().includes('computer science') || x.major.toLowerCase().includes('compsci') || x.major.toLowerCase() == ('cs') || x.major.toLowerCase() == ('cpsc')).length,
                          membershipData.filter(x => x.major.toLowerCase().includes('bucs') || x.major.toLowerCase().includes('business and computer science')).length,
                          membershipData.filter(x => x.major.toLowerCase().includes('undeclared') || x.major.toLowerCase().includes('undecided') || x.major.toLowerCase().includes('n/a') || x.major.toLowerCase().includes('yet') || x.major.toLowerCase().includes('not')).length,
                          membershipData.filter(x => x.major.toLowerCase().includes('btm') || x.major.toLowerCase().includes('business technology management')).length,
                          membershipData.filter(x => x.major.toLowerCase().includes('finance')).length,
                          membershipData.filter(x => x.major.toLowerCase().includes('marketing')).length,
                          membershipData.filter(x => x.major.toLowerCase().includes('cogs') || x.major.toLowerCase().includes('cognitive systems')).length,
                          membershipData.filter(x => x.major.toLowerCase().includes('accounting')).length,
                          membershipData.filter(x => x.major.toLowerCase().includes('electrical')).length,
                          membershipData.filter(x => x.major.toLowerCase().includes('oplog') || x.major.toLowerCase().includes('operations') || x.major.toLowerCase().includes('logistics')).length],
                          backgroundColor: ['#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2'],
                        }
                      ]
                    }} />
                  </Card>
                </Box>

                {/* 5. Are you an international student? */}
                <Box m={2} py={2} px={4}>
                  <Card className={classes.card}>
                    <Box pt={3} px={4}> <Typography align='left' variant='h6'> Are you an international student?</Typography> </Box>
                    <div>
                      <PieChart data={{
                        labels: ['Yes', 'No'],
                        datasets: [
                          {
                            data: [membershipData.filter(x => x.international == true).length,
                            membershipData.filter(x => x.international == false).length],
                            backgroundColor: chartColors,
                            borderWidth: 0
                          }
                        ]
                      }
                      } />
                    </div>
                  </Card>
                </Box>

                {/* 6. What topics did you want to see the most discussed in the future? */}
                <Box m={2} py={2} px={4}>
                  <Card className={classes.card}>
                    <Box pt={3} px={4}> <Typography align='left' variant='h6'> What topics did you want to see the most discussed in the future?</Typography> </Box>
                    <div>
                      <HorizontalBarChart max={446} data={{
                        labels: ['Careers in Tech', 'Tech Startups', 'AI', 'eCommerce', 'Cyber Security', 'Health Tech'],
                        datasets: [
                          {
                            data: [
                              membershipData.filter(x => x.topics.includes('Careers in the Tech Industry')).length,
                              membershipData.filter(x => x.topics.includes('Tech Startups')).length,
                              membershipData.filter(x => x.topics.includes('AI')).length,
                              membershipData.filter(x => x.topics.includes('eCommerce')).length,
                              membershipData.filter(x => x.topics.includes('Cyber Security')).length,
                              membershipData.filter(x => x.topics.includes('Health Tech')).length],
                            backgroundColor: ['#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2']
                          }
                        ]
                      }} />
                    </div>
                  </Card>
                </Box>

                {/* 7. How did you hear about us? */}
                <Box m={2} px={4}>
                  <Card className={classes.card}>
                    <Box pt={3} px={4}> <Typography align='left' variant='h6'> How did you hear about us?</Typography> </Box>
                    <div>
                      <HorizontalBarChart max={236} data={{
                        labels: ['Facebook', 'Friends', 'Events', 'Instagram'],
                        datasets: [
                          {
                            data: [membershipData.filter(x => x.heard_from == 'Facebook').length,
                            membershipData.filter(x => x.heard_from == 'Friends').length,
                            membershipData.filter(x => x.heard_from == 'Events').length,
                            membershipData.filter(x => x.heard_from == 'Instagram').length
                            ],
                            backgroundColor: ['#56CCF2', '#56CCF2', '#56CCF2', '#56CCF2']
                          }
                        ]
                      }} />
                    </div>
                  </Card>
                </Box>

              </div>
            </Paper>
          }
          {personalizationIndex == 1 &&
            <Paper className={classes.paper}>
              <div className={classes.content}>
                <Box className={classes.numResponses} color='#AEC4F4' fontFamily="Gilroy" fontStyle='normal' fontWeight='bold' fontSize='26px'>{membershipData.length} Responses</Box>

                <div className={classes.questionScrollBox}>
                  <IconButton className={classes.navigateButton} onClick={handleNavigateBefore}>
                    <LeftArrowIcon />
                  </IconButton>
                  <div>
                    <Box mx={2} px={4}>
                      <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61' }}>
                        <Box py={2} px={4} className={classes.questionsDropDown}>
                          <FormControl className={classes.questionsForm}>
                            <NativeSelect
                              value={questionIndex}
                              onChange={handleQuestionChange}
                              name="questions"
                              className={classes.selectEmpty}
                              inputProps={{
                                'aria-label': 'questions',
                                style: {
                                  fontSize: 16,
                                  fontWeight: 'bold',
                                  fontFamily: 'Gilroy',
                                  textAlignLast: 'center'
                                },
                              }}
                            >
                              <option value={0}>Please choose the option that's most relevant to you</option>
                              <option value={1}>Academic Year Level</option>
                              <option value={2}>Faculty</option>
                              <option value={3}>Major</option>
                              <option value={4}>Were you a BizTech member last year?</option>
                              <option value={5}>Are you an international student?</option>
                              <option value={6}>What topics did you want to see the most discussed in the future?</option>
                              <option value={7}>How did you hear about us?</option>
                            </NativeSelect>
                          </FormControl>
                        </Box>
                      </Card>
                    </Box>
                  </div>
                  <IconButton className={classes.navigateButton} onClick={handleNavigateAfter}>
                    <RightArrowIcon />
                  </IconButton>
                </div>



                {questionIndex == 0 &&

                  <Box px={4}>
                    <Card className={classes.card} style={cardStyle}>
                      <Box py={2} px={4}>
                        <div className={classes.questionLabel}>
                          <Typography>I am a current/prospective UBC student</Typography>
                          <Box className={classes.numResponses} fontSize='18px'>{membershipData.filter(x => x.education === "UBC").length}
                          </Box>
                        </div>
                      </Box>
                    </Card>

                    <Card className={classes.card} style={cardStyle}>
                      <Box py={2} px={4}>
                        <div className={classes.questionLabel}>
                          <Typography>I am a current/prospective university student</Typography>
                          <Box className={classes.numResponses} fontSize='18px'>{membershipData.filter(x => x.education === "UNI").length}
                          </Box>
                        </div>
                      </Box>
                    </Card>

                    <Card className={classes.card} style={cardStyle}>
                      <Box py={2} px={4}>
                        <div className={classes.questionLabel}>
                          <Typography>I am a high school student</Typography>
                          <Box className={classes.numResponses} fontSize='18px'>{membershipData.filter(x => x.education === "HS").length}
                          </Box>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle}>
                      <Box py={2} px={4}>
                        <div className={classes.questionLabel}>
                          <Typography>None of the above</Typography>
                          <Box className={classes.numResponses} fontSize='18px'>{membershipData.filter(x => x.education === "NA").length}
                          </Box>
                        </div>
                      </Box>
                    </Card>
                  </Box>
                }

                {questionIndex == 1 &&
                  <Box mx={2} px={4}>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61' }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Year 1</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.year === '1').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Year 2</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.year === '2').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Year 3</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.year === '3').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Year 4</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.year === '4').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Year 5+</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.year === '5+').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Pre-University</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.year === 'Grade 10' ||
                              x.year === 'Grade 11' ||
                              x.year === 'Grade 12' ||
                              x.year === 'Pre-University').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                  </Box>
                }

                {questionIndex == 2 &&
                  <Box mx={2} px={4}>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61' }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Commerce</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.faculty === 'Commerce').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Sciences</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.faculty === 'Sciences').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Arts</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.faculty === 'Arts').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Engineering</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.faculty === 'Engineering').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>LFS</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.faculty === 'LFS').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Kinesiology</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.faculty === 'Kinesiology').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                  </Box>
                }

                {questionIndex == 3 &&
                  <Box mx={2} px={4}>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61' }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Computer Science</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.major.toLowerCase().includes('computer science') || x.major.toLowerCase().includes('compsci') || x.major.toLowerCase() === ('cs') || x.major.toLowerCase() === ('cpsc')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>BUCS</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.major.toLowerCase().includes('bucs') || x.major.toLowerCase().includes('business and computer science')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Undeclared</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.major.toLowerCase().includes('undeclared') || x.major.toLowerCase().includes('undecided') || x.major.toLowerCase().includes('n/a') || x.major.toLowerCase().includes('yet') || x.major.toLowerCase().includes('not')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>BTM</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.major.toLowerCase().includes('btm') || x.major.toLowerCase().includes('business technology management')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Finance</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.major.toLowerCase().includes('finance')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Marketing</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.major.toLowerCase().includes('marketing')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>COGS</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.major.toLowerCase().includes('cogs') || x.major.toLowerCase().includes('cognitive systems')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Accounting</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.major.toLowerCase().includes('accounting')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Electrical Engineering</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.major.toLowerCase().includes('electrical')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>OpLog</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.major.toLowerCase().includes('oplog') || x.major.toLowerCase().includes('operations') || x.major.toLowerCase().includes('logistics')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                  </Box>
                }

                {questionIndex == 4 &&
                  <Box mx={2} px={4}>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61' }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Yes</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.prev_member).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>No</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => !x.prev_member).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                  </Box>
                }
                {questionIndex == 5 &&
                  <Box mx={2} px={4}>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61' }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Yes</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.international).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>No</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => !x.international).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                  </Box>
                }
                {questionIndex == 6 &&
                  <Box mx={2} px={4}>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61' }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Careers in Tech</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.topics.includes('Careers in the Tech Industry')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Tech Startups</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.topics.includes('Tech Startups')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>AI</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.topics.includes('AI')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>eCommerce</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.topics.includes('eCommerce')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Cyber Security</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.topics.includes('Cyber Security')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Health Tech</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.topics.includes('Health Tech')).length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                  </Box>
                }
                {questionIndex == 7 &&
                  <Box mx={2} px={4}>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61' }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Facebook</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.heard_from === 'Facebook').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Friends</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.heard_from === 'Friends').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Events</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.heard_from === 'Events').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                    <Card className={classes.card} style={cardStyle} style={{ backgroundColor: '#293B61', marginTop: 40 }}>
                      <Box py={3} px={4}>
                        <div className={classes.questionLabel}>
                          <div>
                            <Typography>Instagram</Typography>
                          </div>
                          <div>
                            <Typography>{membershipData.filter(x => x.heard_from === 'Instagram').length}</Typography>
                          </div>
                        </div>
                      </Box>
                    </Card>
                  </Box>
                }
              </div>
            </Paper>
          }
          {/* Questions Page */}

          {personalizationIndex == 2 &&
            <Paper className={classes.paper}>
              <div className={classes.content}>
                <Box className={classes.numResponses} color='#AEC4F4' fontFamily="Gilroy" fontStyle='normal' fontWeight='bold' fontSize='26px'>{membershipData.length} Responses</Box>
                <Grid container xs={12} align='center'>
                  <Grid item xs={2}>
                  </Grid>
                  <Grid item xs={8} align='center'>
                    <Box paddingTop={1} marginBottom={1}>
                      <Select
                        className={classes.individualDropDown}
                        options={membershipData}
                        values={[]}
                        border={COLORS.BACKGROUND_COLOR}
                        color={COLORS.BIZTECH_GREEN}
                        marginTop={50}
                        placeholder='Enter email to search'
                        clearable={true}
                        searchBy="email"
                        valueField="id"
                        labelField="email"
                        onChange={(value) => selectMemberID(value.map(x => x.id)[0])}>
                      </Select>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                  </Grid>
                </Grid>

                {/* Type of Member */}
                <Card className={classes.card} style={{ textAlign: 'left', backgroundColor: '#293B61', width: '67vw', marginLeft: 25, paddingTop: 20, paddingBottom: 10, marginTop: 10, paddingLeft: 25, paddingTop: 10 }}>
                  <Grid container spacing={0} xs={12}>
                    <Grid item xs={12}>
                      <Box paddingLeft={1} paddingTop={1} fontSize='23px' fontFamily="Gilroy" fontWeight="fontWeightBold" fontStyle="italic">Type of Member
                    </Box>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.education) == 'UBC' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          I am a current/prospective UBC student
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.education) == 'UNI' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          I am a current/prospective university student
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.education) == 'HS' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          I am a high school student
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.education) == 'NA' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Other
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>

                {/* First Name */}
                <Card className={classes.card} style={{ textAlign: 'left', backgroundColor: '#293B61', width: '67vw', marginLeft: 25, paddingTop: 20, paddingBottom: 10, marginTop: 10, paddingLeft: 25, paddingTop: 10 }}>
                  <Grid container spacing={0} xs={12}>
                    <Box paddingLeft={1} paddingTop={1} fontSize='23px' fontFamily="Gilroy" fontWeight="fontWeightBold" fontStyle="italic">First Name
                    </Box>
                    <Grid item xs={12}>
                      <Box paddingLeft={1} paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                        {membershipData.filter(x => x.id === memberID).map(x => x.first_name)}
                        <Divider color='DADADA'></Divider>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>

                {/* Last Name */}
                <Card className={classes.card} style={{ textAlign: 'left', backgroundColor: '#293B61', width: '67vw', marginLeft: 25, paddingTop: 20, paddingBottom: 10, marginTop: 10, paddingLeft: 25, paddingTop: 10 }}>
                  <Grid container spacing={0} xs={12}>
                    <Box paddingLeft={1} paddingTop={1} fontSize='23px' fontFamily="Gilroy" fontWeight="fontWeightBold" fontStyle="italic">Last Name
                    </Box>
                    <Grid item xs={12}>
                      <Box paddingLeft={1} paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                        {membershipData.filter(x => x.id === memberID).map(x => x.last_name)}
                        <Divider color='DADADA'></Divider>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>

                {/* Preferred Pronouns */}
                <Card className={classes.card} style={{ textAlign: 'left', backgroundColor: '#293B61', width: '67vw', marginLeft: 25, paddingTop: 20, paddingBottom: 10, marginTop: 10, paddingLeft: 25, paddingTop: 10 }}>
                  <Grid container spacing={0} xs={12}>
                    <Grid item xs={12}>
                      <Box paddingLeft={1} paddingTop={1} fontSize='23px' fontFamily="Gilroy" fontWeight="fontWeightBold" fontStyle="italic">Preferred Pronouns
                    </Box>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.pronouns) == 'She/Her/Hers' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                        {/* <IconButton> <FiberManualRecordIcon style={{ color: COLORS.BIZTECH_GREEN, width: 30, height: 30 }} />
                        </IconButton> */}
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          She/Her/Hers
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.pronouns) == 'He/Him/His' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          He/Him/His
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.pronouns) == 'They/Them/Theirs' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          They/Them/Theirs
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.pronouns) == 'Prefer not to answer' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Prefer not to answer
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {((membershipData.filter(x => x.id === memberID).map(x => x.pronouns) == 'She/Her/Hers')
                            || (membershipData.filter(x => x.id === memberID).map(x => x.pronouns) == 'He/Him/His')
                            || (membershipData.filter(x => x.id === memberID).map(x => x.pronouns) == 'They/Them/Theirs'))
                            || membershipData.filter(x => x.id === memberID).map(x => x.first_name.length < 1)
                            ? <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} /> :
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Other{(membershipData.filter(x => x.id === memberID).map(x => x.pronouns) == 'She/Her/Hers')
                            || (membershipData.filter(x => x.id === memberID).map(x => x.pronouns) == 'He/Him/His')
                            || (membershipData.filter(x => x.id === memberID).map(x => x.pronouns) == 'They/Them/Theirs')
                            ? "" : ": " + membershipData.filter(x => x.id === memberID).map(x => x.pronouns)}
                        </Box>
                      </Grid>
                    </Grid>

                  </Grid>
                </Card>

                {/* UBC Student Number */}
                {membershipData.filter(x => x.id === memberID).map(x => x.education) == ('UBC') &&
                  <Card className={classes.card} style={{ textAlign: 'left', backgroundColor: '#293B61', width: '67vw', marginLeft: 25, paddingTop: 20, paddingBottom: 10, marginTop: 10, paddingLeft: 25, paddingTop: 10 }}>
                    <Grid container spacing={0} xs={12}>
                      <Box paddingLeft={1} paddingTop={1} fontSize='23px' fontFamily="Gilroy" fontWeight="fontWeightBold" fontStyle="italic">UBC Student Number
                    </Box>
                      <Grid item xs={12}>
                        <Box paddingLeft={1} paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          {membershipData.filter(x => x.id === memberID).map(x => x.student_number) != 0 ? membershipData.filter(x => x.id === memberID).map(x => x.student_number) : <p></p>}
                          <Divider color='DADADA'></Divider>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                }

                {/* Academic Year Level */}
                <Card className={classes.card} style={{ textAlign: 'left', backgroundColor: '#293B61', width: '67vw', marginLeft: 25, paddingTop: 20, paddingBottom: 10, marginTop: 10, paddingLeft: 25, paddingTop: 10 }}>
                  <Grid container spacing={0} xs={12}>
                    <Grid item xs={12}>
                      <Box paddingLeft={1} paddingTop={1} fontSize='23px' fontFamily="Gilroy" fontWeight="fontWeightBold" fontStyle="italic">Academic Year Level
                    </Box>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.year) == '1' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Year 1
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.year) == '2' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Year 2
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.year) == '3' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Year 3
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.year) == '4' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Year 4
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.year) == '5+' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Year 5+
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {(membershipData.filter(x => x.id === memberID).map(x => x.year) == ('Grade 10' || 'Grade 11' || 'Grade 12' || 'Pre-university')) ||
                            (membershipData.filter(x => x.id === memberID).map(x => x.education) == 'HS') ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Pre-university
                  </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.year) == 'Other' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Other
                        </Box>
                      </Grid>
                    </Grid>

                  </Grid>
                </Card>

                {/* Faculty */}
                {membershipData.filter(x => x.id === memberID).map(x => x.education) == ('UBC' || 'UNI') &&
                  <Card className={classes.card} style={{ textAlign: 'left', backgroundColor: '#293B61', width: '67vw', marginLeft: 25, paddingTop: 20, paddingBottom: 10, marginTop: 10, paddingLeft: 25, paddingTop: 10 }}>
                    <Grid container spacing={0} xs={12}>
                      <Grid item xs={12}>
                        <Box paddingLeft={1} paddingTop={1} fontSize='23px' fontFamily="Gilroy" fontWeight="fontWeightBold" fontStyle="italic">Faculty
                    </Box>
                      </Grid>

                      <Grid item spacing={0} xs={12} container>
                        <Grid item xs={1}>
                          <IconButton disabled={true}>
                            {membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Commerce' ?
                              <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                              <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                          </IconButton>
                        </Grid>
                        <Grid item xs={11}>
                          <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                            Commerce
                        </Box>
                        </Grid>
                      </Grid>

                      <Grid item spacing={0} xs={12} container>
                        <Grid item xs={1}>
                          <IconButton disabled={true}>
                            {membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Sciences' ?
                              <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                              <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                          </IconButton>
                        </Grid>
                        <Grid item xs={11}>
                          <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                            Sciences
                        </Box>
                        </Grid>
                      </Grid>

                      <Grid item spacing={0} xs={12} container>
                        <Grid item xs={1}>
                          <IconButton disabled={true}>
                            {membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Arts' ?
                              <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                              <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                          </IconButton>
                        </Grid>
                        <Grid item xs={11}>
                          <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                            Arts
                        </Box>
                        </Grid>
                      </Grid>

                      <Grid item spacing={0} xs={12} container>
                        <Grid item xs={1}>
                          <IconButton disabled={true}>
                            {membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Engineering' ?
                              <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                              <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                          </IconButton>
                        </Grid>
                        <Grid item xs={11}>
                          <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                            Engineering
                        </Box>
                        </Grid>
                      </Grid>

                      <Grid item spacing={0} xs={12} container>
                        <Grid item xs={1}>
                          <IconButton disabled={true}>
                            {membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'LFS' ?
                              <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                              <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                          </IconButton>
                        </Grid>
                        <Grid item xs={11}>
                          <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                            LFS
                        </Box>
                        </Grid>
                      </Grid>

                      <Grid item spacing={0} xs={12} container>
                        <Grid item xs={1}>
                          <IconButton disabled={true}>
                            {membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Kinesiology' ?
                              <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                              <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                          </IconButton>
                        </Grid>
                        <Grid item xs={11}>
                          <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                            Kinesiology
                        </Box>
                        </Grid>
                      </Grid>

                      <Grid item spacing={0} xs={12} container>
                        <Grid item xs={1}>
                          <IconButton disabled={true}>
                            {membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Forestry' ?
                              <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                              <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                          </IconButton>
                        </Grid>
                        <Grid item xs={11}>
                          <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                            Forestry
                        </Box>
                        </Grid>
                      </Grid>

                      <Grid item spacing={0} xs={12} container>
                        <Grid item xs={1}>
                          <IconButton disabled={true}>
                            {(membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Commerce')
                              || (membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Sciences')
                              || (membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Arts')
                              || (membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Engineering')
                              || (membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'LFS')
                              || (membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Kinesiology')
                              || (membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Forestry')
                              ? <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} /> :
                              <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} />}
                          </IconButton>
                        </Grid>
                        <Grid item xs={11}>
                          <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                            Other{(membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Commerce')
                              || (membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Sciences')
                              || (membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Arts')
                              || (membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Engineering')
                              || (membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'LFS')
                              || (membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Kinesiology')
                              || (membershipData.filter(x => x.id === memberID).map(x => x.faculty) == 'Forestry')
                              ? "" : ": " + membershipData.filter(x => x.id === memberID).map(x => x.faculty)}
                          </Box>
                        </Grid>
                      </Grid>

                    </Grid>
                  </Card>
                }

                {/* Major */}
                {membershipData.filter(x => x.id === memberID).map(x => x.education) == ('UBC' || 'UNI') &&
                  <Card className={classes.card} style={{ textAlign: 'left', backgroundColor: '#293B61', width: '67vw', marginLeft: 25, paddingTop: 20, paddingBottom: 10, marginTop: 10, paddingLeft: 25, paddingTop: 10 }}>
                    <Grid container spacing={0} xs={12}>
                      <Box paddingLeft={1} paddingTop={1} fontSize='23px' fontFamily="Gilroy" fontWeight="fontWeightBold" fontStyle="italic">Major
                    </Box>
                      <Grid item xs={12}>
                        <Box paddingLeft={1} paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          {membershipData.filter(x => x.id === memberID).map(x => x.major)}
                          <Divider color='DADADA'></Divider>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                }

                {/* Were you a BizTech member last year? */}
                <Card className={classes.card} style={{ textAlign: 'left', backgroundColor: '#293B61', width: '67vw', marginLeft: 25, paddingTop: 20, paddingBottom: 10, marginTop: 10, paddingLeft: 25, paddingTop: 10 }}>
                  <Grid container spacing={0} xs={12}>
                    <Grid item xs={12}>
                      <Box paddingLeft={1} paddingTop={1} fontSize='23px' fontFamily="Gilroy" fontWeight="fontWeightBold" fontStyle="italic">Were you a BizTech member last year?
                    </Box>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {(membershipData.filter(x => x.id === memberID).map(x => x.prev_member)) &&
                            (membershipData.filter(x => x.id === memberID).map(x => x.first_name).length > 0) ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Yes
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {!membershipData.filter(x => x.id === memberID).map(x => x.prev_member) &&
                            (membershipData.filter(x => x.id === memberID).map(x => x.first_name).length > 0) ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          No
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>

                {/* Are you an international student? */}
                <Card className={classes.card} style={{ textAlign: 'left', backgroundColor: '#293B61', width: '67vw', marginLeft: 25, paddingTop: 20, paddingBottom: 10, marginTop: 10, paddingLeft: 25, paddingTop: 10 }}>
                  <Grid container spacing={0} xs={12}>
                    <Grid item xs={12}>
                      <Box paddingLeft={1} paddingTop={1} fontSize='23px' fontFamily="Gilroy" fontWeight="fontWeightBold" fontStyle="italic">Are you an international student?
                    </Box>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.international) &&
                            (membershipData.filter(x => x.id === memberID).map(x => x.first_name).length > 0) ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Yes
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {!membershipData.filter(x => x.id === memberID).map(x => x.international) &&
                            (membershipData.filter(x => x.id === memberID).map(x => x.first_name).length > 0) ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          No
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>

                {/* What topics do you want to see the most discussed in the future? */}
                <Card className={classes.card} style={{ textAlign: 'left', backgroundColor: '#293B61', width: '67vw', marginLeft: 25, paddingTop: 20, paddingBottom: 10, marginTop: 10, paddingLeft: 25, paddingTop: 10 }}>
                  <Grid container spacing={0} xs={12}>
                    <Grid item xs={12}>
                      <Box paddingLeft={1} paddingTop={1} fontSize='23px' fontFamily="Gilroy" fontWeight="fontWeightBold" fontStyle="italic">What topics do you want to see the most discussed in the future?
                    </Box>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.topics).includes('Cyber Security') ?
                            <CheckBoxIcon style={{ color: COLORS.BIZTECH_GREEN, width: 30, height: 30 }} /> :
                            <CheckBoxOutlineBlankIcon style={{ color: 'C4C4C4', width: 30, height: 30 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Cyber Security
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id == memberID).map(x => x.topics).includes('AI') ?
                            <CheckBoxIcon style={{ color: COLORS.BIZTECH_GREEN, width: 30, height: 30 }} /> :
                            <CheckBoxOutlineBlankIcon style={{ color: 'C4C4C4', width: 30, height: 30 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          AI
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.topics).includes('Tech Startups') ?
                            <CheckBoxIcon style={{ color: COLORS.BIZTECH_GREEN, width: 30, height: 30 }} /> :
                            <CheckBoxOutlineBlankIcon style={{ color: 'C4C4C4', width: 30, height: 30 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Tech Startups
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.topics).includes('eCommerce') ?
                            <CheckBoxIcon style={{ color: COLORS.BIZTECH_GREEN, width: 30, height: 30 }} /> :
                            <CheckBoxOutlineBlankIcon style={{ color: 'C4C4C4', width: 30, height: 30 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          eCommerce
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.topics).includes('Health Tech') ?
                            <CheckBoxIcon style={{ color: COLORS.BIZTECH_GREEN, width: 30, height: 30 }} /> :
                            <CheckBoxOutlineBlankIcon style={{ color: 'C4C4C4', width: 30, height: 30 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Health Tech
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.topics).includes('Careers in the Tech Industry') ?
                            <CheckBoxIcon style={{ color: COLORS.BIZTECH_GREEN, width: 30, height: 30 }} /> :
                            <CheckBoxOutlineBlankIcon style={{ color: 'C4C4C4', width: 30, height: 30 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Careers in the Tech Industry
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.topics).filter(y => !['Cyber Security', 'AI', 'Tech Startups', 'eCommerce', 'Health Tech', 'Careers in the Tech Industry'].some(topicList => y.includes(topicList))).length >= 1 ?
                            <CheckBoxIcon style={{ color: COLORS.BIZTECH_GREEN, width: 30, height: 30 }} /> :
                            <CheckBoxOutlineBlankIcon style={{ color: 'C4C4C4', width: 30, height: 30 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Other{membershipData.filter(x => x.id === memberID).map(x => x.topics).filter(y => !['Cyber Security', 'AI', 'Tech Startups', 'eCommerce', 'Health Tech', 'Careers in the Tech Industry'].some(topicList => y.includes(topicList))).length < 1 ?
                            "" : ": " + membershipData.filter(x => x.id === memberID).map(x => x.topics).filter(y => !['Cyber Security', 'AI', 'Tech Startups', 'eCommerce', 'Health Tech', 'Careers in the Tech Industry'].some(topicList => y.includes(topicList)))}
                        </Box>
                      </Grid>
                    </Grid>

                  </Grid>
                </Card>

                {/* How did you hear about us? */}
                <Card className={classes.card} style={{ textAlign: 'left', backgroundColor: '#293B61', width: '67vw', marginLeft: 25, paddingTop: 20, paddingBottom: 10, marginTop: 10, paddingLeft: 25, paddingTop: 10 }}>
                  <Grid container spacing={0} xs={12}>
                    <Grid item xs={12}>
                      <Box paddingLeft={1} paddingTop={1} fontSize='23px' fontFamily="Gilroy" fontWeight="fontWeightBold" fontStyle="italic">How did you hear about us?
                    </Box>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.heard_from) == 'Facebook' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='FFFFFF' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Facebook
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.heard_from) == 'Friends' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Friends
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {membershipData.filter(x => x.id === memberID).map(x => x.heard_from) == 'Instagram' ?
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} /> :
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Instagram
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item spacing={0} xs={12} container>
                      <Grid item xs={1}>
                        <IconButton disabled={true}>
                          {(membershipData.filter(x => x.id === memberID).map(x => x.heard_from) == 'Facebook')
                            || (membershipData.filter(x => x.id === memberID).map(x => x.heard_from) == 'Friends')
                            || (membershipData.filter(x => x.id === memberID).map(x => x.heard_from) == 'Instagram')
                            || (membershipData.filter(x => x.id === memberID).map(x => x.first_name).length < 1) ?
                            <RadioButtonUncheckedIcon style={{ color: 'C4C4C4', width: 25, height: 25 }} /> :
                            <RadioButtonCheckedIcon style={{ color: COLORS.BIZTECH_GREEN, width: 25, height: 25 }} />}
                        </IconButton>
                      </Grid>
                      <Grid item xs={11}>
                        <Box paddingTop={1.5} alignItems='left' color='C4C4C4' fontFamily="Gilroy" fontStyle='normal' fontWeight='normal' fontSize='19px'>
                          Other{(membershipData.filter(x => x.id === memberID).map(x => x.heard_from) == 'Facebook')
                            || (membershipData.filter(x => x.id === memberID).map(x => x.heard_from) == 'Friends')
                            || (membershipData.filter(x => x.id === memberID).map(x => x.heard_from) == 'Instagram')
                            ? "" : ": " + membershipData.filter(x => x.id === memberID).map(x => x.heard_from)}
                        </Box>
                      </Grid>
                    </Grid>

                  </Grid>
                </Card>

              </div>
            </Paper>
          }
        </div>
      </div>
    </div >
  )
}
export default Memberships