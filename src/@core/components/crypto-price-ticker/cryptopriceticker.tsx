import React, { useEffect } from 'react'
import Grid from '@mui/system/Unstable_Grid/Grid'
import CardStatsVertical from '../card-statistics/card-stats-vertical'

const CryptoExchange = props => {
  return (
    <Grid item xs={6} sm={4} lg={2}>
      <CardStatsVertical
        price={props.price}
        chipText='+25.2%'
        avatarColor='info'
        marketcap={props.marketcap}
        chipColor='default'
        percentChange={props.percentChange}
        title={props.symbol}
        rank={props.rank}
        volume={props.volume}
        avatarIcon='tabler:chart-bar'
      />
    </Grid>
  )
}

export default CryptoExchange
