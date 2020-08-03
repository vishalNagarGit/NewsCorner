About:     
-----         
              1.This project is about a news web app which shows you news headlines of various news categories.
              
              2.This web app gives you facility to se full article by clicking a button. 
                If you find it important to store the article for future reading then you can store 
                the article in your account.
                
              3.You can create an account and by default you keep logged in for seven days.
                 After logging in you can se your saved articles.
                 
              4.If saved article is no more relevent then you can delete it by pressing delete button.
              

Directory info:
---------------

               1.news_client is react development folder which is connected to news_api using proxy(running on localhost port 3000)
               
               2.news_api is node.js based server folder which can handle server side queries in both development and production phase (running on localhost port 3001)

for running complete project
-------------------------------------------

1.Download project 

2.Change directory to news-api and download all dependencies using npm install

3.Get api key form news api. Create a file .env in root directory (news_api) and put API_KEY=<your api key> inside it. 
  
4.The application use mongoDB for database. So install mongoDB and run before funning application using command mongod.(now your database server will be running on port 27017)  

5.Now run server code using node app.js
  

For running react in development phase
--------------------------------------------
1.change directory to news_client and download all dependencies

2.run development server using npm start

3.run api server (news_client) and database server before running development server

4.To to run whole application form api server, build the react project using -npm run build command and replace all files in news_api/public folder with files in 
        news_client/build folder. Now it is a complete project same as news_api was given initially.  
