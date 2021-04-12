/* scroll effect in the inner page links */
$(document).ready(function(){
  $('a[href^="#"]').click(function(event){
    event.preventDefault();
    var elem=$(this).attr("href");
    $("html, body").animate({
      scrollTop: $(elem).offset().top -$('.sticky-top').innerHeight()
    },800);
  });
});

$('.sf-head-collapse').click(function(){
  const button = $(this).find('button');
  const aria_expanded = button.attr('aria-expanded');
  clearCollapseIcon();
  if(aria_expanded == 'false'){
    button.find('img').attr("src", "/assets/img/servicios/Flecha-2.png");
  }
});

function clearCollapseIcon(){
  $('.sf-head-collapse').each(function(){
    $(this).find('button').find('img').attr("src", "/assets/img/servicios/Flecha-1.png");
  });
}

/* carousel events for customers */
$("#nuestros-clientes").carousel({
  // interval: 10000
  interval: 4000,
});

$("#nuestros-clientes.carousel .carousel-item").each(function () {
  var minPerSlide = 4;
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(":first");
  }
  next.children(":first-child").clone().appendTo($(this));

  for (var i = 0; i < minPerSlide; i++) {
    next = next.next();
    if (!next.length) {
      next = $(this).siblings(":first");
    }

    next.children(":first-child").clone().appendTo($(this));
  }
});
/* scrolling events for animation */

window.addEventListener("scroll", function () {
  let elements = document.getElementsByClassName("elemento-t");
  let screenSize = window.innerHeight;

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    if (element.getBoundingClientRect().top < screenSize) {
      element.classList.add("move-t");
    } else {
      element.classList.remove("move-t");
    }
  }
});

window.addEventListener("scroll", function () {
  let elements = document.getElementsByClassName("elemento");
  let screenSize = window.innerHeight;

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    if (element.getBoundingClientRect().top < screenSize) {
      element.classList.add("move");
    } else {
      element.classList.remove("move");
    }
  }
});
/* hover and unhover events for the icon next and prev */
function hover(element, name) {
  element
    .querySelector("img")
    .setAttribute("src", "assets/img/icons/" + name + "-white.png");
}

function unhover(element, name) {
  element
    .querySelector("img")
    .setAttribute("src", "assets/img/icons/" + name + "-grey.png");
}
// instafeed v1.4.1 
// https://github.com/stevenschobert/instafeed.js
  let limit = 4;
  if (window.matchMedia("(max-width: 768px)").matches) {
    limit = 1;
  }
  var feed = new Instafeed({
    accessToken: sf_igat,
    // resolution: 'standard_resolution',
    // debug: true,
    target:"instafeed-sf",
    template: '<div class="col-sm-12 col-md-3"><a href="{{link}}" target="_blank" id="{{id}}"><img title="{{caption}}" class="img-fluid" src="{{image}}" /></a></div>',
    sortBy: 'most-recent',
    limit: limit,
    });
  feed.run();
  let dataCaptcha = ""
  let verifyCallback = function(response) {
    document.getElementById('g-recaptcha-error').innerHTML = '';
  };

  function submitForm(){
    let form = document.querySelector('form');
    let dataObj = Object.fromEntries(new FormData(form).entries());
    
    let captcha = grecaptcha.getResponse();
    if(!captcha){
      document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">Debes validar el captcha para enviar tu información.</span>';
    }else{
      let payload = {
        submittedAt:Date.now(),
        fields:[
          {
            name:'firstname',
            value:dataObj.firstname
          },
          
          {
            name:'lastname',
            value:dataObj.lastname
          },
          {
            name:'company',
            value:dataObj.company
          },
          {
            name:'email',
            value:dataObj.email
          },
          {
            name:'mobilephone',
            value:dataObj.mobilephone
          },
          {
            name:'como_podemos_ayudarte_',
            value:dataObj.message
          // },
          // {
          //   name:'captcha_response',
          //   value: captcha
          }
        ],
        context:{
          "pageUri": sf_plc,
          "pageName": "Sforce new web"
        }
      }
      let uri = sf_hsfu;
      fetch(uri, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .then(response => response.json())
      .then(data => {
        if(data.status =='error'){
          alert('Hubo un error con el registro de su información:'+data.message);
        }else{
          alert('Se ha enviado su información correctamente');
        }
      })
      .catch((error) => {
        alert('Hubo un error con el registro de su información');
      });
    }
  }
      
  let div_services = document.querySelector("#servicios");
  if(div_services){
    if (window.matchMedia("(max-width: 768px)").matches) {
        div_services.removeAttribute("data-ride"); 
        div_services.setAttribute("data-interval", "false")
    } else {
        div_services.removeAttribute("data-interval"); 
        div_services.setAttribute("data-ride", "carousel")
        /* carousel events for services */
      $("#servicios").carousel({
        interval: 4000,
      });

      $("#servicios.carousel .carousel-item").each(function () {
        var minPerSlide = 3;
        var next = $(this).next();
        if (!next.length) {
          next = $(this).siblings(":first");
        }
        next.children(":first-child").clone().appendTo($(this));

        for (var i = 0; i < minPerSlide; i++) {
          next = next.next();
          if (!next.length) {
            next = $(this).siblings(":first");
          }

          next.children(":first-child").clone().appendTo($(this));
        }
      });
    }
  }
  let div_carousel_partners = document.querySelector("#carouselPartners");
  if(div_carousel_partners){
    if (window.matchMedia("(max-width: 768px)").matches) {
        div_carousel_partners.removeAttribute("data-interval"); 
        div_carousel_partners.setAttribute("data-interval", "false")
        // console.log("si entro SI")
    } else {
        div_carousel_partners.removeAttribute("data-interval"); 
        div_carousel_partners.setAttribute("data-interval", "3000")
    }
  }