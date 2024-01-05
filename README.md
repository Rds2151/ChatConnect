# Chat Connect

## Database Information

The data in the database is stored using the following Mongoose schemas in `db/database.js`:

### User Schema

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactNo: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    status: { type: String, default: "offline" },
    preview: { type: String },
    Password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
```

### Chat Schema

```javascript
const chatSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    message: { type: String, required: true },
    datetime: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = { Chat };
```

## Accessing Test Data

To access test data for users, you can use the following credentials:

- **Username:** Louis Litt
  - **Contact No:** 9876543210
  - **Password:** `123`

- **Username:** Mike Ross
  - **Contact No:** 9876543211
  - **Password:** `123`

- **Username:** Harvey Specter
  - **Contact No:** 9876543212
  - **Password:** `123`

- **Username:** Jonathan Sidwell
  - **Contact No:** 9876543213
  - **Password:** `123`

## Data for Inserting into MongoDB Collections

```json
[
  {
    _id: ObjectId('6596eeb15340b40fbdaebc84'),
    name: 'Louis Litt',
    contactNo: '9876543210',
    img: 'http://emilcarlsson.se/assets/louislitt.png',
    status: 'online',
    preview: 'You just got LITT up, Mike.',
    Password: '$2b$10$WNmM8Fz2gZpJqV/hzp8FJOynV1a5nADbR83lQiCmikf9vM/NiLjSG'
  },
  {
    _id: ObjectId('6596eeb15340b40fbdaebc85'),
    name: 'Mike Ross',
    contactNo: '9876543211',
    img: 'http://emilcarlsson.se/assets/mikeross.png',
    status: 'online',
    preview: 'How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!',
    Password: '$2b$10$WNmM8Fz2gZpJqV/hzp8FJOynV1a5nADbR83lQiCmikf9vM/NiLjSG'
  },
  {
    _id: ObjectId('6596eeb15340b40fbdaebc86'),
    name: 'Harvey Specter',
    contactNo: '9876543212',
    img: 'http://emilcarlsson.se/assets/harveyspecter.png',
    status: 'busy',
    preview: 'Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty-six other things.',
    Password: '$2b$10$WNmM8Fz2gZpJqV/hzp8FJOynV1a5nADbR83lQiCmikf9vM/NiLjSG'
  },
  {
    _id: ObjectId('6596eeb15340b40fbdaebc87'),
    name: 'Jonathan Sidwell',
    contactNo: '9876543213',
    img: 'http://emilcarlsson.se/assets/jonathansidwell.png',
    status: '',
    preview: "That's bullshit. This deal is solid.",
    Password: '$2b$10$WNmM8Fz2gZpJqV/hzp8FJOynV1a5nADbR83lQiCmikf9vM/NiLjSG'
  }
]
```

## Instructions for Inserting Data into MongoDB Collections

- Change the mongoose dburl in app.js before running the application.
- Uncomment the code below, run it once, and then comment it back.

```javascript
// const mongoose = require("mongoose");
// const { User } = require("./db/database");

// mongoose.connect("YOUR_MONGODB_DBURL_HERE", { useNewUrlParser: true, useUnifiedTopology: true });

// // Insert usersData into User collection
// User.insertMany(usersData)
//     .then(() => {
//         console.log("Data inserted successfully!");
//         mongoose.connection.close();
//     })
//     .catch((err) => console.error("Error inserting data:", err));
```
