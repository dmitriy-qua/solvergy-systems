const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')
const ipcMain = electron.ipcMain
const nativeImage = electron.nativeImage

const { autoUpdater } = require('electron-updater')

let mainWindow
let splash

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 750,
        minHeight: 750,
        minWidth: 1200,
        webPreferences: {
            sandbox: false,
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false,
            allowRunningInsecureContent: true
        },
        icon: nativeImage.createFromPath(path.join(__dirname, '../public/icons/win/icon.ico')),
        show: false
    })



    const splashUrl = url.format({
        pathname: path.join(__dirname, '/../build/splash.html'),
        protocol: 'file:',
        slashes: true
    })

    splash = new BrowserWindow({width: 1200, height: 750, transparent: true, frame: false, alwaysOnTop: true});
    splash.loadURL(isDev ? 'http://localhost:3000/splash.html' : splashUrl)

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    })

    mainWindow.setResizable(true)
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : startUrl)
    mainWindow.on('closed', () => mainWindow = null)

    mainWindow.once('ready-to-show', () => {
        splash.destroy()
        mainWindow.show()
        autoUpdater.checkForUpdatesAndNotify()
    })

    if (!isDev) Menu.setApplicationMenu(null)
    //Menu.setApplicationMenu(null)
}

process.env.ELECTRON_ENABLE_SECURITY_WARNINGS = false
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true

//app.userAgentFallback = app.userAgentFallback.replace('Electron/' + process.versions.electron, '');


app.on('ready', () => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
})

ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() })
})

autoUpdater.requestHeaders = { "PRIVATE-TOKEN": process.env.GITLAB_TOKEN };
autoUpdater.autoDownload = true;

autoUpdater.setFeedURL({
    provider: "generic",
    url: "https://gitlab.com/dmitriy.qua/solvergy-systems/-/jobs/artifacts/master/download?job=build"
})

autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available')
})

autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded')
})

autoUpdater.on('error', function (err) {
    console.log('Error in auto-updater.')
})

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall()
})
