function f(obj, query, regex){
    fetch('https://corpusmarcella.herokuapp.com/ricercaFiltrata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(obj)
    })

    .then(function(response) {
        if (!response.ok) {
            return callback(new Error("Connessione fallita. Errore numero:" + response.status), false);
        }
        return response.json();
    })

    .then(function(oggetto){
    var uno=document.getElementById("1");
    var due=document.getElementById("2");
    var tabella3=document.getElementById("risultatiRicercaTitolo");
    var tabella=document.getElementById("inserisciRisultatiRicercaAmbito");
    var piuDiDieci=document.getElementById("piuDiDieci");
    var ricAmbito=document.getElementById("ricAmbito");
    var ricTitolo=document.getElementById("ricTitolo");
    if(uno.checked){
    tabella.replaceChildren();
    ricAmbito.style.display="block";
    ricTitolo.style.display="none";
    var arr=Array.from(oggetto.array); 
    var traduzione=oggetto.traduzione.toString();
    var numeroRisultati=document.getElementById("numeroRisultati");
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
                }
                piuDiDieci.style.display="none";
            }
            else {
                if (arr.length>10){
                    for (var i=0; i<10; i++) {
                        var tr=document.createElement("tr");
                        tr.innerHTML=visualizzazione(query, regex, arr[i], 40);
                        tabella.appendChild(tr);
                    }
                    piuDiDieci.style.display="block";
                    piuDiDieci.addEventListener("click", () => {
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
            numeroRisultati.innerHTML=arr.length;
        }

        var trad=document.getElementById("trad");
        trad.replaceChildren();
        if(traduzione===""){
            trad.innerHTML="Non ci sono traduzioni per questo elemento";
        }
        else{
            trad.innerHTML=traduzione;
        }
    }
    else {
        if (due.checked){
            ricAmbito.style.display="none"
            ricTitolo.style.display="block";
            tabella3.replaceChildren();
            var descrizioni=Array.from(oggetto.descrizioni); 
            var titoli=Array.from(oggetto.titoli);
            console.log(oggetto);
            if(titoli.length==0){
                tabella3.innerHTML="Non ci sono risultati";
            }
            else {
                var i=0;
                while(i<titoli.length){
                    var tr=document.createElement("tr");
                    var u=document.createElement("u");
                    var p=document.createElement("p");
                    u.innerHTML=titoli[i];
                    p.innerHTML=descrizioni[i];
                    p.style.display="none";
                    u.addEventListener("click", () =>{
                        if(p.style.display=="none"){
                            p.style.display="block";
                        }
                        else {
                            p.style.display="none";
                        }
                        });
                    tr.appendChild(u);
                    tr.appendChild(p);
                    tabella3.appendChild(tr);
                    i++;
                }
            }
        }
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

    var uno=document.getElementById("1");
    var query;
    if(uno.checked){
        query=obj.queryambito;
    }
    else{
        query=obj.querytitolo;
    }
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