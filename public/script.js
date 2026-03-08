let user = JSON.parse(localStorage.getItem("user"));

function get(id){
  return document.getElementById(id);
}

/* ================= LOGIN ================= */

function login(){

 let username = get("username").value;
 let password = get("password").value;

 fetch("/login",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
    username:username,
    password:password
  })
 })
 .then(r=>r.json())
 .then(d=>{

  if(!d.username){
    alert("Login gagal");
    return;
  }

  localStorage.setItem(
   "user",
   JSON.stringify(d)
  );

  if(d.role=="admin")
    location="admin.html";
  else
    location="dashboard.html";

 });

}


/* ================= DAFTAR ================= */

function daftar(){

 let username = get("username").value;
 let password = get("password").value;

 fetch("/daftar",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
    username:username,
    password:password
  })
 })
 .then(r=>r.text())
 .then(t=>{
   alert(t);
 });

}


/* ================= TRANSFER ================= */

function transfer(){

 fetch("/transfer",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
    dari:user.username,
    ke:get("ke").value,
    jumlah:Number(get("jumlah").value)
  })
 });

}


/* ================= TOPUP ================= */

function topup(){

 fetch("/topup",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
    username:user.username,
    jumlah:Number(get("nominal").value),
    bukti:get("bukti").value
  })
 });

}


/* ================= ADMIN DATA ================= */

function loadData(){

 fetch("/data")
 .then(r=>r.json())
 .then(d=>{
  get("data").textContent =
   JSON.stringify(d,null,2);
 });

}