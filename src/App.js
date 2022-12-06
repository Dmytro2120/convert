import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('EUR');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);

  const [rates, setRates] = React.useState({});

  React.useEffect(() => {
    fetch('https://api.exchangerate.host/latest')
    .then((res) => res.json())
    .then((json) => {
      setRates(json.rates);
    })
    .catch((err) => {
      console.warn(err);
      alert('За вашим запитом не вдалося отримати інформацію');
    })
  })

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setFromPrice(value);
    setToPrice(result.toFixed(3));
  }

  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    setFromPrice(result.toFixed(3))
    setToPrice(value);
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency, fromPrice]);

  React.useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency, toPrice]);

  
  return (
    <div className='App'>
      <Block 
      value={fromPrice} 
      currency={fromCurrency} 
      onChangeCurrency={setFromCurrency} 
      onChangeValue={onChangeFromPrice} 
      />
      <Block value={toPrice} 
      currency={toCurrency} 
      onChangeCurrency={setToCurrency} 
      onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
