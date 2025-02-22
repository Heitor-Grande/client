import typeProdutor from "./produtor"

interface typeListaFazenda {
    idfazenda: number
    nome_fazenda: string
    areatotal_hectares: number
    areaagricutavel_hectares: number
    cep: string
    cidade: string
    estado: string
    areavegetacao_hectares: number
    idprodutor: typeProdutor
}

export default typeListaFazenda