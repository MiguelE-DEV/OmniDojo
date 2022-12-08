const ul = document.querySelector(".tagsUl"),
input = document.querySelector(".tagsInput"),
tagNumb = document.querySelector(".details span");
let maxTags = 10,
tags = [];
countTags();

function countTags(){
    input.focus();
    tagNumb.innerText = maxTags - tags.length;
}
function createTag(newTag){
    ul.querySelectorAll("li").forEach(li => li.remove());
    tags.slice().reverse().forEach(tag =>{
        let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);
    });
    let newInput = document.createElement("input")
    newInput.name = "tag"
    newInput.classList.add("invis")
    newInput.value = newTag
    console.log(newTag)
    ul.appendChild(newInput) 
    countTags();
}
function remove(element, tag){
    let index  = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    element.parentElement.remove();
    countTags();
}
function addTag(e){
    if(e.key == "Enter"){
        let tag = e.target.value.replace(/\s+/g, ' ');
        if(tag.length > 1 && !tags.includes(tag)){
            if(tags.length < 10){
                tag.split(',').forEach(tag => {
                    tags.push(tag);
                    createTag(tag);
                });
            }
        }
        e.target.value = "";
    }
    console.log(document.querySelector(".tagsInput").value)
}
input.addEventListener("keyup", addTag);

document.querySelector(".tagsUl").addEventListener("keypress",(e) => {
    var key = e.charCode || e.keyCode || 0;     
    if (key == 13) {
      e.preventDefault();
    }
  })

// let date_1 = new Date();
// let date_2 = new Date('${posts[i].createdAt}');

// const days = (date_1, date_2) =>{let difference = date_1.getTime() - date_2.getTime();let TotalHours = Math.floor(difference/ (1000 * 3600));return TotalHours;}
// console.log(days(date_1, date_2) +" hours to world cup");

// $(function () {
//     $("#datepicker").datepicker({ 
//           autoclose: true, 
//           todayHighlight: true
//     }).datepicker('update', new Date());
//   });



function initGoogle() {
    if (navigator.geolocation) {
        console.log('geolocation is working!');
        var location = {
            lat: 42.290,
            lng: -71.079
        }
        var options = {
            center: location,
            zoom: 10
        }

        navigator.geolocation.getCurrentPosition((loc) => {
            location.lat = loc.coords.latitude;
            location.lng = loc.coords.longitude;

            map = new google.maps.Map(document.getElementById('map'), options);
        },
            (err) => {
                console.log('User clicked No? If you\'re worried about security it\'s kinda too late big dawg');
                map = new google.maps.Map(document.getElementById('map'), options);
            })
    } else {
        console.log('geolocation not supported brokey');
        map = new google.maps.Map(document.getElementById('map'), options)
    }
    
    autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete"),
    {
        componentRestrictions: {'country': ['us']},
        fields: ['geometry', 'name']
    });
    
//marker
    autocomplete.addListener('place_changed', () => {
        
        const place = autocomplete.getPlace();
        new google.maps.Marker({
            position: place.geometry.location,
            title: place.name,
            map: map,
            icon: "https://img.icons8.com/nolan/1x/marker.png",
            draggable: true,
            animation: google.maps.Animation.DROP
        })
        
    })
    
        
}

// function daysUntil(){
//     let edate = new Date(post.date)
//     let cdate = new Date()
//     let tdiff = cdate.getTime() - edate.getTime()
//     let ddiff = tdiff/(1000*60*60*24)
//     document.write(ddiff)
//   }
//   daysUntil()


// let date1 = new Date('09/01/2022');
// let date2 = new Date('09/09/2023');
// let btnGet = document.getElementById('masBtn');
// let result = document.getElementById('masResult');
// btnGet.addEventListener('click',  () => {
//     let diff = date2.getTime() - date1.getTime();
//     let msInDay = 1000 * 3600 * 24;
//     result.innerText = diff/msInDay;
// });