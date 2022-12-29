
import { useEffect, useState } from 'react';
import './App.css';
import List from './list';
import Message from './alert'




const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

function App() {
  const [name,setName] = useState('') ;
  const [list,setList] = useState(getLocalStorage()) ;
  const [isediting,setIsediting] = useState(false) ;
  const [editid,setEditid] = useState(null) ;
  const [alert,setAlert] = useState({show:false,msg:'',type:''}) ;

  const showAlert =(show=false,msg='',type='') => {
    setAlert({show,msg,type})
  }
  useEffect(() => {
    localStorage.setItem('list',JSON.stringify(list))
  },[list])

  const handleSubmit = (e) => {
    try {
      e.preventDefault()
    if (!name){
      showAlert(true,'No items in the list','danger')
    }
    else if (name && isediting){
      
      setList((list) => {
        list.map((item) => {
          try {
            console.log(name);
            if (item.id === editid) {
              return { ...item, title: name };
            }
            return item;
          } catch (error) {
            console.log(error)
          }
        })
      setName('')
      setEditid(null) 
      setIsediting(false)
      showAlert(true,'Value Changed','success')
      console.log(alert)
    })}
    else{
      showAlert(true,'Item Added to the List','success')
      const newItem = {id:new Date().getTime().toString(), title: name} ;
      setList([...list, newItem])
      setName('')
    }
    } 
    catch (error) {
      console.log(error)
    }

  }


  
  const removeItem = (id) => {
    showAlert(true,'Item Remove','danger')
    setList(list.filter((item) => item.id!=id))
  }
  const editItem = (id) => {
    const itemName = list.find((item) => item.id===id)

    setIsediting(true) ;
    setEditid(id) ;
    console.log(itemName.title)
    setName(itemName.title) ;
    

  }
  const clearItem = () => {
    showAlert(true,'empty list','danger')
    setList([])
  }


  return (
    <section className='section-center' >
      <form className='grocery-form' onSubmit={handleSubmit}>
        <h2>Grocery</h2>
        {alert.show && <Message {...alert} removealert={showAlert} list={list}/> }
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
          <button type='submit' className='submit-btn'>
            {isediting?'Edit':'Submit'}
          </button>
        </div>
      </form>
      {list.length>0 && (
        <div className='grocery-container' >
          <List list={list} removeItem={removeItem} editItem={editItem}  /> 
          <button className='clear-btn' onClick={clearItem}>Clear</button>
        </div>
      )}
    </section>
  );
}

export default App;
