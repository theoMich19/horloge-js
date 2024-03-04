document
  .getElementById("timezone-selector")
  .addEventListener("change", function () {
    updateClock();
  });
function updateClock() {
  const timezone = document.getElementById("timezone-selector").value;

  const now = new Date().toLocaleString("fr-FR", { timeZone: timezone });
  const dateInTimezone = new Date(now);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: timezone,
    timeZoneName: "short",
  };
  const formatter = new Intl.DateTimeFormat("fr-FR", options);
  const formattedTime = formatter.format(dateInTimezone);

  const digitalClock = document.getElementById("digital-clock");
  digitalClock.textContent = formattedTime;

  const canvas = document.getElementById("analog-clock");
  const ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const radius = canvas.height / 2;
  ctx.translate(radius, radius);
  ctx.scale(0.9, 0.9);
  ctx.rotate(-Math.PI / 2);

  drawClock(ctx, radius, dateInTimezone);
}

function getFormattedTimeWithTimezone(timezone, locale, locationName) {
  const now = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: timezone,
    timeZoneName: "short",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  const formattedTime = formatter.format(now);

  const digitalClock = document.getElementById("digital-clock");
  digitalClock.textContent = `${locationName}: ${formattedTime}`;
}

function drawClock(ctx, radius, now) {
  ctx.rotate((90 * Math.PI) / 180);

  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius, now);

  ctx.rotate((-90 * Math.PI) / 180);
}

function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  ctx.strokeStyle = "#333";
  ctx.lineWidth = radius * 0.05;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  let ang;
  let num;
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (num = 1; num < 13; num++) {
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius, now) {
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  drawHand(ctx, hour, radius * 0.5, radius * 0.07);

  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(ctx, minute, radius * 0.8, radius * 0.07);

  second = (second * Math.PI) / 30;
  drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

setInterval(updateClock, 1000);

updateClock();
