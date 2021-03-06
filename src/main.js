
const BaseUrl = 'http://localhost:3000/dishes'

document.addEventListener('DOMContentLoaded', () => {
    getDishes()
})

//! Fetching the data from url 
function getDishes (){
    fetch(BaseUrl)
        .then(res => res.json())
        .then(dishes => dishes.forEach(dish => buildCard(dish)))
}

//! Creating a card for each dish 
function buildCard(dish){
    // console.log(dish)

    //! Locate the elements 
    let flipCard = document.querySelector('.flip-card')
    
    let flipCardInner = document.createElement('div')
    let flipCardFront = document.createElement('div')
    let img = document.createElement('img')
    let flipCardBack = document.createElement('div')
    let ul = document.createElement('ul')
    let container = document.createElement('div')
    let h5 = document.createElement('h5')
    let p = document.createElement('p')
    let likeBtn = document.createElement('button')

    //! Assign elements 

    
    flipCardInner.className = "flip-card-inner"
    flipCardFront.className = "flip-card-front"
    flipCardBack.className = "flip-card-back"
    container.className = "container"

    img.src = dish.image_url 
    img.style = "width:300px;height:300px"
    h5.innerText = dish.name 
    p.innerText = dish.likes 
    likeBtn.innerText = " ❤️ "
    dish.recipes.forEach(recipe => {
        ingredients = recipe.ingredients.split(',')
        // console.log(recipe.ingredients)
        for (i = 0; i < ingredients.length; i++){
            let li = document.createElement('li')
            li.innerText = ingredients[i]
            ul.appendChild(li)
        }
    })

    flipCard.append(flipCardInner, container)
    flipCardInner.append(flipCardFront, flipCardBack)
    flipCardFront.appendChild(img)
    flipCardBack.appendChild(ul)
    container.append(h5,p,likeBtn)
    


    
}