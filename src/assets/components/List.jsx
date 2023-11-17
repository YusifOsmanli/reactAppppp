import React, { useEffect, useState} from 'react'
import axios from 'axios'
import Item from './Item'
import { nanoid } from 'nanoid'

const List=() => {
    const [data,setData] = useState ([])
    const [filteredDara,setFilteredData]= useState([])
    const [newProduct,setNewProduct]= useState({name:"",unitPrice:""})
    useEffect(()=>{
        axios.get("https://northwind.vercel.app/api/products").then(res => {
        setData(res.data)
        setFilteredData(res.data)
        })
    },[])
    const handleChange = (inputVal)=>{
        if(inputVal == " "){
            setData([...data])
        }
        else{
            setFilteredData([...data.filter((item)=> item.name.trim().toLowerCase().includes(inputVal.trim().toLowerCase()))])
        }
    }
    const handleClick=(e)=>{
        e.preventDefault()
        let sortedDatas=[...data.sort((a,b)=>a.unitPrice-b.unitPrice)]
        setData(sortedDatas)
    }
    const handleDiscounted=(e)=>{
        e.preventDefault()
        let discountedDatas=data.filter((item=>item.discontinued==true))
        setFilteredData([...discountedDatas])
    }
    const handleAdd=(e)=>{
    e.preventDefault()
    newProduct.id=nanoid()
    axios.post("https://northwind.vercel.app/api/products/",newProduct)
    setFilteredData([...filteredDara,newProduct])
    setNewProduct({name:"",unitPrice:""})
    }
    const handleChangee=(e)=>{
        let values={...newProduct,[e.target.name]:e.target.value}
        setNewProduct(values)
    }
  return (
    <div className="container">
        <div>
        <input type="text" placeholder='Search...' onChange={(e)=>{
            handleChange(e.target.value)
        }}/>
        <button onClick={(e)=>handleClick(e)}>Sort By Price</button>
        <button onClick={(e)=>handleDiscounted(e)}>Discounted</button>
        <div>
            <h4>Add a new item</h4>
            <input type="text" name='name' value={newProduct.name} placeholder='name' onChange={(e)=>handleChangee(e)}/>
            <input type="number" name='unitPrice' value={newProduct.unitPrice} placeholder='Price' onChange={(e)=>handleChangee(e)}/>
            <button onClick={(e)=>handleAdd(e)}>Add</button>
        </div>
        </div>
        <div>
            {
              filteredDara &&  filteredDara.map((item,index)=>{
                    return(
                        <ul>
                            <li key={index}>
                            <Item item={item} data={data} setFilteredData={setFilteredData}/>
                            </li>
                        </ul>
                    )
                })
            }
        </div>
    </div>
  )
}

export default List