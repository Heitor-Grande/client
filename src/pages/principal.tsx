import * as React from 'react';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupIcon from '@mui/icons-material/Group';
import ProdutoresPage from './components/produtoresPage';
import GiteIcon from '@mui/icons-material/Gite';
import FazendasPage from './components/fazendasPage';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SafraPage from './components/safraPage';
import CulturaPage from './components/culturaPage';
import GrassIcon from '@mui/icons-material/Grass';
import VisaoGeral from './components/visaoGeral';

const NAVIGATION: Navigation = [
    /*{
        kind: 'header',
        title: 'Menu',
    },*/
    /*{
        segment: "login",
        title: 'Login',
        icon: <LoginIcon />,
    },*/
    /*{
        kind: 'divider',
    },*/
    {
        segment: "visaoGeral",
        title: "Visão Geral",
        action: <AssessmentIcon />
    },
    {
        kind: 'divider',
    },
    {
        segment: "produtores",
        title: "Produtores",
        action: <GroupIcon />
    },
    {
        segment: "fazendas",
        title: "Fazendas",
        action: <GiteIcon />
    },
    {
        segment: "safras",
        title: "Safras",
        action: <LocalShippingIcon />
    },
    {
        segment: "culturas",
        title: "Culturas",
        action: <GrassIcon />
    }
    /*{
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },*/
]
//mapeamento das páginas
const PAGES: Record<string, React.ReactNode> = {
    visaoGeral: <VisaoGeral />,
    produtores: <ProdutoresPage />,
    fazendas: <FazendasPage />,
    safras: <SafraPage />,
    culturas: <CulturaPage />
}

//simula as rotas da aplicação, para ter a renderização dos menus
function useDemoRouter(initialPath: string): Router {
    const [pathname, setPathname] = React.useState(initialPath);
    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path: string | URL) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

//função para renderizar as paginas, pegando de PAGES
function RenderPageContent({ pathname }: { pathname: string }) {

    return <div className='container-fluid p-3'>
        {PAGES[pathname] || <p>NOT FOUND</p>}
    </div>
}
export default function Principal() {

    const router = useDemoRouter("visaoGeral")

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            branding={
                {
                    title: "Produtores",
                    logo: <AgricultureIcon fontSize="large" />,
                    homeUrl: "visaoGeral",
                }
            }
        >
            <DashboardLayout>
                <RenderPageContent pathname={router.pathname.replace("/", "")} />
            </DashboardLayout>
        </AppProvider>
    );
}