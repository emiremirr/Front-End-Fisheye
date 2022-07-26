function photographerFactory(photographers) {
    console.log(photographers)    
    const { name, portrait, city, country, tagline, price, id} = photographers;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const link = document.createElement('a');
        link.setAttribute("href","./photographer.html?id="+`${id}`)
        link.appendChild(img)
        img.setAttribute("src", picture)
        img.setAttribute("alt", "photo de "+name)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        // création via le dom du paragraphe ville et pays
        const pCityCountry = document.createElement('p');
        pCityCountry.textContent = city+", "+country;
        pCityCountry.setAttribute("class", "photographer_section_city_country")

        // création via le dom du paragraphe slogan
        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.setAttribute("class", "photographer_section_city_tagline")

        // création via le dom du paragraphe prix
        const pPrice = document.createElement('p');
        pPrice.textContent = price+"€/jour";
        pPrice.setAttribute("class", "photographer_section_city_price")


        // insertion des éléments
        article.appendChild(link);
        article.appendChild(h2);
        article.appendChild(pCityCountry)
        article.appendChild(pTagline)
        article.appendChild(pPrice)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
