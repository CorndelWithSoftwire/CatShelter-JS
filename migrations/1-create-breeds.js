module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('breeds', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            country: {
                type: Sequelize.STRING,
                allowNull: true
            }
        });

        await queryInterface.addColumn("cats", 'breed_id', {
            type: Sequelize.INTEGER,
            allowNull: true
        });

        await queryInterface.addConstraint('cats', ['breed_id'], {
            type: 'foreign key',
            name: 'fk_cats_breeds',
            references: {
                table: 'breeds',
                field: 'id'
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        // await queryInterface.removeConstraint('cats', 'fk_cats_breeds');
        await queryInterface.removeColumn('cats', 'breed_id');
        await queryInterface.dropTable('breeds')
    }
};
