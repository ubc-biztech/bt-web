import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch } from 'react-router-dom'

import Route from 'components/routing/Route'
import Loading from 'pages/Loading'

import AdminHome from './Home'

import Memberships from './Memberships'

import { fetchMemberships } from 'store/memberships/membershipActions'

const AdminRoutes = (props) => {
    const {
      memberships
    } = props
  
    useEffect(() => {
      fetchMemberships()
    }, [])


}

const mapStateToProps = state => {
    return {
      memberships: state.membershipState.memberships.data,
    }
}
  
export default connect(mapStateToProps, {})(Memberships)
