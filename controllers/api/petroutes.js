const router = require('express').Router();
const { Pet } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
      const newPet = await Pet.create(
        req.body
        // user_id: req.session.pet_id,
      );
  
      res.status(200).json(newPet);
    } catch (err) {
      res.status(400).json(err);
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
  
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get('/pet', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const petData = await User.findByPk(req.session.user_id, {
        include: [{ model: Pet }],
      });
  
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const petData = await Pet.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.pet_id,
        },
      });
  
      if (!petData) {
        res.status(404).json({ message: 'No pet found with this id!' });
        return;
      }
  
      res.status(200).json(petData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;