import pg from "pg";
import * as dotenv from 'dotenv';
dotenv.config();


const { Pool } = pg;

const {USER, HOST, DATABASE, PASSWORD, PORT} = process.env;
const pool = new Pool({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT
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

async function isCategory(id){
    return await client
        .query(`SELECT category_id FROM category WHERE category_id=${id};`)
        .then(res => res.rowCount !== 0);
}
export {connectToPSQL, disconnectFromPSQL, idExists, isCategory};