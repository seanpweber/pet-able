const router = require('express').Router();
const {Pet, User} = require('../models');
const withAuth = require('../utils/auth');
router.get('/', async (req, res) => {
    try {
        const petData = await Pet.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        //serialize the data
        const pets = petData.map((pet) =>pet.get({plain: true}));
        //send serialized data to the homepage template
        res.render('homepage', {
            pets,
            logged_in: req.session.logged_in
        });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }


});
router.get('/pet/:id', async (req,res) => {
    try {
        const petData = await Pet.findByPk(req.param.id, {
            include: [
                {
                  model: Pet,
                  attributes: ['name'],
                },
              ],
            });
        
            const pet = petData.get({ plain: true });
        
            res.render('pet', {
              ...pet,
              logged_in: req.session.logged_in
            });
          } catch (err) {
            res.status(500).json(err);
          }
        });
        
        // Use withAuth middleware to prevent access to route
        router.get('/profile', withAuth, async (req, res) => {
            try {
                    // Find the logged in user based on the session ID
    const petData = await Pet.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Project }],
      });
  
      const pet = petData.get({ plain: true });
      res.render('profile', {
        ...pet,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

  module.exports = router;