const path = require('path')

// Conenct to database
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const connection = require('./db')
connection.connect((e, s) => {
    if (e) {
        console.log(e)
        console.error('Cannot connect to database')
        process.exit(1)
    }
    console.log('Connected to database')
})

// Steps for migration
// 1. Backup
// 2. Export
// 3. Import with new data for new schema
// 4. Post migration cleanings

// Change database to new schema
connection.query('set foreign_key_checks=0;')
connection.query('drop table if exists user;')
connection.query('drop table if exists todos;')
connection.query('set foreign_key_checks=1;')

// This shet has bug
// If you create new acc with different username but with same email
// or the other way around, it'll insert into the db
connection.query(
    '\
        CREATE TABLE IF NOT EXISTS user (\
        username VARCHAR(128) NOT NULL UNIQUE,\
        email VARCHAR(128) NOT NULL,\
        password VARCHAR(1020) NOT NULL,\
        accesstoken TEXT,\
        image TEXT,\
        imageSHA TEXT,\
        PRIMARY KEY (email))\
    '
)

connection.query(
    '\
        CREATE TABLE IF NOT EXISTS todos (\
        id VARCHAR(128) NOT NULL PRIMARY KEY,\
        username VARCHAR(128) NOT NULL,\
        cloud BOOLEAN DEFAULT 1,\
        title VARCHAR(1020) ,\
        description TEXT ,\
        checked INT NOT NULL DEFAULT 0,\
        remindAt VARCHAR(20),\
        createdAt timestamp default current_timestamp,\
        modifiedAt timestamp default current_timestamp on update current_timestamp,\
        FOREIGN KEY (username) REFERENCES user(username)\
        )\
    '
)

connection.commit()
connection.end()
