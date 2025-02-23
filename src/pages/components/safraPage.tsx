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
import safraType from "../../interfaces/safraType";
import axios from "axios";
import ModalConfirmacao from "./components/modalConfirmacao";
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import typeListaFazenda from "../../interfaces/listaFazenda";
import listaSafraType from "../../interfaces/listaSafraType";

function SafraPage() {

    //lista de anos para selecionar o ano da safra
    const listaAnos = [
        {
            id: 0,
            ano: "2025"
        },
        {
            id: 1,
            ano: "2024"
        },
        {
            id: 2,
            ano: "2023"
        },
        {
            id: 3,
            ano: "2022"
        },
        {
            id: 4,
            ano: "2021"
        },
        {
            id: 5,
            ano: "2020"
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

    //controlando modal do formulario da safra
    const [showModalSafra, setShowModalSafra] = useState(false)
    function setShowModalSafraClick() {

        setShowModalSafra(!showModalSafra)
    }

    //objeto safra
    const [safra, setSafra] = useState<safraType>({
        idsafra: 0,
        safra: "Safra",
        idfazenda: 0,
        ano: ""
    })

    //função para setar SAFRA da safra no onchange do input
    function setValueSafra(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const value = input.target.value
        setSafra({
            ...safra,
            safra: value
        })
    }

    //função para setar IDFAZENDA da safra
    function setValueIdFazendaSafra(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const value = input.target.value
        setSafra({
            ...safra,
            idfazenda: parseInt(value)
        })
    }

    //função para setar ano da safra
    function setValueAnoSafra(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const value = input.target.value
        setSafra({
            ...safra,
            ano: value
        })
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

    //função para criar nova Safra ou atualizar
    function onSubmitSafra(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()
        if (safra.idsafra == 0) {

            axios.post(process.env.REACT_APP_API_PRODUTORES + "safra/criar/nova", safra)
                .then(function (resposta) {

                    setShowModalSafraClick()
                    carregaSafrasCriadas()
                }).catch(function (erro) {
                    alert(erro.response.data.message || "Erro ao tentar criar nova Safra.")
                })
        }
        else {

            axios.put(process.env.REACT_APP_API_PRODUTORES + `safra/atualizar/${safra.idsafra}`, safra)
                .then(function (resposta) {

                    setShowModalSafraClick()
                    carregaSafrasCriadas()
                }).catch(function (erro) {
                    alert(erro.response.data.message || "Erro ao tentar atualizar Safra.")
                })
        }
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
        carregarFazendasCadastradas()
        carregaSafrasCriadas()
    }, [])

    //manipulando modal de confirmação para excluir registro
    const [showModalConfirmacao, setShowModalConfirmacao] = useState(false)
    function setShowModalConfirmacaoClick() {
        setShowModalConfirmacao(!showModalConfirmacao)
    }

    //pesquisa por safra
    function buscarSafra(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const safra_ = input.target.value
        if (safra_ != "") {

            const safrasEncontradas = listaDeSafras.filter(function (safra) {

                return safra.safra.toLowerCase().includes(safra_.toLocaleLowerCase())
            })

            setListaDeSafras(safrasEncontradas)
        }
        else {
            carregaSafrasCriadas()
        }
    }

    return (
        <Card>
            <div className="row p-2">
                <div className="col-sm col-md-6 col-lg-9">
                    <TextField onChange={buscarSafra} fullWidth id="searchsafra" label="Pesquisar por Safra" variant="outlined" />
                </div>
                <div className="col-sm col-md-6 col-lg-3 mt-2">
                    <Button onClick={function () {
                        setSafra({
                            idsafra: 0,
                            safra: "Safra",
                            idfazenda: 0,
                            ano: ""
                        })
                        setShowModalSafraClick()
                    }} fullWidth variant="contained" startIcon={<PlaylistAddIcon />}>Nova Safra</Button>
                </div>
            </div>
            <div className="row">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Safra</TableCell>
                                <TableCell align="center">Ano</TableCell>
                                <TableCell align="center">Fazenda</TableCell>
                                <TableCell align="center">Proprietário</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listaDeSafras.map(function (safra) {
                                return <TableRow
                                    key={safra.idsafra}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link component="button" onClick={function () {
                                            setSafra({
                                                idsafra: safra.idsafra,
                                                safra: safra.safra,
                                                idfazenda: safra.idfazenda.idfazenda,
                                                ano: safra.ano
                                            })
                                            setShowModalSafraClick()
                                        }}>{safra.safra}</Link>
                                    </TableCell>
                                    <TableCell align="center">{safra.ano}</TableCell>
                                    <TableCell align="center">{safra.idfazenda.nome_fazenda}</TableCell>
                                    <TableCell align="center">{safra.idfazenda.idprodutor.nome}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={function () {
                                            setSafra({
                                                idsafra: safra.idsafra,
                                                safra: safra.safra,
                                                idfazenda: safra.idfazenda.idfazenda,
                                                ano: safra.ano
                                            })
                                            setShowModalConfirmacaoClick()
                                        }} color="error"><DeleteIcon fontSize="small" /></Button>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Modal
                open={showModalSafra}
                onClose={setShowModalSafraClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={onSubmitSafra}>
                        <div className="container-fluid">
                            <div className="row border-bottom">
                                <p><strong>{safra.idsafra == 0 ? "Cadastrando nova Safra" : "Editando Safra"}</strong></p>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm col-md-6 col-lg-6">
                                    <TextField required value={safra.safra} disabled onChange={setValueSafra} fullWidth id="safra" label="Safra" variant="outlined" />
                                </div>
                                <div className="col-sm col-md-6 col-lg-3">
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-select-currency"
                                        select
                                        value={safra.idfazenda == 0 ? "" : safra.idfazenda}
                                        label="Fazenda"
                                        onChange={setValueIdFazendaSafra}
                                        helperText="Fazenda resposnável pela Safras"
                                    >
                                        {listaFazendas.map((fazenda) => (
                                            <MenuItem key={fazenda.idfazenda} value={fazenda.idfazenda}>
                                                {fazenda.nome_fazenda}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col-sm col-md-6 col-lg-3">
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-select-currency"
                                        select
                                        value={safra.ano}
                                        label="Ano"
                                        onChange={setValueAnoSafra}
                                        helperText="Ano da Safra"
                                    >
                                        {listaAnos.map((ano) => (
                                            <MenuItem key={ano.id} value={ano.ano}>
                                                {ano.ano}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <Button type="submit" fullWidth variant="contained" startIcon={<AssignmentTurnedInIcon />}>
                                    {safra.idsafra == 0 ? "Finalizar Cadastro" : "Atualizar Safra"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
            <ModalConfirmacao
                texto={`Confirmar a exclusão do registro da Safra ${safra.ano}? Isso vai excluir todas as informações relacionadas.`}
                url={`safra/delete/${safra.idsafra}`}
                show={showModalConfirmacao}
                openClose={setShowModalConfirmacaoClick}
                funcAuxiliar={carregaSafrasCriadas}
            />
        </Card >
    )
}

export default SafraPage