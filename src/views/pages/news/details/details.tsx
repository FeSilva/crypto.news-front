import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardWithCollapse from '../ui/cards/basic/CardWithCollapse'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardImgTop from '../../ui/cards/basic/CardImgTop'
import CardSnippet from 'src/@core/components/card-snippet'
import ListSimple from '../../components/list/ListSimple'
import Typography from '@mui/material/Typography'

const NewsDetails = props => {
  return (
    <Grid container spacing={6}>
      <Grid item md={10} lg={10} xs={10}>
        <CardImgTop description={props.description} title={props.title} urlToImage={props.urlToImage} />
      </Grid>
      <Grid item md={2} lg={2} xs={2}>
        <CardSnippet id='simple-list' title='Ativos Relacionados'>
          <Typography sx={{ mb: 4 }}>Lists are a continuous group of text or images.</Typography>
          <ListSimple currencies={null} />
        </CardSnippet>
      </Grid>
    </Grid>
  )
}

export const ListSimpleJSXCode = (
  <pre className='language-jsx'>
    <code className='language-jsx'>{`// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ListSimple = () => {
  return (
    <Fragment>
      <List component='nav' aria-label='main mailbox'>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon icon='tabler:mail' fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Inbox' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon icon='tabler:copy' fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Draft' />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ m: '0 !important' }} />
      <List component='nav' aria-label='secondary mailbox'>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon icon='tabler:clock' fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Snoozed' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component='a' href='#simple-list'>
            <ListItemIcon>
              <Icon icon='tabler:alert-circle' fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Spam' />
          </ListItemButton>
        </ListItem>
      </List>
    </Fragment>
  )
}

export default ListSimple
`}</code>
  </pre>
)

export const ListSimpleTSXCode = (
  <pre className='language-jsx'>
    <code className='language-jsx'>{`// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ListSimple = () => {
  return (
    <Fragment>
      <List component='nav' aria-label='main mailbox'>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon icon='tabler:mail' fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Inbox' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon icon='tabler:copy' fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Draft' />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ m: '0 !important' }} />
      <List component='nav' aria-label='secondary mailbox'>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon icon='tabler:clock' fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Snoozed' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component='a' href='#simple-list'>
            <ListItemIcon>
              <Icon icon='tabler:alert-circle' fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Spam' />
          </ListItemButton>
        </ListItem>
      </List>
    </Fragment>
  )
}

export default ListSimple
`}</code>
  </pre>
)

export default NewsDetails
