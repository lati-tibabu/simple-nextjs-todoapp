'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      // 1, rename the column
      await queryInterface.renameColumn('Tasks', 'id', 'task_id');

      await queryInterface.changeColumn('Tasks', 'task_id', {
	  type: Sequelize.INTEGER,
	  primaryKey: true,
	  autoIncrement: true
      });
      
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.renameColumn('Tasks', 'task_id', 'id');

      await queryInterface.changeColumn('Tasks', 'id', {
	  type: Sequelize.INTEGER,
	  primaryKey: false,
	  autoIncrement: false,
      });
  }
};
