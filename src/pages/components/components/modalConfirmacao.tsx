import { Modal } from "@mui/material"
import Box from '@mui/material/Box';
import HelpIcon from '@mui/icons-material/Help';
import Button from "@mui/material/Button";
import axios from "axios";

interface modalConfirmacaoType {
    texto: string
    id: number
    url: string
    show: boolean
    openClose: () => void
    funcAuxiliar?: () => void
}

//style do modal
const style = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "65%",
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
}
function ModalConfirmacao({ texto, id, url, show, openClose, funcAuxiliar }: modalConfirmacaoType) {

    function excluirRegistro(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()

        axios.delete(process.env.REACT_APP_API_PRODUTORES + url).then(function (resposta) {

            alert(resposta.data)
            openClose()
            if (funcAuxiliar) {
                funcAuxiliar()
            }
        }).catch(function (erro) {

            alert(erro.response.data.message || "Erro ao executar ação.")
        })
    }

    return (
        <Modal
            open={show}
            onClose={openClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={excluirRegistro}>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <HelpIcon sx={{ fontSize: "100px" }} />
                        </div>
                        <div className="row">
                            <p className="text-center"><strong>{texto}</strong></p>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm col-md-5 col-lg-6">
                                <Button onClick={openClose} type="button" variant="contained" fullWidth color="error">cancelar</Button>
                            </div>
                            <div className="col-sm col-md-5 col-lg-6">
                                <Button type="submit" variant="contained" fullWidth color="info">continuar</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

export default ModalConfirmacao