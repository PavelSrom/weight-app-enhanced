import React from 'react'
import { Paper, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    textAlign: 'center'
  }
}))

const Statistics = ({ profile, logs }) => {
  const oldestWeight = logs[logs.length - 1].weight
  const newestWeight = logs[0].weight
  const kcalPerHour = profile.chosenExercise.kcalHour
  const desiredWeight = profile.desiredWeight

  // some math
  const kgLeft = newestWeight - desiredWeight
  const kcalLeft = kgLeft * 7000
  const sessionsLeft = Math.ceil(kcalLeft / kcalPerHour)
  const kgLost = oldestWeight - newestWeight

  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" gutterBottom>
        Statistics:
      </Typography>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="h5">{sessionsLeft}</Typography>
          <Typography variant="body1">sessions left</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h5">{kgLost}</Typography>
          <Typography variant="body1">kg lost</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h5">{kgLeft}</Typography>
          <Typography variant="body1">kg to go</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Statistics
