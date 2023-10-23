import { Paper ,Card, Typography } from "@mui/material"



export default function StickyNotes ({title, value}) {
    return (
        <>
        
        <Paper>
            <p>Hello</p>
            <Typography>{title}: {value}</Typography>
        </Paper>
        
        </>
    )
}