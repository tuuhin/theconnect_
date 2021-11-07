# The-Connect

The connect is a simple react app with a python backend it's a very small version of a socail media app a user can create posts.

## Frontend

For frontend we are using react js. I have been learing react js for a while. I got this awesome project idea although i didn't able to fullfill my idea due to the lack of knowledge but i love this library and ready to make many more project using this.

Some packages thst i have used in this project

- material ui
- material icons
- js-cookie

## Backend

For the backend we are using a python.better to say we are using the flask api, a light weight web framework.we have created some routes and we will authenticate and perform querie suesing the endpoints.The following list shows the features

- Authentication (flask_jwt_extended)
- Database (sqlite)
- querying data(flask_sqlalchemy)

## Environment Variables

To run this project, you will need to add a .env file in the backend folder.Although its not required but too if you want this for production it's better to keep the secret keys really a secret.

`SECRET_KEY`

`JWT_SECRET_KEY`

Again if you want to use mysql as your backend then its adviced to keep the credentials in the .env file. Hopefully if it's required you can do it easily.

## Start the application

Clone the project

```bash
    git clone https://github.com/tuuhin/theconnect_.git
```

Go to the project directory

```bash
    cd theconnect
```

Install dependencies

- The requirements.txt file contains all the module,packages in my flask env these all may not be required for this project.Though it's adviced to install all the packages

```bash
    pip install -r requirements.txt
    npm install
```

Start the servers

```bash
    npm run api
    npm  start

```

## Conclusion

Finally i want to conclude that this project has tought me many valuable things and i would really try to make me better with some more projects
