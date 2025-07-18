import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

import { ControllerNode } from './matter/ControllerNode';

// Import our custom CSS
import './scss/styles.scss';

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

async function handleMatter (
  event: IpcMainInvokeEvent,
  threadNetworkNameText: string,
  threadOperationalDatasetText: string,
  matterLongDiscriminatorNumber: number,
  matterPasscodeNumber: number) {

  console.log(`handleMatter( ${threadNetworkNameText} )`);

  await new ControllerNode().start(
    threadNetworkNameText,
    threadOperationalDatasetText,
    matterLongDiscriminatorNumber,
    matterPasscodeNumber
  //   'NEST-PAN-F15F',
  //   '000300001a0102f15f020807e5b1372eb688120e080000633d8c5ca8e90510f760d45b8c76f77b51529113fb146ab2030d4e4553542d50414e2d463135460708fd2da0c1435c00000410e77a14cb64f066942a6a37c236c237380c0402a0f77835060004001fffe0',
  //   3840,
  //   20202021
  ).catch(error => console.log(error));
  console.log('handleMatter()~');
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  ipcMain.handle('handle-matter', handleMatter)
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
