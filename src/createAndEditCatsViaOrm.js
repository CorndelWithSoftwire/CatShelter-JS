const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path")

const {createModels} = require("./models");

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

        const {cat, owner} = await createModels(sequelize);

        // Create henrietta and molly in a transaction
        const [henrietta, molly] = await sequelize.transaction(async (t) => {
            const henrietta = await owner.create(
                {name: "Henrietta"},
                {transaction: t}
            );

            const molly = await cat.create(
                {name: "Molly", age: 0, owner_id: henrietta.id},
                {transaction: t}
            );
            return [henrietta, molly];
        });
        console.log(`Created user henrietta with ID: ${henrietta.id}, and her cat molly with ID: ${molly.id}`);

        // Update molly's age
        await molly.update({age: 1});
        console.log("Updated molly's age to 1");

    } finally {
        sequelize.close();
    }
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
});
