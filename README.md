# bt-web
Biztech's web application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project to a live system.

### Installation and Running

1. Clone the repo:

    ```
    $ git clone https://github.com/ubc-biztech/bt-web
    ```

2. Install the packages:

    ```
    $ npm install
    ```

3. Your setup is ready for development! Run `npm start` to run your app on your local machine.


## Development

### Files and Services

* `components/` - Our main view/display components
* `pages/` - Our main pages, where most of our app logic is handled

* `assets/` - Images, fonts, vectors, and other static files
* `constants/` - Abstracted constants
* `utils/` - Any other miscellaneous functions

* `actions/` - Action creators for redux
* `reducers/` - Reducers (action listeners) for redux

### Linting

Linters are put into place to exercise good and consistent coding style, regardless of developer. Editing lint rules can be done by changing the `.eslintrc.js` file.


## Deployment

Our web application can be deployed through a simple build-and-deploy process:

### Build
The web application can be built using either of the commands:
```
npm run generate
```
or for production environment:
```
npm run generate:prod
```

## Available Scripts

In the project directory, you can run:

```
npm start
```
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits, and will log out any errors in the console.

```
npm run build
```
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```
npm run generate
```
Builds the app into the `build` folder for stage environment.

```
npm run generate:prod
```
Deploys the app from the `build` folder for production use.

```
npm run deploy
```
Deploys the app from the `build` folder to aws s3 for website hosting.

```
npm run test
```
Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```
npm run lint
```
Runs linter and automatically fixes all lint problems.
You may need to install eslint first `npm i -g eslint`


## Contributing
Contributions are accepted from members of the biztech team. General instructions to start contributing are as follows:

1. Clone the remote repo into a local environment
2. Setup the repo (instructions [here](#getting-started))
3. Make the appropriate edits and additions in your own new branch (use a unique branch name!)
4. Write or make changes to any tests, if required
5. Submit pull requests with a detailed description of the modifications
--> Pull requests will be accepted after being reviewed and after the appropriate tests are conducted
6. Merging to master will deploy the API to **staging** environment
7. Only deploy to our **production** environment after fully testing on staging

### Built With

* [React](https://reactjs.org/) - Javascript library
