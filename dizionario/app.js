//tasto invia
const aggiungiVocabolo = document.getElementById('add');
const nuovaParola = document.getElementById('nuovaParola');
const descrizione = document.getElementById('descrizione');
const invia = document.getElementById('invia')
const container = document.getElementById('container');
const ricerca = document.getElementById('ricerca');
const x = document.getElementById('x');

var dizionario = [];



//funzione per aggiungere oggetti
function creaVocabolo(pNome, pDescrizione) {

    if (dizionario.length == 0) {
        dizionario.push({ nome: pNome, descrizione: pDescrizione })
        addContent(pNome, pDescrizione);

    } else {
        var found = false;
        for (i = 0; i < dizionario.length; i++) {
            if (dizionario[i].nome == pNome) {
                found = true;
                break;
            }
        }


        if (!found) {
            dizionario.push({ nome: pNome, descrizione: pDescrizione })
            addContent(pNome, pDescrizione);

        }
    }
    localStorage.setItem('dizionario', JSON.stringify(dizionario));
}
if (localStorage.getItem('dizionario') != null) {
    var d = JSON.parse(localStorage.getItem('dizionario'));
    for (let parola of d) {
        creaVocabolo(parola.nome, parola.descrizione);
       
    }
} else {
    creaVocabolo('casa', 'questa casa');
    creaVocabolo('dedasa', 'questa casa');
    creaVocabolo('cgteasa', 'questa casa');
    creaVocabolo('acgteasa', 'questa casa');
}



console.log(dizionario);


//funzione per richiamare oggetti
function getVocaboli(ricerca) {
    for (i = 0; 0 < dizionario.length; i++) {
        if (dizionario[i].nome == ricerca) {
            return dizionario[i];
        }
    }

}


// ============modal
var modal = document.getElementById("modal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.visibility = "visible";
    //    modal.style.transition = "visibility 1s"
}

span.onclick = function () {
    modal.style.visibility = "hidden";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.visibility = "hidden";
    }
}

//tasto aggiungi
aggiungiVocabolo.addEventListener('click', function (e) {
    e.preventDefault();
    if (nuovaParola.value == '' || descrizione.value == '') {
        alert('Devi inserire una parola')
    } else {
        creaVocabolo(nuovaParola.value, descrizione.value);
    }
    //nascondi modale dopo uso
    modal.style.visibility = "hidden";
    //resetta i campi utilizzati
    nuovaParola.value = '';
    descrizione.value = '';
})

//tasto aggiungi
function addContent(pnome, pDescrizione) {
    var div = document.createElement('div');
    div.classList.add('box');
    var h2 = document.createElement('h2');
    h2.classList.add('titolo');
    var p = document.createElement('p');
    var btn = document.createElement('button');
    btn.classList.add('btn2');

    h2.innerHTML = pnome;
    p.innerHTML = pDescrizione;
    btn.innerText = 'Elimina';

    div.appendChild(btn)
    div.appendChild(h2);
    div.appendChild(p);
    container.appendChild(div);

    btn.addEventListener('click', function () {

        var deleteEl = div;
        deleteEl.remove();
        for(let i in dizionario){
            if(dizionario[i].nome==pnome){
                dizionario.splice(i,1);
            }
        }
        localStorage.setItem('dizionario', JSON.stringify(dizionario));

    })

}


//ricerca

const paroleTrovate = document.getElementById('paroleTrovate');

//trasformazione in Jquery
// ricerca.addEventListener('input', function(){
$('#ricerca').on("input", function () {

    var itemFound = 0;
    //conosco cosa l utene scriva nella ricerca
    // var search = this.previousElementSibling.value
    document.querySelectorAll('.box').forEach(function (e) {
        var el = e.querySelector('.titolo');
        if (!el.textContent.startsWith(ricerca.value)) {
            el.parentNode.style.display = 'none';
        } else {
            el.parentNode.style.display = 'block';
            x.style.display = 'block';
            itemFound++;
        }
        //    return !e.nome.startsWith(search)
    });

    //numero visibile sulla ricerca
    paroleTrovate.innerHTML = '(' + itemFound + ' ' + 'parole trovate)';
    if (ricerca.value.length > 0) {
        paroleTrovate.style.display = 'block';
    } else {
        paroleTrovate.style.display = 'none';
    }
});


//  x.addEventListener('click', function(){
$('#x').on("click", function () {
    // document.querySelectorAll(".box").forEach(a=>a.style.display = "block");
    $(".box").each(function () { $(this).css("display", "block") });
    // x.style.display = 'none';
    // $(this).css("display", "none");
    // paroleTrovate.style.display = 'none';
    $("#x, #paroleTrovate").css("display", "none");

});



function submitForm(e) {
    e.preventDefault();
}

