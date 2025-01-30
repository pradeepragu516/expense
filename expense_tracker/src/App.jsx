//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react'
import './App.css'
import './index.css'
import AddExpense from './components/AddExpense'
import Transaction from './components/Transaction'
import Balance from './components/Balance';
import IncomeBalance from './components/IncomeBalance';
import axios from 'axios';


function App() {
  const [transaction,setTransaction] = useState( [] );

useEffect(() => {
  axios
    .get('https://server-tr3i.onrender.com/api/expenses')
    .then((res) => setTransaction(res.data))
    .catch((err) => console.error('Error fetching transactions:', err));
}, []);

  const onAdd = (data) => {
    axios
    .post('https://server-tr3i.onrender.com/api/expenses', data) 
    .then((res) => {
      setTransaction([...transaction, res.data]); 
    })
    .catch((err) => console.error('Error adding transaction:', err));
  };

  const onDelete = (id) => {
    console.log('Deleting transaction with ID:', id);
    axios
      .delete(`https://server-tr3i.onrender.com/api/expenses/${id}`) 
      .then(() => {
        console.log('Transaction deleted successfully');
        setTransaction(transaction.filter((transaction) => transaction.id !== id)); 
      })
      .catch((err) => console.error('Error deleting transaction:', err));
  };
 

  return (
    <>
      <Balance transaction = {transaction}/>
      <IncomeBalance transaction={transaction}/>
      <AddExpense onAdd = {onAdd} />
      <Transaction transaction={transaction} onDelete = {onDelete}/>
    </>
  )
}

export default App;


