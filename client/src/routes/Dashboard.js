import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProfile } from '../store/actions/profile'
import { getAllLogs } from '../store/actions/logs'
import Header from '../components/layout/Header'
import BottomNav from '../components/layout/BottomNav'
import Statistics from '../components/layout/Statistics'
import { Container, Typography, Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  textCentered: {
    textAlign: 'center'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing(1)}px 0`
  }
}))

const Dashboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!profile) dispatch(getProfile())
    dispatch(getAllLogs())
  }, [getAllLogs])

  const { name } = useSelector(store => store.auth.user)
  const { logs } = useSelector(store => store.logs)
  const { profile, loading } = useSelector(store => store.profile)

  const classes = useStyles()

  return (
    <Fragment>
      <Header />
      <Container style={{ paddingTop: 8, paddingBottom: 56 }}>
        <Typography variant="h5" className={classes.textCentered} gutterBottom>
          Welcome {name}!
        </Typography>

        {!profile && !loading && (
          <div className={classes.textCentered}>
            <Typography variant="body1">
              You have not yet created a profile
            </Typography>
            <Button component={Link} to="/create-profile" variant="outlined">
              Create a profile
            </Button>
          </div>
        )}

        {profile && !loading && (
          <Fragment>
            <Paper className={classes.paper}>
              <div className={classes.row}>
                <Typography variant="body1">Desired weight:</Typography>
                <Typography variant="body1">
                  {profile.desiredWeight}kg
                </Typography>
              </div>
              <div className={classes.row}>
                <Typography variant="body1">Height:</Typography>
                <Typography variant="body1">{profile.height}cm</Typography>
              </div>
              <div className={classes.row}>
                <Typography variant="body1">Caloric intake:</Typography>
                <Typography variant="body1">
                  {profile.kcalIntake}kcal
                </Typography>
              </div>
              {profile.chosenExercise !== undefined && (
                <div className={classes.row}>
                  <Typography variant="body1">Chosen exercise:</Typography>
                  <Typography variant="body1">
                    {profile.chosenExercise.name}
                  </Typography>
                </div>
              )}
            </Paper>
            <Button
              fullWidth
              component={Link}
              to="/update-profile"
              variant="outlined"
              color="primary"
              className={classes.textCentered}
            >
              Update a profile
            </Button>
          </Fragment>
        )}

        <div style={{ textAlign: 'center' }}>
          {logs.length > 0 && profile.hasOwnProperty('chosenExercise') && (
            <Statistics profile={profile} logs={logs} />
          )}
          {(logs.length == 0 || !profile.hasOwnProperty('chosenExercise')) && (
            <Typography variant="body1">
              Please have at least one log added and choose an exercise to see
              statistics
            </Typography>
          )}
          {!profile && (
            <Typography variant="body1">
              Please create a profile, choose a favorite exercise and add at
              least one log to see statistics
            </Typography>
          )}
        </div>
      </Container>
      <BottomNav value={0} />
    </Fragment>
  )
}

export default Dashboard
