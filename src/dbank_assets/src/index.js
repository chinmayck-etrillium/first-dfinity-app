import {dbank} from "../../declarations/dbank"

async function update(){
  let currentValue;
  try {
    currentValue = await dbank.getCurrentValue();
    currentValue = currentValue.toFixed(2);
  } catch (error) {
    console.error(error)
  }

  return currentValue;
}

window.addEventListener("load", async function(){
let currentValue = await update();  
document.getElementById("value").innerText=currentValue;
})

document.querySelector("form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const input = parseFloat(document.getElementById("input-amount").value);
  const output = parseFloat(document.getElementById("withdrawal-amount").value);

  let button = document.getElementById("submit-btn");
  button.setAttribute("disabled", true)

 
 try {
  if(input){
    await dbank.topUp(input);
   }
   if(output){
    await dbank.withdraw(output);
   }
 } catch (error) {
  console.error(error)
 }
  
  button.removeAttribute("disabled");

  let currentValue = await update(); 

  document.getElementById("value").innerText=currentValue;

})

