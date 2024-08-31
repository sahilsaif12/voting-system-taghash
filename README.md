# Voting system 
### Live- https://voting-system-taghash.vercel.app/
## Tech Stack-
    Frontend- React js
    Backend - Node js, Express js
    Database- Mysql
    ORM- Prisma
    important packages used - tailwind , chart js, primereact
-------
![image](https://s6.ezgif.com/tmp/ezgif-6-1b6fabe6d7.gif)
## Set up the application
1. clone the repository-
   
   `
   git clone git@github.com:sahilsaif12/voting-system-taghash.git
   `
2.   ` cd client`
3. Install the dependancies and run the app
   
     `
       npm install
   `
   <br/>
   `
     npm run dev
   `
   
4. For backend-
   
   ` cd client`
    <br/>
    `npm install`
   <br/>
   `
     npm run dev
   `


## Overview

### Frontend :
• It mainly contain 2 screens - '/','/analytics' <br/>
• `Home` component handle the '/' route screen where information will be taken for vote<br/>
• `Analytics` component handle the analytics screen where voting summary will be visible in different charts with help of chart.js<br/>
      
It contains 3 different chart - `Line chart` , `Bar chart`, `Pie Chart`

### Backend :
• There are total 3 endpoint 

    
        1. POST /voters  ( to add new vote details) 
        2. GET /voters/getVoteDateWise (to get date wise vote count ) 
        3. GET /voters/voteCount ( to get overall vote count)
    
• All logic of these endpoints are written in `voter.controller.js` file and routing is handled in `voter.router.js` file <br/>
• To generate query Prisma ORM is been used
      
