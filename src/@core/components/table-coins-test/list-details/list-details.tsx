import React, { useEffect, useState } from 'react'
import { Card } from '@mui/material'
import { CardContent } from '@mui/material'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled, useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'
import TableDetails from './table-details'

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  '&:not(:last-child)': {
    paddingRight: `${theme.spacing(2)} !important`
  }
}))
const ListDetails = props => {
  const theme = useTheme()

  console.log('ListDetails', props)

  return (
    <Card>
      <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
        <Grid container>
          <Grid item sm={12} xs={12}>
            <TableDetails details={props.details} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ListDetails
