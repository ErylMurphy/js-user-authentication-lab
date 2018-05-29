# User authentication with bcrypt lab

In this lab you'll use the `bcrypt` package to store user passwords and authenticate
users.

1.  Setup the database

    ```bash
    psql -f database/schema.sql
    ```

1)  Install dependencies

    ```bash
    npm install
    ```

1)  Run the development server

    ```bash
    npm start
    ```

1)  Open the site in your browser [`http://localhost:4567`](http://localhost:4567)
    and read the code to understand what's going on in `server.js`, `database/schema.sql`, `models/User.js` and `views/home/index.ejs`.

1)  Implement the `POST /register` route which should

    *   create a User in the database. Use `bcrypt.hash` to generate the `password_digest`, see ["Technique 2" in the docs](https://www.npmjs.com/package/bcrypt#async-recommended).
    *   set a `loggedIn` and `userId` property on the user's session.
    *   redirect the user to the `GET /your-account` page after the user
        has been created.

1)  Output the user's account balance in the `GET /your-account` route.

1)  Write a middleware function that only allows access to the `/your-account`
    if the user is logged in. The middleware should respond with a 403 if the
    user is not logged in and not continue the middleware chain. [Read more on middleware here](https://expressjs.com/en/guide/using-middleware.html)

1)  Implement the `POST /login` route. Use the [`bcrypt.compare`](https://www.npmjs.com/package/bcrypt#to-check-a-password) method to compare
    the user's submitted password and the password stored for them.
