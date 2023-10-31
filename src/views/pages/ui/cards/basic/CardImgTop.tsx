// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardImgTop = props => {
  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image={props.urlToImage} />
      <CardContent>
        <Typography variant='h2' sx={{ mb: 2 }}>
          {props.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>{props.description}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardImgTop
