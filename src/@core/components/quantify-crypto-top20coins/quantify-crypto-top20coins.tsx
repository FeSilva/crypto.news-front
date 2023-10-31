import React, { Component, useEffect } from 'react'

class QuantifyCryptoWidget extends Component {
  componentDidMount() {
    const script = document.createElement('script')
    script.src = 'https://quantifycrypto.com/widgets/grid/js/qc-grid-widget.js'
    script.async = true
    document.body.appendChild(script)
  }

  render() {
    return <qc-grid-widget theme='light' width='100%' ranking-type='top_20' currency-code='USD'></qc-grid-widget>
  }
}

export default QuantifyCryptoWidget
