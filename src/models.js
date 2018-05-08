const Sequelize = require('sequelize');

async function createModels(sequelize) {
    const Owner = sequelize.define('Owner', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    const Cat = sequelize.define('Cat', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        age: {
            type:Sequelize.INTEGER,
            allowNull: false
        },
        owner_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Owner,
                key: "id"
            }
        }
    });

    Owner.Cat = Owner.hasMany(Cat);
    Cat.Owner = Cat.belongsTo(Owner);

    await sequelize.sync();

    return {
        Owner,
        Cat
    };
}

module.exports = {createModels};
