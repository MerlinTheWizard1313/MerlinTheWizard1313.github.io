function handlePartnerAnswers(event){
    event.preventDefault();
    let partner1Answer = document.getElementById("partner1");
    let partner2Answer = document.getElementById("partner1");
    let partnerAnswerValidated = partnerValidation(partner1Answer,partner2Answer);
    if (partnerAnswerValidated){
        setPartnerEquation();
    }
}

function partnerValidation(partner1,partner2) {
    let partner1Check = partner1.toLowerCase();
    let partner2Check = partner2.toLowerCase();
    if (partner1Check == "joseph") {
        if (partner2Check == "perceval"){
            return true;
        }
    } else if (partner1Check == "perceval"){
        if (partner2Check == "joseph"){
            return true;
        }
    } else {
        return false;
    }
}

function setPartnerEquation(){
    let partnerEquation = document.getElementById("partnerEquation");
    partnerEquation.innerHTML = "a";
}