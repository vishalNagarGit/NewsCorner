import React,{useState, useEffect} from 'react';
import Navbar from './Navbar';
import Card from './Card';
function App()
{   

      var [article,setArticles]=useState([]);
      var [country,setCountry]=useState("in");
      var [category,setCategory]=useState("All Categories");
      var [isLoaded,setLoaded]=useState(false);
      var [loginStatus,setLoginStatus]=useState(false);
      var [objectId,setObjectId]=useState("");
      var [showSaved,setShowSaved]=useState(false);

    useEffect(()=>{
          setLoaded(false);
          fectchItems();
    },[]);
    
    
  const fetchSavedItems=async ()=>{
       const url='/saved/'+objectId; 
      const data=await fetch(url)
      .then(res=>res.json())
      .then(json=>{
             
             if(json.status!='ok')
             alert(json.status);
             else{
             setArticles(json.articles);
             //console.log(json);
             setLoaded(true);
             }
      });
  }  
    
   const fectchItems=async () =>{
       setLoaded(false);  
      //var url = 'https://newsapi.org/v2/top-headlines?' +'country='+country+'&'+

      //'apiKey='+process.env.REACT_APP_API_KEY ;

      var temp='country='+country;
           
        if(category!=="All Categories")
        {    
               temp+='&category='+category;
              //url+='&category='+category;
        }    
        
           await fetch('/articles/'+temp)
            .then(response => response.json())
            .then(json =>{
                  setArticles(json.articles);
                  //console.log(json);
                  setLoaded(true);
                   });


        

      //    const data=await fetch(url)
      //    .then(res=>res.json())
      //    .then(json=>{
                
      //           setArticles(json.articles);
      //           console.log(json);
      //           setLoaded(true);
      //    });
      //    const items=await data.json();
         
      //    setArticles(items.articles);
         
       
   }
  
    if(isLoaded){
    return <div>
                <Navbar 
                  setArticles={fectchItems}
                  setCountry={setCountry}
                  setCategory={setCategory}
                  category={category}
                  setLoginStatus={setLoginStatus}
                  setObjectId={setObjectId}
                  showSaved={showSaved}
                  setShowSaved={setShowSaved}
                  fetchSavedItems={fetchSavedItems}
                />
                

                <div className="row justify-content-cente cardBox">
                
                {article.map((item,ind)=>(
                    
                  <Card 
                        key={ind}
                        imgUrl={item.urlToImage}
                        title={item.title}
                        full={item.url}
                        loginStatus={loginStatus}
                        objectId={objectId}
                        showSaved={showSaved}
                        fetchSavedItems={fetchSavedItems}
                  />
                
                ))}
                
                </div>
                
           </div> 
    }
    else {

     return <div>
                  <Navbar 
                  setArticles={fectchItems}
                  setCountry={setCountry}
                  setCategory={setCategory}
                  category={category}
                  setLoginStatus={setLoginStatus}
                  setObjectId={setObjectId}
                  showSaved={showSaved}
                  setShowSaved={setShowSaved}
                  fetchSavedItems={fetchSavedItems}
                  />
                  
                  <h1>loading</h1>
                  
            </div> 
    }
    
};

export default App;