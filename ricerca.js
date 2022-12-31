function f(obj, query, regex){
    fetch('https://odd-erin-worm-wear.cyclic.app/ricerca/ricercaSemplice', { //indirizzo del server a cui si collega
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(obj)
    })

    .then(function(response) {
        if (!response.ok) {
            return callback(new Error("Connection failed. Status code:" + response.status), false);
        }
        return response.json();
    })

    .then(function(oggetto){
    var tabella=document.getElementById("inserisciRisultatiRicercaSemplice");
    var piuDiDieci=document.getElementById("piuDiDieci");
    tabella.replaceChildren();
    var arr=Array.from(oggetto.array); 
    var traduzione=oggetto.traduzione.toString();
    var numeroRisultati=document.getElementById("numeroRisultati");
    var s=0;
        if (arr.length==0){
            tabella.innerHTML="Non ci sono risultati per questa ricerca";
            piuDiDieci.style.display="none";
            numeroRisultati.replaceChildren();
        }
        else {
            if(arr.length<=10){
                for (var i=0; i<arr.length; i++) {
                    var tr=document.createElement("tr");
                    tr.innerHTML=visualizzazione(query, regex, arr[i], 40);
                    tabella.appendChild(tr);
                    s=s+tr.innerHTML.split("\n").length-1;
                }
                piuDiDieci.style.display="none";
            }
            else {
                if (arr.length>10){
                for (var i=0; i<10; i++) {
                    var tr=document.createElement("tr");
                    tr.innerHTML=visualizzazione(query, regex, arr[i], 40);
                    tabella.appendChild(tr);
                    s=s+tr.innerHTML.split("\n").length-1;
                }
                piuDiDieci.style.display="block";
                piuDiDieci.addEventListener("click", (event) => {
                    var newWindow=window.open("","piuDiDieci");
                    var tabella2=newWindow.document.createElement("table"); //?
                    newWindow.document.body.appendChild(tabella2);
                    var i=0;
                    while(i<arr.length){
                    var tr=document.createElement("tr");
                    tr.innerHTML=visualizzazione(query, regex, arr[i], 40);
                    tabella2.appendChild(tr);
                    i++;
                    }
                    }, false);
                }
            }  
            numeroRisultati.innerHTML=s;
        }

        var trad=document.getElementById("trad");
        trad.replaceChildren();
        if(traduzione===""){
            trad.innerHTML="Non ci sono traduzioni per questo elemento";
        }
        else{
            trad.innerHTML=traduzione;
        }
})
    .catch(e => console.error(e));
}

const form = document.getElementById('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const payload = new FormData(form);
    const obj = {};
    payload.forEach((v, k) => {
        v = v.trim();
        obj[k] = v;
    });
    console.log('REQUEST:', obj);

    const query=obj.query;
    const regex = new RegExp(`(?:^|\\W)${query}[s]?(?:$|\\W)`, 'gi');
    f(obj, query, regex);
});

function extractSubstring(query, risultato, text, n) {
    var i = risultato.index;
    if (i != 0) i++;
    var f = i + query.length - 1;
    return  "... " + text.substring(i-n, i).replace('\n', '') +
            "<b>" + text.substring(i, f+1) + "</b>" +
            text.substring(f+1, f+n+1).replace('\n', '') + " ...";
}

function visualizzazione(query, regex, text, n){
    const risultati = [...text.matchAll(regex)];
    var extracts="";
    for(var c=0; c<risultati.length; c++) {
        const risultato = risultati[c];
        const extract = extractSubstring(query, risultato, text, n);
        extracts=extracts+extract+"<br>\n";
    }
    return(extracts);
}
