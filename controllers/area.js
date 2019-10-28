const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/', async (req, res) => {
    try {
        const result = await models.area.findAll();
        return res.status(200).send(result);
    } catch (e) {
        return res.status(400).send(e)
    }
});

router.get('/id', async (req, res) => {
    try {
        const result = await models.area.findByPk(req.params.id);
        if (!result) {
            return res.status(404).send({
                message: 'Area Not Found',
            });
        }
        return res.status(200).send(result);
    } catch (e) {
        return res.status(400).send(e)
    }
});

router.post('/create', async (req, res) => {
    try {
        const result = await models.area.create({
            email: req.body.email,
        });
        return res.status(201).send(result);
    } catch (e) {
        return res.status(400).send(e)
    }
});

router.put('/:id/update', async (req, res) => {
    try {
        const result = await models.area.findByPk(req.params.id);
        if (!result) {
            return res.status(404).send({
                message:'Area Nor Found',
            });
        }
        try {
            await result.update({
                email: req.body.email || result.email,
            })
            return res.status(200).send(result)
        } catch (e) {
            return res.status(400).send(e)
        }
    } catch (e) {
        return res.status(400).send(e)
    }
});

router.delete('/:id/delete', async (req, res) => {
    try {
        const result = await models.area.findByPk(req.params.id);
        if (!result) {
            return res.status(400).send({
                message: 'Area Not Found',
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