const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

let users = [];
let transaksi = [];

if (fs.existsSync("users.json"))
  users = JSON.parse(fs.readFileSync("users.json"));

if (fs.existsSync("transaksi.json"))
  transaksi = JSON.parse(fs.readFileSync("transaksi.json"));

function save() {
  fs.writeFileSync("users.json", JSON.stringify(users));
  fs.writeFileSync("transaksi.json", JSON.stringify(transaksi));
}

app.post("/daftar", (req, res) => {

  const { username, password } = req.body;

  if (users.find(u => u.username === username))
    return res.send("ada");

  users.push({
    username,
    password,
    saldo: 0,
    role: "user"
  });

  save();
  res.send("ok");

});

app.post("/login", (req, res) => {

  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username &&
         u.password === password
  );

  if (!user) return res.send({});

  res.send(user);

});

app.post("/transfer", (req, res) => {

  const { dari, ke, jumlah } = req.body;

  let biaya = 1000;

  let u1 = users.find(x=>x.username===dari);
  let u2 = users.find(x=>x.username===ke);

  if (!u1 || !u2) return res.send("gagal");

  if (u1.saldo < jumlah + biaya)
    return res.send("kurang");

  u1.saldo -= jumlah + biaya;
  u2.saldo += jumlah;

  transaksi.push({
    type:"transfer",
    dari,ke,jumlah,biaya,
    waktu:Date.now()
  });

  save();
  res.send("ok");

});

app.post("/tarik",(req,res)=>{

  const { username, jumlah } = req.body;

  let biaya = 2000;

  let u = users.find(x=>x.username===username);

  if(u.saldo < jumlah + biaya)
    return res.send("kurang");

  u.saldo -= jumlah + biaya;

  transaksi.push({
    type:"tarik",
    username,
    jumlah,
    biaya,
    waktu:Date.now()
  });

  save();
  res.send("ok");

});

app.post("/topup",(req,res)=>{

  const { username, jumlah, bukti } = req.body;

  let kode = Math.floor(Math.random()*900)+100;

  transaksi.push({
    type:"topup",
    username,
    jumlah,
    kode,
    bukti,
    status:"pending",
    waktu:Date.now()
  });

  save();
  res.send("ok");

});

app.post("/acc",(req,res)=>{

  let t = transaksi[req.body.index];

  if(!t) return res.send("gagal");

  if(t.status!="pending")
    return res.send("sudah");

  let u = users.find(
    x=>x.username===t.username
  );

  u.saldo += t.jumlah;

  t.status="sukses";

  save();

  res.send("ok");

});

app.get("/data",(req,res)=>{

  res.send({
    users,
    transaksi
  });

});

app.listen(3000,()=>console.log("jalan"));
