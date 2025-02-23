
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
import axios from "axios";
import ModalConfirmacao from "./components/modalConfirmacao";
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import culturaType from "../../interfaces/culturaType";
import listaSafraType from "../../interfaces/listaSafraType";
import culturaListType from "../../interfaces/culturaListType";


function CulturaPage() {

    const listaCultura = [
        {
            id: 0,
            cultura: "Café"
        },
        {
            id: 1,
            cultura: "Soja"
        },
        {
            id: 2,
            cultura: "Milho"
        },
        {
            id: 3,
            cultura: "Feijão"
        },
        {
            id: 4,
            cultura: "Arroz"
        },
        {
            id: 5,
            cultura: "Trigo"
        }
    ]

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

    // controlando modal do formulario da cultura
    const [showModalCultura, setShowModalCultura] = useState(false)
    function setShowModalCulturaClick() {

        setShowModalCultura(!showModalCultura)
    }

    //objeto cultura
    const [cultura, setCultura] = useState<culturaType>({
        idcultura: 0,
        idsafra: 0,
        cultura: ""
    })

    //seta o id da safra em que a cultura esta vinculada
    function setValueIdSafra(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCultura({
            ...cultura,
            idsafra: parseInt(input.target.value)
        })
    }

    //seta a cultura
    function setValueCultura(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCultura({
            ...cultura,
            cultura: input.target.value
        })
    }

    //função para carregar safras
    const [listaDeSafras, setListaDeSafras] = useState<listaSafraType[]>([])
    function carregaSafrasCriadas() {

        axios.get(process.env.REACT_APP_API_PRODUTORES + "safra/carregar/criadas")
            .then(function (resposta) {

                setListaDeSafras(resposta.data)
            }).catch(function (erro) {

                alert(erro.response.data.message)
            })
    }

    useEffect(function () {
        carregaSafrasCriadas()
    }, [])

    //manipulando modal de confirmação para excluir registro
    const [showModalConfirmacao, setShowModalConfirmacao] = useState(false)
    function setShowModalConfirmacaoClick() {
        setShowModalConfirmacao(!showModalConfirmacao)
    }

    //função para criar ou atualizar cultura
    function onSubmitCultura(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (cultura.idcultura == 0) {

            axios.post(process.env.REACT_APP_API_PRODUTORES + "cultura/criar/nova/cultura", cultura)
                .then(function (resposta) {

                    setShowModalCulturaClick()
                    carregarCulturas()
                }).catch(function (erro) {

                    alert(erro.response.data.message || "Erro ao tentar criar cultura.")
                })
        }
        else {
            axios.put(process.env.REACT_APP_API_PRODUTORES + `cultura/atualizar/cultura/${cultura.idcultura}`, cultura)
                .then(function (resposta) {

                    setShowModalCulturaClick()
                    carregarCulturas()
                }).catch(function (erro) {
                    console.log(erro)
                    alert(erro.response.data.message || "Erro ao tentar atualizar cultura.")
                })
        }
    }

    //carregar culturas criadas
    const [listaCulturaCriadas, setListaCulturasCriadas] = useState<culturaListType[]>([])
    function carregarCulturas() {
        axios.get(process.env.REACT_APP_API_PRODUTORES + "cultura/carregar/culturas/criadas")
            .then(function (resposta) {

                setListaCulturasCriadas(resposta.data)
            }).catch(function (erro) {

                alert(erro.response.data.message || "Erro ao tentar carregar Culturas criadas.")
            })
    }

    //pesquisa por cultura
    function buscarCultura(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const value = input.target.value
        if (value != "") {

            const culturasEncontradas = listaCulturaCriadas.filter(function (cultura) {

                return cultura.cultura.toLowerCase().includes(value.toLocaleLowerCase())
            })
            setListaCulturasCriadas(culturasEncontradas)
        }
        else {

            carregarCulturas()
        }
    }

    useEffect(function () {

        carregarCulturas()
    }, [])

    return (
        <Card>
            <div className="row p-2">
                <div className="col-sm col-md-6 col-lg-9">
                    <TextField onChange={buscarCultura} fullWidth id="searchcultura" label="Pesquisar por Safra" variant="outlined" />
                </div>
                <div className="col-sm col-md-6 col-lg-3 mt-2">
                    <Button onClick={function () {
                        setCultura({
                            idcultura: 0,
                            idsafra: 0,
                            cultura: ""
                        })
                        setShowModalCulturaClick()
                    }} fullWidth variant="contained" startIcon={<PlaylistAddIcon />}>Nova Safra</Button>
                </div>
            </div>
            <div className="row">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Cultura</TableCell>
                                <TableCell align="center">Safra</TableCell>
                                <TableCell align="center">Fazenda</TableCell>
                                <TableCell align="center">Proprietário</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                listaCulturaCriadas.map(function (cultura) {

                                    return <TableRow
                                        key={cultura.idcultura}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell component="th" scope="row">
                                            <Link onClick={function () {
                                                setCultura({
                                                    idcultura: cultura.idcultura,
                                                    idsafra: cultura.idsafra.idsafra,
                                                    cultura: cultura.cultura
                                                })
                                                setShowModalCulturaClick()
                                            }} component="button">{cultura.cultura}</Link>
                                        </TableCell>
                                        <TableCell align="center">{cultura.idsafra.ano}</TableCell>
                                        <TableCell align="center">{cultura.idsafra.idfazenda.nome_fazenda}</TableCell>
                                        <TableCell align="center">{cultura.idsafra.idfazenda.idprodutor.nome}</TableCell>
                                        <TableCell align="center">
                                            <Button onClick={function () {
                                                setCultura({
                                                    idcultura: cultura.idcultura,
                                                    idsafra: cultura.idsafra.idsafra,
                                                    cultura: cultura.cultura
                                                })
                                                setShowModalConfirmacaoClick()
                                            }} color="error"><DeleteIcon fontSize="small" /></Button>
                                        </TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Modal
                open={showModalCultura}
                onClose={setShowModalCulturaClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={onSubmitCultura}>
                        <div className="container-fluid">
                            <div className="row border-bottom">
                                <p><strong>{cultura.idcultura == 0 ? "Cadastrando nova Cultura" : "Editando Cultura"}</strong></p>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm col-md-6 col-lg-8">
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-select-currency"
                                        value={cultura.cultura}
                                        onChange={setValueCultura}
                                        select
                                        label="Cultura"
                                    >
                                        {listaCultura.map((cultura) => (
                                            <MenuItem key={cultura.id} value={cultura.cultura}>
                                                {cultura.cultura}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col-sm col-md-6 col-lg-4">
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-select-currency"
                                        select
                                        value={cultura.idsafra == 0 ? "" : cultura.idsafra}
                                        label="Safra"
                                        onChange={setValueIdSafra}
                                        helperText="Escolha a safra da cultura"
                                    >
                                        {listaDeSafras.map((safra) => (
                                            <MenuItem key={safra.idsafra} value={safra.idsafra}>
                                                {safra.idfazenda.idprodutor.nome} - {safra.idfazenda.nome_fazenda} - {safra.safra} {safra.ano}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <Button type="submit" fullWidth variant="contained" startIcon={<AssignmentTurnedInIcon />}>
                                    {cultura.idcultura == 0 ? "Finalizar Cadastro" : "Atualizar Cultura"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
            <ModalConfirmacao
                texto={`Confirmar a exclusão do registro da Cultura? Isso vai excluir todas as informações relacionadas.`}
                url={`cultura/excluir/cultura/${cultura.idcultura}`}
                show={showModalConfirmacao}
                openClose={setShowModalConfirmacaoClick}
                funcAuxiliar={carregarCulturas}
            />
        </Card>
    )
}

export default CulturaPage