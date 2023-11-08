import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

const PercentageInput = ({ onChange, value, maxSum, ...rest }) => {
  const handleInputChange = event => {
    const inputValue = event.target.value

    console.log('digitando percent:', event.target.value)
    if (inputValue === '' || (parseFloat(inputValue) >= 0 && parseFloat(inputValue) <= maxSum)) {
      console.log('digitando percent change:', event.target.value)

      //onChange(inputValue)
    }
  }

  return (
    <TextField
      InputProps={{
        endAdornment: <InputAdornment position='end'>%</InputAdornment>
      }}
      value={value}
      {...rest}
    />
  )
}

export default PercentageInput
