# Null Pointer Exceptions

## Authentication Service

Versions
* 1.0.0 (2022-02-20)

Dependencies
* PostgreSQL Docker: `postgres:alpine`
* Java Compiler: `javac 17.0.X`
* Spring Boot: `2.6.3`
* Lombok: `1.18.22`
* JWT: `0.11.2`

Endpoints
* `POST: /login` - authenticate credentials and recieve jwt token
* `POST: /register` -  create a new user, with `USER` roles by default
* `POST: /refresh` - refresh your jwt token to avoid multiple logins
* `GET: /user` - admins can get a list of all users
* `GET: /user/roles` - admins can get a list of all user roles
* `GET: /user/{id}` - admins can view a specific user
* `PUT: /user/update` - admins can update a user
* `PUT: /password` - users and admins can change their password

Rules
* Only authenicated users with role `ADMIN` have access to any route prefixed 
with `/user`
* Admins can update themselves and other users without role `ADMIN`; admins 
cannot update other users with role `ADMIN`
* All users with any role can change their own password; a user, no matter their
roles, cannot change the password of another user

Starting a Development Environment
1. Get the initialized development database from Dockerhub and start a new
container:
`docker run --rm -d -p 5432:5432 --name gym-db-dev michaelarn0ld/gym-dev-db`
1. Go to `/service` and make sure you can see the `user-service-1.0.0.jar` file
1. Run the application:
`java -jar user-service-1.0.0.jar`
