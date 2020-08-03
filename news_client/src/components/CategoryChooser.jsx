import React,{useState} from 'react';



function CategoryChooser(props)
{   
  
    
    var t="Category  ";
    

    return (<div>
             <div class="dropdown">
             {t}
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {props.category}
           </button>
           <div class="dropdown-menu" aria-labelledby="dropdownMenu2"> 

           <button onClick={ ()=>{props.setCategory("sports"); }}class="dropdown-item" type="button">sports</button>
           <button onClick={ ()=>{props.setCategory("business"); }}class="dropdown-item" type="button">business</button>
           <button onClick={ ()=>{props.setCategory("entertainment"); }}class="dropdown-item" type="button">entertainment</button>
           <button onClick={ ()=>{props.setCategory("general"); }}class="dropdown-item" type="button">general</button>
           <button onClick={ ()=>{props.setCategory("health"); }}class="dropdown-item" type="button">health</button>
           <button onClick={ ()=>{props.setCategory("science"); }}class="dropdown-item" type="button">science</button>
           <button onClick={ ()=>{props.setCategory("technology"); }}class="dropdown-item" type="button">technology</button>
            <button onClick={ ()=>{props.setCategory("All Categories");  
                                  }
                            }
            class="dropdown-item" type="button">All Categories</button>
        
           </div>
           </div>
           </div>) 
    
    
};

export default CategoryChooser;