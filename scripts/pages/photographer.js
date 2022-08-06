




// //Mettre le code JavaScript lié à la page photographer.html
  

//  récupération de l'id de l'url
var params = (new URL(document.location)).searchParams;
var urlId = params.get('id'); 
var numberUrlId = parseInt(urlId)
  console.log( urlId)

//  création d'une div pour mettre les médias
  const mediaPhotographerMain = document.getElementById("main");     
  const createDiv = document.createElement('div')
  createDiv.setAttribute("class","media-photographer")
  mediaPhotographerMain.appendChild(createDiv)
  
  async function getPhotographer() {
    await fetch  ('./data/photographers.json')
      .then(function (response) { return response.json()})
      .then(function (data) { 
        arrayPhotographers = data.photographers
        arrayMedias =data.media
      })
      .catch(err => {alert(error)});  
    return arrayPhotographers, arrayMedias ;
  }

 
// récup&ration des éléments du photographe
function photographerFactory() {

  // on va trouver le photographe en fonction de l'id qui lui correspond
 foundPhotographer = arrayPhotographers.find(photographer => photographer.id === numberUrlId);

  const { name, portrait, city, country, tagline, price, id} = foundPhotographer;
  const picture = `assets/photographers/${portrait}`;

    function getPhotographerCardDOM() {
      const photographerImg = document.querySelector(".photograph-header");
      console.log(photographerImg)
        const sectionPresentation = document.createElement('section');
        sectionPresentation.setAttribute("class", "photograph-header_presentation")
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "photo de "+name)
        
        const h1 = document.createElement( 'h1' );
        h1.textContent = name;

        // création via le dom du paragraphe ville et pays
        const pCityCountry = document.createElement('p');
        pCityCountry.textContent = city+", "+country;
        pCityCountry.setAttribute("class", "photograph-header_presentation_city_country")

        // création via le dom du paragraphe slogan
        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.setAttribute("class", "photograph-header_presentation_city_tagline")

        // insertion des éléments ds le header
        sectionPresentation.appendChild(h1);
        sectionPresentation.appendChild(pCityCountry)
        sectionPresentation.appendChild(pTagline)
        photographerImg.appendChild(img)
        return (sectionPresentation);
    }
    return { getPhotographerCardDOM }

}

 // affichage de photographe
 async function displayPhotographer() {
  
  const photographerSection = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory();
  const userCardDOM = photographerModel.getPhotographerCardDOM();
  photographerSection.insertAdjacentElement('afterbegin', userCardDOM);          
}

/////////////////////////////////////////////////////////
// recupération  des photos du photographe selon l'id de l'url
function mediaFactory() {
  let mediaArray =[];
  // boucle pour récupérer les photos du photographe
  arrayMedias.forEach((foundMedia) => {
    if (foundMedia.photographerId === numberUrlId){
      mediaArray.push(foundMedia)
      const {date, id, image, video, likes, photographerId, price, title} = foundMedia;
      
      
    }

  });
  
  displayMediaPhotographer(mediaArray)
}

