import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gamepup',
    password: 'postgres',
    port: 5432
});

let client;


async function connectToPSQL(){
    client = await pool.connect().then(res => {
        console.log("Connected to PSQL");
        return res;
    });
}

async function disconnectFromPSQL(){
    //release client if still connected
    if(client._connected){
        client.release();
    }

    //end pool
    await pool.end(() => {
        console.log("Disconnected from PSQL");
    });
}

async function idExists(id){
    return await client
        .query(`SELECT game_name FROM game WHERE game_id='${id}';`)
        .then(res => res.rowCount);
}

export {connectToPSQL, disconnectFromPSQL, idExists};