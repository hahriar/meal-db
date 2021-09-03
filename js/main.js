// search function
document.getElementById("search-button").addEventListener("click", ()=> {
    const searchField = document.getElementById("search-field");
    const searchedKey = searchField.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedKey}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeal(data.meals));
    // console.log(searchedKey);
    searchField.value = "";
  })
  const loadMeals = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then(res => res.json())
    .then(data => displayMeal(data.meals));
  }
  loadMeals();
  
  const displayMeal = meal => {
  const displayMealDiv = document.getElementById("display-meals");
  displayMealDiv.textContent = "";
    meal.forEach(aMeal => {
      const newCol = document.createElement("div");
    newCol.classList.add("col");
    newCol.innerHTML = `
      <div class="card h-100">
        <img src="${aMeal.strMealThumb}" class="card-img-top" alt="meals">
        <div class="card-body">
          <p class='fw-bold mb-2'>${aMeal.strCategory}</p>
          <h5 class="card-title">${aMeal.strMeal}</h5>
          <p class="card-text">${aMeal.strInstructions.substring(0, 120)}</p>
        </div>
        <div class="card-footer bg-transparent border-0">
          <button class="btn btn-danger rounded-0 shadow-none px-4" onclick="singleMeal('${aMeal.idMeal}')">More Details</button>
        </div>
      </div>
    `;
    displayMealDiv.appendChild(newCol);
    });
    // console.log(meal);
  }
  
  const singleMeal = async meal => {
    document.getElementById("open-modal").click(),
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`,
    res = await fetch(url),
    data = await res.json(),
    aMeal = data.meals[0]
    showDetail = document.getElementById("meal-details");
    showDetail.innerHTML = `
      <div class="row align-items-center mb-3">
        <div class="col-md-5">
          <img src="${aMeal.strMealThumb}" alt="mealImage">
        </div>
        <div class="col-md-7">
          <h2>${aMeal.strMeal}</h2>
          <p class='fw-bold mb-2'>Categories: ${aMeal.strCategory}</p>
          <p class='fw-bold mb-2'>Tags: ${aMeal.strTags}</p>
          <p class='fw-bold mb-2'>Area: ${aMeal.strArea}</p>
          <p class='fw-normal mb-2'>Elements: ${aMeal.strIngredient1}, ${aMeal.strIngredient2}, ${aMeal.strIngredient3}, ${aMeal.strIngredient4}</p>
          <small class="text-monospace">Weight: ${aMeal.strMeasure1}/${aMeal.strMeasure2}</small>
        </div>
      </div>
      <p class="meal-description">${aMeal.strInstructions}</p>
    `;
  
    // console.log(data.meals[0])
  }
  
  window.onload = () => {
    setTimeout(endLoad, 2500);
  }
  const endLoad = () => {
    document.getElementById("loader").style.display="none";
  }