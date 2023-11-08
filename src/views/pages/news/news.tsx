import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardWithCollapse from '../ui/cards/basic/CardWithCollapse'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Fab from '@mui/material/Fab'
import Icon from 'src/@core/components/icon'
import { CardContent, CardHeader, Typography } from '@mui/material'
import Card from '@mui/material/Card'

function NewsPage() {
  const [news, setNews] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Realize a requisição para localhost:8080/api/coin-ranking aqui
    axios
      .get(`http://localhost:8080/api/news?search_item=bitcoin`)
      .then(response => {
        console.log(response.data.articles)
        setNews(response.data.articles)
      })
      .catch(error => {
        console.error('Erro na requisição:', error)
      })
  }, [])

  const handleSearch = () => {
    axios
      .get(`http://localhost:8080/api/news?search_item=${searchTerm}`)
      .then(response => {
        console.log(response.data.articles)
        setNews(response.data.articles)
      })
      .catch(error => {
        console.error('Erro na requisição:', error)
      })
  }

  return (
    <Card>
      <CardHeader style={{ textAlign: 'center' }} title={'CryptoNews'} />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={10} md={10} lg={10}>
            <TextField
              id='standard-basic'
              label='Ex.: Bitcoin / Ethereum'
              variant='standard'
              fullWidth={true}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={2} md={2} lg={2}>
            <Fab color='success' variant='extended' sx={{ '& svg': { mr: 1 } }} onClick={handleSearch}>
              <Icon icon='tabler:search' />
              Search
            </Fab>
          </Grid>
        </Grid>
      </CardContent>
      {news.length > 0 && (
        <Grid container spacing={6} key='cards'>
          {news.map((article, index) => (
            <Grid item xs={3} key={index}>
              <CardWithCollapse
                description={article.description}
                title={article.title}
                content={article.content}
                urlToImage={article.urlToImage}
                url={article.url}
                author={article.author}
                publishedAt={article.publishedAt}
                company={article.source.name}
              ></CardWithCollapse>
            </Grid>
          ))}
        </Grid>
      )}
    </Card>
  )
}

export default NewsPage
