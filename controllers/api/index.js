const router = require('express').Router();

const petRoutes = require('./petroutes');
// const shelterRoutes = require('./shelterroutes');
const userRoutes = require('./userroutes');

router.use('/user',userRoutes);
// router.use('/shelters',shelterRoutes);
router.use('/pets',petRoutes);

module.exports = router;
