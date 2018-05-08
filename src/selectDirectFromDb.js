const mysql = require('mysql2/promise');
const fs = require("fs");
const path = require("path");

const {printTable} = require("./printTable");

async function main() {
    const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', 'config.json')).toString())["development"];

    const connection = await mysql.createConnection({
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.database
    });

    try {
        const [rows,] = await connection.query(
            "SELECT cats.name, cats.age, owners.name AS ownerName " +
            "   FROM `cats` " +
            "   JOIN `owners` ON owners.id = cats.owner_id"
        );

        console.log("Cats: ");
        printTable(
            ["Name", "Age", "Owner Name"],
            rows.map(cat => [cat.name, cat.age, cat.ownerName])
        );
    } finally {
        connection.close();
    }
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
});
