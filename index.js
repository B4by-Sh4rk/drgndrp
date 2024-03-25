const test_1 = document.getElementById('test_1');
const test_2 = document.getElementById('test_2');
const test_3 = document.getElementById('test_3');
const test_1_div = document.getElementById('test_1_div');
const test_2_div = document.getElementById('test_2_div');
const test_3_div = document.getElementById('test_3_div');

test_1.style.color = 'red';
test_1_div.style.display = 'block';

test_1.onclick = function () {
    li_click(test_1, test_1_div);
    document.getElementById('ech').style.opacity = '0';
    document.getElementById('ech').style.pointerEvents = 'none';

};
test_2.onclick = function () {
    li_click(test_2, test_2_div);
    document.getElementById('ech').style.opacity = '0';
    document.getElementById('ech').style.pointerEvents = 'none';

};
test_3.onclick = function () {
    li_click(test_3, test_3_div);
    document.getElementById('ech').style.opacity = '1';
    document.getElementById('ech').style.pointerEvents = 'all';
};

function li_click(test_q, test_q_div) {
    document.querySelectorAll('li').forEach(element => {
        element.style.color = 'black';
    });
    document.querySelectorAll('div.main').forEach(element => {
        element.style.display = 'none';
    });
    test_q.style.color = 'red';
    test_q_div.style.display = 'block';
}






/* test_1 */
let thumb = slider.querySelector('.thumb');
let h1Element = document.createElement('h1');
h1Element.textContent = '0%';
h1Element.style.textAlign = 'center';
slider.appendChild(h1Element);

// Функция для перемещения бегунка thumb
function moveThumb(positionX) {
    let newLeft = positionX - slider.getBoundingClientRect().left;
    let rightEdge = slider.offsetWidth - thumb.offsetWidth;

    if (newLeft < 2) {
        newLeft = 2;
    }
    if (newLeft > rightEdge) {
        newLeft = rightEdge;
    }

    thumb.style.transform = `translateX(${newLeft}px)`;

    let filledPercentage = Math.round((newLeft - 2) / (rightEdge - 2) * 100);

    if (filledPercentage === 100) {
        thumb.style.transform = `translateX(${rightEdge - 4}px)`; // перемещаем бегунок на 10 пикселей левее при 100%, чтобы было ровно
    }

    h1Element.textContent = filledPercentage + '%';
}

// Обработчик клика на слайдере
slider.addEventListener('click', function (event) {
    moveThumb(event.clientX);
});

thumb.onmousedown = function (event) {
    event.preventDefault();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }

    let shiftX = event.clientX - thumb.getBoundingClientRect().left;

    function onMouseMove(event) {
        moveThumb(event.clientX - shiftX);
    }
};




/* test_2 */
document.addEventListener('mousedown', function(e) {
    e.preventDefault();
    const draggable = e.target;
    if (!draggable.classList.contains('draggable')) {
        return;
    }

    let shiftX = e.clientX - draggable.getBoundingClientRect().left;
    let shiftY = e.clientY - draggable.getBoundingClientRect().top;

    draggable.style.zIndex = 1000; // устанавливаем z-index, чтобы элементы не скрывались под другими

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e) {
        const minX = window.pageXOffset;
        const minY = window.pageYOffset;
        const maxX = document.documentElement.clientWidth + window.pageXOffset - draggable.offsetWidth;
        const maxY = document.documentElement.clientHeight + window.pageYOffset - draggable.offsetHeight;

        let x = e.pageX - shiftX;
        let y = e.pageY - shiftY;

        if (x < minX) {
            x = minX;
        }
        if (y < minY) {
            y = minY;
        }
        if (x > maxX) {
            x = maxX;
        }
        if (y > maxY) {
            y = maxY;
        }

        draggable.style.left = x + 'px';
        draggable.style.top = y + 'px';
        draggable.style.position = 'absolute';

    }

    function onMouseUp(e) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
});


/* test 3 */
let currentDroppable = null;
let currentDroppable2 = null;

ech.onmousedown = function(event) {

  let shiftX = event.clientX - ech.getBoundingClientRect().left;
  let shiftY = event.clientY - ech.getBoundingClientRect().top;

  ech.style.position = 'absolute';
  ech.style.zIndex = 1000;
  document.body.append(ech);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    ech.style.left = pageX - shiftX + 'px';
    ech.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    ech.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    ech.hidden = false;

    if (!elemBelow) return;

    let droppableBelow = elemBelow.closest('.krb3_zone');
    if (currentDroppable != droppableBelow) {
      if (currentDroppable) {
        leaveDroppable(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) {
        enterDroppable(currentDroppable);
      }
    }

    let droppableBelow2 = elemBelow.closest('.krb2_zone');
    if (currentDroppable2 != droppableBelow2) {
      if (currentDroppable2) {
        leaveDroppable(currentDroppable2);
      }
      currentDroppable2 = droppableBelow2;
      if (currentDroppable2) {
        enterDroppable(currentDroppable2);
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  ech.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ech.onmouseup = null;
  };

};

function enterDroppable(elem) {
    document.getElementById('krb1_zone').style.opacity = '0';
    elem.style.opacity = '1';
    if(elem.classList.contains("krb3_zone")){
        document.getElementById('krb1_zone').style.opacity = '0';
        document.querySelector('.msg').classList.add('show_msg')
    }
}
function leaveDroppable(elem) {
    document.getElementById('krb1_zone').style.opacity = '1';
  elem.style.opacity = '0';
  if(elem.classList.contains("krb3_zone")){
        document.querySelector('.msg').classList.remove('show_msg')
    }
}

ech.ondragstart = function() {
  return false;
};
