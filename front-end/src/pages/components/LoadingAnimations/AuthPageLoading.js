import CompassSVG from './CompassSVG'
import { Typography } from '@mui/material'

export default function AuthPageLoading () {
    return (
        <div style={{display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center'}}>

        <Typography variant='h1'
        fontFamily="monospace"
        fontWeight="700"
        display="flex"
        justifyContent="center"
        fontSize="40px"
        color="#cbf7ed"
        marginBottom={'30px'}
        >
            Welcome to SurfBoard
            </Typography>

            <CompassSVG/>
        </div>
    )
}