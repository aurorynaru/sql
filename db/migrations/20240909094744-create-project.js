'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Project', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: true
            },
            isFeatured: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: true
            },
            productImage: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: true
            },
            price: {
                type: Sequelize.DECIMAL,
                allowNull: true
            },
            shortDescription: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Project')
    }
}
