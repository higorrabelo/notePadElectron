const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { create } = require('node:domain');
const path = require('node:path');
const fs = require('fs');
const createWindow = ()=>{
    const mainWindow = new BrowserWindow({
        width:900,
        height:700,
        frame:false,
        webPreferences:{
            preload:path.join(__dirname,'preload.js'),
        }
    });
    ipcMain.handle('minimizar',()=>{
        mainWindow.minimize();
    })
    mainWindow.loadFile('../public/index.html');
}


app.whenReady().then(()=>{
    ipcMain.handle('fechar',()=>{
        app.quit();
    })
    ipcMain.handle('salvar',(err,data)=>{
       //console.log(data.texto)
       salvar(data)
       
    })
    ipcMain.handle('abrir',async ()=>{
        var result = await abrir()
        var texto = fs.readFileSync(result,'utf-8')
        return texto;
     })
    createWindow();
    app.on('activate',()=>{
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow();
        }
    })
})
app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
})
async function salvar(data){
    var options = {
        title: 'Salvar Arquivo',
        defaultPath: 'novo-arquivo.txt',
        filters: [
          { name: 'Arquivos de Texto', extensions: ['txt'] },
          { name: 'Todos os Arquivos', extensions: ['*'] },
        ],
    }
    const {canceled,filePath} = await dialog.showSaveDialog(options)
    if(!canceled){
        console.log(filePath)
        fs.writeFileSync(filePath,data.texto);
    }
   
}
async function abrir(){
    var options = {
        title: 'Abrir Arquivo',
        filters: [
          { name: 'Arquivos de Texto', extensions: ['txt'] },
          { name: 'Todos os Arquivos', extensions: ['*'] },
        ],
    }
    const { canceled,filePaths } = await dialog.showOpenDialog(options)
    if(!canceled){
    return filePaths[0];
    }
}
