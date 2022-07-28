// //Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer() {
 
  let foundPhotographer;
  await fetch  ('./data/photographers.json')

  .then(function (response) { return response.json()})
  .then(function (data) { arrayPhotographers = data.photographers})
  .catch(err => {alert(error)});
    
    // on va trouver l'id du photographe de l'url
    let params = (new URL(document.location)).searchParams;
    let urlId = params.get('id'); 
    let numberUrlId = parseInt(urlId)
    console.log( urlId)
    // on va trouver le photographe en fonction de l'id qui lui correspond
   foundPhotographer = arrayPhotographers.find(photographer => photographer.id === numberUrlId);
 
    ;
    return foundPhotographer ;
   
  }

async function displayPhotographer(foundPhotographer) {
  
  const photographerSection = document.querySelector(".photograph-header");
            
            const photographerModel = photographerFactory(foundPhotographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            
            photographerSection.insertAdjacentElement('afterbegin', userCardDOM);
            
}

async function init() {
  // Récupère les datas des photographes
  const  foundPhotographer  = await getPhotographer();
  photographerFactory(foundPhotographer)
  displayPhotographer(foundPhotographer);

};

init();
function photographerFactory(foundPhotographer) {
  
  const { name, portrait, city, country, tagline, price, id} = foundPhotographer;

  
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const photographerImg = document.querySelector(".photograph-header");
    console.log(photographerImg)
      const divPresentation = document.createElement('div');
      divPresentation.setAttribute("class", "photograph-header_presentation")
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
      divPresentation.appendChild(h1);
      divPresentation.appendChild(pCityCountry)
      divPresentation.appendChild(pTagline)
      photographerImg.appendChild(img)
      return (divPresentation);
  }
  return { name, picture, getUserCardDOM }

}
