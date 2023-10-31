import { useEffect, useRef } from 'react'
import { useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'

export default function TradingViewCharts() {
  const onLoadScriptRef = useRef()
  const { user } = useContext(AuthContext)

  let tvScriptLoadingPromise

  useEffect(() => {
    onLoadScriptRef.current = createWidget

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise(resolve => {
        const script = document.createElement('script')
        script.id = 'tradingview-widget-loading-script'
        script.src = 'https://s3.tradingview.com/tv.js'
        script.type = 'text/javascript'
        script.onload = resolve

        document.head.appendChild(script)
      })
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current())

    return () => (onLoadScriptRef.current = null)

    function createWidget() {
      if (document.getElementById('tradingview_97778') && 'TradingView' in window) {
        const userWatchlist = ['BINANCE:BTCUSDT', 'HUOBI:BTCUSDT']

        new window.TradingView.widget({
          autosize: false,
          symbol: 'BINANCE:BTCUSD',
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          width: '100%',
          height: 510,
          locale: 'en',
          enable_publishing: false,
          allow_symbol_change: true,
          watchlist: ['BINANCE:ETHUSDT', 'BINANCE:BNBUSDT', 'BINANCE:XRPUSDT'],
          details: true,
          container_id: 'tradingview_97778'
        })
      }
    }
  }, [])

  return (
    <div className='tradingview-widget-container'>
      <div id='tradingview_97778' />
      <div className='tradingview-widget-copyright'></div>
    </div>
  )
}
