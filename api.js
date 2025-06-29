// fetch category data

const fetchCategory = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then (data => displayCategory(data.categories))
    .catch(err => console.error("Failed to fetch categories:", err));
}

// load category buttons dynamically



const displayCategory = (categories) => {
  const categoryContainer = document.getElementById('category-button');

  categories.forEach(category => {
    const categoryButton = document.createElement('button')
    categoryButton.innerHTML =`
    <button id="btn-${category.category}" onclick="loadCategories('${category.category}')" class="btn btn-category w-[120px] m-2">
    <img  src="${category.category_icon}" class="w-7 h-7">${category.category}</button>
      `
    categoryContainer.append(categoryButton)

  });
};
// remove-active class
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('btn-category')
    for(const btn of buttons)
    btn.classList.remove('active')
}
// load category pets when clicked

  function loadCategories(category) {

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then(res => res.json())
      .then(data => {
        removeActiveClass()
        const activeButton = document.getElementById(`btn-${category}`)
        activeButton.classList.add('active')
        displayPets(data.data); // Display pets of the selected category
      });
  }

// load-all-pets

const loadPets = () =>{
        fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then (data => displayPets(data.pets))
    .catch(err => console.error("Failed to fetch pets:", err));

}

const displayPets = (pets) => {
    const petsContainer = document.getElementById('pets-container')
    petsContainer.innerHTML = ''

    if(pets.length === 0) {
      const errorDiv = document.createElement('div')
      petsContainer.classList.remove('grid')
      errorDiv.innerHTML = `<div class = "rounded-lg h-[220px] bg-slate-300 ">
        <img class = "py-3 mx-auto" src="images/error.webp" alt="">
        <h3 class = "mb-4 text-xl font-bold text-center">No Information Available</h3>
      </div>
        `
      petsContainer.append(errorDiv)
      return
    }
    else{
         for (const pet of pets) {
        const petCards = document.createElement('div')
        petsContainer.classList.add('grid')
           petCards.innerHTML = 
    `
        <div class="w-full mb-6  max-w-[270px] bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 mx-auto">
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
      <button onclick = " handleLikeClick(event)" class="btn bg-gray-100 hover:bg-gray-200 text-gray-700"">
        <span class="like-icon">👍</span>
      </button>
      <button  onclick="handleAdoptClick(event)"  class="btn adoptBtn text-[#0E7A81] disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed">Adopt</button>
      <button onclick = "loadDetails()"  class="btn text-[#0E7A81]">Details</button>
    </div>
  </div>
</div>

        
    `
    petsContainer.append(petCards)
    }
    }




}
// load details
  const loadDetails = async(id) => {
        const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    const res = await fetch(url)
    const data = await res.json()
   detailsHandler(data.petData)
    
  }
  // load-details-handler

  const detailsHandler = (details) => {
    console.log(details)


  }



  function handleLikeClick(event) {
    let btn = event.target;
    while (btn.tagName !== 'BUTTON') {
      btn = btn.parentElement;
    }

    // Step 2: From the button, access the card container
    let cardDiv = btn;
    while (cardDiv && !cardDiv.classList.contains('max-w-[270px]')) {
      cardDiv = cardDiv.parentElement;
    }

    // Step 3: Get the image inside the card
    const image = cardDiv.querySelector('img');
    const likedContainer = document.getElementById('likedPetsContainer');

    // Step 5: Create a copy of the image and append
    const newImg = document.createElement('img');
    newImg.src = image.src;
    newImg.className = 'w-24 h-24 object-cover rounded-md border';
    likedContainer.appendChild(newImg);
  }

// show modal
let clickedBtn = null;

   function handleAdoptClick(event) {
      clickedBtn = event.target;
      clickedBtn.disabled = true;

      const modal = document.getElementById('timerModal');
      const countdownEl = document.getElementById('countdown');
      const finalMessage = document.getElementById('finalMessage');
      const closeModalBtn = document.getElementById('closeModalBtn');

      modal.classList.remove('hidden');
      modal.classList.add('flex');

      countdownEl.classList.remove('hidden');
      finalMessage.classList.add('hidden');
      closeModalBtn.classList.add('hidden');

      let timeLeft = 3;
      countdownEl.textContent = timeLeft;

      const countdown = setInterval(() => {
        timeLeft--;
        countdownEl.textContent = timeLeft;

        if (timeLeft <= 0) {
          clearInterval(countdown);
          countdownEl.classList.add('hidden');
          finalMessage.classList.remove('hidden');
          closeModalBtn.classList.remove('hidden');
        }
      }, 1000);
    }

    function closeAdoptModal() {
      const modal = document.getElementById('timerModal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }




fetchCategory()
loadPets()