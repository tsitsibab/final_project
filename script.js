// slider data/photos
"use strict";
let data = [
    {
        id: 1,
        imageUrl: 'https://i.pinimg.com/564x/14/60/b7/1460b7430fa33e833479de013528c970.jpg',
        
    },
    {
        id: 2,
        imageUrl: 'https://i.pinimg.com/564x/f6/bc/18/f6bc1848a14e8df7032645fddb6578c9.jpg',
        
    },
    {
        id: 3,
        imageUrl: 'https://i.pinimg.com/564x/c4/6a/fc/c46afc54f3a3cab6d01ecf04bb5d7c2c.jpg',
       
    },
    {
        id: 4,
        imageUrl: 'https://i.pinimg.com/564x/7b/79/91/7b7991c431a9a67640694cbd9785ba8b.jpg',
     
    },
    {
        id: 5,
        imageUrl: 'https://i.pinimg.com/564x/e6/73/b5/e673b5cfbfc823f276a41aa8b942500d.jpg',
      
    },
];

let arrowLeft = document.getElementById ('arrow-left');
let arrowRight = document.getElementById ('arrow-right');
let sliderContainer = document.getElementById ('slider');
let dotsList = document.getElementsByClassName ('dot');

let sliderIndex = 0;

function createATag (item) {
    let aTag = document.createElement('a');
    aTag.setAttribute('href', item.url);
    aTag.classList.add('slider-a');

    return aTag;
}

function createImgTag(item) {
    sliderContainer.style.backgroundImage = 'url('+ item.imageUrl +')';
    sliderContainer.style.backgroundRepeat = "no-repeat";
    sliderContainer.style.backgroundSize = "cover";
}


function createH2Tag (item) {
    let h2Tag = document.createElement('a');
    h2Tag.setAttribute.href = item.url;
    h2Tag.classList.add('slider-title');
    h2Tag.append(item.title);
    return h2Tag;
}

function createDots() {
    let dots = document.createElement('div');
    dots.classList.add('dots');

    data.forEach((element) => {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-id', element.id-1);

        dot.onclick = () => {
            let id = event.target.getAttribute('data-id');
            sliderIndex = id;
            setSlider();
        }
        dots.appendChild(dot);
    })
    return dots;
}

function setSlider() {
    sliderContainer.innerText = '';
    createImgTag(data[sliderIndex]);
    let sliderItem = createATag (data[sliderIndex]);
    let title = createH2Tag (data[sliderIndex]);
    let dots = createDots();
    sliderItem.appendChild(title);
    sliderContainer.appendChild(sliderItem);
    sliderContainer.appendChild(dots);
    currentDotActive();
    
}

function currentDotActive () {
    dotsList[sliderIndex].classList.add('active')
}

function arrowLeftClick () {
    if (sliderIndex == 0) {
        sliderIndex = data.length;
     }
    sliderIndex--;
    setSlider();
}

function arrowRightClick () {   
    if(sliderIndex == data.length-1) {
        sliderIndex = -1;
    }
    sliderIndex++;
    setSlider();
}
//1.
arrowLeft.addEventListener('click', arrowLeftClick)
arrowRight.addEventListener('click', arrowRightClick)
//2.
document.addEventListener('keydown', function(event) {
    if (event.keyCode == 37) {
        arrowLeftClick();
    } else if (event.keyCode == 39) {
        arrowRightClick();
    }
})
//3.
setInterval( () => {
    arrowRightClick ();
}, 4000);

setSlider();

// review
let currentPage = 1;
let totalPagesAp;

function getUsers(page) {
    let requist = new XMLHttpRequest();
    requist.addEventListener('load', render);
    requist.addEventListener('error', errorRender);

    requist.open('GET', 'https://reqres.in/api/users?page=' + page);

    requist.send();
}


function render() {
    let response = this.responseText;
    let responseData = JSON.parse(response);
    let fragment = document.createDocumentFragment();

    responseData.data.forEach(item => {
        let li = document.createElement('li');
        li.classList.add('liInfo');
        let pEmail=document.createElement('p');
        pEmail.textContent= item.email;

        let imgUser = document.createElement('img');
        imgUser.src = item.avatar;
        imgUser.classList.add('image-block');

        li.appendChild(imgUser);
        li.appendChild(pEmail);
        li.classList.add('li-item');
        fragment.appendChild(li);
    
});

document.getElementById('ul-list').innerHTML = ' '; 
       document.getElementById('ul-list').appendChild(fragment);
       totalPagesAp=responseData.total_pages;

    }

    function errorRender(){
        let p = document.createElement('p');
        p.textContent = 'server error';
        document.getElementById('user-email').appendChild(p);
    }

    document.getElementById('loadPrev').addEventListener('click', function(){
        if(currentPage == 1){
            return;
        }
        currentPage -=1;
        getUsers(currentPage);
        
    });

    document.getElementById('loadNext').addEventListener('click', function(){
        if(currentPage == totalPagesAp){
            return;
        }
        currentPage +=1;
        getUsers(currentPage);
    });

getUsers(currentPage);

function toggleMenu() {
    const nav = document.querySelector('.navbar ul');
    const burger = document.querySelector('.burger');

    // Toggle Nav
    nav.classList.toggle('nav-active');

    // Burger Animation
    burger.classList.toggle('toggle');
}