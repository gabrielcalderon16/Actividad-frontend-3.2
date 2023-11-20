const {Router} = require('express')
const { postImage, getImage} = require('../controllers/uploads')
const multer = require('multer');

const router = Router()

//configuracion de multer
const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });


router.get('/:fileName',getImage);

router.post('/:idHab', upload.single('image'), postImage)

module.exports = router