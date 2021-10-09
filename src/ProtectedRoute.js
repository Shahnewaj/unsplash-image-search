import _ from 'lodash';
import React from 'react'
import { useSelector } from "react-redux";
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ component: Component, ...rest }) {
    const user = useSelector(state => state.app.user);
    return !_.isEmpty(user) ? (
        <Route {...rest} >
            {(props) => <Component {...props} />}
        </Route>
    ) : (
        <Redirect to="/login" />
    )
}

export default ProtectedRoute
