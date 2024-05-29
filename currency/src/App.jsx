import { useEffect, useState } from 'react'
import axios from "axios";
import './App.css'

function App() {
  const [amount, setAmount]= useState(1);
  const[fromCurrency, setFromCurrency] = useState("USD");
  const[toCurrency, setToCurrency] = useState("INR");
  const[convertedAmount, setConvertedAmount] = useState(null);
  const[exchangeRate,setExchangeRate] = useState(null); 

  

 useEffect(()=>{
  const getExchangeRate =async ()=>{
    try{
    let url = `https://v6.exchangerate-api.com/v6/7c3dd83c758e7558ddce8ee1/latest/${fromCurrency}`;
    const result = await axios.get(url);
    console.log(result)
    setExchangeRate(result.data.conversion_rates[toCurrency])
    }catch(error){
      console.error("Error fetching Exchange Rate:",error);

    }
  }
  getExchangeRate()
 },[fromCurrency,toCurrency]);
  
 useEffect(()=>{
  if (exchangeRate !== null){
    setConvertedAmount((amount * exchangeRate).toFixed(2));
  }
 },[amount,exchangeRate]);

 const handleAmount = (e)=>{
  const amt = parseFloat(e.target.value)
   setAmount(isNaN(amt)? 0 : amt);
 }

 const handleFromCurrency = (e) => {
  setFromCurrency(e.target.value)
 }
 const handleToCurrency = (e)=>{
  setToCurrency(e.target.value);

}

  return (
    <>
    <div className='currency-convert'>
      <div className="box"></div>
      <div className="data"></div>
      <h1>Currency Converter</h1>
      <div className='input-container'>
        <label htmlFor="amt">Amount:</label>
        <input type="number" id='amt'value={amount} onChange={handleAmount}/>
      </div>
      <div className='input-container'>
        <label htmlFor='fromcurrency'>From Currency:</label>
        <select  id="formcurrency" value={fromCurrency} onChange={handleFromCurrency}>
          <option value="USD">USD - United States Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - Britixh Pound Sterling</option>
          <option value="JPY">JPY - japanese Yen</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="CNY">CNY - Chinese Yuan</option>
          <option value="INR">INR - Indian Rupee</option>
          <option value="BRL">BRL - Brazilian Real</option>
          <option value="ZAR">ZAR - South African Rand</option>
        </select>

      </div>
      <div className='input-container'>
        <label htmlFor='Tocurrency'>To Currency:</label>
        <select  id="Tocurrency"  value={toCurrency} onChange={handleToCurrency}>
          <option value="USD">USD - United States Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - Britixh Pound Sterling</option>
          <option value="JPY">JPY - japanese Yen</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="CNY">CNY - Chinese Yuan</option>
          <option value="INR">INR - Indian Rupee</option>
          <option value="BRL">BRL - Brazilian Real</option>
          <option value="ZAR">ZAR - South African Rand</option>
        </select>
      </div>
      <div className='result'>
        <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
      </div>
      </div>
    </>
  );
}
export default App;
