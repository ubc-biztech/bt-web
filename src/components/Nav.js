import React, { Component } from 'react'
import { SideNav, SideNavItems, SideNavLink } from 'carbon-components-react';


export default class Router extends Component {    

    render() {
        let events = this.props.events;        
        const createEventLinks =
                events.map(event => 
                    <SideNavLink
                    isActive={this.props.eventSelected === event.id} key={event.ename} href={'./?event=' + event.id}>{event.ename}</SideNavLink>
                )

        return (
            <SideNav
                isFixedNav
                expanded={true}
                isChildOfHeader={false}
                aria-label="Side navigation"
            >
            <SideNavItems>
                {createEventLinks}
            </SideNavItems>
            </SideNav>
        )
    }
    
}
