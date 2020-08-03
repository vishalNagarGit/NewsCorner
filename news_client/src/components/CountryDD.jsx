import React,{useState} from 'react';

function CountryDD(props)
{   
  
    var [country,changeCountry]=useState('india');
    var t="country  "
    

    return (<div>
             <div className="dropdown">
             {t}
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {country}
           </button>
           <div className="dropdown-menu" aria-labelledby="dropdownMenu2"> 
           <button onClick={ ()=>{changeCountry("india"); props.setCountry("in") ; 
                                  }
                            }
            className="dropdown-item" type="button">india</button>
            <button onClick={ ()=>{changeCountry("us"); props.setCountry("us") ;
                                  }
                            }
            className="dropdown-item" type="button">us</button>
        
           </div>
           </div>
           </div>) 
    
    
};

export default CountryDD;