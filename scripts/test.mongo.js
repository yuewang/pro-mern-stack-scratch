const conn = new Mongo();
const db = conn.getDB("playground");

var collection = "employees";

cursor = db[collection].find({'name.middle': {$exists: true}});
while ( cursor.hasNext() ) {
    printjson( cursor.next() );
}

//db.adminCommand({'getLog': 'mongod.log'});
//db.adminCommand('listDatabases');
//db.employees.find({'name.middle': {$exists: true}});