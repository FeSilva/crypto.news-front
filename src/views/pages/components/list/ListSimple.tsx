// ** React Imports
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

const ListSimple = props => {
  return (
    <Fragment>
      <List component='nav' aria-label='main mailbox'>
        <ListItem key='' disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon icon='tabler:mail' fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='BTC' />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ m: '0 !important' }} />
    </Fragment>
  )
}

export default ListSimple
