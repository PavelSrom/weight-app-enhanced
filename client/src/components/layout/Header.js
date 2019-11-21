import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../store/actions/auth'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const Header = () => {
  const dispatch = useDispatch()
  const { email } = useSelector(store => store.auth.user)

  return (
    <AppBar position="static">
      <Toolbar style={{ flexDirection: 'column' }}>
        <Typography variant="body1">Logged in as {email}</Typography>
        <Button onClick={() => dispatch(logoutUser())}>sign out</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
