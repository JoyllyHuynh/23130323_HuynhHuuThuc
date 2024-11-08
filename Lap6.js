function showScreen2() {
    document.getElementById("screen1").style.display = "none";
    document.getElementById("screen2").style.display = "block";
}
function openScreen2() {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'block';
}

function returnToScreen1() {
    document.getElementById('screen2').style.display = 'none';
    document.getElementById('screen3').style.display = 'block';
}

function returnToScreen2() {
    document.getElementById('screen3').style.display = 'none';
    document.getElementById('screen1').style.display = 'block';
}