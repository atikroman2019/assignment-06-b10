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
        <div class="w-full mb-6 max-w-[280px] bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 mx-auto">
  <!-- Image -->
  <figure class="px-4 pt-4">
    <img src="${pet.image}" alt="" class="rounded-lg w-full h-40 object-cover" />
  </figure>

  <!-- Content -->
  <div class="p-4 text-left space-y-1">
    <h2 class="text-lg font-semibold text-gray-800">${pet.pet_name}</h2>
    <p class="text-sm text-gray-600">Breed: ${pet.breed}</p>
    <p class="text-sm text-gray-600">Birth: ${pet.date_of_birth}</p>
    <p class="text-sm text-gray-600">Gender: ${pet.gender}</p>
    <p class="text-sm font-bold text-gray-800">Price: $${pet.price}</p>

    <div class="flex items-center flex-wrap gap-2 mt-4">
      <button class="btn bg-gray-100 hover:bg-gray-200 text-gray-700" onclick="toggleLike(this)">
        <span class="like-icon">👍</span>
      </button>
      <button class="btn text-[#0E7A81]">Adopt</button>
      <button class="btn  text-[#0E7A81] hover:text-white">
        Details
      </button>
    </div>
  </div>
</div>

        `
    }
    

}





fetchCategory()
loadPets()