// affichage des photos du photographe
async function displayMediaPhotographer(foundMedia){
    // on stock les vidéos et photos dans un array
    let mediaLightBoxs = [];
    foundMedia.forEach((currentMedia) => {
    
        const {date, id, image, video,  likes, photographerId, price, title} = currentMedia
        
        // **** GRID **** //
        // pour récuperer le prénom du photographe
        let foundPhotographer = arrayPhotographers.find(photographer => photographer.id === numberUrlId);
        let name = foundPhotographer.name;
        let firstName = name.split(" ")[0];
    
        const mediaPhotographerImgVid = document.createElement("figure")
        createDiv.appendChild(mediaPhotographerImgVid)
        
        //  gestion du chemin si vidéo ou image
        if (currentMedia.hasOwnProperty("image")) {
            const img = document.createElement('img')
            const pathMedia = `./assets/SamplePhotos/${firstName}/${image}`;
            img.setAttribute("src", pathMedia)
            // img.setAttribute("id", "lightboxImg")
            mediaPhotographerImgVid.setAttribute("class", "media-photographer-display")
            mediaPhotographerImgVid.appendChild(img)
            mediaLightBoxs.push(img)
            
            // const priceSpan = document.createElement("span")
            // priceSpan.setAttribute("class", "media-photographer-display-legende-price")
            // MediaPhotographerLegende.appendChild(priceSpan)
            // price.innerHTML= price;
            // priceSpan.appendChild(price)
            
            // likesSpan.appendChild(likes)
            // let prices = price+"€/jour"

        } else {
            const videoMedia = document.createElement('video')
            const pathMedia = `./assets/SamplePhotos/${firstName}/${video}`;
            videoMedia.setAttribute("name", "media")
            videoMedia.setAttribute("src", pathMedia)
            videoMedia.setAttribute("type", "video/mp4")
            mediaPhotographerImgVid.setAttribute("class", "media-photographer-display")
            mediaPhotographerImgVid.appendChild(videoMedia)
            mediaLightBoxs.push(videoMedia)
        }

        // légende
        const MediaPhotographerLegende =document.createElement("figcaption")
        MediaPhotographerLegende.setAttribute("class", "media-photographer-display-legende")
        mediaPhotographerImgVid.appendChild(MediaPhotographerLegende)

        // titre de légende
        
        const titleSpan = document.createElement("span")
        titleSpan.setAttribute("class", "media-photographer-display-legende-title")
        MediaPhotographerLegende.appendChild(titleSpan)
        titleSpan.innerText=currentMedia.title


        // span pour le like+icone coeur
        const likesSpan = document.createElement("span")
        likesSpan.setAttribute("class", "media-photographer-display-legende-likes")
        MediaPhotographerLegende.appendChild(likesSpan)
        likesSpan.innerText = currentMedia.likes
      
        const hearthIcon = document.createElement("img")
        hearthIcon.setAttribute("src","./assets/icons/hearth.svg") 
        hearthIcon.id ="hearthIcon"

        hearthIcon.setAttribute("class","media-photographer-display-legende-hearth")
        likesSpan.appendChild(hearthIcon)

    });

      

    //*********** FONCTION TRI ***********/
        
        // tri par likes (popularités)

          let triLikesCroissant  = foundMedia.sort(function(a,b){
            return a.likes - b.likes;
          })
          let triLikesDecroissant  = foundMedia.sort(function(a,b){
            return b.likes - a.likes;
          })
        

          // tri par date

          const triDateCroissant = foundMedia.sort(function(a, b) { 
            a = new Date(a.date);
            b = new Date(b.date);
            return a >b ? -1 : a < b ? 1 : 0;
           })

          
          let triDateDecroissant  = foundMedia.sort(function(a, b) { 
            a = new Date(a.date);
            b = new Date(b.date);
            return b > a ? 1 : b < a ? -1 : 0;
           })

          console.log(triDateCroissant)
          console.log(triDateDecroissant)

    //*********** LIGHTBOX ***********/

    // création de la Lightbox
    const lightBox = document.createElement("div")
    lightBox.id = "lightbox"

    // on va mettre les medias dans cette div
    const container_Media =document.createElement("div")
    container_Media.id = "container_Media"
    
    // création des icones en svg (flèches et close)
    // flèche droite
    const rightArrowIcon = document.createElement("img")
    rightArrowIcon.setAttribute("src","./assets/icons/RightArrow.svg") 
    rightArrowIcon.id ="rightArrow"


    // flèche gauche
    const leftArrowIcon = document.createElement("img")
    leftArrowIcon.setAttribute("src","./assets/icons/LeftArrow.svg") 
    leftArrowIcon.id ="leftArrow"

    // croix de fermeture
    const closeIcon = document.createElement("img")
    closeIcon.setAttribute("src","./assets/icons/close.svg") 
    closeIcon.id ="close"


    mediaPhotographerMain.appendChild(lightBox)
    lightBox.appendChild(rightArrowIcon)
    lightBox.appendChild(container_Media)
    lightBox.appendChild(leftArrowIcon)
    lightBox.appendChild(closeIcon)
    
    // boucle 
    mediaLightBoxs.forEach(mediaLightBox=> {

                mediaLightBox.addEventListener("click", () => {
                  console.log("fffffffffffff")
                    lightBox.classList.add("active")
                    mediaLightBox.id="lightBoxMedia"
                    document.getElementById("lightBoxMedia").classList="lightBoxMedia active"
                    container_Media.appendChild(mediaLightBox)
                    rightArrowIcon.classList.add("rightArrowActive")
                    leftArrowIcon.classList.add("leftArrowActive")
                    closeIcon.classList.add("closeActive")
                    
                })
            

            // caroussel pour afficher nos images
            function carroussel (){
                let i = 0
                const rightLightBoxs = document.querySelector("img#rightArrow")
                const leftLightBoxs = document.querySelector("img#leftArrow")
                const closeLightBoxs = document.querySelector("img#close") 
                

                // défilement du carrousel sur le coté droit
                rightLightBoxs.addEventListener("click", ()=> {
                  console.log(mediaLightBoxs.length)
                  console.log("i :"+i)
                    if (i < mediaLightBoxs.length ){ 

                        mediaLightBoxs[i].id="lightBoxMedia"
                        mediaLightBoxs[i].classList="lightBoxMedia active"
                        container_Media.removeChild(container_Media.firstChild)
                        container_Media.appendChild(mediaLightBoxs[i++])  
                    
                    } else if (i = mediaLightBoxs.length){
                          i=0
                          mediaLightBoxs[i].id="lightBoxMedia"
                          mediaLightBoxs[i].classList="lightBoxMedia active"
                          container_Media.removeChild(container_Media.firstChild)
                          container_Media.appendChild(mediaLightBoxs[i])  
                    } else {
                      mediaLightBoxs[i].id="lightBoxMedia"
                        mediaLightBoxs[i].classList="lightBoxMedia active"
                        container_Media.removeChild(container_Media.firstChild)
                        container_Media.appendChild(mediaLightBoxs[i++])  
                    }
                })  


                // défilement du carrousel sur le coté gauhce
                leftLightBoxs.addEventListener("click", ()=> {
          
                  if (i > mediaLightBoxs.length-1 ){ 
                    console.log("iiiiii-- :" +i) 
                        mediaLightBoxs[i].id="lightBoxMedia"
                        mediaLightBoxs[i].classList="lightBoxMedia active"
                        container_Media.removeChild(container_Media.firstChild)
                        container_Media.appendChild(mediaLightBoxs[i--])
                        
                  } else if (i = mediaLightBoxs.length){
                        i=mediaLightBoxs.length-1
                        mediaLightBoxs[i].id="lightBoxMedia"
                        mediaLightBoxs[i].classList="lightBoxMedia active"
                        container_Media.removeChild(container_Media.firstChild)
                        container_Media.appendChild(mediaLightBoxs[i--]) 
                  } 
                })
                // fermture via la croix
                closeLightBoxs.addEventListener("click", () => {
                  container_Media.removeChild(mediaLightBox)
                  
                  lightBox.style.display = "none"
                })
                
            }
            window.onload =carroussel()

          })       
}

async function init() {
  // Récupère les datas des photographes
  const  foundPhotographer  = await getPhotographer();
  photographerFactory();
  displayPhotographer();
  const mediaArray = await getPhotographer()
  mediaFactory();

};

init();