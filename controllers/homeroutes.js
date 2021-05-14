const router = require('express').Router();
const {Pet, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('user', {layout: 'main'});
})

router.get("/profile/:id", withAuth, async (req, res) => {
  try {
      const userProfile = await User.findByPk(req.params.id, {
          include:
              { model: User,  attributes: ['username', 'email', 'zip_code'],}
      });
      const userDisplay = userProfile.get({ plain:true });
      console.log(userDisplay)
      res.status(200).render('profile', {
          userDisplay,
          logged_in: req.session.logged_in,
          userId: req.session.user_id
      })
  } catch (err) {
      res.status(400).json("Page not found!");
  }
});

// router.get('/profile/:id', async (req, res) => {
//   const userDisplay = await User.findByPk({
//     include: [
//       {
//         model: User,
//         attributes: ['name', 'email', 'zip_code'],
//       },
      
//     ],
//   });


//   const pet = petData.get({ plain: true });
        
//   res.render('pet', {
//     ...pet,
//     logged_in: req.session.logged_in
//   });

//   res.render('profile');
// })


// router.get('/', async (req, res) => {
//     try {
//         const petData = await Pet.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ['name'],
//                 },
//             ],
//         });
//         //serialize the data
//         const pets = petData.map((pet) =>pet.get({plain: true}));
//         //send serialized data to the homepage template
//         res.render('homepage', {
//             pets,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

router.get("/login", async (req, res) => {
  try {
      res.status(200).render("login");
  } catch (err) {
      res.status(400).json(err);
  }
});
// This is a placeholder, and will need the create account page.
router.get("/signup", async (req, res) => {
  try {
      res.status(200).render("signup");
  } catch (err) {
      res.status(500).json(err);
  }
})
// This is a placeholder, and will need the logout page to be rendered.
router.get("/logout", async (req, res) => {
  try {
      res.status(200).render("logout");
  } catch (err) {
      res.status(500).json(err);
  }
})

  module.exports = router;