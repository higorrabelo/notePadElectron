async function fechar(){
    await window.acao.fechar();
}

async function minimizar(){
    await window.acao.minimizar();
}

function novo(){
    location.reload();
}

async function salvar(){
    var areaTexto = document.getElementById('areaTexto')
    var obj = {
        texto: areaTexto.value
    }
    await window.acao.salvar(obj);
}

async function abrir(){
   var texto = await window.acao.abrir('abrir');
   document.getElementById('areaTexto').innerText = texto;
}

function info(){
    alert("Aqui")
}

async function pagina(pagina){
    var texto = await fetch(`../public/${pagina}.html`)
    var arq = await texto.text();
    var container = document.getElementById('container');
    console.log(arq)
    container.innerHTML = arq;
}

function copiar(){
    var areaTexto = document.getElementById('areaTexto')
    areaTexto.select();
    document.execCommand('copy');
    input.blur();
}
function colar(){
    var areaTexto = document.getElementById('areaTexto')
    navigator.clipboard.readText()
        .then(function (text) {
            areaTexto.value = text;
        })
        .catch(function (error) {
            alert("Erro ao colar texto: " + error);
        });
}

function recortar(){
    var input = document.getElementById("areaTexto");
            
            // Verifique se há texto selecionado no campo de entrada
            if (input.selectionStart !== null && input.selectionEnd !== null) {
                // Obtém o texto selecionado
                var textoSelecionado = input.value.substring(input.selectionStart, input.selectionEnd);
                
                // Remove o texto selecionado do campo de entrada
                input.value = input.value.substring(0, input.selectionStart) + input.value.substring(input.selectionEnd);
                
                // Deseleciona o texto
                input.selectionStart = input.selectionEnd = null;
                input.focus();
                
                alert("Texto cortado: " + textoSelecionado);
            } else {
                alert("Nenhum texto selecionado para cortar.");
            }
}