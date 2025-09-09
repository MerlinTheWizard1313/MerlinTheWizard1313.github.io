function handlePartnerAnswers(event){
    event.preventDefault();
    let partner1Answer = document.getElementById("partner1").value.toLowerCase();
    let partner2Answer = document.getElementById("partner2").value.toLowerCase();
    let partnerAnswerValidated = partnerValidation(partner1Answer,partner2Answer);
    setPartnerEquation(partnerAnswerValidated);
}

function partnerValidation(partner1,partner2) {
    if (partner1 == "joseph") {
        if (partner2 == "perceval"){
            return true;
        }
    } else if (partner1 == "perceval"){
        if (partner2 == "joseph"){
            return true;
        }
    } else {
        return false;
    }
}

function setPartnerEquation(check){
    let partnerEquation = document.getElementById("partnerEquation");
    if (check){
        partnerEquation.innerHTML = '<div style="display:block; width:200px; margin:auto; position: relative"><a href="images/SecretAssets/Merlin and the Grail - Robert De Boron.pdf" download="Merlin and the Grail - Robert De Boron"><img src="images/SecretAssets/PDF.png" width="200" height="200"></a></div><br><div style="margin:auto; width:90%; position: relative; border: 4px solid lightslategray"><p style="color: white; font-size:48px; margin-top: 4px; margin-bottom: 4px; text-align:center; word-wrap: break-word">The Regret of the Knight by <i>Name</i></p><div id="RegretFormula" style="color: white; font-size:48px; text-align:center; word-wrap: break-word">Page = X + Y + floor(X/(A-B))</div><div style="border: 1px solid lightslategray"></div><div id="x-Value" style="color: lightgray; font-size:36px; margin: auto; word-wrap: break-word">x = Sum of both passkey letters</div><div id="y-Value" style="color: lightgray; font-size:36px; margin: auto; word-wrap: break-word">y = Amount of Knights at the Winchester Round Table</div><div id="ab-Value" style="color: lightgray; font-size:36px; margin: auto; word-wrap: break-word">In the 1975 movie depicting the quest you are on:</div><div id="a-Value" style="color: lightgray; font-size:36px; margin: auto; word-wrap: break-word">a = The product of the occurrences of "eight" and itself </div><div id="b-Value" style="color: lightgray; font-size:36px; margin: auto; word-wrap: break-word">b = The product of the occurrences of "nine" and itself</div></div>';
    } else {
        partnerEquation.innerHTML = '<div>Incorrect</div>';
    }
}