import React, { useEffect } from 'react'

const TradingViewWidget = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.async = true

    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: 'BINANCE:BTCUSDT',
          title: 'Bitcoin'
        },
        {
          proName: 'BINANCE:ETHUSDT',
          title: 'Ethereum'
        },
        {
          proName: 'BINANCE:ADAUSDT',
          title: 'Cardano'
        },
        {
          proName: 'BINANCE:MATICUSDT',
          title: 'Polygon'
        },
        {
          proName: 'BINANCE:XRPUSDT',
          title: 'Ripple'
        }
      ],
      showSymbolLogo: true,
      colorTheme: 'light',
      isTransparent: false,
      displayMode: 'adaptive',
      locale: 'br'
    })

    document.querySelector('.tradingview-widget-container__widget').appendChild(script)

    return () => {
      // Cleanup when the component unmounts (optional)
      // document.querySelector('.tradingview-widget-container__widget').removeChild(script)
    }
  }, [])

  return (
    <div className='tradingview-widget-container'>
      <div className='tradingview-widget-container__widget'></div>
    </div>
  )
}

export default TradingViewWidget
