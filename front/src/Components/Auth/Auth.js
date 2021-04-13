import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { login } from './../../store/user/userActions'
// import { useAuthContext } from './AuthContext'
// import useAuthRequests from './useAuthRequests'
// import Auth__form from './Auth__form'
// import Auth__player from './Auth__player'

// import config from 'config.json'
// const PORT = config.port
// const HOST = config.host

function Auth({ user, login }) {
  const isAuth = user.token !== ''

  useEffect(() => {
    login()
  }, [])

  let res
  if (isAuth) {
    res =
    <div> {user.name} </div>
  } else {
    res =
    <div> login </div>
  }
  return (
    <div className="box">
      { res }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  login: login
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)












//
