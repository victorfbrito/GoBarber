# GoBarber V2

	GoBarber is a NodeJS app to make online appointments for barbers and clients

---------------------------------------------------------------------------------------
## Node Installation & Dependencies

NodeJs: https://nodejs.org/en/download/ (follow your own operating system instructions)
	You can check your Node version by running in your cmd:
	 ```   
		node -v  

Yarn: https://classic.yarnpkg.com/en/docs/install (follow your own operating system instructions)
	You can check your yarn version by running in your cmd:
	 ```  
		yarn -v 

	```Inside app folder terminal
		
	yarn add express   
	yarn add nunjucks
	yarn add sequelize
	yarn add sequelize-cli -D
	yarn add bcryptjs
	yarn add multer
	yarn add session-file-store
	yarn add connect-flash
	yarn add moment

You'll need to create and run a database named gonodemodulo2 (see config/database.js), with 
-port redirect 5432:5432
-image kartoza/postgis
-dialect postgres
-username: docker
-password: docker

When correctly configured, run  
	npx sequelize db:migrate
inside gobarber path in terminal, so the migrations can correctly be pushed into your database
---------------------------------------------------------------------------------------
## Usage:

run 
``` node index.js ```

App must be running on http://localhost:3000/

---------------------------------------------------------------------------------------
## Optional:
	
As a Developer, you can automatize the app refreshing with Nodemon by installing nodemon: 
	```
		yarn add nodemon -D 

And then you'll start your app by running 

	yarn start   instead of    node index.js
