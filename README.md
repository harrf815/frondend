Name: Insta Recipes 

Models: 

Dish:
-	Name
-	Category (breakfast, appetizer, lunch, dinner, dessert) 
-	Likes 

Ingredient:
-	Ingredients – array 
-	Instructions 
-	Food id

Relationship:

Dish:
has many recipes 

Recipe:
Belongs to dish 

User Story:

User can like a dish/ recipe 
User can create a dish/recipe 

Fun interactions:

list of food categories (breakfast, appetizer, lunch, dinner, dessert), (most popular) 
Food card can flip to show recipe 
like button
create button 

If Possible:

Have the card move around based on the total likes 

Stretch Goals:

Add a review
Edit recipes 
Delete recipes 
Add a user 
