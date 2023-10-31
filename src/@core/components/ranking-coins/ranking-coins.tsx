import React, { useEffect } from 'react'

const TradingViewWidget = () => {
  useEffect(() => {
    // Verifique se o elemento com o ID 'tradingview-widget-container' existe
    const container = document.getElementById('tradingview-widget-container')

    if (container) {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'
      script.async = true
      script.innerHTML = `
        {
          "width": '100%',
          "height": '100%',
          "defaultColumn": "overview",
          "screener_type": "crypto_mkt",
          "displayCurrency": "USD",
          "colorTheme": "light",
          "locale": "br"
        }
      `

      // Anexe o script ao elemento container
      container.appendChild(script)

      return () => {
        container.removeChild(script)
      }
    }
  }, [])

  return (
    <div>
      <div className='tradingview-widget-container' id='tradingview-widget-container'></div>
      <div className='tradingview-widget-copyright'>
        <a href='https://br.tradingview.com/' rel='noopener nofollow' target='_blank'>
          <span className='blue-text'>Monitore todos os mercados no TradingView</span>
        </a>
      </div>
    </div>
  )
}

export default TradingViewWidget
