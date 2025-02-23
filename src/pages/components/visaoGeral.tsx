import Card from "@mui/material/Card"
import { useEffect, useState } from "react"
import axios from "axios"
import { PieChart } from '@mui/x-charts/PieChart';

function VisaoGeral() {

    //carregando informações para Visão Geral
    const [qtdHectaresCadastrados, setQtdHectaresCadastrados] = useState(0)
    const [qtdFazendasCadastradas, setQtdFazendasCadastradas] = useState(0)
    const [fazendasPorEstado, setFazendasPorEstado] = useState([])
    const [culturasPlantadas, setCulturasPlantadas] = useState([])
    const [porUsoDoSolo, setPorUsoDoSolo] = useState([])

    function carregarFazendasCadastradas() {

        axios.get(process.env.REACT_APP_API_PRODUTORES + "visao-geral/carregar/fazendas/cadastradas")
            .then(function (resposta) {
                //console.log(resposta.data)
                setQtdFazendasCadastradas(resposta.data.qtdFazendas)
                setQtdHectaresCadastrados(resposta.data.areaTotal)
                setFazendasPorEstado(resposta.data.fazendasPorEstado)
                setCulturasPlantadas(resposta.data.culturasPlantadas)
                setPorUsoDoSolo(resposta.data.usoDoSolo)
            }).catch(function (erro) {

                alert(erro.response.data.message || "Erro ao tentar carregar fazendas cadastradas.")
            })
    }

    useEffect(function () {
        carregarFazendasCadastradas()
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm col-md-3 col-lg-6">
                    <Card>
                        <p className="text-center mt-3"><strong>Total de Fazendas Cadastradas</strong></p>
                        <Card>
                            <p className="fs-2 text-center mt-3">
                                <strong>
                                    {qtdFazendasCadastradas}
                                </strong>
                            </p>
                        </Card>
                    </Card>
                </div>
                <div className="col-sm col-md-3 col-lg-6">
                    <Card>
                        <p className="text-center mt-3"><strong>Área Total em Hectares</strong></p>
                        <Card>
                            <p className="fs-2 text-center mt-3">
                                <strong>
                                    {qtdHectaresCadastrados}
                                </strong>
                            </p>
                        </Card>
                    </Card>
                </div>
                <div className="col-sm col-md-3 col-lg-4 mt-3">
                    <Card>
                        <p className="text-center mt-3"><strong>Fazendas por Estado</strong></p>
                        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                            <PieChart
                                series={[
                                    {
                                        data: fazendasPorEstado,
                                    },
                                ]}
                                width={400}
                                height={150}
                            />
                        </Card>
                    </Card>
                </div>
                <div className="col-sm col-md-3 col-lg-4 mt-3">
                    <Card>
                        <p className="text-center mt-3"><strong>Culturas</strong></p>
                        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                            <PieChart
                                series={[
                                    {
                                        data: culturasPlantadas,
                                    },
                                ]}
                                width={400}
                                height={150}
                            />
                        </Card>
                    </Card>
                </div>
                <div className="col-sm col-md-3 col-lg-4 mt-3">
                    <Card>
                        <p className="text-center mt-3"><strong>Uso do Solo</strong></p>
                        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                            <PieChart
                                series={[
                                    {
                                        data: porUsoDoSolo,
                                    },
                                ]}
                                width={450}
                                height={150}
                            />
                        </Card>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default VisaoGeral