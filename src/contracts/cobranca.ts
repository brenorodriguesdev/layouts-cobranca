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

export class CobrancaFooter {
    cod_registro: string
    total_registros: string
    valor_total: string
    reservado_futuro: string
}

export class Cobranca {
    header: CobrancaHeader
    cobrancas: CobrancaItem[]
    footer: CobrancaFooter
}