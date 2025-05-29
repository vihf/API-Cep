function buscarCep() {
  const inputCep = document.getElementById("input_cep");
  const valorCep = inputCep.value;
  console.log("buscando cep " + valorCep);
  fetch("https://brasilapi.com.br/api/cep/v2/" + valorCep)
    .then((resposta) => {
      return resposta.json();
    })
    .then((json) => {
     console.log(json);
     const inputState = document.getElementById("input_state");
     inputState.value = json.state;
     const inputCity = document.getElementById("input_city");
     inputCity.value = json.city;
     const inputNeighborhood = document.getElementById("input_neighborhood");
     inputNeighborhood.value = json.neighborhood;
     const inputStreet = document.getElementById("input_street");
     inputStreet.value = json.street;
    });
}

function clicarSalvar() {
  console.log("Clicou para Salvar")
  const inputCep = document.getElementById("input_cep");
  const valorCep = inputCep.value;

  
}

function configurarEventos() {
  const inputCep = document.getElementById("input_cep");
  inputCep.addEventListener("focusout", buscarCep);
  const botão_salvar = document.getElementById("botão_salvar");
  botaoSalvar.addEventListener("click", clicarSalvar)
}

window.addEventListener("load", configurarEventos);