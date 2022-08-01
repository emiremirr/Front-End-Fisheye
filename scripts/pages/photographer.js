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

// recupération  des photos du photographe selon l'id de l'url
function mediaFactory() {
  let mediaArray =[];
  // boucle pour récupérer les photos du photographe
  arrayMedias.forEach((foundMedia) => {
    if (foundMedia.photographerId === numberUrlId){
      mediaArray.push(foundMedia)
      const {date, id, image, likes, photographerId, price, title} = foundMedia;
      console.log(foundMedia)
    }

  });
  
  displayMediaPhotographer(mediaArray)
}

// affichage des photos du photographe
async function displayMediaPhotographer(foundMedia){


  foundMedia.forEach((currentMedia) => {
    const {date, id, image, likes, photographerId, price, title} = currentMedia
    // pour récuperer le prénom du photographe
    let foundPhotographer = arrayPhotographers.find(photographer => photographer.id === numberUrlId);
    let name = foundPhotographer.name;
    console.log(name)
    let firstName = name.split(" ")[0];
  
  const mediaPhotographerImg = document.createElement("article")
  createDiv.appendChild(mediaPhotographerImg)
  const img = document.createElement('img')

  const pathMedia = `./assets/SamplePhotos/${firstName}/${image}`;
  img.setAttribute("src", pathMedia)
  mediaPhotographerImg.setAttribute("class", "media-photographer-display")
  mediaPhotographerImg.appendChild(img)
    
  console.log(pathMedia)

    


    });
  

  // let section = document.createElement('section')
  // const mediaModel = displayMediaPhotographer(mediaArray)
  // const mediaCardDom = mediaModel.mediaFactory()
  
};



async function init() {
  // Récupère les datas des photographes
  const  foundPhotographer  = await getPhotographer();
  photographerFactory();
  displayPhotographer();
  const mediaArray = await getPhotographer()
  mediaFactory();

};

init();