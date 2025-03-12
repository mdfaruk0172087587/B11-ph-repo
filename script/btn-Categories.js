// btn categories
const btnCategories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
    const data = await response.json();
    btnCat(data.categories)
}

function btnCat(categories) {
for(const cat of categories){
    const btnCategories = document.getElementById('btn-Categories')
    const newBtn = document.createElement('div')
    newBtn.innerHTML=`
    <button class="btn hover:bg-[#FF1F3D] hover:text-white"> ${cat.category} </button>
    `
btnCategories.appendChild(newBtn)
}
}

btnCategories();
// video section
const videoSection = async() =>{
    const response =await fetch("https://openapi.programming-hero.com/api/phero-tube/videos");
    const data =await response.json()
   displayVideo(data.videos)
}

const displayVideo = (videos) =>{
const videoContainer = document.getElementById('video-section')
videos.forEach(video =>{
    console.log(video)
    const videoDiv = document.createElement('div')
    videoDiv.innerHTML=`
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
                <img src="${video.authors[0].profile_picture
                }" />
              </div>
            </div>
          </div>
          <!-- text -->
           <div>
            <h1 class="font-semibold text-xl">${video.title}</h1>
            <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}<img class="w-5 h-5 bg-green-500 rounded-full" src="https://img.icons8.com/?size=32&id=AOpCOemSYvTO&format=png" alt=""></p>
            <p class="text-sm text-gray-400">${video.others.views} views</p>
           </div>
         
        </div>
      </div>
    `
    videoContainer.appendChild(videoDiv)

})
}

videoSection()