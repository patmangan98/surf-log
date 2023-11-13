import StarIcon from "@heroicons/react/24/solid/StarIcon"
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material"

export const DataBox = (props) => {
  const { title, data, label } = props

  return (


    <>
      <Card>
        <Typography color="text.secondary" variant="overline"> {title}</Typography>
        <Typography variant="h5">{data == "MM" ? "Not available" : data}</Typography>
        {/* <Typography color={25 ? "success.main" : "error.main"} variant="body2"> </Typography> */}
        <Typography color="text.secondary" variant="caption" align="right">{label}</Typography>
      </Card>
    </>

  )
}
