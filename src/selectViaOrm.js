const Sequelize = require('sequelize');
const fs = require("fs");
const path = require("path");

const {createModels} = require('./models');
const {printTable} = require("./printTable");

async function main() {
    const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', 'config.json')).toString())["development"];

    const sequelize = new Sequelize('cat_shelter', config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
        define: {
            timestamps: false,
            underscored: true
        }
    });

    try {
        const {Cat, Owner} = await createModels(sequelize);

        const cats = await Cat.findAll({include: [Owner]});

        console.log("Cats: ");
        printTable(["Name", "Age", "Owner Name"],
            cats.map(cat => [cat.name, cat.age, cat.Owner.name])
        );
    } finally {
        sequelize.close();
    }
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
});
