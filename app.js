// Select containers
const recipesContainer = document.getElementById('recipes');
const bookmarksContainer = document.getElementById('bookmarks');

// Fetch the JSON data
fetch('data/recipes.json')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    displayRecipes(data);
    loadBookmarks(data); // Load bookmarks from localStorage
  })
  .catch(error => console.error('Error fetching recipes:', error));

// Function to display recipes
function displayRecipes(recipes) {
  recipesContainer.innerHTML = ''; // Clear the container
  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.innerHTML = `
      <h3>${recipe.name}</h3>
      <p>${recipe.description}</p>
      <button onclick="bookmarkRecipe(${recipe.id})">Bookmark</button>
    `;
    recipesContainer.appendChild(recipeCard);
  });
}

// Function to bookmark a recipe
function bookmarkRecipe(id) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];
  if (!bookmarks.includes(id)) {
    bookmarks.push(id);
    localStorage.setItem('bookmarkedRecipes', JSON.stringify(bookmarks));
    alert('Recipe bookmarked!');
    updateBookmarks();
  } else {
    alert('Recipe is already bookmarked!');
  }
}

// Function to remove a bookmark
function removeBookmark(id) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];
  bookmarks = bookmarks.filter(bookmarkId => bookmarkId !== id);
  localStorage.setItem('bookmarkedRecipes', JSON.stringify(bookmarks));
  updateBookmarks();
}

// Function to update and display bookmarks
function updateBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];
  fetch('data/recipes.json')
    .then(response => response.json())
    .then(recipes => {
      const bookmarkedRecipes = recipes.filter(recipe => bookmarks.includes(recipe.id));
      displayBookmarkedRecipes(bookmarkedRecipes);
    });
}

// Function to load bookmarks on page load
function loadBookmarks(recipes) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];
  const bookmarkedRecipes = recipes.filter(recipe => bookmarks.includes(recipe.id));
  displayBookmarkedRecipes(bookmarkedRecipes);
}

// Function to display bookmarked recipes
function displayBookmarkedRecipes(recipes) {
  bookmarksContainer.innerHTML = ''; // Clear the container
  if (recipes.length === 0) {
    bookmarksContainer.innerHTML = '<p>No bookmarks yet!</p>';
    return;
  }
  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.innerHTML = `
      <h3>${recipe.name}</h3>
      <p>${recipe.description}</p>
      <button onclick="removeBookmark(${recipe.id})">Remove</button>
    `;
    bookmarksContainer.appendChild(recipeCard);
  });
}

// Clear all bookmarks (optional bonus feature)
function clearAllBookmarks() {
    localStorage.removeItem('bookmarkedRecipes');
    updateBookmarks();
    alert('All bookmarks cleared!');
  }
  
