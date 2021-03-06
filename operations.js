const assert = require('assert')

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection)
    coll.insert(document, (err, result) => {
        assert.strictEqual(err,null)
        console.log(`Inserted ${result.result.n} documents to the collection`)

        callback(result)
    })
}

exports.findDocument = (db, collection, callback) => {
    const coll = db.collection(collection)
    coll.find({}).toArray((err, docs) => {
        assert.strictEqual(err,null)
        
        callback(docs)
    })
}

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection)
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err,null)
        console.log(`removed the document ${document}`)

        callback(result)
    })
}

exports.updateDocument = (db, document, update, collection, callback) => {
    const call = db.collection(collection)
    call.updateOne(document, {$set: update}, null, (err, result) => {
        assert.strictEqual(err,null)
        console.log(`updated the document with ${update}`)

        callback(result)
    })
}

