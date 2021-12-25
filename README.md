Frontend hosted on - https://url-shortner-react-frontend.netlify.app/

This is a small project in which users can add their urls and is response get a short url which acts the same.

The advantage is that you can share the short url in place of the original url which will help you to track the number of clicks on url (this feature is live), ip address, regional analysis (under development). You need to use the password for getting the tracking details.
Once enterd the password you can check the changes by using the shortUrl in a new tab and the clicking refresh button on the tracking page.

Tech Stack used:

Frontend-
As the focus of this project was on backend and database management the frontend was quite minimal. I used ReactJS and TalwindCSS. For hosting I used Netlify.

Backend-
For backend I used NodeJS, ExpressJS and MongoDB. I hosted the Node server on Heroku and database on MongoDB Atlas.
Coming to database it has mainly two collections, one which stores the original urls, pasasword and shorturl and second on completely for analytical data.

