////////////////
//  PUERTO
////////////////
process.env.PORT= process.env.PORT || 4000;

////////////////
// ENTORNO
////////////////
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

////////////////
//  VENCIMIENTO TOKEN
////////////////
process.env.CADUCIDAD_TOKEN = "30d";

////////////////
// SEED
////////////////
process.env.SEED = process.env.SEED || "seed-desarrollo";

////////////////
// BASE DE DATOS
////////////////
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://localhost:27017/presupuestodb";
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

