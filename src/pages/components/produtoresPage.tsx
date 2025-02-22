import { Button } from "@mui/material"
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

function ProdutoresPage() {

    //style do modal
    const style = {
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
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

    //fução de submit para criar ou editar produtor
    function onSubmitProdutor(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setShowModalProdutorClick()
    }

    //produtor
    const [produtor, setProdutor] = useState({
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

    return (
        <Card>

            <div className="row p-2">
                <div className="col-sm col-md-6 col-lg-9">
                    <TextField fullWidth id="search" label="Pesquisar por Produtor" variant="outlined" />
                </div>
                <div className="col-sm col-md-6 col-lg-3 mt-2">
                    <Button onClick={setShowModalProdutorClick} fullWidth variant="contained" startIcon={<PlaylistAddIcon />}>Novo Produtor</Button>
                </div>
            </div>
            <div className="row">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Produtor</TableCell>
                                <TableCell align="center">CPF/CNPJ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">{row.calories}</TableCell>
                                    </TableRow>
                                ))*/}
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
                                <p><strong>Cadastrando novo Produtor</strong></p>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm col-md-6 col-lg-8">
                                    <TextField onChange={setValueNomeProdutor} value={produtor.nome} required fullWidth id="outlined-basic" label="Nome" variant="outlined" />
                                </div>
                                <div className="col-sm col-md-6 col-lg-4">
                                    <TextField onBlur={mascaraDoc} onChange={setValueDocProdutor} value={produtor.doc} required fullWidth id="outlined-basic" label="Doc" variant="outlined" />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="float-right">
                                    <Button onClick={setShowModalProdutorClick} fullWidth variant="contained" startIcon={<AssignmentTurnedInIcon />}>Finalizar Cadastro</Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </Card>
    )
}
export default ProdutoresPage