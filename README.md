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
* `utils/` - Functions to call our backend API, AWS services, and any other miscellaneous functions

* `actions/` - Action creators for redux
* `reducers/` - Reducers (action listeners) for redux

### Linting

Linters are put into place to exercise good and consistent coding style, regardless of developer. Editing lint rules can be done by changing the `.eslintrc.js` file.

To automatically check and fix all lint problems, run:
```
npm run lint
```
You may need to install eslint first `npm i -g eslint`

## Deployment

Our web application can be deployed through a simple build-and-deploy process:

### Build
The web application is automatically built and deployed by Travis CI on every merge to `master` branch.

Configurations for the process can be found in the `.travis.yml` file


## Other vailable Scripts

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
It bundles React in production mode and optimizes the build for the best performance.

For our app, use `npm run generate` and `npm run generate:prod` instead. See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```
npm run test
```
Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```
npm run generate
```
Simply builds the application into the `build` folder.

```
npm run generate:prod
```
Builds the application into the `build` folder, but for production use.


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

* [React](https://reactjs.org/) - Javascript (JS) library
* [AWS Amplify](https://aws-amplify.github.io/amplify-js/api/) - JS library for building Cloud-enabled Applications
* [Material UI](https://material-ui.com/) - React UI Framework
* [Redux](https://redux.js.org/) - State Container for React/JS Apps
* [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup)- React Form Library and Schema Validation
