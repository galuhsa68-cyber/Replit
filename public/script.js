let user = JSON.parse(localStorage.getItem("user"));

function login(){

 fetch("/login",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({
    username:username.value,
    password:password.value
  })
 })
 .then(r=>r.json())
 .then(d=>{

  localStorage.setItem("user",JSON.stringify(d));

  if(d.role=="admin")
    location="admin.html";
  else
    location="dashboard.html";

 });

}

function daftar(){

 fetch("/daftar",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({
    username:username.value,
    password:password.value
  })
 });

}

function transfer(){

 fetch("/transfer",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({
    dari:user.username,
    ke:ke.value,
    jumlah:Number(jumlah.value)
  })
 });

}

function topup(){

 fetch("/topup",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({
    username:user.username,
    jumlah:Number(nominal.value),
    bukti:bukti.value
  })
 });

}

function loadData(){

 fetch("/data")
 .then(r=>r.json())
 .then(d=>{
  data.textContent=
   JSON.stringify(d,null,2);
 });

}
