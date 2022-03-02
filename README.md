# Null Pointer Exceptions

## Authentication Service (:8080)

Versions
* 1.1.0 (2022-02-28)

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
`DB_URL=jdbc:postgresql://localhost:5432 DB_USERNAME=postgres DB_PASSWORD=password java -jar user-service-1.0.0.jar`

## Facility Service (:8081)

Versions
* 1.0.0 (2022-03-01)

Dependencies
* PostgreSQL Docker: `postgres:alpine`
* Java Compiler: `javac 17.0.X`
* Spring Boot: `2.6.3`
* Lombok: `1.18.22`

Endpoints
* `GET: /{facilityId}` - get a `List<Reservable>` that may be reserved at a given facility
* `GET: /{facilityId}/{reservableId}?date=YYYY-MM-DD` - get a `Map<LocalTime, Boolean>` such that each `LocalTime` key is an hour-block and its `Boolean` value indicates whether or not there is at least one `Reservable` available
* `POST: /{facilityId}/{reservableId}` - attempt to add a reservation
* `GET: /reservations/{appUserId}` - gets future reservations associated with a given user
* `DELETE: /reservations/{appUserId}/{reservation}` - deletes a specific reservation associated with a specific user

Starting a Development Enviroment
1. Run an instance of the docker db container provided in `Authentication Service`
1. Go to `/service` and make sure you can see the `facility-service-1.0.0.jar` file
1. Run the application:
`DB_URL=jdbc:postgresql://localhost:5432 DB_USERNAME=postgres DB_PASSWORD=password java -jar facility-service-1.0.0.jar`
