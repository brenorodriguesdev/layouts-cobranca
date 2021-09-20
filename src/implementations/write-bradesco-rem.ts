import fs from 'fs'
import { Cobranca } from "../contracts/cobranca";
import { WriteRem } from "../contracts/write-rem";

export class WriteBradescoRem implements WriteRem {
    write(file: string, cobranca: Cobranca): void {
        var headerBuffer = new Buffer(400);

        headerBuffer.write(cobranca.header.cod_registro, 0, 1)
        headerBuffer.write(cobranca.header.cod_remessa, 1, 1)
        headerBuffer.write('REMESSA', 2, 7)
        headerBuffer.write('01', 9, 2)
        headerBuffer.write('COBRANCA', 11, 15)
        headerBuffer.write(cobranca.header.cod_convenio, 26, 20)
        headerBuffer.write(cobranca.header.nome_empresa, 46, 30)
        headerBuffer.write(cobranca.header.cod_banco, 76, 3)
        headerBuffer.write(cobranca.header.nome_banco, 79, 15)
        headerBuffer.write(cobranca.header.data_geracao, 94, 6)
        headerBuffer.write('MX', 108, 2)
        headerBuffer.write(cobranca.header.numero_sequencial_arquivo, 110, 7)
        headerBuffer.write('000001', 394, 6)

        for (let i = 0; i < 400; i++) {
            if (headerBuffer[i] === 0)
                headerBuffer[i] = 32;
        }

        var cobrancasBuffer = []

        for (let item of cobranca.cobrancasBradesco) {
            var itemBuffer = new Buffer(400);
            itemBuffer.write(item.cod_registro, 0, 1)
            itemBuffer.write(item.agencia_debito, 1, 6)
            itemBuffer.write(item.digito_agencia_debito, 6, 7)
            itemBuffer.write(item.razao_conta_corrente, 7, 12)
            itemBuffer.write(item.conta_corrente, 12, 19)
            itemBuffer.write(item.digito_conta_corrente, 19, 20)
            itemBuffer.write(item.id_cliente_empresa, 20, 37)
            itemBuffer.write(item.id_cliente_banco, 37, 62)
            itemBuffer.write(item.cod_banco, 62, 65)
            itemBuffer.write(item.multa, 65, 66)
            itemBuffer.write(item.percentual_multa, 66, 70)
            itemBuffer.write(item.cod_titulo_banco, 70, 81)
            itemBuffer.write(item.desconto, 81, 82)
            itemBuffer.write(item.emissao, 82, 93)
            itemBuffer.write(item.codigo_movimento, 93, 94)
            itemBuffer.write(item.codigo_operacao, 94, 104)
            itemBuffer.write(item.rateio_credito, 104, 105)
            itemBuffer.write(item.aviso_debito_automatico, 105, 106)
            itemBuffer.write(item.quantidade_pagamento, 106, 108)
            itemBuffer.write(item.identificacao_ocorrencia, 108, 110)
            itemBuffer.write(item.numero_documento, 110, 120)
            itemBuffer.write(item.data_vencimento, 120, 126)
            itemBuffer.write(item.valor_debito, 126, 139)
            itemBuffer.write(item.banco_encarregado_cobranca, 139, 142)
            itemBuffer.write(item.agencia_depositada, 142, 147)
            itemBuffer.write(item.especie_titulo, 147, 149)
            itemBuffer.write(item.identificacao, 149, 150)
            itemBuffer.write(item.data_da_emissao, 150, 156)
            itemBuffer.write(item.primeira_instrucao, 156, 158)
            itemBuffer.write(item.segunda_instrucao, 158, 160)
            itemBuffer.write(item.valor_cobrado_atraso, 160, 173)
            itemBuffer.write(item.data_limite_desconto, 173, 179)
            itemBuffer.write(item.valor_desconto, 179, 192)
            itemBuffer.write(item.valor_iof, 192, 205)
            itemBuffer.write(item.valor_abatimento, 205, 218)
            itemBuffer.write(item.tipo_pagador, 218, 220)
            itemBuffer.write(item.inscricao_pagador, 220, 234)
            itemBuffer.write(item.nome_pagador, 234, 274)
            itemBuffer.write(item.endereco_completo, 274, 314)
            itemBuffer.write(item.primeira_mensagem, 314, 326)
            itemBuffer.write(item.cep, 326, 331)
            itemBuffer.write(item.sufixo_cep, 331, 334)
            itemBuffer.write(item.sacador, 334, 394)
            itemBuffer.write(item.numero_sequencial, 394, 400)


            for (let i = 0; i < 400; i++) {
                if (itemBuffer[i] === 0)
                    itemBuffer[i] = 32;
            }
            cobrancasBuffer.push(itemBuffer)
        }

        var footerBuffer = new Buffer(400);
        footerBuffer.write(cobranca.footer.cod_registro, 0, 1)
        footerBuffer.write(cobranca.footer.numero_sequencial, 394, 400)

        for (let i = 0; i < 400; i++) {
            if (footerBuffer[i] === 0)
                footerBuffer[i] = 32;
        }

        async function write() {
            await fs.appendFile(file, headerBuffer + "\n", (err) => { if (err) throw err; });
            for (let cobrancaBuffer of cobrancasBuffer) {
                await fs.appendFile(file, cobrancaBuffer + "\n", (err) => { if (err) throw err; });
            }
            await fs.appendFile(file, footerBuffer + "\n", (err) => { if (err) throw err; });
        }
        write()
    }
}