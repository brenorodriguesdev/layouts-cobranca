import fs from 'fs'
import { Cobranca } from "../contracts/cobranca";
import { WriteRem } from "../contracts/write-rem";

export class WriteFebrabanRem implements WriteRem {
    write(file: string, cobranca: Cobranca): void {
        var headerBuffer = new Buffer(150);

        headerBuffer.write(cobranca.header.cod_registro, 0, 1)
        headerBuffer.write(cobranca.header.cod_remessa, 1, 1)
        headerBuffer.write(cobranca.header.cod_convenio, 2, 20)
        headerBuffer.write(cobranca.header.nome_empresa, 22, 20)
        headerBuffer.write(cobranca.header.cod_banco, 42, 3)
        headerBuffer.write(cobranca.header.nome_banco, 45, 20)
        headerBuffer.write(cobranca.header.data_geracao, 65, 8)
        headerBuffer.write(cobranca.header.numero_sequencial_arquivo, 76, 6)
        headerBuffer.write(cobranca.header.versao_layout, 79, 2)
        headerBuffer.write(cobranca.header.identificacao_servico, 81, 19)
        headerBuffer.write(cobranca.header.reservado_futuro, 149, 52)

        for (let i = 0; i < 150; i++) {
            if (headerBuffer[i] === 0)
                headerBuffer[i] = 32;
        }

        for (let i = 73; i < 78; i++) {
            if (headerBuffer[i] === 32)
                headerBuffer[i] = 48;
        }

        var cobrancasBuffer = []

        for (let item of cobranca.cobrancas) {
            var itemBuffer = new Buffer(150);
            itemBuffer.write(item.cod_registro, 0, 1)
            itemBuffer.write(item.id_cliente_empresa, 1, 25)
            itemBuffer.write(item.agencia_debito, 26, 4)
            itemBuffer.write(item.id_cliente_banco, 30, 14)
            itemBuffer.write(item.data_vencimento, 44, 8)
            itemBuffer.write(item.valor_debito, 52, 15)
            itemBuffer.write(item.codigo_moeda, 67, 2)
            itemBuffer.write(item.uso_empresa, 69, 49)
            itemBuffer.write(item.uso_empresa2, 118, 10)
            itemBuffer.write(item.uso_empresa3, 128, 1)
            itemBuffer.write(item.reservado_futuro, 129, 20)
            itemBuffer.write(item.codigo_movimento, 149, 1)

            for (let i = 0; i < 150; i++) {
                if (itemBuffer[i] === 0)
                    itemBuffer[i] = 32;
            }
            cobrancasBuffer.push(itemBuffer)
        }

        var footerBuffer = new Buffer(150);
        footerBuffer.write(cobranca.footer.cod_registro, 0, 1)
        footerBuffer.write(cobranca.footer.total_registros, 1, 6)
        footerBuffer.write(cobranca.footer.valor_total, 7, 17)
        footerBuffer.write(cobranca.footer.reservado_futuro, 24, 126)

        for (let i = 0; i < 150; i++) {
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