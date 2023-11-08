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

type Order = 'asc' | 'desc'

interface Data {
  volume: number
  currency: string
  price: number
  change: number
  percent: number
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

const createData = (currency: string, price: number, volume: number, change: number, percent: number): Data => {
  return { currency, price, volume, change, percent }
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
    id: 'currency',
    numeric: false,
    disablePadding: true,
    label: 'Symbol'
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price'
  },
  {
    id: 'change',
    numeric: true,
    disablePadding: false,
    label: 'Change'
  },
  {
    id: 'percent',
    numeric: true,
    disablePadding: false,
    label: 'Percent'
  },
  {
    id: 'percent_wallet',
    numeric: true,
    disablePadding: false,
    label: 'Percent Wallet'
  },
  {
    id: 'amount_wallet',
    numeric: true,
    disablePadding: false,
    label: 'Amount'
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

const TableCoinsTest = ({
  data,
  walletValue,
  onSelectedAssetsChange,
  onAssetPercentageChange,
  selectedAssetStatus
}: {
  data: Data[]
  walletValue: number
  onSelectedAssetsChange: (newSelected: readonly string[]) => void
  onAssetPercentageChange: (currency: string, percentage: number) => void
  selectedAssetStatus: Record<string, boolean>
}) => {
  // ** States
  const rows = data.map(item => createData(item.currency, item.price, item.volume, item.change, item.percent))

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

  const handlePercentageChange = (event: ChangeEvent<HTMLInputElement>, currency: string, CoinPrice: number) => {
    if (event && event.target && event.target.value !== undefined) {
      const newPercentageInput = { ...percentageInput, [currency]: event.target.value }
      setPercentageInput(newPercentageInput)

      // Converta walletValue para um número
      const walletValueNumber = walletValue

      console.log('Atualização realizada')

      // Verifique se walletValueNumber é um número válido
      if (!isNaN(walletValueNumber)) {
        // Calcule o valor com base na porcentagem e no valor em carteira
        const priceUsdt = (parseFloat(event.target.value) / 100) * walletValueNumber
        const amount = priceUsdt / CoinPrice
        setCalculatedValues({ ...calculatedValues, [currency]: amount })
      }

      // Atualize a lista de ativos selecionados
      const newSelected = Object.keys(newPercentageInput).filter(currency => newPercentageInput[currency] > 0)

      onSelectedAssetsChange(newSelected)
      onAssetPercentageChange(currency, event.target.value)
    }
  }

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.currency)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
  }
  const handleClick = (event: MouseEvent<unknown>, currency: string) => {
    const selectedIndex = selected.indexOf(currency)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, currency)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
    onSelectedAssetsChange(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleCheckboxChange = (event, asset) => {
    const selected = event.target.checked

    // Atualize o estado do ativo selecionado
    if (selected) {
      onSelectedAssetsChange([...selectedAssets, asset])
    } else {
      onSelectedAssetsChange(selectedAssets.filter(selectedAsset => selectedAsset !== asset))
    }

    // Atualize o estado do checkbox para o ativo
    selectedAssetStatus[asset] = selected
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

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
            onSelectAllClick={handleSelectAllClick}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with: rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.currency)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.currency}
                    role='checkbox'
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                  >
                    <TableCell component='th' id={labelId} scope='row' padding='none'>
                      {row.currency}
                    </TableCell>
                    <TableCell align='right'>
                      {Number(row.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </TableCell>
                    <TableCell style={{ color: row.change >= 0 ? 'green' : '#B22222' }} align='right'>
                      {row.change}
                    </TableCell>
                    <TableCell style={{ color: row.percent >= 0 ? 'green' : '#B22222' }} align='center'>
                      {Number(row.percent).toFixed(2)} %
                    </TableCell>
                    <TableCell align='center'>
                      <TextField
                        id='percent-coin'
                        type='number'
                        label='Percent'
                        variant='standard'
                        value={percentageInput[row.currency]}
                        onChange={newPercentage => handlePercentageChange(newPercentage, row.currency, row.price)}
                        InputProps={{
                          endAdornment: <InputAdornment position='end'>%</InputAdornment>
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {calculatedValues[row.currency] !== undefined && (
                        <div>{Number(calculatedValues[row.currency]).toFixed(8)}</div>
                      )}
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
        rowsPerPageOptions={[5, 10, 25, 100]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default TableCoinsTest
