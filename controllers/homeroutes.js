const router = require('express').Router();
const {Pet, Shelter, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const petData = await Pet.findAll({
            include: [
                {
                    model: Shelter,
                    attributes: ['name'],
                },
            ],

        });

        //serialize the data


        //send serialized data to the homepage template

        
    } catch (err) {
        res.status(500).json(err);
    }
});