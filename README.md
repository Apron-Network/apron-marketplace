# The marketplace frontend for Apron Network

## Prerequisites
Please install `Polkadot JS Extension` before you start. You can get it from here https://polkadot.js.org/extension/

### Get Code
Please get the code from `https://github.com/Apron-Network/apron-marketplace`

```
git clone https://github.com/Apron-Network/apron-marketplace.git
```

### Config
Please find the correct address for `services_market`a nd `services_statistics`, and update the correct address in `public/configAddress.js`.
```
window.mainAddress = {
    market: "<services market address>",
    statistics: "<services statistics address>",
    basepath: "<NODE RPC>"
};
```

`<services market address>` and `<services market address>` is the contract's address after the contracts are deployed.
`<NODE RPC>` is the websocket RPC provided by  Node. If you run it locally, it should be `ws://127.0.0.1:9944` by default.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
