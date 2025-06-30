
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
  const spinner = document.getElementById('spinner');
  const petsContainer = document.getElementById('pets-container');

  // Show spinner
  petsContainer.innerHTML = ''; // Optional: clear old pets
  spinner.classList.remove('hidden');

  // Delay for 2 seconds
  setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then(res => res.json())
      .then(data => {
        removeActiveClass();
        const activeButton = document.getElementById(`btn-${category}`);
        activeButton.classList.add('active');

        spinner.classList.add('hidden'); // Hide spinner
        displayPets(data.data); // Show pets
      });
  }, 2000);
}


// load-all-pets

const loadPets = () =>{
        fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then (data => displayPets(data.pets))
    .catch(err => console.error("Failed to fetch pets:", err));

}
// sort-by-price
let currentPets = [];
const sortByPrice = () => {
  if (!currentPets || currentPets.length === 0) {
    alert("No pets to sort.");
    return;
  }

  const sorted = [...currentPets].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  displayPets(sorted);
};



// display-all-pets
const displayPets = (pets) => {
  currentPets = [...pets];
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
  <div class="p-3 text-left space-y-1">
    <h2 class="text-lg font-semibold text-gray-800">${pet.pet_name}</h2>
      <p class="text-gray-600 flex gap-1 m-2"><img src="icons8-windows-11-24.png" class="mt-1 w-4 h-4" />
     ${pet.breed?.trim() ? pet.breed : 'No data'}</p>
      <p class="text-gray-600 flex gap-1 m-2"><img class="mt-1 w-4 h-4" src="icons8-calendar-24.png"  />
       ${pet.date_of_birth?.trim() ? pet.date_of_birth : 'No data'}</p>
       <p class="text-gray-600 flex gap-1 m-2"><img class="mt-1 w-4 h-4" src="icons8-female-26.png"  /> 
        ${pet.gender?.trim() ? pet.gender : 'No data'}</p>
       <p class="text-gray-600 flex  m-2"><img class="mt-1 w-4 h-4" src="icons8-us-dollar-32.png"/>
        ${pet.price != null && pet.price !== '' ?`${pet.price}$`: 'No data'}</p>


    <div class="flex items-center flex-wrap gap-2 mt-4">
      <button onclick = " handleLikeClick(event)" class="btn bg-gray-100 hover:bg-gray-200 text-gray-700"">
        <span class="like-icon">👍</span>
      </button>
      <button  onclick="handleAdoptClick(event)"  class="btn adoptBtn text-[#0E7A81] disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed">Adopt</button>
      <button onclick = "loadDetails('${pet.petId}')"  class="btn btn-details text-[#0E7A81]">Details</button>
    </div>
  </div>
</div>

        
    `
    petsContainer.append(petCards)
    }
    }


}
// load details
  const loadDetails = async(petId) => {
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(url);
    const data = await res.json();
    detailsHandler(data.petData);
  };
  // load-details-handler 

const detailsHandler = (petData) => {
  console.log(petData);
  const detailsModal = document.getElementById('details-modal'); 
  detailsModal.innerHTML = `
    <img src="${petData.image}" class="w-[500px] h-full object-cover mx-auto"/>
    <h2 class="text-lg font-semibold mt-4">${petData.pet_name}</h2>
    <div class = "grid grid-cols-2">
     <p class="text-gray-600 flex gap-1 m-2"><img src="icons8-windows-11-24.png" class="mt-1 w-4 h-4" />
     ${petData.breed?.trim() ? petData.breed : 'No data'}</p>
      <p class="text-gray-600 flex gap-1 m-2"><img class="mt-1 w-4 h-4" src="icons8-calendar-24.png"  />
       ${petData.date_of_birth?.trim() ? petData.date_of_birth : 'No data'}</p>
    </div>
    <div class = "grid grid-cols-2 ">
      <p class="text-gray-600 flex gap-1 m-2"><img class="mt-1 w-4 h-4" src="icons8-female-26.png"  /> ${petData.gender?.trim() ? petData.gender : 'No data'}</p>
      <p class="text-gray-600 flex  m-2"><img class="mt-1 w-4 h-4" src="icons8-us-dollar-32.png"/>${petData.price != null && petData.price !== '' ?`${petData.price}$`: 'No data'}</p>
    </div>
      <p class="text-gray-600 flex gap-1 m-2"><img class="mt-1 w-4 h-4" src="icons8-male-32.png"  /> ${petData.vaccinated_status?.trim() ?petData.vaccinated_status : 'No data'}</p>

      <h2 class="text-lg font-semibold mt-4">Details Information</h2>

      <p class="text-gray-600  m-2"> ${petData.pet_details?.trim() ?petData.pet_details : 'No data'}</p>



  `;
  document.getElementById('my_modal_4').showModal();
};

// add images to another div from cards when clicked like button

  function handleLikeClick(event) {
    let btn = event.target;
    while (btn.tagName !== 'BUTTON') {
      btn = btn.parentElement;
    }

    let cardDiv = btn
    let width = 'max-w-[270px]'
    while (cardDiv && !cardDiv.classList.contains(width)) {
      cardDiv = cardDiv.parentElement;
    }

    const image = cardDiv.querySelector('img');
    const likedContainer = document.getElementById('likedPetsContainer');

    const newImg = document.createElement('img');
    newImg.src = image.src;
    newImg.className = 'w-24 h-24 object-cover rounded-md border';
    likedContainer.appendChild(newImg);
  }

// show timer modal
let clickedBtn = null;

   function handleAdoptClick(event) {
      clickedBtn = event.target;
      clickedBtn.disabled = true;

      const modal = document.getElementById('timerModal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');

      const countdownElement = document.getElementById('countdown');

      const finalMessage = document.getElementById('finalMessage');
      const closeModalBtn = document.getElementById('closeModalBtn');

  
      countdownElement.classList.remove('hidden');
      finalMessage.classList.add('hidden');
      closeModalBtn.classList.add('hidden');

      let timeLeft = 3;
      countdownElement.textContent = timeLeft;

      const countdown = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;

        if (timeLeft <= 0) {
          clearInterval(countdown);
          countdownElement.classList.add('hidden');
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