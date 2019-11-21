import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addLog, updateLog } from '../store/actions/logs'
import Header from '../components/layout/Header'
import BottomNav from '../components/layout/BottomNav'
import EditIcon from '@material-ui/icons/Create'
import { makeStyles } from '@material-ui/styles'
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between'
  },
  centered: {
    textAlign: 'center'
  },
  infoText: {
    textAlign: 'center',
    margin: `${theme.spacing(3)}px 0`
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

const Logs = () => {
  const dispatch = useDispatch()
  const { logs, loading } = useSelector(store => store.logs)

  // FUNCTIONALITY
  const [newLog, setNewLog] = useState('')
  const [updatedLog, setUpdatedLog] = useState('')
  const [updatedLogID, setUpdatedLogID] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const today = new Date().toLocaleDateString()
  const buttonDisabled = logs.some(log => log.date === today)

  // add new log to the list
  const addNewLog = e => {
    e.preventDefault()
    if (newLog && !buttonDisabled) {
      dispatch(
        addLog({
          weight: parseFloat(newLog).toFixed(1),
          date: new Date().toLocaleDateString()
        })
      )
    }
    setNewLog('')
    setSnackbarOpen(true)
  }

  // snackbar stuff
  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return

    setSnackbarOpen(false)
  }

  // update already existing log
  const submitUpdatedLog = () => {
    setDialogOpen(false)
    dispatch(updateLog(updatedLogID, { weight: updatedLog }))
  }

  // MARKUP
  const classes = useStyles()

  const noLogsFound = (
    <Typography className={classes.infoText} variant="subtitle1">
      You have no logs yet
    </Typography>
  )

  const allLogs = (
    <List dense>
      {logs.map(({ _id, weight, date }) => (
        <ListItem key={_id} className={classes.item} divider>
          <Typography variant="body1">{weight}kg</Typography>
          <Typography variant="body1">{date}</Typography>
          <IconButton
            onClick={() => {
              setDialogOpen(true)
              setUpdatedLogID(_id)
            }}
          >
            <EditIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  )

  return (
    <Fragment>
      <Header />
      <Container style={{ paddingTop: 8, paddingBottom: 56 }}>
        <Typography variant="h5" className={classes.centered} gutterBottom>
          My logs
        </Typography>

        <Paper>
          <form onSubmit={addNewLog} className={classes.paper}>
            <TextField
              onChange={e => setNewLog(e.target.value)}
              label="Current weight (kg)"
              value={newLog}
            />
            <Button
              onClick={addNewLog}
              variant="contained"
              color="primary"
              disabled={buttonDisabled}
            >
              Submit
            </Button>
          </form>
        </Paper>

        {!loading && logs.length == 0 && noLogsFound}
        {!loading && logs.length > 0 && allLogs}

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle>Update weight</DialogTitle>
          <DialogContent>
            <TextField
              label="New weight (kg)"
              onChange={e => setUpdatedLog(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              disabled={updatedLog.length === 0}
              onClick={submitUpdatedLog}
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={snackbarOpen}
          autoHideDuration={2000}
          message={<Typography variant="body1">Log added!</Typography>}
          onClose={handleClose}
        />
      </Container>
      <BottomNav value={1} />
    </Fragment>
  )
}

export default Logs
