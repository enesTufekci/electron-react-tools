## WARNING

>This is an experimental version, it depends [react-scripts](https://github.com/facebook/create-react-app/tree/next/packages/react-scripts) and [react-dev-utils](https://github.com/facebook/create-react-app/tree/next/packages/react-dev-utils) for now, there might be dramatic updates or rewrite in future.

### Electron React Tools

This kit aims to provide easy to use tools for [React](https://reactjs.org/) developers to work with [Electron](https://electronjs.org).

#### Usage

You can either install globally or locally.

##### Global Usage

Run __```electron-react-tools start```__ in your app directry.

##### Local Usage

Install as a dev dependency

__```npm install --dev electron-react-tools```__ 

or 

__```yarn add --dev electron-react-tools```__ 

and add __```"electron-start": "electron-react-tools start"```__  line to scripts in __package.json__ file. Then run

__```npm run electron-start```__

or 

__```yarn electron-start```__


##NOTE

This version assumes your application's entry point is __./src/index.js__ and __./public/index.html__

In further versions these will be configurable.