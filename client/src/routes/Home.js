import React from 'react'
import { Link } from 'react-router-dom'
import {
  makeStyles,
  Container,
  Button,
  Typography,
  Divider
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: 'center',
    paddingTop: theme.spacing(4)
  },
  buttonWrapper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column'
  },
  link: {
    textDecoration: 'none'
  },
  spacing: {
    margin: `${theme.spacing(4)}px 0`
  }
}))

const Home = () => {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        Weight tracker app
      </Typography>
      <Typography variant="body1">
        Create account, keep track of your weight and see your progress!
      </Typography>
      <div className={classes.buttonWrapper}>
        <div className={classes.spacing}>
          <Typography variant="subtitle1" gutterBottom>
            Curious enough to sign up?
          </Typography>
          <Link to="/register" className={classes.link}>
            <Button variant="contained" color="primary">
              Register an account
            </Button>
          </Link>
        </div>
        <div className={classes.spacing}>
          <Typography variant="subtitle1" gutterBottom>
            Already signed up?
          </Typography>
          <Link to="/login" className={classes.link}>
            <Button variant="outlined" color="primary">
              Login to my account
            </Button>
          </Link>
        </div>
      </div>
      <Divider style={{ margin: 20 }} />
      <Typography variant="overline" style={{ textAlign: 'center' }}>
        Use your phone for optimal experience
      </Typography>
    </Container>
  )
}

export default Home
