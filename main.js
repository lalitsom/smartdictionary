const electron = require('electron');
const {app, globalShortcut} = require('electron')
const path = require('path');
const url = require('url');
const BrowserWindow = electron.BrowserWindow;
var mainWindow;


//////////auto launch/////////////////////////
var AutoLaunch = require('auto-launch');

var AutoLauncher = new AutoLaunch({
  name: 'smartdictionary',
});

exports.Launcher = function(){
                    return AutoLauncher;
                  }
//////////////////////////////////////////////////


app.on('ready',function(){
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({ width: width/4,  height: height, x: (3*width)/4, y: 0, movable: false,
    skipTaskbar: true,
    frame: false,
    webPreferences: {
      devTools: true
    }
  });
  //mainWindow.setMenu(null);


  // Register a 'CommandOrControl+Shift+D' shortcut listener.
globalShortcut.register('CommandOrControl+Shift+D', () => {
  toggleWindow();
});
globalShortcut.register('CommandOrControl+Shift+Q', () => {
  closeWindow();
});


  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

});


function toggleWindow(){
  if(mainWindow.isVisible()){
      mainWindow.hide();
  }else{
      mainWindow.show();
  }
}

function closeWindow(){
  mainWindow.removeAllListeners('close');
  mainWindow.close();
  app.quit();
}
