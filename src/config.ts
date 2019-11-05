'use strict';


const dbHost = process.env.tubitv_db_host || '0.0.0.0';
const dbPort = process.env.tubitv_db_port || 27017;
const dbUsername = process.env.tubitv_db_username;
const dbPassword = process.env.tubitv_db_pwd;
const dbName = process.env.tubitv_db_name;


export default {
  port: process.env.tubitv_port || 3000,
  db: {
    // uri: `mongodb://${dbUsername}:${encodeURIComponent(dbPassword as string)}@${dbHost}/${dbName}`,
    uri: `mongodb://${dbHost}/${dbName}`,
  
    autoReconnect: true,
    options: {
      autoReconnect: true,
    },
    // server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    // replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  }
}
