const multer = require('multer')
const fs = require('fs')
const path = require('path')

exports.userFile = ((req, res, next) => {

    const getFileType = (file) => {
        const mimeType = file.mimetype.split('/')
        return mimeType[mimeType.length - 1]
    }
    const generateFileName = (req, file, cb) => {
        const extension = getFileType(file)
        console.log(file.mimetype)
        const fileName = Date.now() + '-' + Math.round(Math.random * 1E9) + '.'+extension
        cb(null,file.fieldname + '-' + fileName)
    }
    const fileFilter = (req,file,cb)=>{
        const extension = getFileType(file)

        const allowTypes = /jpeg|jpg|png/

        const passed = allowTypes.test(extension)

        if(passed){
            return cb(null,true)
        }
        return cb(null,false)
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const { id } = req.user
            const dest = `uploads/user/${id}`

            fs.access(dest, (err) => {
                if (err) {
                    return fs.mkdir(dest, (err) => {
                        cb(err, dest)
                    })
                }
                else {
                    fs.readdir(dest, (err, files) => {
                        if (err) throw err

                        for (const file in files) {
                            console.log(dest,file)
                            fs.unlink(path.join(dest, file), err => {
                                if (err) throw err
                            })
                        }
                    })

                    return cb(null, dest)
                }
            })
        },
        filename: generateFileName
    })
    return multer({storage, fileFilter}).single('avatar')
})()