import { Box } from '@mui/material';
import Header from './Header';

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </>
  );

}

export default Layout;