import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from '../store/actions/auth'
import { Container, Typography, TextField, Button } from '@material-ui/core'

const Register = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(store => store.auth)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  const formSubmit = e => {
    e.preventDefault()
    dispatch(registerUser(form))
  }

  if (isAuthenticated) return <Redirect to="/dashboard" />

  return (
    <Container>
      <Typography variant="h4">Register an account</Typography>
      <form style={{ marginTop: 40 }} onSubmit={formSubmit}>
        <TextField
          style={{ marginBottom: 16 }}
          onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
          fullWidth
          variant="outlined"
          label="Your name"
          name="name"
        />
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
          helperText="Must be at least 6 characters long"
        />
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
          <Typography variant="body1">
            Already registered?{' '}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              Log in!
            </Link>
          </Typography>
        </div>
      </form>
    </Container>
  )
}

export default Register
