import { FC } from 'react';
import {
  Box,
  Grid2 as Grid,
  List,
  ListItem,
  styled,
  Typography,
} from '@mui/material';

const Container = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  width: 'calc(100% - 4rem)',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  padding: '0 2rem'
}));
const StyledList = styled(List)(() => ({
  display: 'flex',
  flexDirection: 'row',
}));

export const Footer: FC = () => {
  return (
    <Container>
      <Grid container columns={24} alignItems="center">
        <Grid size={{ xs: 12, sm: 16, md: 18, lg: 20 }}>
          <Typography>Millennium</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
          <StyledList>
            <ListItem>Help</ListItem>
            <ListItem>Find us</ListItem>
          </StyledList>
        </Grid>
      </Grid>
    </Container>
  );
};