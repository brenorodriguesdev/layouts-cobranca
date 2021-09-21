import fs from 'fs'
import { Cobranca, CobrancaBradescoItem, CobrancaFooter, CobrancaHeader, CobrancaItem } from "../contracts/cobranca";
import { ReadRem } from "../contracts/read-rem";

export class ReadBradescoRem implements ReadRem {


    async read(file: string): Promise<Cobranca> {

        let cobranca: Cobranca = new Cobranca()
        cobranca.header = new CobrancaHeader()
        cobranca.cobrancas = []
        cobranca.cobrancasBradesco = []
        cobranca.footer = new CobrancaFooter()

        const data = await fs.readFileSync(file)

        const lines = data.toString().split('\n')
        let i = 0

        for (let line of lines) {
            
            switch (line[0]) {
                case '0': {
                    const cod_registro = line.slice(0, 1)
                    const cod_remessa = line.slice(1, 2)
                    const cod_convenio = line.slice(26, 46)
                    const nome_empresa = line.slice(46, 76)
                    const cod_banco = line.slice(76, 94)
                    const nome_banco = line.slice(45, 65)
                    const data_geracao = line.slice(94, 100)
                    const numero_sequencial_arquivo = line.slice(110, 117)

                    cobranca.header.cod_registro = cod_registro
                    cobranca.header.cod_remessa = cod_remessa
                    cobranca.header.cod_convenio = cod_convenio
                    cobranca.header.nome_empresa = nome_empresa
                    cobranca.header.cod_banco = cod_banco
                    cobranca.header.nome_banco = nome_banco
                    cobranca.header.data_geracao = data_geracao
                    cobranca.header.numero_sequencial_arquivo = numero_sequencial_arquivo

                } break
                case '1':


                    const cod_registro = line.slice(0, 1)
                    const agencia_debito = line.slice(1, 6)
                    const digito_agencia_debito = line.slice(6, 7)
                    const razao_conta_corrente = line.slice(7, 12)
                    const conta_corrente = line.slice(12, 19)
                    const digito_conta_corrente = line.slice(19, 20)
                    const id_cliente_empresa = line.slice(20, 37)
                    const id_cliente_banco = line.slice(37, 62)
                    const cod_banco = line.slice(62, 65)
                    const multa = line.slice(65, 66)
                    const percentual_multa = line.slice(66, 70)
                    const cod_titulo_banco = line.slice(70, 81)
                    const desconto = line.slice(81, 82)
                    const emissao = line.slice(82, 93)
                    const codigo_movimento = line.slice(93, 93)
                    const codigo_operacao = line.slice(94, 94)
                    const rateio_credito = line.slice(104, 104)
                    const aviso_debito_automatico = line.slice(105, 106)
                    const quantidade_pagamento = line.slice(106, 108)
                    const identificacao_ocorrencia = line.slice(108, 110)
                    const numero_documento = line.slice(110, 120)
                    const data_vencimento = line.slice(120, 126)
                    const valor_debito = line.slice(126, 139)
                    const banco_encarregado_cobranca = line.slice(139, 142)
                    const agencia_depositada = line.slice(142, 147)
                    const especie_titulo = line.slice(147, 149)
                    const identificacao = line.slice(149, 150)
                    const data_da_emissao = line.slice(150, 156)
                    const primeira_instrucao = line.slice(156, 158)
                    const segunda_instrucao = line.slice(158, 160)
                    const valor_cobrado_atraso = line.slice(160, 173)
                    const data_limite_desconto = line.slice(173, 179)
                    const valor_desconto = line.slice(179, 192)
                    const valor_iof = line.slice(192, 205)
                    const valor_abatimento = line.slice(205, 218)
                    const tipo_pagador = line.slice(218, 220)
                    const inscricao_pagador = line.slice(220, 234)
                    const nome_pagador = line.slice(234, 274)
                    const endereco_completo = line.slice(274, 314)
                    const primeira_mensagem = line.slice(314, 326)
                    const cep = line.slice(326, 331)
                    const sufixo_cep = line.slice(331, 334)
                    const sacador = line.slice(334, 394)
                    const numero_sequencial = line.slice(394, 400)



                    cobranca.cobrancasBradesco[i] = new CobrancaBradescoItem()
                    cobranca.cobrancasBradesco[i].cod_registro = cod_registro
                    cobranca.cobrancasBradesco[i].agencia_debito = agencia_debito
                    cobranca.cobrancasBradesco[i].digito_agencia_debito = digito_agencia_debito
                    cobranca.cobrancasBradesco[i].razao_conta_corrente = razao_conta_corrente
                    cobranca.cobrancasBradesco[i].conta_corrente = conta_corrente
                    cobranca.cobrancasBradesco[i].digito_conta_corrente = digito_conta_corrente
                    cobranca.cobrancasBradesco[i].id_cliente_empresa = id_cliente_empresa
                    cobranca.cobrancasBradesco[i].id_cliente_banco = id_cliente_banco
                    cobranca.cobrancasBradesco[i].cod_banco = cod_banco
                    cobranca.cobrancasBradesco[i].multa = multa
                    cobranca.cobrancasBradesco[i].percentual_multa = percentual_multa
                    cobranca.cobrancasBradesco[i].cod_titulo_banco = cod_titulo_banco
                    cobranca.cobrancasBradesco[i].desconto = desconto
                    cobranca.cobrancasBradesco[i].emissao = emissao
                    cobranca.cobrancasBradesco[i].codigo_movimento = codigo_movimento
                    cobranca.cobrancasBradesco[i].codigo_operacao = codigo_operacao
                    cobranca.cobrancasBradesco[i].rateio_credito = rateio_credito
                    cobranca.cobrancasBradesco[i].aviso_debito_automatico = aviso_debito_automatico
                    cobranca.cobrancasBradesco[i].quantidade_pagamento = quantidade_pagamento
                    cobranca.cobrancasBradesco[i].identificacao_ocorrencia = identificacao_ocorrencia
                    cobranca.cobrancasBradesco[i].numero_documento = data_vencimento
                    cobranca.cobrancasBradesco[i].data_vencimento = data_vencimento
                    cobranca.cobrancasBradesco[i].valor_debito = valor_debito
                    cobranca.cobrancasBradesco[i].banco_encarregado_cobranca = banco_encarregado_cobranca
                    cobranca.cobrancasBradesco[i].agencia_depositada = agencia_depositada
                    cobranca.cobrancasBradesco[i].especie_titulo = especie_titulo
                    cobranca.cobrancasBradesco[i].identificacao = identificacao
                    cobranca.cobrancasBradesco[i].data_da_emissao = data_da_emissao
                    cobranca.cobrancasBradesco[i].primeira_instrucao = primeira_instrucao
                    cobranca.cobrancasBradesco[i].segunda_instrucao = segunda_instrucao
                    cobranca.cobrancasBradesco[i].valor_cobrado_atraso = valor_cobrado_atraso
                    cobranca.cobrancasBradesco[i].data_limite_desconto = data_limite_desconto
                    cobranca.cobrancasBradesco[i].valor_desconto = valor_desconto
                    cobranca.cobrancasBradesco[i].valor_iof = valor_iof
                    cobranca.cobrancasBradesco[i].valor_abatimento = valor_abatimento
                    cobranca.cobrancasBradesco[i].tipo_pagador = tipo_pagador
                    cobranca.cobrancasBradesco[i].inscricao_pagador = inscricao_pagador
                    cobranca.cobrancasBradesco[i].nome_pagador = nome_pagador
                    cobranca.cobrancasBradesco[i].endereco_completo = endereco_completo
                    cobranca.cobrancasBradesco[i].primeira_mensagem = primeira_mensagem
                    cobranca.cobrancasBradesco[i].cep = cep
                    cobranca.cobrancasBradesco[i].sufixo_cep = sufixo_cep
                    cobranca.cobrancasBradesco[i].sacador = sacador
                    cobranca.cobrancasBradesco[i].numero_sequencial = numero_sequencial

                    i++

                    break;
                case '9': {
                    const cod_registro = line.slice(0, 1)
                    const numero_sequencial = line.slice(394, 400)

                    cobranca.footer.cod_registro = cod_registro
                    cobranca.footer.numero_sequencial = numero_sequencial


                } break

            }
        }
        return cobranca
    }
}