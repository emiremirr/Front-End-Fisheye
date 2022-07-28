
async function getPhotographers() {
    let photographers ;
    
    await fetch  ('./data/photographers.json')
    
    .then(function (response) { return response.json()})
    .then(function (data) { photographers = data.photographers })
    .catch(err => {alert(error)});
        
    return ({
            photographers: [...photographers]})
    }
    async function displayData(photographers) {
      console.log(photographers)
            const photographersSection = document.querySelector(".photographer_section");
            photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    