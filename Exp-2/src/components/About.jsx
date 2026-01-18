import SelectComponent from './Select';
import HoverRating from './Rating';
import Box from '@mui/material/Box';

export default function About() {
  return (
    <>
      <h2>About Page</h2>
      <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 1, maxWidth: 400 }}>
        <SelectComponent />
        <Box sx={{ marginTop: 3 }}>
          <HoverRating />
        </Box>
      </Box>
    </>
  );
}