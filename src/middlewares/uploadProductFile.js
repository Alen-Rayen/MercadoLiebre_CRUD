const multer = require('multer')
const path = require('path') 

const storage = multer.diskStorage({  //recibe como parametro 2 objetos 
    destination: function(req, res, callback){ // se configura el destino-ruta del archivo donde sera guardado 
        callback(null, path.join(__dirname, '../../public/images/products')) //__dirname para que tome la ruta completa de donde se esta trabajando         

    },
    filename: function(req, res, callback){ // funcion que devuelve el nombre del archivo para guardarlo en un archivo unico
        callback(null, `${Date.now()}_img_${path.next(file.originalname)}`) // retorna un string
    }
})                                      

const uploadFile = multer({storage})

module.exports = uploadFile;