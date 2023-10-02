//SELECTORS
const date= document.querySelector(".date");
const word= document.querySelector(".word");
const description= document.querySelector(".description");
const btn= document.querySelector(".btn button");

//VARIABLES
const APIKey= '1003328c-7b87-433e-a02d-7fa4aada1614';



//EVENT LISTENERS
btn.addEventListener("click", fecthWord);

document.addEventListener("DOMContentLoaded", function(){
    localStorage.removeItem("today");

    date.innerHTML= new Date().toDateString();
});


//FUNCTIONS
function fecthWord(){
  const today= localStorage.getItem("today");

  const currentDate= new Date();
  const dayOfTheMonth= currentDate.getDate();

  if(today){
    if(today != dayOfTheMonth){  
      generateNewWord(currentDate);
    }
    else{
        return;
    }
  }
  else{
      generateNewWord(currentDate);
  }
}


function generateNewWord(currentDate){
  fetch("https://random-word-api.herokuapp.com/word")
  .then(res=> res.json())
  .then(res=> {
      fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${res[0]}?key=${APIKey}`)
      .then(res=> res.json())
      .then(res=> {
          console.log(res);
          displayWord(res[0], currentDate)
      })
      .catch(err=> console.log(err))
      })
  .catch(err=> console.log(err));

  localStorage.setItem("today", currentDate.getDate());
}



function displayWord(data, currentDate){

     date.innerHTML= currentDate.toDateString();
     word.innerHTML= data.meta.stems[0];

     description.innerHTML= "";

     data.shortdef.forEach(function(def, index){
       const defHTHL= `<p>${index + 1}. ${def}</p>`;

       description.insertAdjacentHTML("beforeend", defHTHL);

     })
}
