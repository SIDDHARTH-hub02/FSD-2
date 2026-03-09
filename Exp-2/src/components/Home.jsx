import ButtonBasic from './Button';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 1, maxWidth: 400 }}>
        <ButtonBasic />
      </Box>
    </div>
  );
}