import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Typography } from '@material-ui/core'

const NotFound = () => (
  <Container style={{ textAlign: 'center' }}>
    <Typography variant="h4" style={{ marginBottom: 40 }}>
      This page doesn't exist.
    </Typography>
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Button>Go to homepage</Button>
    </Link>
  </Container>
)

export default NotFound
