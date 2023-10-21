import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import StarIcon from '@heroicons/react/24/solid/StarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const DataBox = (props) => {
  
  const { title, data, label} = props

  return (
    <Card sx={{ width: 285, boxShadow: 5 }}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={2}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              {title}
            </Typography>
            <Typography variant="h4">
              {(data == "MM") ? "Not available" : data}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <StarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
              <SvgIcon
                color={25 ? 'success' : 'error'}
                fontSize="small"
              >
                {/* {25 ? <ArrowUpIcon /> : <ArrowDownIcon />} */}
              </SvgIcon>
              <Typography
                color={25 ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {/* {10}% */}
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              
            >
              {label}
            </Typography>
          </Stack>
     
      </CardContent>
    </Card>
  );
};

