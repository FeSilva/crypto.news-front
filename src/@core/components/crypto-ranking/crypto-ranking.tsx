import React, { Component } from 'react'

class CryptoRankWidget extends Component {
  componentDidMount() {
    const script = document.createElement('script')
    script.src = 'https://cryptorank.io/widget/rank-table.js'
    script.async = true
    document.body.appendChild(script)
  }

  render() {
    return (
      <div
        className='cr-rank-table-widget'
        data-site-url='https://cryptorank.io'
        data-api-url='https://api.cryptorank.io/v0'
        data-ticker='true'
        data-rank='true'
        data-market-cap='true'
        data-volume='true'
        data-stats='true'
      >
        <a target='_blank' rel='noopener' href='https://cryptorank.io/rankings'>
          Crypto Asset Rankings by Cryptorank
        </a>
      </div>
    )
  }
}

export default CryptoRankWidget
