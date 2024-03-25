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
};
test_2.onclick = function () {
    li_click(test_2, test_2_div);
};
test_3.onclick = function () {
    li_click(test_3, test_3_div);
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
        let isDragging = false;
        document.addEventListener('mousedown', function(event) {
        event.preventDefault();
        
        let draggable = event.target.closest('.draggable');
        let coords, shiftX, shiftY;
        if (!draggable){
            return
        }else{
            draggable.ondragstart = function() {
                return false;
            };
        }
        function startDrag(element, clientX, clientY) {
            isDragging = true;
            shiftX = clientX - element.getBoundingClientRect().left;
            shiftY = clientY - element.getBoundingClientRect().top;
            document.addEventListener('mousemove', onMouseMove);
            element.addEventListener('mouseup', onMouseUp);
            moveAt(clientX, clientY);
            element.style.position = 'fixed';
        };
        startDrag(draggable, event.clientX, event.clientY);
        function finishDrag() {
            isDragging = false;
            draggable.style.top = parseInt(draggable.style.top) + pageYOffset + 'px';
            draggable.style.position = 'absolute';
            document.removeEventListener('mousemove', onMouseMove);
            draggable.removeEventListener('mouseup', onMouseUp);
        }
        function onMouseUp(event) {
            finishDrag();
        };
        function moveAt(clientX, clientY) {
            let cord_X = clientX - shiftX;
            let cord_Y = clientY - shiftY;
            let bottom_side = cord_Y + draggable.offsetHeight;
            let right_side = cord_X + draggable.offsetWidth;
            if (bottom_side > document.documentElement.clientHeight) {
            let bottom_side_window = document.documentElement.getBoundingClientRect().bottom;
            let scrollY = Math.min(bottom_side_window - bottom_side, 10);
            if (scrollY < 0) scrollY = 0;
            window.scrollBy(0, scrollY);
            cord_Y = Math.min(cord_Y, document.documentElement.clientHeight - draggable.offsetHeight);
            }
            if (cord_Y < 0) {
            let scrollY = Math.min(-cord_Y, 10);
            if (scrollY < 0) scrollY = 0;
            window.scrollBy(0, -scrollY);
            cord_Y = Math.max(cord_Y, 0);
            }
            if (right_side > document.documentElement.clientWidth) {
            let right_side_window = document.documentElement.getBoundingClientRect().right;
            let scrollX = Math.min(right_side_window - right_side, 10);
            if (scrollX < 0) scrollX = 0;
            window.scrollBy(0, scrollX);
            cord_X = Math.min(cord_X, document.documentElement.clientWidth - draggable.offsetWidth);
            }
            if (cord_X < 0) {
            let scrollX = Math.min(-cord_X, 10);
            if (scrollX < 0) scrollX = 0;
            window.scrollBy(0, -scrollX);
            cord_X = Math.max(cord_X, 0);
            }
            if (cord_X < 0) cord_X = 0;
            if (cord_X > document.documentElement.clientWidth - draggable.offsetWidth) {
            cord_X = document.documentElement.clientWidth - draggable.offsetWidth;
            }
            if (cord_Y < 0) cord_Y = 0;
            if (cord_Y > document.documentElement.clientHeight - draggable.offsetHeight) {
                cord_Y = document.documentElement.clientHeight - draggable.offsetHeight;
            }
            draggable.style.left = cord_X + 'px';
            draggable.style.top = cord_Y + 'px';
        }
        function onMouseMove(event) {
            moveAt(event.clientX, event.clientY);
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
