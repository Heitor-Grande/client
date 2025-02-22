import Card from "@mui/material/Card"
import { Button, Link } from "@mui/material"
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { TextField } from "@mui/material"

function FazendasPage() {

    return (
        <Card>
            <div className="row p-2">
                <div className="col-sm col-md-6 col-lg-9">
                    <TextField fullWidth id="search" label="Pesquisar por Fazenda" variant="outlined" />
                </div>
                <div className="col-sm col-md-6 col-lg-3 mt-2">
                    <Button fullWidth variant="contained" startIcon={<PlaylistAddIcon />}>Nova Fazenda</Button>
                </div>
            </div>
        </Card>
    )
}

export default FazendasPage