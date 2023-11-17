import React from 'react'
import axios from 'axios'
function Item({item,data,setFilteredData}) {
  const handleDelete=(id)=>{
    console.log(id)
    let target = data.find((item)=> item.id==id)
    let indexOfTarget = data.indexOf(target)
    data.splice(indexOfTarget,1)
    setFilteredData([...data])
    axios.delete(`https://northwind.vercel.app/api/products/${id}`)
    console.log(data)
  }
  return (
    <div className='td'>
        <div>{item.name}</div>
    <div>{item.unitPrice}AZN</div>
    <button onClick={(e)=>handleDelete(item.id)}>delete</button>
    </div>
  )
}

export default Item