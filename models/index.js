const User = require('./user');
const Pet = require('./Pet');
const Role = require('./Role');

User.hasMany(Pet, {
    foreignKey: 'user_id' 
});

Pet.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsTo(Role, {
    foreignKey: 'role_id'
})

Role.hasMany(User, {
    foreignKey: 'role_id'
})

module.exports = { User, Pet, Role };