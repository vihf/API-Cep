const cepInput = document.getElementById("cep");
const ruaInput = document.getElementById("rua");
const bairroInput = document.getElementById("bairro");
const cidadeInput = document.getElementById("cidade");
const estadoInput = document.getElementById("estado");
const salvarBtn = document.getElementById("salvar");
const mensagem = document.getElementById("mensagem");
const tabela = document.getElementById("tabela").querySelector("tbody");

const enderecosSalvos = [];

cepInput.addEventListener("blur", async () => {
  const cep = cepInput.value.replace(/\D/g, "");
  if (cep.length !== 8) {
    mensagem.textContent = "CEP inválido.";
    return;
  }

  try {
    const resposta = await fetch(`https://brasilapi.com.br/api/cep/v1/{cep}`);
    const dados = await resposta.json();

    if (dados.erro) {
      mensagem.textContent = "CEP não encontrado.";
      return;
    }

    ruaInput.value = dados.logradouro;
    bairroInput.value = dados.bairro;
    cidadeInput.value = dados.localidade;
    estadoInput.value = dados.uf;
    mensagem.textContent = "";

  } catch (error) {
    mensagem.textContent = "Erro ao buscar o CEP.";
  }
});

salvarBtn.addEventListener("click", () => {
  const endereco = {
    cep: cepInput.value,
    rua: ruaInput.value,
    bairro: bairroInput.value,
    cidade: cidadeInput.value,
    estado: estadoInput.value
  };

  const duplicado = enderecosSalvos.some(e =>
    e.cep === endereco.cep &&
    e.rua === endereco.rua &&
    e.bairro === endereco.bairro &&
    e.cidade === endereco.cidade &&
    e.estado === endereco.estado
  );

  if (duplicado) {
    mensagem.textContent = "Endereço já cadastrado!";
    return;
  }

  enderecosSalvos.push(endereco);
  adicionarNaTabela(endereco);
  mensagem.textContent = "Endereço salvo com sucesso!";
  limparCampos();
});

function adicionarNaTabela(endereco) {
  const linha = document.createElement("tr");
  linha.innerHTML = `
    <td>${endereco.cep}</td>
    <td>${endereco.rua}</td>
    <td>${endereco.bairro}</td>
    <td>${endereco.cidade}</td>
    <td>${endereco.estado}</td>
  `;
  tabela.appendChild(linha);
}

function limparCampos() {
  cepInput.value = "";
  ruaInput.value = "";
  bairroInput.value = "";
  cidadeInput.value = "";
  estadoInput.value = "";
}