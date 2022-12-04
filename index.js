const express = require("express");
const MercadoPago = require("mercadopago");
const app = express();

//em desenvolvimento sandbox: true, em produção sandbox: false
MercadoPago.configure({
    sandbox: true, 
    access_token: "TEST-4814380722487092-120415-7f572c3b55bad5638a1ead8d6c063dc8-3600360"
})

app.get("/", (req, res) => {
    res.send("Olá mundo");
})

app.get("/pagar", async (req, res) => {
    var id = "" + Date.now();
    var emailDoPagador = "joaofayad@msn.com";

    var dados = {
        items: [
            item = {
                id: id,
                title: "Produto teste",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(10.5)
            }
        ],
        payer: {
            email: emailDoPagador
        },
        external_reference: id
    }

    try {
        var pagamento = await MercadoPago.preferences.create(dados);
        console.log(pagamento);
        // salvar pagamento neste momento no banco
        return res.redirect(pagamento.body.init_point);
    } catch (error) {
        console.log(error);
    }
})

app.listen(3000, (req, res) => {
    console.log("Servidor rodando");
})

