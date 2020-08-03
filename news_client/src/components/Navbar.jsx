import React from 'react';
import $ from 'jquery';
import CountryDD from './CountryDD';
import User from './User';
import CategoryChooser from './CategoryChooser';
import PublicIcon from '@material-ui/icons/Public';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useState,useEffect } from 'react';
import Cookies from 'js-cookie';

function Navbar(props)
{          
  useEffect(()=>{
    fetchUser();
},[]);
          
  
           var [formStatus,changeStatus]=useState("login");
           var [userStatus,setUserStatus]=useState({
             username:"",
             objectId:""
           });
           
            
           function fetchUser()
                    { 
                      
                      
                      if(Cookies.get('NewsCookie')!=null)
                      { 
                        var userObj=JSON.parse(Cookies.get('NewsCookie'));
                         
                        // console.log(userObj);
                        setUserStatus({
                          username:userObj.username,
                          objectId:userObj.objectId
                        });
                         
                         props.setObjectId(userObj.objectId);
                         props.setLoginStatus(true);
                        
                      }
                        
                      else{
                       
                        
                        setUserStatus({
                          username:"",
                          objectId:""
                        })
                          
                        props.setLoginStatus(false); 
                       
                      }
                       
                     
                      
                    }



           const [formValues, setFormValues] = useState({
             username:"",
            email: "",
            password: ""
          });



          
           function formSubmit(event)
           {
            //  console.log(formValues);
             
             if(formStatus=="register")
             {
                  fetch('/user/'+formStatus+'/'+formValues.username+'/'+formValues.email+'/'+formValues.password)
                  .then(res=>res.json())
                  .then(json=>{
                                // console.log(json);
                                setFormValues({ username:"",
                                      email: "",
                                      password: ""
                                    });

                                if(json.status=="ok")
                                { 
                                  alert("you are successfully registered \n login to enter!!");
                                  changeStatus("login");
                                }
                                
                                else{
                                    alert(json.status);
                                }

                              });
                }
                
                else {
                      
                      fetch('/user/'+formStatus+'/'+formValues.email+'/'+formValues.password)
                      .then(res=>res.json())
                      .then(json=>{
                                    // console.log(json);
                                    setFormValues({ username:"",
                                          email: "",
                                          password: ""
                                        });

                                    if(json.status=="ok")
                                    { 

                                      Cookies.set('NewsCookie',{username:json.username,objectId:json.objectId},{ expires: 7 });
                                      $('#cross').click();
                                      $('.modal-backdrop').remove();
                                      
                                     
                                      fetchUser();

                                    }
                                    
                                    else{
                                        alert("wrong email or password")
                                    }

                                  });
                     
                }

             event.preventDefault();
           }


          

          function handleChange(event) {
            const { name, value } = event.target;
        
            setFormValues(preValues => {
              return {
                ...preValues,
                [name]: value
              };
            });
          }


    return (
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <a className="navbar-brand" href="#">
            <span><PublicIcon /></span> NewsCorner
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">

              {
                (props.showSaved)?
                <ul   
                      onClick={ ()=>{
                                    props.setShowSaved(false) ; 
                                    props.setArticles();
                                  }
                            }
                      className="navbar-nav ml-auto">
                      <li className="nav-item active">
                          <KeyboardBackspaceIcon />
                      </li>
                 </ul>
                
                
                :
               
              <ul className="navbar-nav ml-auto">
              {/* ////countrychooser////////////////////////////////// */}
                
                <li className="nav-item active">
                    <CountryDD     
                    setCountry={props.setCountry}
                    />
                </li>
               

               {/* //////////categorychooser//////////////////////// */}
                <li className="nav-item active">
                    <CategoryChooser     
                    setCategory={props.setCategory}
                    category={props.category}
                    />
                </li>
               

               {/* //////////////search button//////////////////////// */}
                <li className="nav-item">
                  <button type="button" onClick={()=>{ props.setArticles();}} className="btn btn-primary">Search</button>
                </li>
                

              
                 {/* ///////////////////////////user profile////////////////// */}

                 { (userStatus.username!="")?

                 (<li className="nav-item active">
                    <User     
                    username={userStatus.username}
                    fetchUser={fetchUser}
                    setShowSaved={props.setShowSaved}
                    fetchSavedItems={props.fetchSavedItems}
                    />
                </li>) 
                
                
                
                : 



                (<li className="nav-item">
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                   login/register
                  </button>

                
                  <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div >
                          <button id="cross" type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span  aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                            

                     
                            <form onSubmit={formSubmit} class="form-signin">
                              <PublicIcon />
                              <h1 class="h3 mb-3 font-weight-normal">Please {formStatus}</h1>

                              { (formStatus=="register")?
                              <div>
                              <label for="inputUserName" class="sr-only">Username</label>
                              <input 
                                    type="text" 
                                    name="username" 
                                    value={formValues.username} 
                                    class="form-control" 
                                    onChange={handleChange}
                                    placeholder="username"
                                    required
                                    autofocus=""/>  
                                 </div>
                                  :"" 
                              }                              

                              <label for="inputEmail" class="sr-only">Email address</label>
                              <input 
                                    type="email" 
                                    name="email" 
                                    value={formValues.email} 
                                    class="form-control" 
                                    onChange={handleChange}
                                    placeholder="Email address"
                                    required
                                    autofocus=""/>
                             
                              <label for="inputPassword" class="sr-only">Password</label>
                              <input 
                                    type="password" 
                                    name="password" 
                                    onChange={handleChange}
                                    value={formValues.password} 
                                    class="form-control" 
                                    placeholder="Password" 
                                    required />
                              
                             
                             
                              <button class="btn btn-lg btn-primary btn-block" type="submit">{formStatus}</button>
                                <a className="formStatus" onClick={()=>{
                                                   (formStatus=="login")?changeStatus("register"):changeStatus("login");
                                                 }
                                           }>{(formStatus=="login")?"register":"login"}</a>
                              <p class="mt-5 mb-3 text-muted">© 2017-2020</p>
                            </form>
                          
                    



                        </div>
                        
                      </div>
                    </div>
                  </div>
                             
                </li>)

                 }
                {/* //////////////////////////login ends///////////////////// */}






              </ul>
              }
            </div>
          </nav>) ;
         
};

export default Navbar;