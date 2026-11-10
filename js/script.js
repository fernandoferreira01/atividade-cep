
async function consultarCEP() {


    let cep = document.getElementById("cep").value;

    let resultado = document.getElementById("resultado");

    if (!/^\d{8}$/.test(cep)) {
        resultado.innerHTML = "Digite um CEP válido com 8 números!";
        return;
    }

    resultado.innerHTML = "Consultando...";

    try {

        let resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let dados = await resposta.json();
      
        if (dados.erro) {
            resultado.innerHTML = "CEP não encontrado!";
            return;
        }
       
        document.getElementById("resultado").innerHTML = `
            <h3>Endereço encontrado:</h3>
            <p><strong>Logradouro:</strong> ${dados.logradouro || "Não informado"}</p>
            <p><strong>Bairro:</strong> ${dados.bairro || "Não informado"}</p>
            <p><strong>Cidade:</strong> ${dados.localidade || "Não informado"}</p>
            <p><strong>UF:</strong> ${dados.uf || "Não informado"}</p>
        `;

    } catch (erro) {
        resultado.innerHTML = "Erro ao consultar o CEP. Tente novamente.";
    }

}
