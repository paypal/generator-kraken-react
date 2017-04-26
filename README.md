# generator-kraken-react

Yeoman generator for creating web apps powered by kraken & react.  
Gets you running with production ready web app in seconds.

## Packed With

  - gulp
  - heroku
  - jest
  - kraken
  - material-ui
  - react
  - react-engine
  - react-router
  - redux
  - webpack

## Installation

generator-kraken-react requires [Node.js](https://nodejs.org/) v4+ & [npm](https://www.npmjs.com/) v4+ to run.
Install yeoman & generator-kraken-react by running
```sh
$ npm install -g yo generator-kraken-react
```
> if the above command fails, try running it with  `sudo`

## Usage

To create a production ready web app
```sh
$ yo kraken-react
```
`cd` to the newly created project directory & run `npm run dev` to start development.

**Heroku Deployment**
This requires [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli) to be installed on your system.
`cd` to the newly created project directory & run `heroku create && heroku config:set NPM_CONFIG_PRODUCTION=false && git push heroku <your_branch>:master` to deploy on heroku.
You will need a heroku account to deploy, if you don't have go ahead to [heroku](https://dashboard.heroku.com/) and get a free acount.

## Bootstraped App

[Taskify](https://cryptic-garden-11565.herokuapp.com/), is the bootstraped app that you get as a starter code when you use this generator.

## Walkthrough of Bootstraped App

**App Structure**

```
├── Procfile
├── README.md
├── config
├── gulpfile.js
├── index.js
├── locales
├── package.json
├── public
│   ├── actions
│   │   ├── tasks.js
│   │   └── types.js
│   ├── components
│   │   ├── AddTask.js
│   │   ├── Header.js
│   │   ├── Layout.js
│   │   ├── Task.js
│   │   ├── TasksList.js
│   │   └── Todo.js
│   ├── main.js
│   ├── reducers
│   │   ├── index.js
│   │   └── tasks.js
│   ├── routes
│   │   └── index.js
│   └── store
│       └── index.js
├── src
│   ├── controllers
│   │   ├── index.js
│   │   └── tasks.js
│   └── models
│       └── task.js
├── test
└── webpack.config.js
```
**Basic Usage**

- **src**
It contains all the server side code. Routes & route handlers are defined in controllers. The path at which a route is mounted is decided by the directory structure as follows.
`src/controllers` dir is recursively scanned to find files that match the **controller-spec API**. With this API, the directory structure dictates the paths at which handlers will be mounted.
For example:
    ```text
    controllers
     |-user
         |-create.js
         |-list.js
    ```
    ```javascript
    // create.js
    //This is the controller-spec API
    //A module exporting a function accepting router as it's argument
    
    module.exports = function (router) {
        router.post('/', function (req, res) {
            res.send('ok');
        });
    };
    ```
    Routes are now:
    ```test
    /user/create
    /user/list
    ```
- **public**
It contains all the front-end code written. The **public/store/index.js**  contains redux store of the application. You don't have to explicitly connect the store to the application using `react-redux` It's automatically done for you.
    - **public/actions/**  contains the action generators
    - **public/components/** contains the react components
    - **public/reducers/** contains the reducers
    - **public/routes/** contains the `react-router` routes
    - **public/main.js** contains the bootstraping code to connect & initialize various components of the application. You will rarely need to change or revisit this file
