var codeCheck;

fetch('images/SecretAssets/Code.txt')
    .then(response => response.text())
    .then(text => codeCheck = text)

function changeWall(wallChoice){
    let holder = document.querySelector(".wall-holder");
    holder.removeChild(holder.firstElementChild);
    switch(wallChoice){
        case 0:
            holder.innerHTML += `<img src="images/SecretAssets/Wall1.png" style="width:100%"></img>`
            break;
        case 1:
            holder.innerHTML += `<img src="images/SecretAssets/Wall2.png" style="width:100%"></img>`
            break;
        case 2:
            holder.innerHTML += `<img src="images/SecretAssets/Wall3.png" style="width:100%"></img>`
            break;
        case 3:
            holder.innerHTML += `<img src="images/SecretAssets/Wall4.png" style="width:100%"></img>`
            break;
        default:
            return "error";
    }
}

function handleCodeAnswer(event){
    event.preventDefault();
    let code = document.getElementById("code").value;
    let codeValidated = codeValidation(code);
    setReward(codeValidated);
}

function codeValidation(code) {
    if (codeCheck == code) {
        return true;
    } else {
        return false;
    }
}

function setReward(check){
    let errorBox = document.getElementById("error-code");
    if (check){
        window.location.href = "thefinaldestination.html";
    } else {
        errorBox.innerText = "Incorrect Code. Try Again";
    }
}
