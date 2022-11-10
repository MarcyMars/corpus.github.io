function f(){
    var modelliMedici=document.getElementById("modelliMedici");
    var modelliEconomici=document.getElementById("modelliEconomici");
    var modelliGiuridici=document.getElementById("modelliGiuridici");
    var modelliTecnologici=document.getElementById("modelliTecnologici");
    var modelliTuristici=document.getElementById("modelliTuristici");
    var ambitoTesti=document.getElementById("ambitoTesti");

    switch(ambitoTesti.value){
        case "0": modelliMedici.style.display="block";
        modelliEconomici.style.display="none";
        modelliGiuridici.style.display="none";
        modelliTecnologici.style.display="none";
        modelliTuristici.style.display="none";
        break;
        case "1": modelliMedici.style.display="none";
        modelliEconomici.style.display="block";
        modelliGiuridici.style.display="none";
        modelliTecnologici.style.display="none";
        modelliTuristici.style.display="none";
        break;
        case "2": modelliMedici.style.display="none";
        modelliEconomici.style.display="none";
        modelliGiuridici.style.display="block";
        modelliTecnologici.style.display="none";
        modelliTuristici.style.display="none";
        break;
        case "3": modelliMedici.style.display="none";
        modelliEconomici.style.display="none";
        modelliGiuridici.style.display="none";
        modelliTecnologici.style.display="break";
        modelliTuristici.style.display="none";
        break;
        case "4": modelliMedici.style.display="none";
        modelliEconomici.style.display="none";
        modelliGiuridici.style.display="none";
        modelliTecnologici.style.display="none";
        modelliTuristici.style.display="block";
        break;
        default: modelliMedici.style.display="none";
        modelliEconomici.style.display="none";
        modelliGiuridici.style.display="none";
        modelliTecnologici.style.display="none";
        modelliTuristici.style.display="none";
        break;
    }

}