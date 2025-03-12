// btn categories
const btnCategories = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
  const data = await response.json();
  btnCat(data.categories)
}

function btnCat(categories) {
  for (const cat of categories) {

    const btnCategories = document.getElementById('btn-Categories')

    const newBtn = document.createElement('div')
    newBtn.innerHTML = `
    <button id="btn-${cat.category_id}" onclick="lodeVideos(${cat.category_id})" class="btn hover:bg-[#FF1F3D] hover:text-white"> ${cat.category} </button>
    `
    btnCategories.appendChild(newBtn)
  }
}
btnCategories();


// video section
const videoSection = async (searchInput = '') => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title= ${searchInput}`);
  const data = await response.json()
  displayVideo(data.videos)
  removeActiveButton()
  const btnAll = document.getElementById('btn-all').classList.add('active')
}

const displayVideo = (videos) => {
  const videoContainer = document.getElementById('video-section')
  videoContainer.innerHTML = "";
  if (videos.length === 0) {
    videoContainer.innerHTML = `
     <div class="col-span-full flex flex-col justify-center items-center py-20">
      <img class="w-[120px]" src="asst/Icon.png" alt="">
      <h1 class="font-bold text-2xl text-center mt-3">Oops!! Sorry, There is no <br> content here</h1>
    </div>
    `
    return;
  }
  videos.forEach(video => {
console.log(video)
    const videoDiv = document.createElement('div')
    videoDiv.innerHTML = `
     <div class="card bg-base-100  ">
        <figure class="relative">
          <img class="w-full h-[150px] object-cover"
            src="${video.thumbnail}"
            alt="Shoes" />
            <span class=" text-white bg-black px-2 text-sm rounded absolute bottom-2 right-2">3hrs 56 min ago</span>
        </figure>
        <div class=" flex gap-3 px-0 py-5">
         <!-- avatar -->
          <div>
            <div class="avatar">
              <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                <img src="${video.authors[0].profile_picture}" />
              </div>
            </div>
          </div>
          <!-- text -->
           <div>
            <h1 class="font-semibold text-xl">${video.title}</h1>
            <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} 
            ${video.authors[0].verified == true ? `<img class="w-5 h-5 bg-green-500 rounded-full" src="https://img.icons8.com/?size=32&id=AOpCOemSYvTO&format=png" alt="">`: `` }
            </p>
            <p class="text-sm text-gray-400">${video.others.views} views</p>
           </div>
         
        </div>
        <button onclick="videoDetails('${video.video_id
        }')" class="btn btn-block">video details</button>
      </div>
    `
    videoContainer.appendChild(videoDiv)

  })
}

// lode videos
const lodeVideos = async (id) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  const data = await response.json()
  displayVideo(data.category)
  const clickButton = document.getElementById(`btn-${id}`)
  removeActiveButton()
  clickButton.classList.add('active')
}
// active button
const removeActiveButton = () => {
  const activeButtons = document.getElementsByClassName('active')
  for (const btn of activeButtons) {
    btn.classList.remove('active')
  }
}

// video details
const videoDetails =async (videoId) =>{
  const response =await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
  const data = await response.json()
  displayVideoDetails(data.video)
}

const displayVideoDetails = (video) =>{
console.log(video)
 document.getElementById('video_modal').showModal();
 const videoModalContainer = document.getElementById('video-modal-container');
 videoModalContainer.innerHTML=`
 <div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img class="object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    
  </div>
</div>

 `

} 

// search-box
document. getElementById('search-box').addEventListener('keyup', (event) =>{
const searchInput = event.target.value;
videoSection(searchInput);
})


