import '../scss/main.scss';
import facebook from '../images/icon-facebook.svg';
import pinterest from '../images/icon-pinterest.svg';
import instagram from '../images/icon-instagram.svg';
import favicon from '../images/favicon.png';
import hills from '../images/pattern-hills.svg';
import stars from '../images/bg-stars.svg';

var fb = document.getElementById('facebook');
var ig = document.getElementById('instagram');
var pt = document.getElementById('pinterest');
fb.setAttribute("src", facebook);
ig.setAttribute("src", instagram);
pt.setAttribute("src", pinterest);


// ---------------------------------------------------------------

const deadline = new Date(Date.parse(new Date()) + 31*24*60*60*1000);
console.log(deadline);

function getRemaining(deadline) {
  let remain, days, hours, minutes, seconds;

  remain = Date.parse(deadline) - Date.parse(new Date());
  seconds = Math.floor((remain / 1000) % 60);
  minutes = Math.floor((remain / 1000 / 60) % 60 );
  hours = Math.floor((remain / (1000 * 60 * 60)) % 24);
  days = Math.floor(remain / (1000 * 60 * 60 * 24));

  return {
    remain,
    seconds,
    minutes,
    hours,
    days
  }
}


// -------------------------------------------------------------------

function createElement(number, cls){
  if (number.toString().length == 1) {
    number = '0' + number;
  }
  let template = '<li class='+ cls +'> \
                    <div class="up"> \
                      <p class="number">'+ number +'</p> \
                    </div> \
                    <div class="down"> \
                      <p class="number">'+ number +'</p> \
                    </div> \
                  </li>';

  return template;
}

function initConstructor(id, interval){
  var el, ul, html, active;
  let t;

  el = document.getElementById(id);
  ul = el.querySelector('.flip');
  t = getRemaining(deadline);

  active = createElement(t[id], 'active');
  ul.innerHTML = active;

  function updateClock() {
    var before;

    t = getRemaining(deadline);
    before = ul.querySelector('.active');

    if (ul.querySelector('.before')) {
      ul.querySelector('.before').remove();
    }

    before.classList.remove('active');
    before.classList.add('before');
    html = ul.innerHTML;
    active = createElement(t[id], 'active');
    ul.innerHTML = html + active;
  }

  updateClock();
  setInterval(updateClock, interval);
}

function initSecond() {
  initConstructor('seconds', 1000);
}

function initMinute() {
  initConstructor('minutes', 60000);
}

function initHour() {
  initConstructor('hours', 86400000);
}

function initDay() {
  initConstructor('days', 2678400000);
}

setTimeout(function(){
  initSecond(deadline);
  initMinute(deadline);
  initHour(deadline);
  initDay(deadline);
}, 1000);
