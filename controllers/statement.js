const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/', async (req, res) => {
   try {
       const result = await models.statement.findAll();
       return res.status(200).send(result)
   } catch (e) {
       return res.status(400).send(e)
   }
});

router.get('/:id', async (req, res) => {
   try {
       const result = await  models.statement.findByPk(req.params.id);
       if (!result) {
           return res.status(400).send({
               message: 'Statement Not Found',
           });
       }
       return  res.status(200).send(result)
   } catch (e) {
       return res.status(400).send(e)
   }
});

router.post('/create', async (req, res) => {
    try {
        const result = await models.statement.create({
            userID: req.body.userID,
            areaID: req.body.areaID,
            dateTime: req.body.dateTime,
            location: req.body.location,
            carNumber: req.body.carNumber,
            carModel: req.body.carModel,
            comment: req.body.comment,
        });
        return res.status(201).send(result)
    }catch (e) {
        return res.status(400).send(e)
    }
});

router.put('/:id/update', async(req, res) => {
    try {
        const result = await models.statement.findByPk(req.params.id);
        if (!result) {
            return res.status(400).send({
                message: 'Statement Not Found',
            });
        }
        try {
            await result.update({
                userID: req.body.userID || result.userID,
                areaID: req.body.areaID || result.areaID,
                dateTime: req.body.dateTime || result.dateTime,
                location: req.body.location || result.location,
                carNumber: req.body.carNumber || result.carNumber,
                carModel: req.body.carModel || result.carModel,
                comment: req.body.comment || result.comment,
            });
            return  res.status(200).send(result);
        } catch (e) {
            return res.status(400).send(e)
        }
    }catch (e) {
        return res.status(400).send(e)
    }
});

router.delete('/:id/delete', async(req, res) => {
   try {
       const result = await models.statement.findByPk(req.params.id);
       if (!result) {
           return res.status(400).send({
               message: 'Statement Not Found',
           });
       }
       try {
           await result.destroy();
           return res.status(204).send()
       } catch (e) {
           return res.status(400).send(e)
       }
   } catch (e) {
       return res.status(400).send(e)
   }
});

module.exports = router;