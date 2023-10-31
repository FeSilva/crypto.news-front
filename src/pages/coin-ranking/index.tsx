import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CryptoPriceTicker from 'src/@core/components/crypto-price-ticker/cryptopriceticker'
import QuantifyCryptoWidget from 'src/@core/components/quantify-crypto-top20coins/quantify-crypto-top20coins'

import TableCoins from 'src/views/pages/table/mui/TableCollapsible'
import TableColumns from 'src/views/pages/table/data-grid/TableFilter'

const coinRanking = () => {
  const [coinData, setCoinData] = useState([])
  useEffect(() => {
    // Realize a requisição para localhost:8080/api/coin-ranking aqui
    fetch('http://localhost:8080/api/coin-ranking')
      .then(response => response.json())
      .then(data => {
        // Faça algo com os dados recebidos, por exemplo, armazene-os no estado do componente
        setCoinData(data)
      })
      .catch(error => {
        console.error('Erro na requisição:', error)
      })
  }, [])

  return (
    <Grid container spacing={12}>
      {coinData.top_four && Array.isArray(coinData.top_four) ? (
        coinData.top_four.map(coin => (
          <Grid item key={coin.id} md={3} lg={3} xs={12}>
            <CryptoPriceTicker
              volume={coin.circulacao_mercado}
              symbol={coin.coin_name}
              marketcap={coin.marketcap}
              price={coin.coin_price}
              rank={coin.rank}
              percentChange={coin.percent_change_1h}
            />
          </Grid>
        ))
      ) : (
        <p>Carregando dados...</p>
      )}

      {coinData.top_four && Array.isArray(coinData.top_four) ? (
        <Grid item md={8} lg={8} xs={8}>
          <TableColumns coins={coinData} />
        </Grid>
      ) : (
        <p>Carregando dados...</p>
      )}

      <Grid item md={4} lg={4} xs={4}>
        <QuantifyCryptoWidget />
      </Grid>
    </Grid>
  )
}

export default coinRanking
