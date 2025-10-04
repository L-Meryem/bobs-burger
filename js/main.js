document.querySelector('button').addEventListener('click', openRestaurant);

openRestaurant();

function openRestaurant() {

    const url = 'https://bobsburgers-api.herokuapp.com/';

    getBurgerOfTheDat(url);
    getCustomer(url, 'character-one');
    getCustomer(url, 'character-two');
    getCustomer(url, 'character-three', 553);
    getStoreNextDoor(url);
}

function getBurgerOfTheDat(url) {
    clearCustomers();
    const burgers = `${url}burgerOfTheDay`;
    fetch(burgers)
        .then(res => res.json())
        .then(data => {
            let size = true;
            let burgerId;
            while (size) {
                burgerId = Math.floor(Math.random() * data.length);
                if (data[burgerId].name.length <= 60 && data[burgerId].name.length >= 4) {
                    size = false;
                }
            }
            document.querySelector('.burger').innerText = data[burgerId].name;
            document.querySelector('.price').innerText = data[burgerId].price;
        })
        .catch(error => console.log(error))
}


function getCustomer(url, char, id) {
    const characters = `${url}characters`;
    fetch(characters)
        .then(res => res.json())
        .then(data => {
            let characterId;
            if(id)
                characterId = id;
            else
                characterId = Math.floor(Math.random() * data.length);

            const {h2, img} = createCharacter(char);
            h2.innerText = data[characterId].name;
            img.src = data[characterId].image;
            img.alt = data[characterId].name;
        })
        .catch(error => console.log(error))
}

function getStoreNextDoor(url) {
    const stores = `${url}storeNextDoor`;
    fetch(stores)
        .then(res => res.json())
        .then(data => {
            const storeId = Math.floor(Math.random() * data.length);
            document.querySelector('.store-next-door').innerText = data[storeId].name;
            console.log(data[storeId].name);
        })
        .catch(error => console.log(error))
}


function createCharacter(char) {
    //Create a card
    const characters = document.querySelector('.characters');
    const div = document.createElement('div');
    div.className = char;
    //Create card's content
    const h2 = document.createElement('h2');
    h2.className = 'name';
    const img = document.createElement('img');
    img.src = '';
    img.alt = '';
    //Adding style
    img.classList.add('portrait');
    //Connect tags
    div.append(h2, img);
    characters.append(div);
    //return tags as an {} to diconstruct
    return { h2, img };
}

function clearCustomers(){
    const characters = document.querySelector('.characters')
    characters.replaceChildren();
}