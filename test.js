const displayCategory = (categories) => {
  const categoryContainer = document.getElementById('category-button');

  categories.forEach(category => {
    
    const categoryButton = document.createElement('button')
    categoryButton.onclick = () => loadCategories(category);
    categoryButton.innerHTML =`
    <button class="btn w-[120px] m-2">
    <img src="${category.category_icon}" class="w-7 h-7">${category.category}</button>
      `
    categoryContainer.append(categoryButton)
  });
};
// load category pets when clicked

  function loadCategories(category) {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then(res => res.json())
      .then(data => {
        console.log(data.data); // Display pets of the selected category
      });
  }