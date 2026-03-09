import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
export default function ButtonBasic() {
  return (
    <>
      <div>
        <Button size="small" variant="outlined">Small</Button>
        <Button size="medium" variant="contained">Medium</Button>
        <Button size="large" variant="outlined">Large</Button>
      </div>
      <TextField label="Standard" variant="standard" sx={{ '& .MuiInput-underline:before': { borderBottomColor: 'white' }, '& .MuiInput-underline:hover:before': { borderBottomColor: 'white' }, '& .MuiInput-underline:after': { borderBottomColor: 'white' }, '& .MuiInputBase-input': { color: 'black' } }} />
    </>
  );
}