const sequelize = require('../config/connection');
const { User, Pet, Role } = require('../models/');

const petData = require('./petdata.json');
const userData = require('./userData.json');
const roleData = require('./roleData.json');

console.log(userData);
console.log(petData);

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Role.bulkCreate(roleData);

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // for (const user of userData) {
  //   await User.create({
  //     ...user,
  //     user_id: user[0].id,
  //   });
  // }


  await Pet.bulkCreate(petData, {
    individualHooks: true,
    returning: true,
  });

  // for (const pet of petData) {
  //   await Pet.create({
  //     ...pet,
  //     pet_id: pet[0].id,
  //   });
  // }


  process.exit(0);
};


seedDatabase();
