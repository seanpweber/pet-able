const sequelize = require('../config/connection');
const { User, Pet} = require('../models');

const userData = require('./userData.json');
const petData = require('./petData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const pet = await pet.bulkCreate(petData, {
    individualHooks: true,
    returning: true,
  });

  for (const pet of petData) {
    await Pet.create({
      ...pet,
      pet_id: pet[Math.floor(Math.random() * pet.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
