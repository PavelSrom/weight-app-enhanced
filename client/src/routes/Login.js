import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../store/actions/auth'
import { Container, Typography, TextField, Button } from '@material-ui/core'

const Login = ({ loginUser, isAuthenticated }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const formSubmit = e => {
    e.preventDefault()
    loginUser(form)
  }

  if (isAuthenticated) return <Redirect to="/dashboard" />

  return (
    <Container>
      <Typography variant="h4">Log in to your account</Typography>
      <form style={{ marginTop: 40 }} onSubmit={formSubmit}>
        <TextField
          style={{ marginBottom: 16 }}
          onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
          fullWidth
          variant="outlined"
          label="Your email"
          name="email"
        />
        <TextField
          style={{ marginBottom: 16 }}
          onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
          fullWidth
          type="password"
          variant="outlined"
          label="Your password"
          name="password"
        />
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <Typography variant="body1">
            Don't have an account?{' '}
            <Link to="/register" style={{ textDecoration: 'none' }}>
              Register!
            </Link>
          </Typography>
        </div>
      </form>
    </Container>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { loginUser })(Login)
