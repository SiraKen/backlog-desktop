import { app, BrowserWindow, Menu } from 'electron';

function createWindow () {

  // ウィンドウオプション
  const options: Electron.BrowserWindowConstructorOptions = {
    width: 1024,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  }

  // メニューバー
  const template = [
    {
      label: 'Backlog',
      submenu: [{
        label: 'Quit Backlog by Nulab',
        accelerator: 'Cmd+Q',
        click: function(){
          app.quit()
        }
      }]
    },
  ]

  const win = new BrowserWindow(options)
  const menuTemp = Menu.buildFromTemplate(template);
  
  Menu.setApplicationMenu(menuTemp);

  win.loadURL('https://novalumo.backlog.com/dashboard')
}

// 初期化完了後ウィンドウ生成
app.whenReady().then(createWindow)

/* macOS用の設定 ----- */

// Cmd+Qで閉じられるまで終了しない
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Dockアイコンクリック時にウィンドウを再生成
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

