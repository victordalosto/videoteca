/**
 * Script que adiciona funcionalidades para a pagina servicos.dnit.gov.br/videoteca
 * Funcionamento: Basta colocar o conteudo desse Javascript no console da pagina.
 * Versao: 1.0.1 - 20/03/2023
 */

const botoes = ["Corte", "Aterro", "Mista"];

const marcacoesLocalStorage = JSON.parse(localStorage.getItem("marcacoes")) || [];

(function alteraTamanhoDivVideoPrincipal() {
    const videoDiv = document.querySelector("#PlayerVideoDiv");
    videoDiv.classList.remove("col-md-6");
    videoDiv.classList.add("col-md-9");
    videoDiv.style.marginLeft = "12.5%";
})();

(function alteraDivCoordenadas() {
    const mapa = document.querySelector("#Mapa");
    const graficosDiv = document.querySelector("#graficos");
    mapa.classList.remove("col-md-6");
    mapa.classList.add("col-md-9");
    mapa.style.marginLeft = "12.5%";
    graficosDiv.append(mapa)
})();

(function colocaLatLongNaTelaVideoDiv() {
    const videoBody = document.querySelector("#mep_0").parentNode;
    const latLong = document.querySelector("#coordenada-atual").parentNode;
    videoBody.append(latLong);
})();

(function criaBotaoMarcacoes() {
    const videoBody = document.querySelector("#mep_0").parentNode;
    botoes.forEach(b => {
        const botao =  document.createElement("button");
        botao.innerHTML = b;
        botao.classList.add("btn", "btn-primary");
        botao.style.marginRight = "15px";
        videoBody.append(botao);
        botao.style.transition = "all 0.3s";
        botao.addEventListener("click", () => {
        const [lat, long] = document.querySelector("#coordenada-atual")
                                    .innerHTML.replace(/^Lat\/Long:\s*/, '')
                                    .split(", ").map(parseFloat);
        const odometro = parseFloat(document.querySelector("#HodometroValue").innerHTML);
        const objeto = {"marcacao":b, "odom": odometro, "lat": lat, "long": long};
        marcacoesLocalStorage.push(objeto);
        localStorage.setItem("marcacoes", JSON.stringify(marcacoesLocalStorage));
        botao.classList.add("btn-info");
        setTimeout(() => {
            botao.classList.remove("btn-info"); 
        }, 400)
    });
    })
})();

(function criaBotaoLimpar() {
    const botaoLimpar = document.createElement("button");
    const videoBody = document.querySelector("#mep_0").parentNode;
    botaoLimpar.innerHTML = "LIMPAR";
    botaoLimpar.classList.add("btn", "btn-secondary");
    botaoLimpar.style.marginBottom="15px"
    videoBody.prepend(botaoLimpar);
    botaoLimpar.addEventListener("click", () => {
        botaoLimpar.classList.add("btn-danger");
        setTimeout(() => {
            botaoLimpar.classList.remove("btn-danger"); 
        }, 1500)
        if (confirm('Voce quer limpar as marcacoes?')) {
            marcacoesLocalStorage.length = 0;
            localStorage.setItem("marcacoes", JSON.stringify(marcacoesLocalStorage));
        }
    });
})();

(function adicionaFuncionalidadeBotaoSalvar() {
    const botaoSalvar = document.createElement("button");
    const videoBody = document.querySelector("#mep_0").parentNode;
    botaoSalvar.innerHTML = "SALVAR";
    botaoSalvar.classList.add("btn", "btn-primary");
    botaoSalvar.style.transition = "all 0.3s";
    botaoSalvar.style.marginBottom="15px"
    botaoSalvar.style.marginRight="15px"
    videoBody.prepend(botaoSalvar);
    botaoSalvar.addEventListener("click", () => {
        const jsonStr = JSON.stringify(marcacoesLocalStorage);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "marcacoes.json";
        link.click();
        botaoSalvar.classList.add("btn-info");
        setTimeout(() => {
            botaoSalvar.classList.remove("btn-info"); 
        }, 400)
    });
})();
