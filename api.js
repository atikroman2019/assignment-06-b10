// fetch category data

const fetchCategory = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then (data => displayCategory(data.categories))
    .catch(err => console.error("Failed to fetch categories:", err));
}

// load category


const displayCategory = (categories) => {
  const categoryContainer = document.getElementById('category-button');

  categories.forEach(category => {
    categoryContainer.innerHTML += `
      <button class="btn w-[120px] m-2">
        <img src="${category.category_icon}" alt="${category.category}" class="w-7 h-7">
        <span>${category.category}</span>
      </button>
      `
  });
};

// load-all-pets

const loadPets = () =>{
        fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then (data => displayPets(data.pets))
    .catch(err => console.error("Failed to fetch pets:", err));

}

const displayPets = (pets) => {
    console.log(pets)
    const petsContainer = document.getElementById('pets-container')
    petsContainer.innerHTML = ''
    for (const pet of pets) {
        console.log(pet)
        petsContainer.innerHTML += `
        <div class="card bg-base-100 w-96 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src="${pet.image}"
      alt=""
      class="rounded-xl" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${pet.pet_name}</h2>
    <p>Breed: ${pet.breed}</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        `
    }
    

}





fetchCategory()
loadPets()