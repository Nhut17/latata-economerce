import React from 'react'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({isAdmin,component: Component,...rest}) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.user)
    
  return (
    <Fragment>
    {loading === false && (
        <Route
            {...rest}
            render={props => {
                if (isAuthenticated === false) {
                    return <Redirect to='/login' />
                }

                if (isAdmin === true && user.role !== 'admin') {
                    return <Redirect to="/" />
                }

                return <Component {...props} />
            }}
        />
    )}
</Fragment>
  )
}

export default ProtectedRoute
