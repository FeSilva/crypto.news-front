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
const ListDetailsText = props => {
  const theme = useTheme()
  const details = props.details
  console.log('Detasils', details)

  return (
    <Card>
      <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
        <Grid container>
          <Grid item sm={12} xs={12}>
            {Object.keys(details).map(dia => (
              <div key={dia}>
                <h2>{dia}</h2>
                <Grid container>
                  {Object.keys(details[dia]).map(symbol => (
                    <Grid item sm={4} xs={4}>
                      <Typography sx={{ mb: 2, color: 'text.secondary' }}>Symbol: {symbol}</Typography>
                      <Typography sx={{ mb: 2, color: 'text.secondary' }}>
                        {' '}
                        Price Wallet:{' '}
                        {Number(details[dia][symbol].price).toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        })}
                      </Typography>
                      <Typography sx={{ mb: 2, color: 'text.secondary' }}>
                        {' '}
                        Investiment: {details[dia][symbol].investiment.toFixed(2)}
                      </Typography>
                      <Typography sx={{ mb: 2, color: 'text.secondary' }}>
                        {' '}
                        Price Coin: {details[dia][symbol].details.price.toFixed(2)}
                      </Typography>
                      <Typography sx={{ mb: 2, color: 'text.secondary' }}>
                        {' '}
                        Percent Wallet: {details[dia][symbol].percent.toFixed(2)}%
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </div>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ListDetailsText
