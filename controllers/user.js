const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/', async (req, res) => {
    try {
        const result = await models.user.findAll();
        return res.status(200).send(result)
    } catch (e) {
        return res.status(400).send(e)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await models.user.findByPk(req.params.id);
        if (!result) {
            return res.status(400).send({
                message: 'User Not Found',
            });
        }
        return res.status(200).send(result);
    } catch (e) {
        return res.status(400).send(e)
    }
});

router.post('/create', async (req, res) => {
    try {
        const result = await models.user.create({
            firstname: req.body.firstname,
            surname: req.body.surname,
            patronymic: req.body.patronymic,
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
        });
        return res.status(201).send(result)
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.put('/:id/update' , async(req, res) => {
    try {
        const result = await models.user.findByPk(req.params.id);
        if (!result) {
            return res.status(400).send({
                message: 'User Not Found',
            });
        }

        try {
            await result.update({
                firstname: req.body.firstname || result.firstname,
                surname: req.body.surname || result.surname,
                patronymic: req.body.patronymic || result.patronymic,
                email: req.body.email || result.email,
                name: req.body.name || result.name,
                password: req.body.password || result.password,
            });
            return res.status(200).send(result);
        } catch (e) {
            return res.status(400).send(e);
        }
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id/delete', async(req, res) => {
    try {
        const result = await models.user.findByPk(req.params.id);
        if (!result) {
            return res.status(400).send({
                message: 'User Not Found',
            });
        }
        try {
            await result.destroy();
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send(e);
        }
    } catch (e) {
        return res.status(400).send(e)
    }
});

module.exports = router;