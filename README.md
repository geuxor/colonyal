# Colonyal -


**Front and Backend files for Colonyal WebApp. ([colonyal](https://github.com/geuxor/colonyal))**
<br/>
<br/>
[![Contributors](https://img.shields.io/badge/all_contributors-1-blue.svg?style=flat-square)](#contributors)
[![GitHub license](https://img.shields.io/github/license/geuxor/colonyal)](https://github.com/geuxor/colonyal/blob/develop/LICENSE)
[![GitHub release](https://img.shields.io/github/release/geuxor/colonyal)](https://github.com/geuxor/colonyal/releases/tag/0.9.0)
[![GitHub issues](https://img.shields.io/github/issues/geuxor/colonyal)](https://GitHub.com/geuxor/colonyal/issues)

<p align="center">
 <img src="./readmeFiles/logo-small.png" alt="colonyal logo" style="zoom:40%;" >
</p>

## Table of contents

[Colonyal](#colonyal)  
[Tech Stack](#tech-stack)  
[Running colonyal](#running-colonyal)  
[Architecture](#architecture)
[Observations](#observations)  
[Developers Team](#developers-team)  
[Contributors](#contributors-✨)

## Colonyal

It’s very common for expats in a new country to seek other expats around them to share feelings, help each other and create friendships. This is however very difficult when there is no centralized place to create that connection.

Colonyal has arrived to make expats feel at home while transforming their experience in the new country by being part of a big family. As a Colonyal you can connect with similar minded individuals and be informed about the latest events, news, jobs but also where you can buy your favorite products from back home.
Colonyal allows any individual to sell these products - while automatically receiving payment in their bank account. 

Providers can also offer services and host events or experiences so that others can get to know the culture of the new country through the eyes of a co-patriot; 
The App is a P2P Community Marketplace connecting providers that wish to sell products and services with expats. It implements Stripe Connect to handle the distribution of payment while collecting a small fee for the platform. 

It allows a community of expats to be created through events, news, blogposts and also help individuals to find jobs, places to stay and much more. 
Experience a new world with Colonyal!

Once you're logged in you can browse through different products, make a purchase, browser events, and news articles - You will discover many type of local products offered by different providers, with the ability to pay for postage for delivery. 

It's very easy to register as a provider, and you can start creating new products in no-time. As a provider you decide the price, delivery method, etc. Buyers will soon be booking your product and you can start obtaining additional revenue in an automated manner.

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

## Developer, Designer and PM

😋  German - [Github](https://github.com/geuxor) - [LinkedIn](https://www.linkedin.com/in/german-b)\

## Contributors ✨

![ForTheBadge built-with-love](https://forthebadge.com/images/badges/built-with-love.svg) by ([💝 ](https://allcontributors.org/docs/en/emoji-key)):

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
