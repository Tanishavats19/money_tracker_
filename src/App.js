
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name,setName] = useState();
  const [datetime, setDateTime] =useState();
  const [desc, setDesc] = useState();
  const [transactions,setTransactions] = useState([]);

  useEffect(()=>{

    getTransactions().then(setTransactions);
  },[]);

  async function getTransactions(){
    const url = process.env.REACT_APP_API_URL+'/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev){
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/transaction';
    const price = name.split(' ')[0];
    fetch(url,{
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({
        price,
        name:name.substring(price.length+1),
        desc,
        datetime
      })
    }).then(response => {
      response.json().then(json => {
        setName('');
        setDateTime('');
        setDesc('');
        console.log('result',json);
      });
    });
  }

  let bal =0;
  for(const transaction of transactions){
    bal = bal + transaction.price;
  }

  bal = bal.toFixed(2);
  const fraction = bal.split('.')[1];
  bal = bal.split('.')[0];

  return (
    <main>
      <h1>${bal}<span>{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input type="text" 
          value={name}
          onChange={ev => setName(ev.target.value)}
          placeholder={'+150 for zomato'}/>
          <input value={datetime}
          onChange={ev => setDateTime(ev.target.value)} 
          type="datetime-local"/>
        </div>
        <div className='desc'>
          <input type="text" 
          value={desc}
          onChange={ev => setDesc(ev.target.value)}
          placeholder='description'/>  
        </div>
       <button type='submit'> Add New transaction </button>
      </form>

      <div className='transactions'>
        {transactions.length>0 && transactions.map(transaction => (
          <div className='transaction'>
          <div className='left'>
            <div className='name'>{transaction.name}</div>
            <div className='desc'>{transaction.desc}</div>
          </div>
          <div className='right'>
            <div className={'price-'+((transaction.price<0)?'red':'green')}>
              {transaction.price}
            </div>
            <div className='datetime'>{transaction.datetime}</div>
          </div>
        </div>
        ))}
        
      </div>

        
    </main>
  );
}

export default App;
