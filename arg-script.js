function handlePartnerAnswers(event){
    event.preventDefault();
    let partner1Answer = document.getElementById("partner1").innerText;
    let partner2Answer = document.getElementById("partner2").innerText;
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
            console.log("true");
            return true;
        }
    } else if (partner1Check == "perceval"){
        if (partner2Check == "joseph"){
            console.log("true");
            return true;
        }
    } else {
        console.log("false");
        return false;
    }
}

function setPartnerEquation(){
    let partnerEquation = document.getElementById("partnerEquation");
    partnerEquation.innerHTML = '<div style="margin:auto; width:90%; position: relative; border: 4px solid lightslategray"><p style="color: white; font-size:48px; margin-top: 4px; margin-bottom: 4px; text-align:center; word-wrap: break-word">The Regret of the Knight by <i>Name</i></p><div id="RegretFormula" style="color: white; font-size:48px; text-align:center; word-wrap: break-word">Page = X + Y + floor(X/Z)</div><div style="border: 1px solid lightslategray"></div><div id="x-Value" style="color: lightgray; font-size:36px; margin: auto; word-wrap: break-word">x = Sum of both passkey letters</div><div id="y-Value" style="color: lightgray; font-size:36px; margin: auto; word-wrap: break-word">y = Amount of Knights at the Winchester Round Table</div><div id="z-Value" style="color: lightgray; font-size:36px; margin: auto; word-wrap: break-word">z = Occurrences of "nine" subtract the occurrences of "five" in the 1975 movie depicting the quest you are on</div></div>';
}