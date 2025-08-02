const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('admin', 10);
    await queryInterface.bulkInsert('Users', [{
      id: uuidv4(),
      name: 'Admin',
      email: 'admin@mentourme.tech',
      password: hashedPassword,
      phone: '+0000000000',
      onboarded: true,
      role: 'admin',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { email: 'admin@mentourme.tech' });
  }
}; 