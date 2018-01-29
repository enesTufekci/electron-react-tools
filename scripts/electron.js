const {
  app,
  BrowserWindow
} = require('electron');
const electron = require('electron');
const path = require('path');
const fs = require('fs');
const paths = require('../config/paths');
const defaultConfig = require('../config/electron/defaultConfig');
const electronConfigUser = fs.existsSync(paths.electronConfig) ? require(paths.electronConfig) : {};
const CONFIG = Object.assign(defaultConfig, electronConfigUser);

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(paths.appNodeModules);
  require('module').globalPaths.push(p);
}

app.on('window-all-closed', function () {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  let preLoad = [];
  if(process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    // TODO: extensions should be optional
    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    preLoad = extensions.map(name => installer.default(installer[name], forceDownload));
  }

  return Promise
    .all(preLoad)
    .then(function () {
      let mainWindow = new BrowserWindow({
        show: false,
        width: CONFIG.width,
        height: CONFIG.height,
      });
      mainWindow.loadURL(process.argv[2]);
      mainWindow.webContents.on('did-finish-load', function () {
        if (!mainWindow) {
          throw new Error('"mainWindow" is not defined');
        }
        mainWindow.show();
        mainWindow.focus();
      });

      mainWindow.on('closed', function () {
        mainWindow = null;
      });
    });
});