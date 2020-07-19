const {dialog} = window.require('electron').remote

export const openMapSelectDialog = ({setFilePath}) => {
    dialog.showOpenDialog({
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }],
        properties: ['openFile']
    }).then((filesName) => {
        if (filesName) {
            const normalizedFilePath = filesName.filePaths[0].replace(/\\/g, '/')
            setFilePath(normalizedFilePath)
        }
    });
}