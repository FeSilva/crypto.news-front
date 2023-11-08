// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import TableSortLabel from '@mui/material/TableSortLabel'
import TablePagination from '@mui/material/TablePagination'
import PercentageInput from './input-component/pecentInput'

// ** Icon Imports
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

type Order = 'asc' | 'desc'

interface Data {
  id: string
  currency: string
  priceWallet: string
  priceCoin: number
  change: number
  percent: number
  volume: number
  date: Date
  investiment: number
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
  onSelectedAssetsChange: (newSelected: readonly string[]) => void // Adicione esta prop
}

const createData = (
  currency: string,
  priceWallet: string,
  priceCoin: number,
  date: Date,
  volume: number,
  change: number,
  percent: number,
  investiment: number
): Data => {
  return { currency, priceWallet, priceCoin, date, volume, change, percent, investiment }
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order

    return a[1] - b[1]
  })

  return stabilizedThis.map(el => el[0])
}

const headCells: readonly HeadCell[] = [
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date'
  },
  {
    id: 'currency',
    numeric: false,
    disablePadding: true,
    label: 'Symbol'
  },
  {
    id: 'priceWallet',
    numeric: true,
    disablePadding: false,
    label: 'Price Wallet'
  },
  {
    id: 'investiment',
    numeric: true,
    disablePadding: false,
    label: 'Investiment'
  },
  {
    id: 'priceCoin',
    numeric: true,
    disablePadding: false,
    label: 'Price Coin'
  },
  {
    id: 'volume',
    numeric: true,
    disablePadding: false,
    label: 'Volume (24h)'
  },
  {
    id: 'change',
    numeric: true,
    disablePadding: false,
    label: 'Change (24h)'
  },
  {
    id: 'percent',
    numeric: true,
    disablePadding: false,
    label: 'Percent (24h)'
  }
]

function EnhancedTableHead(props: EnhancedTableProps) {
  // ** Props
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={createSortHandler(headCell.id)}
              direction={orderBy === headCell.id ? order : 'asc'}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const TableDetails = ({ details }) => {
  // ** States

  const allCurrencyDetails = []

  // Faça um loop por todas as datas e moedas e adicione os dados a allCurrencyDetails
  Object.keys(details).forEach(date => {
    const currencies = details[date]
    Object.keys(currencies).forEach(currency => {
      const currencyDetails = currencies[currency]
      allCurrencyDetails.push(currencyDetails)
    })
  })

  console.log('AllCoin', allCurrencyDetails)
  const rows = allCurrencyDetails.map(item =>
    createData(
      item.details.currency,
      item.price,
      item.details.price,
      item.details.date,
      item.details.volume,
      item.details.changePrice,
      item.details.percentage,
      item.investiment
    )
  )
  console.log('rows:', rows)

  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<Order>('asc')
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [orderBy, setOrderBy] = useState<keyof Data>('currency')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [percentageInput, setPercentageInput] = useState({})
  const [calculatedValues, setCalculatedValues] = useState({})
  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allCurrencyDetails.length) : 0

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            rowCount={rows.length}
            numSelected={selected.length}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with: rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.currency)
                const labelId = `enhanced-table-checkbox-details-${index}`

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.currency}
                    role='checkbox'
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                  >
                    <TableCell>{format(new Date(row.date), 'dd/MM/yyyy', { locale: ptBR })}</TableCell>
                    <TableCell component='th' id={labelId} scope='row' padding='none' align='center'>
                      {row.currency}
                    </TableCell>
                    <TableCell align='right' style={{ color: 'green' }}>
                      {Number(row.priceWallet).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </TableCell>
                    <TableCell align='right' style={{ color: '#F4A460' }}>
                      {Number(row.investiment).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </TableCell>
                    <TableCell align='right'>
                      {Number(row.priceCoin).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </TableCell>
                    <TableCell align='right'>{row.volume}</TableCell>
                    <TableCell align='right' style={{ color: row.change >= 0 ? 'green' : '#B22222' }}>
                      {row.change.toFixed(2)}
                    </TableCell>
                    <TableCell style={{ color: row.percent >= 0 ? 'green' : '#B22222' }} align='right'>
                      {row.percent.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                )
              })}
            {emptyRows > 0 && (
              <TableRow
                sx={{
                  height: 53 * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default TableDetails
