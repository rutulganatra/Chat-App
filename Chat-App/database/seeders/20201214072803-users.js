'use strict';
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('Users',[
        {
          firstName:'Rutul',
          lastName:'Ganatra',
          email:'rutul@xporium.com',
          password:bcrypt.hashSync('rutul',10),
          gender:'male'
        },
        {
          firstName:'arpita',
          lastName:'Ganatra',
          email:'arpita@xporium.com',
          password:bcrypt.hashSync('arpita',10),
          gender:'female'
        },
      ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});

  }
};
