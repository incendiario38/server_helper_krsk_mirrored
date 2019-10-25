import {Router} from 'express';

const  router = Router();
const models = require('../models');

router.get('/', async (req, res) => {
   const areas = await req.context.models.area.findAll();
   return  res.send(areas)
       .then((areas) => res.status(200).send(areas))
       .catch((error) => {
           res.status(400).send(error);
       });
});

router.get('/id', async (req, res) => {
   const area = await req.context.models.area.findByPk(
       req.params.id,
   ) ;

   return res.send(area)
       .then((area) => {
           if (!area) {
               return res.status(404).send({
                   message: 'Area Not Found',
               });
           }
           return res.status(200).send(user);
       })
       .catch((error) => res.status(400).send(error));
});

router.post('/create', async (req, res) => {
    const area = await req.context.models.area.create({
        email: req.body.email,
    });

    return req.send(area)
        .then ((area) => {
            res.status(201).send(area)
        })
        .catch((error) => res.status(400).send(error));
});

router.put('/:id/update', async (req, res) => {
    const area = await req.context.models.area.findByPk(req.params.id)
        .then (area => {
            if (!area) {
                return res.status(404).send({
                    message:'Area Nor Found',
                });
            }
            return area.update({
                email: req.body.email,
            })
                .then(() => res.status(200).send(area))
                .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
});

router.delete('/:id/delete', async (req, res) => {
   const result = await req.context.models.area.destroy({
       where: {id: req.params.id},
   })
       .then(area => {
           if (!area) {
               return res.status(400).send({
                   message: 'Area Not Found',
               });
           }
       });
   return res.send(true)
       .then(() => res.status(204).send())
       .catch((error) => res.status(400).send(error));
});

module.exports = router;