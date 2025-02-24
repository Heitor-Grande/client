import { Button, Link } from "@mui/material"
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import TextField from '@mui/material/TextField';
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
import Card from '@mui/material/Card';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import axios from "axios";
import typeProdutor from "../../interfaces/produtor";
import DeleteIcon from '@mui/icons-material/Delete';
import ModalConfirmacao from "./components/modalConfirmacao";

function ProdutoresPage() {

    //style do modal
    const style = {
        margin: "auto",
        marginTop: "5%",
        width: "85%",
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    }

    //controla show do Modal de produtor para criar, editar.
    const [showModalProdutor, setShowModalProdutor] = useState(false)
    function setShowModalProdutorClick() {

        setShowModalProdutor(!showModalProdutor)
    }

    //produtor
    const [produtor, setProdutor] = useState<typeProdutor>({
        idprodutor: null,
        doc: "",
        nome: ""
    })

    //função para alterar valores do produtor
    function setValuesProdutor(property: "doc" | "nome", newValue: string) {

        setProdutor({
            ...produtor,
            [property]: newValue
        })
    }

    //alterando nome do produtor
    function setValueNomeProdutor(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const nome = input.target.value

        setValuesProdutor("nome", nome)
    }

    //alterando documento do produtor
    function setValueDocProdutor(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const doc = input.target.value

        if (doc.length < 18) {

            setValuesProdutor("doc", doc)
        }
    }

    //função para colocar mascara no DOC
    function mascaraDoc(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        //pega o valor do input e retira tudo que nao é numero
        let doc = input.target.value.replace(/\D/g, "")

        if (doc.length == 14) {
            //formata para CNPJ
            doc = doc.replace(/^(\d{2})(\d)/, "$1.$2")
            doc = doc.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            doc = doc.replace(/\.(\d{3})(\d)/, ".$1/$2")
            doc = doc.replace(/(\d{4})(\d)/, "$1-$2")

        }
        else if (doc.length == 11) {
            //formata para CPF
            doc = doc.replace(/(\d{3})(\d)/, "$1.$2")
            doc = doc.replace(/(\d{3})(\d)/, "$1.$2")
            doc = doc.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        }

        setValuesProdutor("doc", doc)
    }

    //fução de submit para criar ou editar produtor
    function onSubmitProdutor(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()
        if (produtor.idprodutor == null) {
            axios.post(process.env.REACT_APP_API_PRODUTORES + "produtor/criar/novo", produtor)
                .then(function (resposta) {
                    //console.log(resposta)
                    setShowModalProdutorClick()
                    carregarProdutores()
                }).catch(function (erro) {
                    //console.log(erro)
                    alert(erro.response.data.message || "Erro ao criar novo Produtor.")
                })
        }
        else {
            axios.put(process.env.REACT_APP_API_PRODUTORES + `produtor/atualizar/cadastro/${produtor.idprodutor}`, produtor)
                .then(function (resposta) {
                    //console.log(resposta)
                    setShowModalProdutorClick()
                    carregarProdutores()
                }).catch(function (erro) {
                    //console.log(erro)
                    alert(erro.response.data.message || "Erro ao atualizar cadastro do Produtor.")
                })
        }
    }

    //function para carregar os produtores cadastrados
    const [listaDeProdutores, setListaDeProdutores] = useState<typeProdutor[]>([])
    function carregarProdutores() {

        axios.get(process.env.REACT_APP_API_PRODUTORES + "produtor/carregar/produtores")
            .then(function (resposta) {
                //console.log(resposta.data)
                setListaDeProdutores(resposta.data)
            }).catch(function (erro) {
                //console.log(erro)
                alert(erro.response.data.message || "Erro ao carregar lista de Produtores")
            })
    }

    //função que abre o modal de produtores com dados carregados
    function selecionarProdutor(produtor: typeProdutor) {

        setProdutor(produtor)
        setShowModalProdutorClick()
    }

    //manipulando modal de confirmação de ação
    const [showModalConfirmacao, setShowModalConfirmacao] = useState(false)
    function setShowModalConfirmacaoClick() {
        setShowModalConfirmacao(!showModalConfirmacao)
    }

    //pesquisando por produtor. Procurando por nome
    function PesquisarProdutor(input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const nome = input.target.value

        if (nome != "") {
            const produtoresEncontrados = listaDeProdutores.filter(function (produtor) {

                return produtor.nome.toLowerCase().includes(nome.toLowerCase())
            })

            setListaDeProdutores(produtoresEncontrados)
        }
        else {

            carregarProdutores()
        }
    }

    useEffect(function () {

        carregarProdutores()
    }, [])

    return (
        <Card>
            <div className="row p-2">
                <div className="col-sm col-md-6 col-lg-9">
                    <TextField onChange={PesquisarProdutor} fullWidth id="searchprodutor" label="Pesquisar por Produtor" variant="outlined" />
                </div>
                <div className="col-sm col-md-6 col-lg-3 mt-2">
                    <Button onClick={function () {
                        setProdutor({
                            idprodutor: null,
                            doc: "",
                            nome: ""
                        })
                        setShowModalProdutorClick()
                    }} fullWidth variant="contained" startIcon={<PlaylistAddIcon />}>Novo Produtor</Button>
                </div>
            </div>
            <div className="row">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Produtor</TableCell>
                                <TableCell align="center">CPF/CNPJ</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listaDeProdutores.map(function (produtor: typeProdutor) {
                                return <TableRow
                                    key={produtor.idprodutor}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link component="button" onClick={function () { selecionarProdutor(produtor) }}>{produtor.nome}</Link>
                                    </TableCell>
                                    <TableCell align="center">{produtor.doc}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={function () {
                                            setProdutor(produtor)
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
                open={showModalProdutor}
                onClose={setShowModalProdutorClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={onSubmitProdutor}>
                        <div className="container-fluid">
                            <div className="row border-bottom">
                                <p><strong>{produtor.idprodutor == null ? 'Cadastrando novo Produtor' : 'Editando Produtor'}</strong></p>
                            </div>
                            <div className="row">
                                <div className="col-sm col-md-6 col-lg-8 mt-3">
                                    <TextField onChange={setValueNomeProdutor} value={produtor.nome} required fullWidth id="outlined-basic" label="Nome" variant="outlined" />
                                </div>
                                <div className="col-sm col-md-6 col-lg-4 mt-3">
                                    <TextField onBlur={mascaraDoc} onChange={setValueDocProdutor} value={produtor.doc} required fullWidth id="outlined-basic" label="Doc" variant="outlined" />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <Button type="submit" fullWidth variant="contained" startIcon={<AssignmentTurnedInIcon />}>
                                    {produtor.idprodutor == null ? "Finalizar Cadastro" : "Atualizar Produtor"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
            <ModalConfirmacao
                texto={`Confirmar a exclusão do registro do Produtor ${produtor.nome}? Isso vai excluir todas as informações relacionadas.`}
                url={`produtor/deletar/cadastro/${produtor.idprodutor}`}
                show={showModalConfirmacao}
                openClose={setShowModalConfirmacaoClick}
                funcAuxiliar={carregarProdutores}
            />
        </Card >
    )
}
export default ProdutoresPage