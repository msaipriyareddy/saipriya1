const inputbox=document.getElementById("input-box");
const listcontainer=document.getElementById("list-cointaner");

function addTask(){
  if(inputbox.value==''){
    alert("you must write something!");
  }else{
    let li=document.createElement("li");
    li.innerHTML=inputbox.value;
    listcontainer.appendChild(li);
    let span=document.createElement("span");
    span.innerHTML="\u00d7";
    li.appendChild(span);
  }
  inputbox.value="";
  saveDta()
}
listcontainer.addEventListener("click",function(e){
  if(e.target.tagName== "LI"){
    e.target.classList.toggle("checked");
    saveDta()
  }else if(e.target.tagName==="SPAN"){
    e.target.parentElement.remove();
    saveDta()
  }
},false);
function saveDta(){
  localStorage.setItem("data",listcontainer.innerHTML)
}
function showtask(){
  listcontainer.innerHTML=localStorage.getItem("data");
}
showtask();