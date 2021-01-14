"use strict";

import {app, protocol, ipcMain, BrowserWindow, globalShortcut, screen, Menu} from "electron";
import {createProtocol} from "vue-cli-plugin-electron-builder/lib";

const isDevelopment = process.env.NODE_ENV !== "production";
const path = require('path');
// 创建全局变量并在下面引用，避免被GC
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: "app", privileges: {secure: true, standard: true}}
]);

async function createWindow() {
    win = new BrowserWindow({
        // ${__static}对应的是public目录
        icon:`${__static}/seam.ico`,
        width: 1300,
        height: 800,
        backgroundColor: '#e2e2e2',
        webPreferences: {
            //webSecurity: false,
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, 'preload.js')
        },
        show: false, // 先隐藏
        maximizable: true,  //禁止双击放大
        frame: true   // 显示顶部操作栏
    });
    // 最大化窗口
     win.maximize();

    //进入软件即开启全屏
    //win.setFullScreen(true);

    //配置ESC键退出全屏
    globalShortcut.register('ESC', () => {
        win.setFullScreen(false);
    });

    //console.log("路径："+`${__static}`+'--')
    // 本地运行环境-
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        win.webContents.openDevTools();
    } else {
        // 打包环境
        createProtocol("app");
        win.loadURL(`app://./index.html`);
    }
    //加载完了才显示
    win.once('ready-to-show',()=>{win.show()})
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
    createWindow();
});

/*隐藏electron创听的菜单栏*/
Menu.setApplicationMenu(null);

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", data => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    } else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}

/*ipcMain.on('asynchronous-message',(event, arg) => { // arg为接受到的消息
    console.log("接收到消息！")
    event.sender.send('asynchronous-reply', '主机收到！'); // 返回一个'pong'
})*/
