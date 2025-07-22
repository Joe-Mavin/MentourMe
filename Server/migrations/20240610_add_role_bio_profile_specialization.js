module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add columns to Users
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM('user', 'mentor', 'therapist'),
      allowNull: false,
      defaultValue: 'user',
    });
    await queryInterface.addColumn('Users', 'bio', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'profilePicture', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Create Specializations table
    await queryInterface.createTable('Specializations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create UserSpecialization join table
    await queryInterface.createTable('UserSpecialization', {
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      specializationId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Specializations', key: 'id' },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.removeColumn('Users', 'bio');
    await queryInterface.removeColumn('Users', 'profilePicture');
    await queryInterface.dropTable('UserSpecialization');
    await queryInterface.dropTable('Specializations');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_role";');
  },
}; 