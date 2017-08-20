const electron = require('electron');
const app =  electron.app;

const path = require('path');
const url = require('url');
const BrowserWindow = electron.BrowserWindow;
var mainWindow;


app.on('ready',function(){
  mainWindow = new BrowserWindow({ width:600,  height: 600,
    webPreferences: {
      devTools: true
    }
  });
  //mainWindow.setMenu(null);


  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
});
