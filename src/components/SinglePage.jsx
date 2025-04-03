//import React from 'react'
import '../styles/singlepage.css'

import { useParams } from 'react-router-dom'
import { ProductList } from './HomePage';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
//import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";





function SinglePage(){
    const {id} = useParams();
    console.log("ProductList", id)
    const card= ProductList.find((card)=>card.id==id);
    const [count, setCount] = useState(1);
    return(
        <div className='allContents'>

           <div className='cardImage'>
            <img src={card.image}>
            </img></div>
           {/* <div className='cardTitle'>{card.CardTitle}</div> */}
           {/* <button type="button" className="button11" >Buy Now</button> */}
           <div className='onleft'>
           <div className='cardTitle'>{card.CardTitle}</div>
           <span className='staricons'> <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt /></span>
             {/* <span>(Customer review)</span>  */}
         <p className='cardPrice'>{card.price}</p>
         <p className='cardContent'>{card.Description}</p><br/><br/>
         <p className='cirleColors'> <span className='colorTitle'>Color</span> <FaCircle className='circle1'/> <FaCircle className='circle2'/> <FaCircle className='circle3'/></p>
            <div className='rectangleBox'>
            <div className="flex items-center justify-between w-40 h-12 border border-black rounded-lg shadow-md bg-gray-100 p-2">
      <span
        onClick={() => setCount(count - 1)}
        className="p-minus"
      >
     
        <FiMinus size={20} />
      </span>
      <span className="text-lg ">{count}</span>
      <span
        onClick={() => setCount(count + 1)}
        className="p-plus"
         >
       
        <FaPlus size={20} />
      </span>
    </div>
    <div>
        <div>
        <button className='cartBtn'>Buy Now</button>
        </div>
   
    </div>
  
            </div>

           </div>
        </div>
    )
}
export default SinglePage