// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const statusObj: StatusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

const TableSort = props => {
  // ** States

  console.log('Props ' + props)
  const { row } = props
  const [isNameSortable, setIsNameSortable] = useState(true)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const columns: GridColDef[] = [
    {
      flex: 0.275,
      minWidth: 290,
      field: 'coin_name',
      headerName: 'Symbol',
      sortable: isNameSortable,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.coin_name}
              </Typography>
              <Typography noWrap variant='caption'>
                {row.coin_name}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      type: 'date',
      minWidth: 120,
      headerName: 'Price',
      field: 'coin_price',
      sortable: isNameSortable,
      valueGetter: params => new Date(params.value),
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.coin_price}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'marketcap',
      headerName: 'Marketcap',
      sortable: isNameSortable,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.marketcap}
        </Typography>
      )
    },
    {
      flex: 0.125,
      field: 'coin_price_btc',
      minWidth: 80,
      headerName: 'Price BTC ($)',
      sortable: isNameSortable,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.coin_price_btc}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'percent_change_1h',
      headerName: '1h %',
      sortable: isNameSortable,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.coin_price_btc}
        </Typography>
      )
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Sorting'
        action={
          <div>
            <Button size='medium' variant='contained' onClick={() => setIsNameSortable(!isNameSortable)}>
              {`Disable Sorting: ${!isNameSortable}`}
            </Button>
          </div>
        }
      />
      <DataGrid
        autoHeight
        rows={props.coins}
        columns={columns}
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
  )
}

export default TableSort
