import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/actions'
import Layout from '../views/layout'
import Login from '../views/login'
class Router extends React.Component {
  render () {
    const { role, getUserInfo } = this.props
    return (
      <HashRouter>
        <Switch>
           <Route exact path="/login" component={Login} />
           <Route
            path="/"
            render={() => {
                let mockToken = 'admin-token'
                if (role) {
                    return <Layout />
                } else {
                    getUserInfo(mockToken).then(() => <Layout />)
                }
              // if (!token) {
              //   return <Redirect to="/login" />
              // } else {
              //   if (role) {
              //     return <Layout />
              //   } else {
              //     getUserInfo(token).then(() => <Layout />)
              //   }
              // }
            }}
           />
        </Switch>
      </HashRouter>
    )
  }
}

export default connect((state) => state.user, { getUserInfo })(Router)
