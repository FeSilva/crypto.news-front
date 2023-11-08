// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import ListDetails from './list-details/list-details'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const WalletBalanceTest = ({ data }) => {
  // ** Hook

  const series = [
    {
      data: data.data.assets.map(item => item.balance) // Use os dados de saldo do prop 'data'
    }
  ]
  const categories = data.data.assets.map(item => {
    const date = new Date(item.date)
    const day = date.getDate().toString().padStart(2, '0') // Ensure two digits for the day
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is 0-based, so add 1
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  })

  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    colors: ['#6eaa5e'],
    stroke: { curve: 'straight' },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff']
    },
    grid: {
      padding: { top: -10 },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      custom(data: any) {
        return `<div class='bar-chart'>
          <span>$ ${data.series[data.seriesIndex][data.dataPointIndex].toFixed(2)}</span>
        </div>`
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      },
      categories: categories
    }
  }

  return (
    <Card>
      <CardHeader
        title='Portfolio Balance Test'
        subheader='Commercial networks & enterprises'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h6' sx={{ mr: 5 }}>
              ${data.priceWallet.toFixed(2)}
            </Typography>
            {data.percentWalletPeriod >= 0 ? (
              <CustomChip
                skin='light'
                color='success'
                sx={{ fontWeight: 500, borderRadius: 1, fontSize: theme.typography.body2.fontSize }}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
                    <Icon icon='tabler:arrow-up' fontSize='1rem' />
                    <span>{data.percentWalletPeriod.toFixed(2)}%</span>
                  </Box>
                }
              />
            ) : (
              <CustomChip
                skin='light'
                color='error'
                sx={{ fontWeight: 500, borderRadius: 1, fontSize: theme.typography.body2.fontSize }}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
                    <Icon icon='tabler:arrow-down' fontSize='1rem' />
                    <span>{Math.abs(data.percentWalletPeriod).toFixed(2)}%</span>
                  </Box>
                }
              />
            )}
          </Box>
        }
      />
      <CardContent>
        <ReactApexcharts type='line' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default WalletBalanceTest
