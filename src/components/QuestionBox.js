// import React from 'react';
// import PieChart from './PieChart'
// import HorizontalBarChart from './HorizontalBarChart'
// import Card from '@material-ui/core/Card'
// import Box from '@material-ui/core/Box'
// import { makeStyles, useTheme } from '@material-ui/core/styles'
// import useMediaQuery from '@material-ui/core/useMediaQuery'
// import { COLOR } from '../constants/Constants'
// import { Typography } from '@material-ui/core'


// const cardStyle = ({
//     width: '50%',
//     height: '20%',
//     margin: '15px 10px 15px 0'
// })


// export default class QuestionBox extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state={
//             questionType:props.questionType,
//             title:props.title,
//             max:props.max,
//             data:props.data
//         }
//     }


//     render(){
//         const { cardStyle } = {
//             width: '50%',
//             height: '20%',
//             margin: '15px 10px 15px 0'
//         }
//         const { classes } = {
//             paper: {
//               [theme.breakpoints.down('sm')]: {
//                 backgroundColor: COLOR.BACKGROUND_COLOR
//               }
//             },  
//             content: {
//               padding: theme.spacing(3)
//             },
//             container: {
//               display: 'flex',
//               flexDirection: 'row',
//               paddingTop: '14px',
//               paddingBottom: '14px'
//             },
//             sidePanelLayout: {
//               display: 'flex',
//               float: 'left',
//               flexDirection: 'column',
//               textAlign: 'right',
//               marginRight: '3em',
//               width: '135px'
//             },
//             sidePanelButton: {
//               textAlign: 'right',
//               whiteSpace: 'nowrap'
//             },
//             sidePanelActiveButton: {
//                 textAlign: 'right',
//                 whiteSpace: 'nowrap',
//                 borderRight: `2px solid ${COLOR.BIZTECH_GREEN}`
//               },
//             tabsLayout: {
//               width: '80%',
//               margin: 'auto',
//               [theme.breakpoints.up('sm')]: {
//                 margin: 'unset'
//               }
//             },
//             tabsContainer: {
//               marginBottom: '2em',
//               display: 'flex',
//               flexDirection: 'row',
//               [theme.breakpoints.up('sm')]: {
//                 marginRight: '30px'
//               }
//             },
//             tab: {
//               fontSize: '0.9rem',
//               marginLeft: '1em',
//               marginRight: '1em',
//               textTransform: 'none',
//               maxWidth: '5em',
//               width: '100%',
//               color: `${COLOR.WHITE} !important`
//             },
//             search: {
//               display: 'flex',
//               height: '100%',
//               maxWidth: '100%',
//               background: 'white',
//               borderRadius: '3em',
//               marginLeft: 'auto',
//               zIndex: '100'
//             },
//             searchIcon: {
//               display: 'flex',
//               background: 'white',
//               borderRadius: '50%',
//               padding: '0.5em',
//               '&:hover': {
//                 backgroundColor: '#0069d9',
//                 borderColor: '#0062cc',
//                 boxShadow: 'none'
//               }
//             },
//             searchInput: {
//               width: '0',
//               color: COLOR.CARD_PAPER_COLOR,
//               transition: theme.transitions.create('width')
//             },
//             searchInputActive: {
//               width: '70vw',
//               color: COLOR.CARD_PAPER_COLOR,
//               transition: theme.transitions.create('width')
//             },
//             mobileFilters: {
//               overflow: 'scroll',
//               display: 'flex',
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               scrollbarWidth: 'none',
//               '-ms-overflow-style': 'none'
//             },
//             chipFilter: {
//               width: '100%',
//               marginRight: '0.5em'
//             },
//             rows: {
//               display: 'flex',
//               flexWrap: 'wrap'
//             }
//         }

//         if (this.props.questionType='Bar') {
//             return (
                
//                 <Box m={2} py={2} px={4}>
//                     <Card className={classes.card} style={cardStyle} style={{backgroundColor: '#293B61'}}>
//                         <Box py={3} px={4}> <Typography align='left' variant='h6'> {this.props.title} </Typography> </Box>
//                         <div>
//                             <HorizontalBarChart data={this.props.data} max={this.props.max}/>
//                         </div>
//                     </Card>
//                 </Box>
//             )
//         } else if (this.props.questionType='Pie') {
//             return (
//                 <Box m={2} py={2} px={4}>
//                     <Card className={classes.card} style={cardStyle} style={{backgroundColor: '#293B61'}}>
//                         <Box py={3} px={4}> <Typography align='left' variant='h6'> {this.props.title} </Typography> </Box>
//                         <div>
//                             <PieChart data={this.props.data}/>
//                         </div>
//                     </Card>
//                 </Box>
//             )
//         }
//     }
// }