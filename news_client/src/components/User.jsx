import React,{useState} from 'react';
import Cookies from 'js-cookie';
function User(props)
{   
   

    return (<div>
             <div class="dropdown">
             
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {props.username}
           </button>
           <div class="dropdown-menu" aria-labelledby="dropdownMenu2"> 
           <button 
                    onClick={ ()=>{
                                    props.setShowSaved(true) ; 
                                    props.fetchSavedItems();
                                  }
                            }
            class="dropdown-item" type="button">Saved Articles</button>
            <button 
                     onClick={ ()=>{
                                     Cookies.remove('NewsCookie') ; props.fetchUser();
                                   }
                             }
            class="dropdown-item" type="button">logout</button>
        
           </div>
           </div>
           </div>) 
    
    
};

export default User;