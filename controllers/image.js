const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const models = require('../models');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let now = new Date();
        let folder = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)}`;

        // Проверяем есть ли папка для загрузки
        let dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, 744);
        }

        // Проверяем есть ли папка сегодняшнего числа
        let path = dir + `/${folder}`;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, 744);
        }
        cb(null, path);
    },
    filename: (req, file, cb) => {
        //console.log(req);
        let fileExtension = file.originalname.split('.')[1];
        cb(null, Date.now() + '.' + fileExtension);
    }
});

const upload = multer({storage: storage});

router.post('/upload', upload.single('photo'), async (req, res) => {
   try {
       const result = await models.image.create({
          statementID: req.body.statementID,
          path: req.file.path.replace(/\\/g, "/")
       });
       return res.status(201).send(result)
   } catch (e) {
       return res.status(400).send(e)
   }
});