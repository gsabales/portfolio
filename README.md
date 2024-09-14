# gsabales.me
This is my own portfolio website built in Angular, Bootstrap and a bunch of other plugins. Visit the live website at https://gsabales.me
## Plug-ins/Libraries
Special thanks to the ff:
* Layout and CSS properties: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* On-scroll animation: https://michalsnik.github.io/aos/ 
* CSS animation: Just plain-old keyframes lol :D 
* Modal: https://ng-bootstrap.github.io/#/components/modal/examples
* Email: https://www.smtpjs.com/ & https://elasticemail.com/ (This is temporary. Will create a backend service for this portfolio later on)
## Deployment
I built this Angular app by running the command <b>ng build --aot --prod --output-hashing=none</b> since the hash in compiled js files are not accepted in Firebase. Speaking of which, I use <b>Firebase</b> for web hosting and I bought the domain from <b>Namecheap</b> (hoping for sponsorship lol).
# How to Compile
1. Install Node version 12.11.0 ``nvm install 12.11.0`` ``nvm use 12.11.0``
2. Install dependencies ``npm i``
3. Install Angular CLI version 11.1.4 ``npm i @angular/cli``
4. Run ``ng serve`` in IntelliJ terminal then go to ``http://localhost:4200/``
#How to Deploy
Reference: https://medium.com/@saleemmalikraja/deploying-an-angular-app-to-firebase-hosting-18f99c9d5722
1. Install firebase tools v7 ``npm i -g firebase-tools@^7.0.0``
2. Run ``firebase login``
3. Run ``ng build --aot --prod --output-hashing=none``. Fix any build errors, successful build should generate ``dist`` folder
4. Run ``firebase init``
  - Database - Press enter each time
  - Hosting 
    - What do you want to use as your public directory? ``dist/portfolio``
    - Configure as a single-page app (rewrite all urls to /index.html)? Yes
    - File dist/portfolio/index.html already exists. Overwrite? No
5. Ensure ```"site": <app-id>``` is in firebase.json,
6. Run ``firebase deploy``
