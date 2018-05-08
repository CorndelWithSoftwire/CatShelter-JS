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
        const id = process.argv[2];
        console.log(`Cat with id: ${id}`);

        const [rows,] = await connection.query("SELECT name, age, owner_id FROM `cats` WHERE id = " + id);
        printTable(
            ["Name", "Age", "Owner ID"],
            rows.map(cat => [cat.name, cat.age, cat.owner_id])
        );
    } finally {
        connection.close();
    }
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
});
