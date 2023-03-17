const mealButton = document.querySelector('#meal-button');
const mealInput = document.querySelector('#meal-input');
const mealList = document.querySelector('#meal-list');

mealButton.addEventListener('click', () => {
    const searchQuery = mealInput.value.trim();
    if (searchQuery) {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            mealList.innerHTML = '';
            if (data.meals) {
                data.meals.forEach(meal => {
                    const newMeal = document.createElement('li');
                    newMeal.innerHTML = `
                    <h2>${meal.strMeal}</h2>
                    <h2>Category: ${meal.strCategory}</h2>
                    <div class="recipe" style="display: flex;">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="20%" style="padding: 5px;">
                        <div class="video-container">
                            <iframe src="${meal.strYoutube.replace('watch?v=','embed/')}" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>

                    <h2>Ingredients: </h2>
                    ${meal.strIngredient1}, ${meal.strIngredient2}, ${meal.strIngredient3}, ${meal.strIngredient4}, ${meal.strIngredient5}, ${meal.strIngredient6}, ${meal.strIngredient7}, ${meal.strIngredient8}, ${meal.strIngredient9}, ${meal.strIngredient10}, ${meal.strIngredient11}, ${meal.strIngredient12}, ${meal.strIngredient13}

                    <br>
                    <h2>Instructions: </h2>
                    ${meal.strInstructions.split('\r\n').map(instruction => `<li>${instruction}</li>`).join('')}
                    <br>
                    `;
                mealList.appendChild(newMeal);
                });
            } else {
                const noResults = document.createElement('li');
                noResults.textContent = 'No results found.';
                mealList.appendChild(noResults);
            }
        })
        .catch(error => console.log(error));
    }
})