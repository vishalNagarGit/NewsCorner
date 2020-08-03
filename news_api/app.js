const express=require('express');
const bodyParser=require('body-parser');
const mongoose =require('mongoose');
const fetch = require('node-fetch');
var cors = require('cors');
const path=require('path');
const app=express();
app.use(cors());
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect("mongodb://localhost:27017/NewsCornerDB",{ useNewUrlParser: true });

/////////schamas////////////
const articleSchema=new mongoose.Schema({
  urlToImage:String,
  title:String,
  url:String
});


const userSchema=new mongoose.Schema({
  username:String,
  email:String,
  password:String,
  savedArticles:[articleSchema]
});


const User=mongoose.model('user',userSchema);
const Article=mongoose.model('article',articleSchema);


app.get('/articles/:temp',(req,res)=>{
                              
                    var url = 'https://newsapi.org/v2/top-headlines?'+req.params.temp+'&'+'apiKey='+process.env.API_KEY;
                   // console.log(url);
                    fetch(url)
                    .then(res=>res.json())
                    .then(json=>{
                            res.send(json);
                    });


});


app.get('/user/register/:username/:email/:password', (req, res) => {
                                
                                
                                const inputEmail=req.params.email;
                                const inputPassword=req.params.password;
                                const inputUsername=req.params.username;
                                User.find({email:inputEmail},(err,list)=>{
                                                        
                                                      if(err){
                                                                res.send({
                                                                            status:"error"
                                                                         });
                                                             }

                                                      else if(list.length==0)
                                                              {
                                                                  const newUser=new User({
                                                                    username:inputUsername, 
                                                                    email:inputEmail,
                                                                    password:inputPassword,
                                                                    savedArticles:[]
                                                                  });
                                                                  newUser.save((err,obj)=>{
                                                                    //console.log(obj);
                                                                    res.send({
                                                                               status:"ok"
                                                                             });
                                                                  });
                                                                  
                                                                    

                                                              }

                                                        else 
                                                              {
                                                                res.send({
                                                                  status:"duplicate id",
                                                      
                                                                });
                                                              }      
                                    
                                });
                                
                              
                              });





app.get('/user/login/:email/:password', (req, res) => {
                               
                                
                                const inputEmail=req.params.email;
                                const inputPassword=req.params.password;
                                
                   User.findOne({email:inputEmail},(err,list)=>{

                                                     
                                                     if(err){
                                                                res.send({
                                                                            status:"error"
                                                                         });
                                                             }

                                                      else if(list!=null)
                                                              {
                                                                    if(inputPassword==list.password) 
                                                                    res.send({
                                                                               status:"ok",
                                                                               objectId:list._id,
                                                                               username:list.username
                                                                             });
                                                                     else
                                                                          res.send({
                                                                            status:"No result found",
                                                                
                                                                          });
                                                                
                                                              }

                                                        else 
                                                              {
                                                                res.send({
                                                                  status:"No result found",
                                                      
                                                                });
                                                              }      
                                    
                                });
                                
                              
                              });                              



app.post('/save',(req,res)=>{
                                          const {title,imageUrl,full,objectId}=req.body;    
                                          
                                          //res.send({status:"ho gaya"}); 


                                          User.findOne({_id:objectId},(err,list)=>{

                                           
                                            
                                            if(err){
                                                       res.send({
                                                                   status:"could not save"
                                                                });
                                                    }

                                             else if(list!=null)
                                                     {    

                                                        
                                                          const item=new Article({
                                                              urlToImage:imageUrl,
                                                              title:title,
                                                              url:full
                                                          });

                                                          if(list.savedArticles.some(article => article.title === title)){
                                                                    res.send({
                                                                      status:"already saved"
                                                                    })
                                                          } else{
                                                        
                                                                  list.savedArticles.push(item);
                                                                    list.save((err,obj)=>{
                                                                    
                                                                            if(err)
                                                                                    res.send({
                                                                                              status:"error"
                                                                                            });
                                                                            
                                                                            else  
                                                                                    res.send({
                                                                                      status:"saved"
                                                                                    });       
                                                                      });
                                                        }  
                                                       
                                                     }

                                               else 
                                                     {
                                                       res.send({
                                                         status:"error!!!!",
                                             
                                                       });
                                                     }      
                           
                       });
});


app.delete('/delete',(req,res)=>{
                            const {title,imageUrl,full,objectId}=req.body;    
                            
                            //res.send({status:"ho gaya"}); 


                            User.findOne({_id:objectId},(err,list)=>{

                            
                              
                              if(err){
                                        res.send({
                                                    status:"could not delete"
                                                  });
                                      }

                              else if(list!=null)
                                      {    

                                          
                                            const item=new Article({
                                                urlToImage:imageUrl,
                                                title:title,
                                                url:full
                                            });

                                            if(list.savedArticles.some(article => article.title === title)){
                                                          
                                              for( var i = 0; i < list.savedArticles.length; i++)
                                              { if ( list.savedArticles[i].url === full) { list.savedArticles.splice(i, 1); }}

                                                       list.save((err,obj)=>{
                                                                    
                                                                  if(err)
                                                                          res.send({
                                                                                    status:"error"
                                                                                  });
                                                                  
                                                                  else  
                                                                          res.send({
                                                                            status:"deleted"
                                                                          });       
                                                        });
                                                     
                                               } else{
                                                      
                                                res.send({
                                                  status:"error"
                                                })
                                                    
                                          }  
                                        
                                      }

                                else 
                                      {
                                        res.send({
                                          status:"error!!!!",
                              
                                        });
                                      }      

                          });
});




app.get('/saved/:objectId',(req,res)=>{
                                     
                                     //console.log(req.params);

                                     User.findOne({_id:req.params.objectId},(err,list)=>{

                                                     
                                            if(err){
                                                      res.send({
                                                                  status:"error"

                                                                });
                                                    }

                                            else 
                                                    {
                                                            
                                                          res.send({
                                                                      status:"ok",
                                                                       articles:list.savedArticles
                                                                    });
                                                      
                                                      
                                                    }

                                              });
  
});



app.listen(process.env.PORT||3001,(req,res)=>{
  console.log("server is up and running!");
});