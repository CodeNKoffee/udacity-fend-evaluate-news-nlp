(()=>{"use strict";function e(e){e.preventDefault();const t=document.getElementById("name").value;!function(e){try{return new URL(e),!0}catch(e){return!1}}(t)?alert("Please enter a valid URL"):(console.log("::: Form Submitted :::"),fetch("http://localhost:8080/api/analyze",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:t})}).then((e=>e.json())).then((e=>{console.log("API Results:",e),document.getElementById("results").innerHTML=JSON.stringify(e)})).catch((e=>{console.error("Error:",e)})))}document.addEventListener("DOMContentLoaded",(()=>{const t=document.getElementById("urlForm");t&&t.addEventListener("submit",e)}))})();