export class CobrancaHeader {
    cod_registro: string
    cod_remessa: string
    cod_convenio: string
    nome_empresa: string
    cod_banco: string
    nome_banco: string
    data_geracao: string
    numero_sequencial_arquivo: string
    versao_layout: string
    identificacao_servico: string
    reservado_futuro: string
}

export class CobrancaItem {
    cod_registro: string
    id_cliente_empresa: string
    agencia_debito: string
    id_cliente_banco: string
    data_vencimento: string
    valor_debito: string
    codigo_moeda: string
    uso_empresa: string
    uso_empresa2: string
    uso_empresa3: string
    reservado_futuro: string
    codigo_movimento: string
}

export class CobrancaBradescoItem {
    cod_registro: string
    agencia_debito: string
    digito_agencia_debito: string
    razao_conta_corrente: string
    conta_corrente: string
    digito_conta_corrente: string
    id_cliente_empresa: string
    id_cliente_banco: string
    cod_banco: string
    multa: string
    percentual_multa: string
    cod_titulo_banco: string
    desconto: string
    emissao: string
    codigo_movimento: string
    codigo_operacao: string
    rateio_credito: string
    aviso_debito_automatico: string
    quantidade_pagamento: string
    identificacao_ocorrencia: string
    numero_documento: string
    data_vencimento: string
    valor_debito: string
    banco_encarregado_cobranca: string
    agencia_depositada: string
    especie_titulo: string
    identificacao: string
    data_da_emissao: string
    primeira_instrucao: string
    segunda_instrucao: string
    valor_cobrado_atraso: string
    data_limite_desconto: string
    valor_desconto: string
    valor_iof: string
    valor_abatimento: string
    tipo_pagador: string
    inscricao_pagador: string
    nome_pagador: string
    endereco_completo: string
    primeira_mensagem: string
    cep: string
    sufixo_cep: string
    sacador: string
    numero_sequencial: string
}


export class CobrancaFooter {
    cod_registro: string
    total_registros: string
    valor_total: string
    reservado_futuro: string
    numero_sequencial: string
}

export class Cobranca {
    header: CobrancaHeader
    cobrancas: CobrancaItem[]
    cobrancasBradesco: CobrancaBradescoItem[]
    footer: CobrancaFooter
}