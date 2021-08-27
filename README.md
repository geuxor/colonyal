# Colonyal - 

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

> Front and Backend files for Colonyal WebApp. ([colonyal](https://github.com/geuxor/colonyal)  )

[![GitHub license](https://img.shields.io/github/license/geuxor/colonyal)](https://github.com/geuxor/colonyal/blob/develop/LICENSE)[![GitHub release](https://img.shields.io/github/release/geuxor/colonyal)](https://github.com/geuxor/colonyal/releases/tag/0.9.0)[![GitHub contributors](https://img.shields.io/github/contributors/geuxor/colonyal)](https://github.com/geuxor/colonyal/graphs/contributors)[![GitHub issues](https://img.shields.io/github/issues/geuxor/colonyal)](https://GitHub.com/geuxor/colonyal/issues)

<span align="center">![ForTheBadge built-with-love](https://forthebadge.com/images/badges/built-with-love.svg)</span>

<p align="center">
 <img src="./readmeFiles/logo-small.png" alt="colonyal logo" style="zoom:40%;" >
</p>

colonyal is an app that encourages you to explore the world by enjoying the life of a local!
It started with an idea of a scratch map and evolved into a good looking, smooth running and fun Web App.
colonyal is made with React and Express and with the help of Postgres and Redis.

<p align="center">
 <img src="./readmeFiles/back500.png" style="zoom:20%;" >
</p>

Once you're logged in (0Auth is coming next...), start searching by location and dates - you will discover many type of local experiences listed while visible in a map! You can select a map pin for more information and see the description of each experience. You can book by date and amount of people using Stripe Connect and see a list of bookings and (coming soon... start chatting with the provider). 

It's very easy to register as a provider, and you can start creating experiences in no-time. As a provider you decide the price, location and images.Travellers will soon be booking your experience and you can start sharing your daily activities, stories, common interests and favorite spots with the visitor. 

If you don't know where to go next, try the discovery button that will give you a variety of suggestions (comming next... )

<p align="center">
 <img src="./readmeFiles/screenshot2.png" >
</p>

## Teaser:

Checkout a video demo of the app on [YouTube](https://www.youtube.com/watch?v=):

[![Watch the video](https://img.youtube.com/vi//hqdefault.jpg)](https://youtu.be/)

## Table of contents

[Colonyal](https://github.com/geuxor/colonyal)  
[Tech Stack](#tech-stack)  
[Running colonyal](#running-colonyal)  
[Architecture](#architecture)
[Observations](#observations)  
[Developers Team](#developers-team)  
[Contributors](#contributors-✨)


## Tech Stack

### Backend

![https://www.npmjs.com/package/bcrypt](https://img.shields.io/badge/bcrypt--v1--white?style=for-the-badge&logo=npm)
![https://redis.io](https://img.shields.io/badge/redis--v1--white?style=for-the-badge&logo=redis)
![https://expressjs.com](https://img.shields.io/badge/express--v1--white?style=for-the-badge&logo=express)
![https://www.postgresql.org](https://img.shields.io/badge/postgresQL--v1--white?style=for-the-badge&logo=postgresQL)
![https://sequelize.org](https://img.shields.io/badge/sequelize--v1--white?style=for-the-badge&logo=sequelize)
![https://www.stripe.com](https://img.shields.io/badge/stripe%20Connect--v1--white?style=for-the-badge&logo=stripe)

### Frontend

![https://www.cloudinary.com](https://img.shields.io/badge/cloudinary--v1--white?style=for-the-badge&logo=cloudinary)
![https://www.stripe.com](https://img.shields.io/badge/stripe%20Connect--v1--white?style=for-the-badge&logo=stripe)
![https://www.reactjs.org](https://img.shields.io/badge/react--v1--white?style=for-the-badge&logo=react)
![https://github.com/axios/axios](https://img.shields.io/badge/axios--v1--white?style=for-the-badge&logo=npm)
![https://redux.js.org/](https://img.shields.io/badge/redux--v1--white?style=for-the-badge&logo=redux)

### CI / CD

- [Github Features](https://github.com/features/actions)
- [Trello](https://trello.com)

### Hosting

- [Netlify](https://netlify.com) for Frontend and Backend

### Authentication

- Session Cookies with bcrypt

### APIs

- [Stripe Connect](https://stripe.com)

## Running colonyal

- Fork & clone this repo  
- Run `npm i` in colonyal directory  
- Adjust the necessary env variables to match your system. There's a .env.copy file to help you with this process. (You will need an API key for Stripe)  
- Run `npm start`

- Make sure you have postgreSQL installed on your machine [mac](https://www.postgresql.org/download/macosx/) || [windows](https://www.postgresql.org/download/windows/)  
- Run `npm i` in colonyal/server directory  
- Adjust the necessary env variables to match your system. There's a .env.copy file to help you with this process.
- Edit the ./config/config.json file with your database details.
- With the database running, run `npm run recreateDb`. This will generate the tables in the database and seed the data to get the project started.
- Run `nodemon` in colonyal/server directory

## Architecture
(coming soon...)

## Observations

##### Upcoming Pull Requests

- Deploy colonyal to the web
- Create PWA 

## Developers Team

😋  German - [Github](https://github.com/geuxor) - [LinkedIn](https://www.linkedin.com/in/german-b)\

## Contributors ✨

Thanks goes to these wonderful people ([💝 ](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
  <td align="center"><a href="http://www.linkedin.com/in/german-b">
   <img src="https://avatars.githubusercontent.com/u/16254346?v=4" width="100px;" alt=""/><br /><sub><b>German</b></sub></a><br />
   <a href="#infra-gexuor" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> 
   <a href="https://github.com/geuxor/colonyal/commits?author=geuxor" title="Code">💻</a></td>
 </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
