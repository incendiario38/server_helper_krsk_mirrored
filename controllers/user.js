import {Router} from 'express';

const router = Router();
const models = require('../models');
const User = require('../models').user;

router.get('/', async (req, res) => {
    const users = await req.context.models.user.findAll();
    return res.send(users)
        .then ((users) => res,status(200).send(users))
        .catch((error) => {
            res.status(400).send(error);
        });
});

router.get('/:id', async (req, res) => {
   const user = await req.context.models.user.findByPk(
       req.params.id,
   );

   return res.send(user)
       .then((user) => {
           if (!user) {
               return res.status(404).send({
                   message: 'User Not Found',
               });
           }
           return res.status(200).send(user);
       })
       .catch((error) => res.status(400).send(error));
});

router.post('/create', async (req, res) => {
    const user = await req.context.models.user.create({
        firstname: req.body.firstname,
        surname: req.body.surname,
        patronymic: req.body.patronymic,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
    });

    return req.send(user)
        .then ((user) => {
            res.status(201).send(user)
        })
        .catch((error) => res.status(400).send(error));
});

router.put('/:id/update' , async(req, res) => {
    const user = await req.context.models.user.findByPk(req.params.id)
        .then (user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }
            return user.update({
                firstname: req.body.firstname,
                surname: req.body.surname,
                patronymic: req.body.patronymic,
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
            })
                .then(() => res.status(200).send(user))
                .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
});

router.delete('/:id/delete', async(req, res) => {
    const result = await req.context.models.user.destroy({
        where: {id: req.params.id},
    })
        .then(user => {
            if (!user) {
                return res.status(400).send({
                    message: 'User Not Found',
                });
            }
        });
    return res.send(true)
        .then (() => res.status(204). send())
        .catch(((error) => res.status(400).send(error)));
});