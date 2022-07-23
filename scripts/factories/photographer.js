function photographerFactory(photographers) {
    
    const { name, portrait, city, country, tagline, price } = photographers;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "photo de "+name)
        const h2 = document.createElement( 'h2' );
        const pPrice = document.createElement('p');
        const pCityCountry = document.createElement('p');
        const pTagline = document.createElement('p');
        h2.textContent = name;
        pCityCountry.textContent = city+", "+country;
        pCityCountry.setAttribute("class", "photographer_section_city_country")
        pTagline.textContent = tagline;
        pTagline.setAttribute("class", "photographer_section_city_tagline")
        pPrice.textContent = price+"€/jour";
        pPrice.setAttribute("class", "photographer_section_city_price")
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCityCountry)
        article.appendChild(pTagline)
        article.appendChild(pPrice)
        return (article);
    }
    return { name, picture, getUserCardDOM }

    


}
