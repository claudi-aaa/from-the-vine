# From the Vine
 A wine-tasting blogging web app

## Table of Contents
- [Overview](#overview)
- [Built With](#built-with)
- [Libraries Used](#libraries-used)
- [Features](#features)
- [Acknowledgements](#acknowledgements)

## Overview
For this project I focused on creating a functional web blog (with the theme of wine-tasting), and making mitigations for some of the top OWASP vulnerabilities (https://owasp.org/www-project-top-ten/) with minimal use of existing libaries.


### Live Preview
Live preview can be viewed at: (https://starfish-app-c6dh7.ondigitalocean.app/)

### Built With:
- Node.js (https://nodejs.org/en)
- Express.js (https://expressjs.com/)
- PostgreSQL (https://www.postgresql.org/)

### Libraries Used:
- Cookie Parser (https://www.npmjs.com/package/cookie-parser) - for easy cookie handling
- Validator (https://www.npmjs.com/package/validator) - for string sanitization and validation
- Bcryptjs (https://github.com/dcodeIO/bcrypt.js/blob/master/README.md) - for hashing, salting, and validating passwords
- Crypto (https://nodejs.org/api/crypto.html) - handling encrypted data


### Summary of Learning 
To make the web blog more secure, I incorporated multiple layers of security both on the client-side and server-side with minimal use of existing libraries as to better understand key vulnerabilities and how to make suitable actions to make common attacks more difficult. Key mitigations were focused on account enumeration, SQL injection, and XSS as well as managing user passwords via best practices with the use of suitable hashing and salting algorithms that strike a balance between usability and security. 

## Features 
- Authentication of users with multiple mitigations for account enumeration 
- Users can create and delete posts 
- Users can search through existing posts via search bar 
- Incorporating best practices such as sanitization and validation of user inputs/forms to prevent attacks such as XSS (reflected and static) 
- Consideration of challenges in protecting against CSRF and future work to include anti-CSRF tokens

## Acknowledgements
- This project was inspired by groupwork completed in CMP-6045B at UEA

