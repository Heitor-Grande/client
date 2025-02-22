interface fazendaType {
    idfazenda: number | null
    idprodutor: number | ""
    nome_fazenda: string
    areatotal_hectares: number | ""
    areaagricutavel_hectares: number | ""
    cep: string
    cidade: string
    estado: string
    areavegetacao_hectares: number | ""
}

export default fazendaType