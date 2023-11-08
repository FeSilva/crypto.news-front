import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Slider from 'react-slick'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import TradingViewCharts from 'src/@core/components/tradingview/charts'
import Typography from '@mui/material/Typography'
import TableCoinsCharts from 'src/@core/components/table-coins-chart'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const MarketChart = () => {
  const [exchangeList, setExchangeList] = useState([])
  const [assets, setAssets] = useState([])
  const [selectedAssets, setSelectedAssets] = useState([]) // Estado para armazenar ativos selecionados
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedImageTitle, setSelectedImageTitle] = useState('')
  const [showTradingView, setShowTradingView] = useState(false)
  const [chart, setChart] = React.useState(null)
  const [chartKey, setChartKey] = useState(0)
  useEffect(() => {
    Axios.get('http://localhost:8080/api/exchanges-list')
      .then(response => {
        setExchangeList(response.data)
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error)
      })
  }, [selectedAssets])

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  }

  const handleNext = () => {
    slider.slickNext()
  }

  // Implemente a função que atualiza o gráfico com base nos ativos selecionados

  const handlePrev = () => {
    slider.slickPrev()
  }

  const handleImageClick = exchange => {
    setAssets(exchange.assets)
    setSelectedImageTitle(exchange.name)
    setShowTradingView(false) // Reset TradingViewChart
    setSelectedAssets([]) // Clear selected assets
  }

  const handleAssetSelection = currency => {
    // Função para selecionar ou deselecionar um ativo
    if (selectedAssets.includes(currency)) {
      setSelectedAssets(selectedAssets.filter(item => item !== currency))
    } else {
      setSelectedAssets([...selectedAssets, currency])
    }
    setShowTradingView(true) // Update TradingViewChart
  }

  const handleSelectedAssetsChange = selectedAssets => {
    setSelectedAssets(selectedAssets)
  }
  const updateTradingView = status => {
    console.log('chega aqui', status)
    setShowTradingView(status)

    // Atualize a chave para forçar o recarregamento do TradingViewCharts
    setChartKey(prevKey => prevKey + 1)
  }

  const filteredAssets = Object.keys(assets).filter(currency =>
    currency.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const dataForTable = filteredAssets.map(currency => {
    return {
      symbol: currency,
      currency,
      price: assets[currency].price,
      volume: assets[currency].volume,
      change: assets[currency].change,
      percent: assets[currency].percentage
    }
  })

  let slider

  return (
    <div className='market-chart-container'>
      {' '}
      {/* Add a container div with a custom class */}
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Slider ref={c => (slider = c)} {...sliderSettings}>
            {exchangeList.map(item => (
              <div key={item.name}>
                <Grid item xs={4}>
                  <Card className='exchange-card'>
                    <CardContent>
                      <img src={item.imgUrl} alt={item.name} onClick={() => handleImageClick(item)} />
                    </CardContent>
                  </Card>
                </Grid>
              </div>
            ))}
          </Slider>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <Card className='asset-card'>
            {' '}
            {/* Add a custom class for styling */}
            <CardContent>
              <Typography variant='h6'>Assets - {selectedImageTitle} </Typography>
              <TextField
                label='Pesquisar Ativos'
                variant='outlined'
                fullWidth
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </CardContent>
            <CardContent>
              <TableCoinsCharts
                data={dataForTable}
                setShowTradingView={updateTradingView}
                onSelectedAssetsChange={handleSelectedAssetsChange}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} md={8} lg={8}>
          <Card>
            <CardContent>
              {showTradingView && (
                <TradingViewCharts key={chartKey} selectedAssets={selectedAssets} exchanges={selectedImageTitle} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default MarketChart
