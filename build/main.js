"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
function createWindow() {
    // ウィンドウオプション
    const options = {
        width: 1024,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    };
    // メニューバー
    const template = [
        {
            label: 'Backlog',
            submenu: [{
                    label: 'Quit Backlog by Nulab',
                    accelerator: 'Cmd+Q',
                    click: function () {
                        electron_1.app.quit();
                    }
                }]
        },
    ];
    const win = new electron_1.BrowserWindow(options);
    const menuTemp = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menuTemp);
    win.loadURL('https://novalumo.backlog.com/dashboard');
}
// 初期化完了後ウィンドウ生成
electron_1.app.whenReady().then(createWindow);
/* macOS用の設定 ----- */
// Cmd+Qで閉じられるまで終了しない
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// Dockアイコンクリック時にウィンドウを再生成
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
