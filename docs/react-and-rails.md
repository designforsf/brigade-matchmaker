# React and Rails

The most active development of the project is currently being done using React to handle the view layer, and Ruby on Rails to manage the datatbase and provide an admin layer.

The React site can be run in `components/react` with the `npm start` command on localhost:3000.

For the React site to load it needs to communicate with the Rails server. The first time you run Rails you should run the following from `components/admin`:

```
$ bundle
$ rails db:migrate
$ rails db:seed
$ rails server
```

After that first time you can just run `rails server`

Alternatively, you can use the docker setup:

First time:
``` console
$ cd v2_deploy
$ ./build
```
After the first time:
```
$ cd v2_deploy
$ docker-compose up
```

To visit the matchmaker, visit http://localhost:3000.
To visit the API, visit http://localhost:54555/api/

If prompted to log in (this will happen on any edit page, use the following
credentials:

**Email:** admin@codeforsanfrancisco.org
**Password:** 9th&Minna

## Versioning

We are using v6.0.0 of Rails, which requires at least v2.4 of Ruby (preferably something more recent).

You can install React and its dependencies with `npm install`. To take advantage of recent ESCMAScript syntax it is recommended you run at least version Node 10.16.0.

## Adding yourself as a user
To add a new user, you can use the Rails console.
**Non-docker setup:**
``` console
$ cd components/admin
$ rails console
```
**Docker setup:**
``` console
$ cd v2_deploy
$ ./console
```

Then, in the Rails console, add yourself:
``` ruby
User.create!(email: 'you@yourdomain.com', password: 'supersecret')
```

Now, you can log into the admin tool and make edits.
