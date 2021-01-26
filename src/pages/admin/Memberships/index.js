// import React, { useEffect } from 'react'
// import { connect } from 'react-redux'
// import { Redirect, Switch } from 'react-router-dom'

// import Route from 'components/routing/Route'
// import Loading from 'pages/Loading'

// import AdminHome from './Home'

// import Memberships from './Memberships'

// import { fetchMemberships } from 'store/memberships/membershipActions'
// import { render } from 'node-sass'

// const MembershipData = (props) => {
//     const {
//       memberships,
//       membershipsLoading
//     } = props
  
//     useEffect(() => {
//         memberships = fetchMemberships().data
//         console.log(memberships)
//       }, [])

//       if (membershipsLoading) return <Loading message='Loading memberships...'/>
//       render(
//           <Memberships memberships={memberships}/>
          
//       )


// }

// const mapStateToProps = state => {
//     return {
//       memberships: state.membershipState.memberships.data,
//       membershipsLoading: true
//     }
// }
  
// export default connect(mapStateToProps, {})(MembershipData)
