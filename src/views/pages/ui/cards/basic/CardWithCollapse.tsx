import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'

const CardWithCollapse = props => {
  const [collapse, setCollapse] = useState(false)

  const handleClick = () => {
    setCollapse(!collapse)
  }
  const dataPublicacao = new Date(props.publishedAt)

  const dia = dataPublicacao.getDate().toString().padStart(2, '0')
  const mes = (dataPublicacao.getMonth() + 1).toString().padStart(2, '0')
  const ano = dataPublicacao.getFullYear()

  const hora = dataPublicacao.getHours().toString().padStart(2, '0')
  const minutos = dataPublicacao.getMinutes().toString().padStart(2, '0')

  const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}`

  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image={props.urlToImage} />
      <CardContent>
        <Typography sx={{ mb: 2 }}>
          {props.company} - {dataFormatada}
        </Typography>
        <Link href={props.url + '/?keynews=786d8a7he1287@euqdey89234'} target='_blank'>
          <Typography variant='h6' sx={{ mb: 2 }}>
            {props.title}
          </Typography>
        </Link>
        <Typography sx={{ color: 'text.secondary' }}>{props.description}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardWithCollapse
