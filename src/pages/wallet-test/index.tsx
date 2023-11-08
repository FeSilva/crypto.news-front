import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Slider from 'react-slick'

//Css
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

//Components
import TableCoinsTest from 'src/@core/components/table-coins-test'
import WalletBalanceTest from 'src/@core/components/table-coins-test/balance'
import ListDetails from 'src/@core/components/table-coins-test/list-details/list-details'
import CustomTextField from 'src/@core/components/mui/text-field'
import Chip from 'src/@core/components/mui/chip'

//Mui Material
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import { gridColumnMenuSelector } from '@mui/x-data-grid'
import ListDetailsText from 'src/@core/components/table-coins-test/list-details/list-details-text'

const WalletTest = () => {
  const [exchangeList, setExchangeList] = useState([])
  const [assets, setAssets] = useState([])
  const [selectedAssets, setSelectedAssets] = useState([]) // Estado para armazenar ativos selecionados
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedImageTitle, setSelectedImageTitle] = useState('')
  const [showButton, setShowButton] = useState(true)
  const [showWalletBalance, setShowWalletBalance] = useState(false)
  const [walletValue, setWalletValue] = useState(0) // Estado para rastrear o valor em carteira (inicializado como 0)
  const [assetPercentages, setAssetPercentages] = useState({})
  const [detailsForList, setDetailsForListData] = useState([])
  const [walletBalanceData, setWalletBalanceData] = useState([])
  const [selectedAssetStatus, setSelectedAssetStatus] = useState({})

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

  /**
   * Function for click in image exchange
   */
  const handleImageClick = exchange => {
    setAssets(exchange.assets)
    setSelectedImageTitle(exchange.name)
    setSelectedAssets([]) // Clear selected assets
  }

  /**
   * Function for click in image exchange
   */
  const handleSelectedAssetsChange = selectedAssets => {
    const status = {}
    selectedAssets.forEach(asset => {
      status[asset] = true
    })
    setSelectedAssetStatus(status)
    setSelectedAssets(selectedAssets)
  }

  const handleWalletValueChange = e => {
    console.log('value: ', e.target.value)
    setWalletValue(e.target.value) // Atualize o estado do walletValue conforme o usuário digita
  }
  const handleAssetPercentageChange = (currency, percentage) => {
    const updatedPercentages = { ...assetPercentages, [currency]: percentage }
    if (percentage !== undefined && percentage > 0) setAssetPercentages(updatedPercentages)
  }
  const handleDelete = assetToDelete => {
    // Create a new array excluding the asset to delete
    const updatedSelectedAssets = selectedAssets.filter(asset => asset !== assetToDelete)
    setSelectedAssets(updatedSelectedAssets)
  }
  const filteredAssets = Object.keys(assets).filter(currency =>
    currency.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const handleButtonClick = () => {
    // Realize a requisição POST para localhost:8080/api/wallet-test
    Axios.post('http://localhost:8080/api/wallet-backtest', {
      selectedAssets: selectedAssets,
      slug: selectedImageTitle,
      walletPrice: walletValue,
      allocation: assetPercentages, // Use o valor em carteira atualizado
      quotePrice: 'us',
      limit: 7
    })
      .then(response => {
        setDetailsForListData(response.data.data)
        setWalletBalanceData(response.data)
        setShowWalletBalance(true)
      })
      .catch(error => {
        console.error('Erro ao realizar a requisição:', error)
      })
  }

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
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
          <Slider ref={c => (slider = c)} {...sliderSettings}>
            {exchangeList.map(item => (
              <div key={item.name}>
                <Grid item xs={12} sm={4} sx={{ mb: { sm: 0, xs: 4 } }} onClick={() => handleImageClick(item)}>
                  <Card className='exchange-card'>
                    <CardContent>
                      <img src={item.imgUrl} alt={item.name} />
                    </CardContent>
                  </Card>
                </Grid>
              </div>
            ))}
          </Slider>
        </Grid>
        <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
          <Card className='asset-card'>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <Typography variant='h6'>Assets - {selectedImageTitle} </Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <TextField
                    id='wallet-value'
                    type='number'
                    label='Valor em Carteira'
                    variant='standard'
                    fullWidth
                    value={walletValue}
                    onChange={handleWalletValueChange}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>$ Dólar Americano</InputAdornment>
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <TextField
                    id='standard-basic'
                    label='Pesquisar Ativos'
                    variant='standard'
                    fullWidth
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  {selectedAssets.length > 0 && (
                    <div>
                      <Typography variant='h6'>Ativos Selecionados:</Typography>
                      {selectedAssets.map(asset => (
                        <Chip
                          label={`${asset} ${assetPercentages[asset]}%`}
                          color='primary'
                          variant='outlined'
                          onDelete={() => handleDelete(asset)}
                        />
                      ))}
                    </div>
                  )}
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <TableCoinsTest
                data={dataForTable}
                onSelectedAssetsChange={handleSelectedAssetsChange}
                walletValue={walletValue}
                onAssetPercentageChange={handleAssetPercentageChange}
                selectedAssetStatus={selectedAssetStatus}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
          {showButton && <Button onClick={handleButtonClick}>Mostrar Saldo da Carteira</Button>}
          {showWalletBalance && <WalletBalanceTest data={walletBalanceData} />}
        </Grid>
        <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
          {showWalletBalance && <ListDetails details={detailsForList.details} />}
        </Grid>
        <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
          {showWalletBalance && <ListDetailsText details={detailsForList.details} />}
        </Grid>
      </Grid>
    </div>
  )
}

export default WalletTest
