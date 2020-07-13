const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 1200, height: 700, minHeight: 700, minWidth: 1200});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  //setMainMenu();
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// function setMainMenu() {
//   const template = [
//     {
//       label: 'Файл',
//       submenu: [
//         {
//           label: 'Привет',
//           accelerator: 'Shift+CmdOrCtrl+H',
//           click() {
//               console.log('Oh, hi there!')
//           }
//         }
//       ]
//     },
//     {
//       label: 'Правка',
//       submenu: [
//         {
//           label: 'Назад',
//           accelerator: 'Shift+CmdOrCtrl+C',
//           click() {
//               console.log('Oh, hi there 2!')
//           }
//         }
//       ]
//     }
//   ];
//   Menu.setApplicationMenu(Menu.buildFromTemplate(template));
// }