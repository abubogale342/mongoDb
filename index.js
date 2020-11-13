const MongodbClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion'

MongodbClient.connect(url, (err, client) => {
    
    assert.strictEqual(err,null)
    console.log('connected correctly')

    const db = client.db(dbname)
    const collection = db.collection('dishes')

    collection.insertOne({
        "name": "Habtamu",
        "description": "Freelancer"
    }, (err, result) => {
        assert.strictEqual(err,null)
        
        console.log('After Insert: \n')
        console.log(result.ops)

        collection.find({}).toArray((err, docs) => {
            assert.strictEqual(err,null)

            console.log('Found :\n')
            console.log(docs)

            db.dropCollection('dishes', (err, result) => {
                assert.strictEqual(err,null)
                client.close()
            })
        })
    })
})