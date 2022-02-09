## DB Schema

```
import mongoose from 'mongoose';

const treeSchema = mongoose.Schema({
    label: { type: String, required: true },
    children: [ { type: String } ]
});

export default mongoose.model("Tree", treeSchema);
```
**NOTE:** By default, Mongoose adds an _id property to your schemas.

## Sample Queries
###### GET /api/tree
**MongoDB:** db.tree.find();
**MySQL:** SELECT * FROM tree;


###### POST /api/tree/
**MongoDB:** db.tree.insertOne( { label: "dog", children: [] } );
**MySQL:** INSERT INTO tree (label, children) VALUES ("dog", "[]");

###### DELETE /api/tree/:id
**MongoDB:** db.tree.deleteMany( { id: "1" } );
**MySQL:** DELETE FROM tree WHERE id = "1";

###### UPDATE /api/tree/:id
**MongoDB:** db.tree.updateMany( { id: "1" } , { $set: { id: "2" } } );
**MySQL:** UPDATE tree SET id = "2" WHERE id = "1";