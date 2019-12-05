# React and Rails

The most active development of the project is currently being done using React to handle the view layer, and Ruby on Rails to manage the datatbase and provide an admin layer.

The Rails/React stack uses Docker to build and deploy the application. To build the app you can run the `./build` script from the `v2_deploy` directory which will run the necessary Docker commands to build the stack.

After you have built the app you can use `docker-compose up` to run the app, and `docker-compose stop` to halt the process.

The main page is located on `localhost:3000`, and the admin tool can be found on `localhost:5455/api`.
