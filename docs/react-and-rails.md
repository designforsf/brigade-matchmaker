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

## Versioning

We are using v6.0.0 of Rails, which requires at least v2.4 of Ruby (preferably something more recent).

You can install React and its dependencies with `npm install`. To take advantage of recent ESCMAScript syntax it is recommended you run at least version Node 10.16.0.
