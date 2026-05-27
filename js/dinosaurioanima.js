const dinosaur = document.getElementById("dino");

let jumping = false;

function jump() {
  if (jumping) return;

  jumping = true;

  let position = 0;
  let upInterval = setInterval(() => {
    if (position >= 120) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          jumping = false;
        }

        position -= 5;
        dinosaur.style.bottom = position + "px";
      }, 20);

    }

    position += 5;
    dinosaur.style.bottom = position + "px";
  }, 20);
}

// Saltar automáticamente cada 2 segundos
setInterval(jump, 2000);