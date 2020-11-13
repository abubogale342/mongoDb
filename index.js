const MongodbClient = require('mongodb').MongoClient
const assert = require('assert')

const dboper = require('./operations')

const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion'

MongodbClient.connect(url, (err, client) => {
    
    assert.strictEqual(err,null)
    console.log('connected correctly')

    const db = client.db(dbname)
    
    dboper.insertDocument(db, {name: 'vodanut', description: 'test'}, 'dishes', (result) => {
        console.log('Insert document:\n', result.ops)

        dboper.findDocument(db, 'dishes', (result) => {
            console.log('Found:\n', result)
        })

        dboper.updateDocument(db, {name: 'vodanut'}, {description: 'Updated test'}, 'dishes', (result) => {
            console.log('Updated dishes', result.result)

            dboper.findDocument(db, 'dishes', (result) => {
                console.log('Found updated document:\n', result)
                
                db.dropCollection('dishes', (result) => {
                    console.log("Dropped Collection: ", result);
                    client.close()
                })
            })
        })
    })
})