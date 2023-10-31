// ** MUI Imports
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/system/Unstable_Grid/Grid'

// ** Type Import
import { CardStatsVerticalProps } from 'src/@core/components/card-statistics/types'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

const CardStatsVertical = (props: CardStatsVerticalProps) => {
  // ** Props
  const {
    sx,
    price,
    title,
    chipText,
    rank,
    volume,
    marketcap,
    percentChange,
    avatarIcon,
    avatarSize = 44,
    iconSize = '1.75rem',
    chipColor = 'primary',
    avatarColor = 'primary'
  } = props

  const RenderChip = chipColor === 'default' ? Chip : CustomChip

  return (
    <Card sx={{ ...sx }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant='h5' sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant='h4' sx={{ mb: 3.5, color: 'text.secondary' }}>
          {Number(price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}

          <span style={{ color: percentChange >= 0 ? '#00FF7F' : '#B22222' }}>
            {' (' + percentChange.toFixed(2) + ')'}
          </span>
        </Typography>
        <Grid container sx={{ mb: 1 }} columns={3} spacing={1}>
          <Grid item xs={12} sm={4}>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              Rank {rank}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              Marketcap {marketcap} USD
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              Volume {volume} USD
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
