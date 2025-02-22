import Card from "@mui/material/Card"
import { Button, Link } from "@mui/material"
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { TextField } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import fazendaType from "../interfaces/fazendaType";
import axios from "axios";
import typeProdutor from "../interfaces/produtor";
import MenuItem from '@mui/material/MenuItem';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DeleteIcon from '@mui/icons-material/Delete';
import typeListaFazenda from "../interfaces/listaFazenda";
import ModalConfirmacao from "./components/modalConfirmacao";

function FazendasPage() {

    //style do modal
    const style = {
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "85%",
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    }

    //controlando modal do formulario da fazenda
    const [showModalFazenda, setShowModalFazenda] = useState(false)
    function setShowModalFazendaClick() {

        setShowModalFazenda(!showModalFazenda)
    }

    //objeto fazenda
    const [Fazenda, setFazenda] = useState<fazendaType>({
        idfazenda: null,
        idprodutor: "",
        nome_fazenda: "",
        areatotal_hectares: "",
        areaagricutavel_hectares: "",
        cep: "",
        cidade: "",
        estado: "",
        areavegetacao_hectares: ""
    })

    //função para atualizar valores do obj Fazenda
    function setValuesFazenda(property: "nome_fazenda" | "areatotal_hectares" | "idprodutor"
        | "areaagricutavel_hectares" | "cep" | "cidade" | "estado" | "areavegetacao_hectares"
        , newValue: string | number | null) {

        setFazenda({
            ...Fazenda,
            [property]: newValue
        })
    }

    //setando valor do nome da fazenda
    function setValueNomeFazenda(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const nome = input.target.value
        setValuesFazenda("nome_fazenda", nome)
    }

    //setando valor de cep da fazenda
    function setValueCepFazenda(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        let cep = input.target.value.replace(/\D/g, '') //tira tudo que nao é numero
        if (cep.length <= 8) {
            //fomatando cep
            cep = cep.replace(/(\d{5})(\d)/, '$1-$2')
            setValuesFazenda("cep", cep)
        }
    }

    //consultando cep api (ViaCEP)
    function consultaAPIcep(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        let cep = input.target.value.replace(/\D/g, '')

        //consultando api do gov com base no cep
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(function (resposta) {

                //setando o valor de cidade e estado da fazenda
                setFazenda({
                    ...Fazenda,
                    cidade: resposta.data.localidade,
                    estado: resposta.data.estado
                })
            }).catch(function (erro) {

                // console.log(erro)
                alert(erro.response.data.message || "Erro ao carregar CEP.")
            })
    }

    //setando valor de hectares (areatotal)
    function setValueAreaTotalHectares(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const areaTotal = input.target.value.replace(/[^\d.]/g, '')

        if (areaTotal != "") {

            setValuesFazenda("areatotal_hectares", areaTotal)
        }
        else {

            setValuesFazenda("areatotal_hectares", null)
        }
    }

    //setando valor de hectares (areaAgricutavel)
    function setValueAreaAgricutavel(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const areaTotal = input.target.value.replace(/[^\d.]/g, '')

        if (areaTotal != "") {

            //calculando se a area vegetacao + area agricutavel é maior que a areatotal da fazenda
            const areaVegetacao = Fazenda.areavegetacao_hectares == "" ? 0 : Fazenda.areavegetacao_hectares

            const calcArea = (Number(areaTotal)) + (Number(areaVegetacao))


            const areaTotalFazenda = Fazenda.areatotal_hectares == "" ? 0 : Fazenda.areatotal_hectares

            if (calcArea <= areaTotalFazenda) {

                setValuesFazenda("areaagricutavel_hectares", areaTotal)
            }
            else {

                alert("A fazenda não possuí espaço.")
                setValuesFazenda("areaagricutavel_hectares", "")
            }
        }
        else {

            setValuesFazenda("areaagricutavel_hectares", "")
        }
    }

    //setando valor de hectares (areaAgricutavel)
    function setValueAreaVegetacao(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const areaTotal = input.target.value.replace(/[^\d.]/g, '')

        if (areaTotal != "") {

            //calculando se a area vegetacao + area agricutavel é maior que a areatotal da fazenda
            const areaAgricutavel = Fazenda.areaagricutavel_hectares == "" ? 0 : Fazenda.areaagricutavel_hectares

            const calcArea = (Number(areaTotal)) + (Number(areaAgricutavel))

            const areaTotalFazenda = Fazenda.areatotal_hectares == "" ? 0 : Fazenda.areatotal_hectares

            if (calcArea <= areaTotalFazenda) {
                console.log("entrou aqui")
                setValuesFazenda("areavegetacao_hectares", areaTotal)
            }
            else {

                alert("A fazenda não possuí espaço.")
                setValuesFazenda("areavegetacao_hectares", "")
            }
        }
        else {

            setValuesFazenda("areavegetacao_hectares", "")
        }
    }

    //carregando produtores
    const [listaProdutores, setListaProdutores] = useState<typeProdutor[]>([])
    function carregarProdutores() {

        axios.get(process.env.REACT_APP_API_PRODUTORES + "produtor/carregar/produtores")
            .then(function (resposta) {
                //console.log(resposta.data)
                setListaProdutores(resposta.data)
            }).catch(function (erro) {
                //console.log(erro)
                alert(erro.response.data.message || "Erro ao carregar lista de Produtores")
            })
    }

    //setando o produtor da fazenda
    function setValueProdutorFazenda(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        setValuesFazenda("idprodutor", input.target.value)
    }

    //função para criar nova fazenda
    function onSubmitFazenda(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()
        if (Fazenda.idfazenda == null) {
            axios.post(process.env.REACT_APP_API_PRODUTORES + "fazenda/criar/nova", Fazenda)
                .then(function (resposta) {

                    carregarFazendasCadastradas()
                    setShowModalFazendaClick()
                }).catch(function (erro) {
                    alert(erro.response.data.message || "Erro ao criar nova Fazenda.")
                })
        }
        else {
            axios.put(process.env.REACT_APP_API_PRODUTORES + `fazenda/atualizar/${Fazenda.idfazenda}`, Fazenda)
                .then(function (resposta) {
                    carregarFazendasCadastradas()
                    setShowModalFazendaClick()
                }).catch(function (erro) {
                    alert(erro.response.data.message || "Erro ao tentar atualizar.")
                })
        }
    }


    //carregar registros das fzaendas cadastradas
    const [listaFazendas, setListaFazendas] = useState<typeListaFazenda[]>([])
    function carregarFazendasCadastradas() {

        axios.get(process.env.REACT_APP_API_PRODUTORES + "fazenda/carregar/cadastradas")
            .then(function (resposta) {

                setListaFazendas(resposta.data)
            }).catch(function (erro) {

                alert(erro.response.data.message || "Erro ao carregar lista de fazendas cadastradas.")
            })
    }

    //carregando fazenda para editar
    function carregarFazenda(fazenda: typeListaFazenda) {

        if (fazenda.idprodutor.idprodutor) {

            setFazenda({
                idfazenda: fazenda.idfazenda,
                idprodutor: fazenda.idprodutor.idprodutor,
                nome_fazenda: fazenda.nome_fazenda,
                areatotal_hectares: fazenda.areatotal_hectares,
                areaagricutavel_hectares: fazenda.areaagricutavel_hectares,
                cep: fazenda.cep,
                cidade: fazenda.cidade,
                estado: fazenda.estado,
                areavegetacao_hectares: fazenda.areavegetacao_hectares
            })


            setShowModalFazendaClick()
        }
    }

    //manipulando modal de confirmação para excluir registro
    const [showModalConfirmacao, setShowModalConfirmacao] = useState(false)
    function setShowModalConfirmacaoClick() {
        setShowModalConfirmacao(!showModalConfirmacao)
    }

    //pesquisa por fazenda
    function buscarFazenda(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const nome_fazenda = input.target.value
        if (nome_fazenda != "") {
            
            const fazendaEncontrada = listaFazendas.filter(function (fazenda) {

                return fazenda.nome_fazenda.toLowerCase().includes(nome_fazenda)
            })

            setListaFazendas(fazendaEncontrada)
        }
        else {
            carregarFazendasCadastradas()
        }
    }

    useEffect(function () {
        carregarFazendasCadastradas()
        carregarProdutores()
    }, [])
    return (
        <Card>
            <div className="row p-2">
                <div className="col-sm col-md-6 col-lg-9">
                    <TextField onChange={buscarFazenda} fullWidth id="search" label="Pesquisar por Fazenda" variant="outlined" />
                </div>
                <div className="col-sm col-md-6 col-lg-3 mt-2">
                    <Button onClick={function () {
                        setFazenda({
                            idfazenda: null,
                            idprodutor: "",
                            nome_fazenda: "",
                            areatotal_hectares: "",
                            areaagricutavel_hectares: "",
                            cep: "",
                            cidade: "",
                            estado: "",
                            areavegetacao_hectares: ""
                        })
                        setShowModalFazendaClick()
                    }} fullWidth variant="contained" startIcon={<PlaylistAddIcon />}>Nova Fazenda</Button>
                </div>
            </div>
            <div className="row">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Fazenda</TableCell>
                                <TableCell align="center">Proprietário</TableCell>
                                <TableCell align="center">Qtd de Hectares</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                listaFazendas.map(function (fazenda) {

                                    return <TableRow
                                        key={fazenda.idfazenda}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell component="th" scope="row">
                                            <Link onClick={function () { carregarFazenda(fazenda) }} component="button">{fazenda.nome_fazenda}</Link>
                                        </TableCell>
                                        <TableCell align="center">{fazenda.idprodutor.nome}</TableCell>
                                        <TableCell align="center">{fazenda.areatotal_hectares}</TableCell>
                                        <TableCell align="center">
                                            <Button color="error" onClick={function () {
                                                setFazenda({
                                                    ...Fazenda,
                                                    idfazenda: fazenda.idfazenda,
                                                    nome_fazenda: fazenda.nome_fazenda
                                                })
                                                setShowModalConfirmacaoClick()
                                            }} ><DeleteIcon fontSize="small" /></Button>
                                        </TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Modal
                open={showModalFazenda}
                onClose={setShowModalFazendaClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={onSubmitFazenda}>
                        <div className="container-fluid">
                            <div className="row border-bottom">
                                <p><strong>Cadastrando nova Fazenda</strong></p>
                            </div>
                            <div className="row">
                                <div className="col-sm col-md-4 col-lg-8 mt-3">
                                    <TextField onChange={setValueNomeFazenda} value={Fazenda.nome_fazenda} required fullWidth id="outlined-basic" label="Nome da Propriedade" variant="outlined" />
                                </div>
                                <div className="col-sm col-md-4 col-lg-4 mt-3">
                                    <TextField
                                        fullWidth
                                        id="outlined-select-currency"
                                        select
                                        value={Fazenda.idprodutor}
                                        label="Produtor"
                                        onChange={setValueProdutorFazenda}
                                        helperText="Selecione o Produtor da fazenda"
                                    >
                                        <MenuItem key={"0"} value={""}>
                                            Selecione...
                                        </MenuItem>
                                        {listaProdutores.map((produtor) => (
                                            <MenuItem key={produtor.idprodutor} value={produtor.idprodutor?.toString()}>
                                                {produtor.nome}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col-sm col-md-4 col-lg-4 mt-3">
                                    <TextField onBlur={consultaAPIcep} onChange={setValueCepFazenda} value={Fazenda.cep} required fullWidth id="outlined-basic" label="CEP" variant="outlined" />
                                </div>
                                <div className="col-sm col-md-4 col-lg-4 mt-3">
                                    <TextField value={Fazenda.cidade} required disabled fullWidth id="outlined-basic" label="Cidade" variant="outlined" />
                                </div>
                                <div className="col-sm col-md-4 col-lg-4 mt-3">
                                    <TextField value={Fazenda.estado} required disabled fullWidth id="outlined-basic" label="Estado" variant="outlined" />
                                </div>
                            </div>
                            <div className="row border-bottom mt-3">
                                <p>Informações de Hectares</p>
                            </div>
                            <div className="row">
                                <div className="col-sm col-md-4 col-lg-4 mt-3">
                                    <TextField value={Fazenda.areatotal_hectares} onChange={setValueAreaTotalHectares} required fullWidth id="totalFazenda" label="Área total da Fazenda" variant="outlined" />
                                </div>
                                <div className="col-sm col-md-4 col-lg-4 mt-3">
                                    <TextField value={Fazenda.areaagricutavel_hectares} onChange={setValueAreaAgricutavel} disabled={Fazenda.areatotal_hectares == ""} required fullWidth id="totalAgr" label="Área Agricultável" variant="outlined" />
                                </div>
                                <div className="col-sm col-md-4 col-lg-4 mt-3">
                                    <TextField value={Fazenda.areavegetacao_hectares} onChange={setValueAreaVegetacao} disabled={Fazenda.areaagricutavel_hectares == ""} required fullWidth id="totalAgr" label="Área de Vegetação" variant="outlined" />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <Button type="submit" fullWidth variant="contained" startIcon={<AssignmentTurnedInIcon />}>
                                    {Fazenda.idprodutor == "" ? "Finalizar Cadastro" : "Atualizar Fazenda"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
            <ModalConfirmacao
                texto={`Confirmar a exclusão do registro da Fazenda "${Fazenda.nome_fazenda}"? Isso vai excluir todas as informações relacionadas.`}
                id={0}
                url={`fazenda/deletar/${Fazenda.idfazenda}`}
                show={showModalConfirmacao}
                openClose={setShowModalConfirmacaoClick}
                funcAuxiliar={carregarFazendasCadastradas}
            />
        </Card>
    )
}

export default FazendasPage