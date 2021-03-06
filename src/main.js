
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

//! Creating a card for each dish 
function buildCard(dish){
    

    //! Locate the element to place the card  
    let flipCard = document.querySelector('.flip-card')
    
    //! Create elements 
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
    container.id = dish.id 
    // likeBtn.id = dish.id
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

    //! Event Listeners 
    likeBtn.addEventListener('click', () => updateDish(dish))

    //! Append 
    flipCard.append(flipCardInner, container)
    flipCardInner.append(flipCardFront, flipCardBack)
    flipCardFront.appendChild(img)
    flipCardBack.appendChild(ul)
    container.append(h5,p,likeBtn)
    


    
}