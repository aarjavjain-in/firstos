function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.getElementById("timeElement");
    if (timeText) {
      timeText.textContent = currentTime;
    }
  }

  updateTime();
  setInterval(updateTime, 1000);

// Give each window its own pointer and position state so they can be dragged independently.
function makeDraggable(element) {
  if (!element) {
    return;
  }

  var pointerStartX = 0;
  var pointerStartY = 0;
  var windowStartX = 0;
  var windowStartY = 0;
  var activePointerId = null;

  element.addEventListener("pointerdown", startDragging);
  element.addEventListener("pointermove", moveWindow);
  element.addEventListener("pointerup", stopDragging);
  element.addEventListener("pointercancel", stopDragging);

  function startDragging(event) {
    // Leave buttons clickable instead of capturing their pointer for dragging.
    if (event.target.closest("button")) {
      return;
    }

    event.preventDefault();
    activePointerId = event.pointerId;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;

    // Keep the window under the pointer instead of snapping its corner to it.
    var windowPosition = element.getBoundingClientRect();
    windowStartX = windowPosition.left;
    windowStartY = windowPosition.top;
    element.setPointerCapture(activePointerId);
  }

  function moveWindow(event) {
    if (event.pointerId !== activePointerId) {
      return;
    }

    element.style.left = windowStartX + event.clientX - pointerStartX + "px";
    element.style.top = windowStartY + event.clientY - pointerStartY + "px";
  }

  function stopDragging(event) {
    if (event.pointerId === activePointerId) {
      activePointerId = null;
    }
  }
}

makeDraggable(document.getElementById("movablewin1"));
makeDraggable(document.getElementById("movablediv2"));
makeDraggable(document.getElementById("movablediv3"));

function closeWindow(element) {
  if (element) {
    element.hidden = true;
  }
}

function openWindow(element) {
  if (element) {
    element.hidden = false;
  }
}

var welcomeWindow = document.getElementById("movablewin1");
var welcomeScreenClose = document.getElementById("welcomeclose");
var welcomeScreenOpen = document.getElementById("welcomeopen");

if (welcomeScreenClose) {
  welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeWindow);
  });
}

if (welcomeScreenOpen) {
  welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeWindow);
  });
}


