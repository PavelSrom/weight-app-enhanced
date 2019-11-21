import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../store/actions/profile'
import Header from '../components/layout/Header'
import BottomNav from '../components/layout/BottomNav'
import { Container, TextField, Button, Typography } from '@material-ui/core'

const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    desiredWeight: '',
    kcalIntake: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(updateProfile(form, history))
  }

  return (
    <Fragment>
      <Header />
      <Container>
        <Typography variant="h5" style={{ textAlign: 'center' }} gutterBottom>
          Update a profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            style={{ marginBottom: 16 }}
            onChange={e =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            fullWidth
            name="desiredWeight"
            label="Desired weight (kg)"
          />
          <TextField
            style={{ marginBottom: 16 }}
            onChange={e =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            fullWidth
            name="kcalIntake"
            label="Caloric intake (per day)"
          />
          <Button
            type="submit"
            variant="contained"
            style={{ margin: '20px auto 10px auto' }}
            color="primary"
          >
            Submit
          </Button>
        </form>
      </Container>
      <BottomNav />
    </Fragment>
  )
}

export default UpdateProfile
