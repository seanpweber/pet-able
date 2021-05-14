const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


router.get("/:id", async (req, res) => {
  try {
    const rawUserData = await User.findByPk(req.params.id);
    if (!rawUserData) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.status(200).json(rawUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: User }],
      });
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/shelter', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Project }],
      });
  

    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/", async (req, res) => {
    console.log(req.body)
    try {
        const newUserData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            zip_code: req.body.zip_code
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(newUserData);
        });
    } catch (err) {
      console.log(err)
        res.status(500).json(err);
    }
});




// router.post('/', async (req, res) => {
//   try {
//     console.log("this is the session", req.session)
//     console.log(req.body.parse)
//     const newUser = await User.create(
//       req.body
//       // user_id: req.session.user_id,
//     );

//     res.status(200).json(newUser);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });




router.post('/login', async (req, res) => {
    try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
        res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
        return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
        res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
        return;   
    }

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
    });

} catch (err) {
    res.status(400).json(err);
}
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
    req.session.destroy(() => {
        res.status(204).end();
    });
} else {
    res.status(404).end();
}
});

module.exports = router;
