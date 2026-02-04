import { useState } from 'react'
import './App.css'

// MUI imports
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    acceptTerms: false,
    newsletter: false,
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const emailRegex = /\S+@\S+\.\S+/
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/ // Min 8 chars, 1 uppercase, 1 number

  const validateField = (name, value) => {
    let message = ''
    switch (name) {
      case 'name':
        if (!value.trim()) message = 'Name is required.'
        break
      case 'email':
        if (!value.trim()) message = 'Email is required.'
        else if (!emailRegex.test(value)) message = 'Enter a valid email.'
        break
      case 'password':
        if (!value) message = 'Password is required.'
        else if (!passwordRegex.test(value)) message = 'Password must be 8+ chars, include 1 uppercase and 1 number.'
        break
      case 'confirmPassword':
        if (value !== form.password) message = 'Passwords do not match.'
        break
      case 'gender':
        if (!value) message = 'Please select a gender.'
        break
      case 'acceptTerms':
        if (!value) message = 'You must accept terms to continue.'
        break
      default:
        break
    }

    setErrors((prev) => ({ ...prev, [name]: message }))
    return message === ''
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setForm((prev) => ({ ...prev, [name]: val }))
    // live-validate on change for some fields
    if (['name', 'email', 'password', 'confirmPassword', 'gender', 'acceptTerms'].includes(name)) {
      validateField(name, val)
    }
  }

  const validateAll = () => {
    const fieldsToValidate = ['name', 'email', 'password', 'confirmPassword', 'gender', 'acceptTerms']
    const results = fieldsToValidate.map((f) => validateField(f, form[f]))
    return results.every(Boolean)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const ok = validateAll()
    if (ok) {
      // pretend to submit
      setSubmitted(true)
      // reset form or keep values as needed
      // setForm({ name: '', email: '', password: '', confirmPassword: '', gender: '', acceptTerms: false, newsletter: false })
    } else {
      setSubmitted(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }} className="form-wrapper">
      <Box sx={{ mb: 3 }} className="form-header">
        <Typography variant="h4" component="h1" gutterBottom>
          Registration Form
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
          EXPERIMENT-6
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          {submitted && <Alert severity="success">Form submitted successfully! ✅</Alert>}

          <TextField
            label="Full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={(e) => validateField('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            required
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={(e) => validateField('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            required
            fullWidth
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            onBlur={(e) => validateField('password', e.target.value)}
            error={!!errors.password}
            helperText={errors.password || 'Min 8 chars, include 1 uppercase and 1 number'}
            required
            fullWidth
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={(e) => validateField('confirmPassword', e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            required
            fullWidth
          />

          <FormControl component="fieldset" error={!!errors.gender}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row name="gender" value={form.gender} onChange={handleChange}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
            {errors.gender && (
              <Typography variant="caption" color="error">
                {errors.gender}
              </Typography>
            )}
          </FormControl>

          <FormControlLabel
            control={<Checkbox checked={form.newsletter} onChange={handleChange} name="newsletter" />}
            label="Subscribe to newsletter"
          />

          <FormControl error={!!errors.acceptTerms} component="fieldset">
            <FormControlLabel
              control={<Checkbox checked={form.acceptTerms} onChange={handleChange} name="acceptTerms" />}
              label="I accept the terms and conditions"
            />
            {errors.acceptTerms && (
              <Typography variant="caption" color="error">
                {errors.acceptTerms}
              </Typography>
            )}
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined" onClick={() => {
              setForm({ name: '', email: '', password: '', confirmPassword: '', gender: '', acceptTerms: false, newsletter: false })
              setErrors({})
              setSubmitted(false)
            }}>
              Reset
            </Button>
            <Button type="submit" variant="contained" disabled={!form.acceptTerms}>
              Submit
            </Button>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Notes: The submit button is disabled until you accept the terms. Password must be at least 8 characters and include an uppercase letter and a number.
        </Typography>
      </Box>
    </Container>
  )
}

export default App
