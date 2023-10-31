// ** MUI Imports

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TableStickyHeader from 'src/views/pages/table/mui/TableStickyHeader'

const Exchanges = props => {
  return (
    <Grid container spacing={6}>
      <Grid item md={12} lg={12} xs={12}>
        <Card>
          <CardHeader title='Exchanges'></CardHeader>
          <CardContent>
            <TableStickyHeader />
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={6} lg={6} xs={6}></Grid>
    </Grid>
  )
}

export default Exchanges
