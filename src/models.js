const Sequelize = require('sequelize');

async function createModels(sequelize) {
    const owner = sequelize.define('owner', {
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

    const cat = sequelize.define('cat', {
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
                model: owner,
                key: "id"
            }
        }
    });

    owner.cat = owner.hasMany(cat);
    cat.owner = cat.belongsTo(owner);

    await sequelize.sync();

    return {
        owner,
        cat
    };
}

module.exports = {createModels};
