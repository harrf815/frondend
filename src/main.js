//TODO: Gobal Variables //////////////////////////////////////////////////////////////////
const BaseUrl = 'http://localhost:3000/dishes'

let addDish = false;
let addRecipe = false;

//TODO: DOMContentLoaded /////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    getDishes()
})
    
//TODO: Forms //////////////////////////////////////////////////////////////////////////
//! Locating forms 
const form = document.querySelector('form')
const form2 = document.querySelector('#form-add-recipe')

//! Form events 
form.addEventListener('submit', handleSubmit)

//! Added a add button to toggle the create dish form 
const addBtn = document.querySelector("#add-dish")
addBtn.addEventListener("click", () => {
    addDish = !addDish;
    if (addDish) {
        form.style.display = "block" ;
    } else {
        form.style.display = "none";
    }
});

//! Added a recipe button to toggle the create recipe form 
const recipeBtn = document.querySelector("#add-recipe")
recipeBtn.addEventListener("click", () => {
    addRecipe = !addRecipe;
    if (addRecipe) {
      form2.style.display = "block" ;
    } else {
      form2.style.display = "none";
    }
  });

//! Create a recipe form 
function recipeForm(dishes){

    //! Locate the placeholder 
    let form = document.querySelector("#form-add-recipe")

    //! Create elements 
    let div = document.createElement('div')
    let label2 = document.createElement('label')
    let textarea = document.createElement('textarea')
    let label3 = document.createElement('label')
    let select = document.createElement('select')
    let submitBtn = document.createElement('button')
    let br = document.createElement('br')
    let br2 = document.createElement('br')

    //! Assign elements
    label2.innerText = "Ingredients "
    textarea.placeholder = "Please add a comma after each ingredient"
    textarea.rows = 20
    textarea.style = "width:500px"
    textarea.className = "form-control"
    label3.className = "dish-name"
    label3.innerText = "Dish:  "
    submitBtn.innerText = "Submit"
    submitBtn.id = "recipe-submit"
    submitBtn.className = "form-submit"
    select.className = "form-select"

    dishes.forEach(dish =>{
        let option = document.createElement('option')
        option.innerText = dish.name
        option.value = dish.id
        select.appendChild(option)
    })
    //! Event Listeners
    form.addEventListener('submit', handleRecipe)

    //! Append
    form.appendChild(div)
    div.append(label3, select, br, textarea, br2, submitBtn)
}

//! Handles the recipe submit function 
function handleRecipe(e){
    e.preventDefault()

    let newRecipe = {
        dish_id: e.target[0].value,
        ingredients: e.target[1].value
    }
    postRecipe(newRecipe)
}

//! Handles the dish submit function 
function handleSubmit(e){
    e.preventDefault()
    
    let newDish = {
        name: e.target.name.value,
        category: e.target.category.value,
        image_url: e.target.image_url.value,
    }
    postDish(newDish)
}
//TODO: Data /////////////////////////////////////////////////////////////////////////////

//! Adding to the recipe data 
function postRecipe(newRecipe){
    fetch(`http://localhost:3000/recipes`,{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newRecipe)
    })
    .then(res => res.json())
    .then(dish =>{
        
        let flipCard = document.getElementById(newRecipe.dish_id)
        let ul = flipCard.querySelector('ul')
        let ingredients = dish.ingredients.split(',') 
        for (i = 0; i <ingredients.length; i++){
            let li = document.createElement('li')
            li.innerText = ingredients[i]
            ul.appendChild(li)
        }
    })
    
}

//! Adding to the dish data 
function postDish(newDish){
    fetch(BaseUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newDish)
    })
    .then(res => res.json())
    .then(dish => buildCard(dish))
}

//! Fetching the data 
function getDishes (){
    fetch(BaseUrl)
        .then(res => res.json())
        .then(dishes => {
            // byCategory(dishes)
            recipeForm(dishes)
            dishes.forEach(dish => buildCard(dish))
        })
}

//! Deleting the data 
function deleteDish(dish){
    fetch(BaseUrl + `/${dish.id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(() => {
        let flipCard = document.getElementById(dish.id)
        flipCard.remove()   
    })
}

//! Updating the data 
function updateDish(dish){
    dish.likes++
    
    fetch(BaseUrl + `/${dish.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({likes: dish.likes})
    })
    .then(res => res.json())
    .then(dish => {
        let oldDish = document.getElementById(dish.id)
        let p = oldDish.querySelector('p')
        p.innerText = dish.likes
    })
}

//TODO: Card Display //////////////////////////////////////////////////////////////////
//! Creating a card for each dish 
function buildCard(dish){
    
    //! Locate the element to place the card  
    let listCards = document.querySelector(".list-of-cards")
    
    //! Create elements 
    let flipCard = document.createElement('div')
    let flipCardInner = document.createElement('div')
    let flipCardFront = document.createElement('div')
    let img = document.createElement('img')
    let flipCardBack = document.createElement('div')
    let ul = document.createElement('ul')
    let container2 = document.createElement('div')
    let h5 = document.createElement('h5')
    let p = document.createElement('p')
    let likeBtn = document.createElement('button')
    let delBtn = document.createElement('button')
    let br = document.createElement('br')

    //! Assign elements 
    flipCard.className = "flip-card"
    flipCard.id = dish.id
    flipCardInner.className = "flip-card-inner"
    flipCardFront.className = "flip-card-front"
    flipCardBack.className = "flip-card-back"
    container2.className = "container2"
    img.src = dish.image_url 
    img.style = "width:300px;height:300px"
    h5.innerText = dish.name 
    p.innerText = dish.likes 
    p.style="display:inline-block"
    delBtn.innerText = " 🚫 "
    delBtn.className = "del-button"
    likeBtn.innerText = " ❤️ "
    likeBtn.className = "like-button"
    dish.recipes.forEach(recipe => {
        ingredients = recipe.ingredients.split(',')
        for (i = 0; i < ingredients.length; i++){
            let li = document.createElement('li')
            li.innerText = ingredients[i]
            ul.appendChild(li)
        }
    })

    //! Event Listeners 
    likeBtn.addEventListener('click', () => updateDish(dish))
    delBtn.addEventListener('click', () => deleteDish(dish))

    //! Append 
    listCards.appendChild(flipCard)
    flipCard.append(flipCardInner, container2, br)
    flipCardInner.append(flipCardFront, flipCardBack)
    flipCardFront.appendChild(img)
    flipCardBack.append(ul, delBtn)
    container2.append(h5,p,likeBtn)
}
//!
// const category = document.querySelector('h3')
// category.addEventListener('click',)

//! 
// function byCategory(dishes){

// }