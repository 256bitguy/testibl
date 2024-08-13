
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Button } from '@mui/material';

// components
import Iconify from '../Utils/Layouts/Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
}));


export default function AdminDashboardCard({ title, total, icon, color = 'primary', sx, ...other }) {
    return (

        <Card
            sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                color: (theme) => theme.palette[color].darker,
                bgcolor: (theme) => theme.palette[color].lighter,
                ...sx,
            }}
            {...other}
        >
            <Button>
                <Typography variant="h3" sx={{ opacity: 0.72 }}>
                    {title}
                </Typography>
            </Button>
        </Card>


    );
}
