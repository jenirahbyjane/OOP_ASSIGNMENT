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
        mealList.innerHTML = ''; // clear previous search results
        if (data.meals) {
          data.meals.forEach(meal => {
            // Create a new list item with the meal name, recipe, image, and YouTube video
            const newMeal = document.createElement('li');
            newMeal.innerHTML = `
              <h2>${meal.strMeal}</h2>
              <div class="recipe" style="display: flex;">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="20%">
                <div class="video-container" style"display: flex;" width="20%">
                    <iframe src="${meal.strYoutube.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen></iframe>
                </div>
              </div>
              <ul style="list-style-type: disc; text-align: justify;">
                ${meal.strInstructions.split('\r\n').map(instruction => `<li>${instruction}</li>`).join('')}
              </ul>
            `;
            mealList.appendChild(newMeal);
          });
        } else {
          const noResults = document.createElement('li');
          noResults.textContent = 'No results found.';
          mealList.appendChild(noResults);
        }
      })
      .catch(error => console.error(error));
  }
});