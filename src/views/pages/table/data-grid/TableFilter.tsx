// ** React Imports
import { ChangeEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/pages/table/data-grid/QuickSearchToolbar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { DataGridRowType } from 'src/@fake-db/types'
import Rating from '@mui/material/Rating'

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

  /*if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {*/
  return (
    <CustomAvatar
      skin='light'
      color={color as ThemeColor}
      sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
    >
      {getInitials(row.symbol ? row.coin_name : 'John Doe')}
    </CustomAvatar>
  )

  //}
}

const statusObj: StatusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns: GridColDef[] = [
  {
    flex: 0,
    maxWidth: 3,
    headerName: '#',
    field: 'id',
    renderCell: (params: GridRenderCellParams) => (
      <Rating value={params.row.id} name='simple' onChange={(event, newValue) => setValue(newValue)} />
    )
  },
  {
    flex: 0,
    maxWidth: 3,
    headerName: '#',
    field: 'rank',
    renderCell: (params: GridRenderCellParams) => <Typography>{params.row.rank}</Typography>
  },
  {
    flex: 0.275,
    minWidth: 10,
    field: 'symbol',
    headerName: 'Symbol',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.symbol}
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
    minWidth: 120,
    headerName: 'Price',
    field: 'coin_price',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'black' }}>
        {Number(params.row.coin_price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 110,
    field: 'marketcap',
    headerName: 'Marketcap',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'black' }}>
        {params.row.marketcap}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'circulacao_mercado',
    minWidth: 80,
    headerName: 'Volume (24h)',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.circulacao_mercado}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'percent_change_1h',
    minWidth: 80,
    headerName: '1h %',
    renderCell: (params: GridRenderCellParams) => (
      <Typography
        variant='body2'
        sx={{
          color: params.row.percent_change_1h >= 0 ? 'green' : 'red'
        }}
      >
        {params.row.percent_change_1h}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'percent_change2h',
    minWidth: 80,
    headerName: '2h %',
    renderCell: (params: GridRenderCellParams) => (
      <Typography
        variant='body2'
        sx={{
          color: params.row.percent_change2h >= 0 ? 'green' : 'red'
        }}
      >
        {params.row.percent_change2h}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'percent_change4h',
    minWidth: 80,
    headerName: '3h %',
    renderCell: (params: GridRenderCellParams) => (
      <Typography
        variant='body2'
        sx={{
          color: params.row.percent_change4h >= 0 ? 'green' : 'red'
        }}
      >
        {params.row.percent_change4h}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'percent_change24h',
    minWidth: 80,
    headerName: '24h %',
    renderCell: (params: GridRenderCellParams) => (
      <Typography
        variant='body2'
        sx={{
          color: params.row.percent_change24h >= 0 ? 'green' : 'red'
        }}
      >
        {params.row.percent_change24h}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'percent_change7d',
    minWidth: 80,
    headerName: '7d %',
    renderCell: (params: GridRenderCellParams) => (
      <Typography
        variant='body2'
        sx={{
          color: params.row.percent_change7d >= 0 ? 'green' : 'red'
        }}
      >
        {params.row.percent_change7d}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'percent_change14d',
    minWidth: 80,
    headerName: '14d %',
    renderCell: (params: GridRenderCellParams) => (
      <Typography
        variant='body2'
        sx={{
          color: params.row.percent_change14d >= 0 ? 'green' : 'red'
        }}
      >
        {params.row.percent_change14d}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'percent_change30d',
    minWidth: 80,
    headerName: '30d %',
    renderCell: (params: GridRenderCellParams) => (
      <Typography
        variant='body2'
        sx={{
          color: params.row.percent_change30d >= 0 ? 'green' : 'red'
        }}
      >
        {params.row.percent_change30d}
      </Typography>
    )
  }
]

const TableColumns = props => {
  // ** States

  console.log('PROPS' + props.coins.details)
  const [data] = useState<DataGridRowType[]>(props.coins.details)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const [ratingColors, setRatingColors] = useState({})

  const setRatingColor = (rowId, value) => {
    setRatingColors(prevColors => ({
      ...prevColors,
      [rowId]: value >= 0 ? 'green' : 'red'
    }))
  }

  return (
    <Card>
      <CardHeader title='Coin Ranking' />
      <DataGrid
        autoHeight
        columns={columns}
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        slots={{ toolbar: QuickSearchToolbar }}
        onPaginationModelChange={setPaginationModel}
        rows={filteredData.length ? filteredData : data}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: '1.125rem'
          }
        }}
        slotProps={{
          baseButton: {
            size: 'medium',
            variant: 'outlined'
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
          }
        }}
      />
    </Card>
  )
}

export default TableColumns
