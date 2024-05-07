# Before running the examples

1. Execute "npm i"

2. First, make sure you have a cloud.mongodb.com account and can access 
   the “Atlas” section.

3. Add a new database user by selecting under the “Security” title, 
   “Database Access.”.  There is a “+ ADD NEW DATABASE USER” option on 
   that page. Make sure you copy the User Name and password as you will 
   need it for the connection string (uri) to connect from Node.js.

4. Update the file credentialsDontPost/.env in the DatabaseExamples folder 
   with the mongo connection string. This string can be found in MongoDB Atlas
   by selecting under "Deployment", "Database", "Connect" then under
   "Connect to your application", click where you see "Drivers", then
   complete the steps you see.  For Step 1. select Node.js and a Node.js
   version that matches yours. For Step 2. install the mongodb module 
   (the current examples have it listed in the package.json file, so you don't
   need to install it, just run npm i). In Step 3. under "Add your connection string 
   into your application" you will find the connection string you need. 
   Remember to replace &lt;password&gt; in the string with the password 
   associated with the username that you created. The following is an example 
   of how the string might look like assuming terps and ABCD as username and password,
   respectively.
   
   MONGO_CONNECTION_STRING = `mongodb+srv://terps:ABCD@cluster0.mmvm8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

5. To see databases, select “Database” under the “DEPLOYMENT” title 
   and then click on the “Browse Collections” buttons.

6. You can create a database by selecting the “+Create Database” button.  
   For the examples below, you don’t need to create a database as a 
   database called “CMSC335DB” and a collection called “moviesCollection” 
   will be created when you run the example node .\insertMovies.js.  
   ** Run this example, before you run any other example **

7. After running the examples, you can drop (remove) the CMSC335DB 
   database by selecting the trash bin icon you see when you hover 
   over CMSC335DB.

8. The following examples illustrate CRUD operations.  They are recipes 
   that you can use for your project(s). The examples are: insertMovies.js, 
   listDatabase.js, listAllMovies.js, lookUpMovies.js, updateMovie.js 
   deleteMovies.js, clearCollection.js

