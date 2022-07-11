$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

$(document).scroll(
  () => {
    let swap_class = document.getElementById("change_class");
    if ($(window).scrollTop() === 0) {
      swap_class.classList.remove("menu_color_change");
    } else {
      swap_class.classList.add("menu_color_change");
    }
  }
);

const rotationInterval = 10;
let loadingDeg = 0;
let emoDeg = 0;
let clickCnt = 0;
let rotationRate = 0;

const blink = () => {
  $('#character-wrapper').addClass("button-click");
};

const rotateEmoji = () => {
  emoDeg += rotationRate;
  $('#emoji').rotate(emoDeg);
  emoDeg %= 360;
  if (Math.abs(rotationRate) > 0.02) {
    rotationRate *= 0.99;
  } else {
    rotationRate = 0;
  }
};

let characterSprite = 1;
$('#character-wrapper').on('click', function() {
  console.log('clicked');
  if (characterSprite == 1) {
      $('#character').removeClass('sprite-happy');
      $('#character').addClass('sprite-sad');
      $('#chosen-option-card').html(`<div class="selected tag shadow bg-trans side-margin" style="width: 20rem; margin-top: 2rem;">
			`);
      characterSprite = 2;
    } else {
      $('#character').removeClass('sprite-sad');
      $('#character').addClass('sprite-happy');
      characterSprite = 1;
  }
});

$("#character-wrapper").on("webkitAnimationEnd", function() { $(this).removeClass("button-click"); });

jQuery.fn.rotate = function(degrees) {
  $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
               '-moz-transform' : 'rotate('+ degrees +'deg)',
               '-ms-transform' : 'rotate('+ degrees +'deg)',
               'transform' : 'rotate('+ degrees +'deg)'});
  return $(this);
};

setInterval(() => {
  loadingDeg += 1;
  $('#emo').rotate(loadingDeg);
  $('#cd1').rotate(loadingDeg);
  $('#construction').rotate(loadingDeg);
  loadingDeg %= 360;
}, 10);

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    closeModal(modal);
  });
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
})

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
  $('#vid1').hide();
  $('#vid2').hide();
}


let chosenOption = -1;

const updateOptions = () => {
  $('#result').show();
if (chosenOption == 1) {
    $('#result1').show();
    $('#result2').hide();
    $('#option-card1').addClass('scale');
    $('#option-card2').removeClass('scale');
  } else if (chosenOption == 2) {
    $('#result2').show();
    $('#result1').hide();
    $('#option-card2').addClass('scale');
    $('#option-card1').removeClass('scale');
  }
};

$(window).load(
  () => {
    $('#vid1').hide();
    $('#vid2').hide();
    setTimeout(() => { $('#loading').hide(); $('#change_class').show(); }, 1000);  
    setInterval(rotateEmoji, rotationInterval);
    setInterval(blink, 2500);
    setInterval(timer, 1000);
  }
);

const today = new Date();
const target = new Date('08/21/2022');
let count = Math.ceil((target-today) / 1000);
function timer() {
  count -= 1;
  if (count <= 0) {
    clearInterval(timer);
    $("#timer").text('Party Time!!!');
    return;
  }
  const day  = Math.floor(count / 86400)
  const hour = Math.floor(count / 3600) % 24
  const min = Math.floor(count / 60) % 60
  const sec = count % 60

  const d = day;
  const h = hour >= 10 ? hour : '0' + hour;
  const m = min >= 10 ? min : '0' + min;
  const s = sec >= 10 ? sec : '0' + sec;
  $("#timer").text(`${d} d ${h} h ${m} m ${s} s`);
}
