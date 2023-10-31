// ** MUI Imports

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TradingViewWidget from 'src/@core/components/tradingview/charts'

const tradingchartPage = props => {
  return (
    <Grid container spacing={6}>
      <Grid item md={4} lg={4} xs={4}>
        <Card>dasdas</Card>
      </Grid>
      <Grid item md={8} lg={8} xs={8}>
        <Card>
          <TradingViewWidget />
        </Card>
      </Grid>
    </Grid>
  )
}

export default tradingchartPage
