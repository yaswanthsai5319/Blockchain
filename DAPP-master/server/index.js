const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser=require('body-parser')

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dapp',
});

// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Connected to database');
// });

app.post('/login', (req, res) => {
    const username=req.body.username
    const password=req.body.password

    const sqlSelect="SELECT * FROM users where username=? and password=?";
    db.query(sqlSelect,[username,password],(err,result)=>{
        if(err){
            // console.log("fdfudfuydiugf");
            res.send(err)
        }
        else{
            if(result.length>0){
                res.send({message:"success",result:result})
            }
            else{
                res.send({message:"No Username/Password Found"});
            }
        }
    });
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // console.log(username);
    // console.log(password);
        const sqlInsert = "INSERT INTO users (username, password) VALUES (?, ?)";
        db.query(sqlInsert, [username, password], (err, result) => {
            if (err) {
                res.send(err);
                // res.send({"message": "Error occurred while registering user."});
            } else {
                res.send(username);
            }
});
});


// app.post('/post', (req, res) => {
//     const username = req.body.username;
//     const path = req.body.path;
//     const pkey=req.body.key;
//     console.log(username);
//     console.log(path);
//     console.log(pkey);
//         const sqlInsert = "INSERT INTO path_keys (username, path, key) VALUES (?, ?,?)";
//         db.query(sqlInsert, [username, path,pkey], (err, result) => {
//             if (err) {
//                 res.send(err);
//                 // res.send({"message": "Error occurred while registering user."});
//             } else {
//                 res.send(username);
//             }
// });
// });
app.post('/post', (req, res) => {
  const username = req.body.username;
  const path = req.body.path;
  const pkey = req.body.pkey;
  const ext = req.body.exxt;
  // console.log(username);
  // console.log(path);
  // console.log(req.body.pkey);
  const sqlInsert = "INSERT INTO path_keys (username, path, `key`,extension) VALUES (?, ?,?,?)";
  db.query(sqlInsert, [username, path, pkey,ext], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(username);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



app.get('/get', (req, res) => {
  const username = req.query.username;
  const sqlInsert = "SELECT path,`key`,extension FROM path_keys WHERE username=?";
  db.query(sqlInsert, [username], (err, result) => {
    if (err) {
      res.send(err);
    } else {
        console.log(result);
      res.send(result);
    }
  });
});