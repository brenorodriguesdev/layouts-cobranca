import fs from 'fs'
import { Cobranca, CobrancaFooter, CobrancaHeader, CobrancaItem } from "../contracts/cobranca";
import { ReadRem } from "../contracts/read-rem";

export class ReadFebrabanRem implements ReadRem {


    async read(file: string): Promise<Cobranca> {

        let cobranca: Cobranca = new Cobranca()
        cobranca.header = new CobrancaHeader()
        cobranca.cobrancas = []
        cobranca.footer = new CobrancaFooter()

        const data = await fs.readFileSync(file)

        const lines = data.toString().split('\n')
        let i = 0

        for (let line of lines) {
            
            switch (line[0]) {
                case 'A': {
                    const cod_registro = line.slice(0, 1)
                    const cod_remessa = line.slice(1, 2)
                    const cod_convenio = line.slice(2, 22)
                    const nome_empresa = line.slice(22, 42)
                    const cod_banco = line.slice(42, 45)
                    const nome_banco = line.slice(45, 65)
                    const data_geracao = line.slice(65, 76)
                    const numero_sequencial_arquivo = line.slice(76, 1)
                    const versao_layout = line.slice(79, 81)
                    const identificacao_servico = line.slice(81, 100)
                    const reservado_futuro = line.slice(100, 150)

                    cobranca.header.cod_registro = cod_registro
                    cobranca.header.cod_remessa = cod_remessa
                    cobranca.header.cod_convenio = cod_convenio
                    cobranca.header.nome_empresa = nome_empresa
                    cobranca.header.cod_banco = cod_banco
                    cobranca.header.nome_banco = nome_banco
                    cobranca.header.data_geracao = data_geracao
                    cobranca.header.numero_sequencial_arquivo = numero_sequencial_arquivo
                    cobranca.header.versao_layout = versao_layout
                    cobranca.header.identificacao_servico = identificacao_servico
                    cobranca.header.reservado_futuro = reservado_futuro

                } break
                case 'E':


                    const cod_registro = line.slice(0, 1)
                    const id_cliente_empresa = line.slice(1, 26)
                    const agencia_debito = line.slice(26, 30)
                    const id_cliente_banco = line.slice(30, 44)
                    const data_vencimento = line.slice(44, 52)
                    const valor_debito = line.slice(52, 67)
                    const codigo_moeda = line.slice(67, 69)
                    const uso_empresa = line.slice(69, 118)
                    const uso_empresa2 = line.slice(118, 128)
                    const uso_empresa3 = line.slice(128, 129)
                    const reservado_futuro = line.slice(129, 149)
                    const codigo_movimento = line.slice(149, 150)

                    cobranca.cobrancas[i] = new CobrancaItem()
                    cobranca.cobrancas[i].cod_registro = cod_registro
                    cobranca.cobrancas[i].id_cliente_empresa = id_cliente_empresa
                    cobranca.cobrancas[i].agencia_debito = agencia_debito
                    cobranca.cobrancas[i].id_cliente_banco = id_cliente_banco
                    cobranca.cobrancas[i].data_vencimento = data_vencimento
                    cobranca.cobrancas[i].valor_debito = valor_debito
                    cobranca.cobrancas[i].codigo_moeda = codigo_moeda
                    cobranca.cobrancas[i].uso_empresa = uso_empresa
                    cobranca.cobrancas[i].uso_empresa2 = uso_empresa2
                    cobranca.cobrancas[i].uso_empresa3 = uso_empresa3
                    cobranca.cobrancas[i].reservado_futuro = reservado_futuro
                    cobranca.cobrancas[i].codigo_movimento = codigo_movimento

                    i++

                    break;
                case 'Z': {
                    const cod_registro = line.slice(0, 1)
                    const total_registros = line.slice(1, 7)
                    const valor_total = line.slice(7, 24)
                    const reservado_futuro = line.slice(24, 150)

                    cobranca.footer.cod_registro = cod_registro
                    cobranca.footer.total_registros = total_registros
                    cobranca.footer.valor_total = valor_total
                    cobranca.footer.reservado_futuro = reservado_futuro


                } break

            }
        }
        return cobranca
    }
}