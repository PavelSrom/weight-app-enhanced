import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getExerciseList } from '../store/actions/exercises'
import { updateProfile } from '../store/actions/profile'
import Header from '../components/layout/Header'
import BottomNav from '../components/layout/BottomNav'
import { Container, Typography, Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  centered: {
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    marginTop: theme.spacing(2)
  }
}))

const Exercises = ({ history }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (allExercises.length == 0) dispatch(getExerciseList())
  }, [])

  const chooseExercise = formData => {
    const form = { chosenExercise: formData }
    dispatch(updateProfile(form, history))
  }

  const allExercises = useSelector(store => store.exercises)

  const classes = useStyles()

  return (
    <Fragment>
      <Header />
      <Container style={{ paddingTop: 8, paddingBottom: 56 }}>
        <Typography variant="h5" className={classes.centered} gutterBottom>
          Exercise list
        </Typography>

        {allExercises.map(({ _id, name, kcalHour }) => (
          <Paper key={_id} className={classes.paper}>
            <div className={classes.flex}>
              <Typography variant="body1">{name}</Typography>
              <Typography variant="body1">{kcalHour}kcal/h</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={() =>
                  chooseExercise({
                    name,
                    kcalHour
                  })
                }
                className={classes.button}
                variant="outlined"
                color="primary"
              >
                Choose as default exercise
              </Button>
            </div>
          </Paper>
        ))}
      </Container>
      <BottomNav value={2} />
    </Fragment>
  )
}

export default Exercises
