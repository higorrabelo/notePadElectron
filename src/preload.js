const {contextBridge,ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('acao',{
    fechar: ()=>ipcRenderer.invoke('fechar'),
    minimizar:()=>ipcRenderer.invoke('minimizar'),
    salvar: (data)=>ipcRenderer.invoke('salvar',data),
    abrir: ()=>ipcRenderer.invoke('abrir')
})