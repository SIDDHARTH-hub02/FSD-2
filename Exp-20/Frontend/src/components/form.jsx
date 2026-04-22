import { TextField, Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material'
import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000'

export default function Form() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [students, setStudents] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/students`)
      if (!response.ok) throw new Error('Failed to fetch students')
      const data = await response.json()
      setStudents(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching students:', error)
      setStudents([])
    } finally {
      setLoading(false)
    }
  }

  const validate = () => {
    const temp = {}

    if (!name || name.trim() === '') {
      temp.name = 'Name is required'
    }

    if (age && isNaN(age)) {
      temp.age = 'Age must be a valid number'
    } else if (age && (parseInt(age) < 0 || parseInt(age) > 120)) {
      temp.age = 'Age must be between 0 and 120'
    }

    setErrors(temp)
    return Object.keys(temp).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validate()) {
      try {
        const payload = {
          name,
          age: age ? parseInt(age) : null
        }

        const response = await fetch(`${API_URL}/students`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        if (!response.ok) throw new Error('Failed to create student')

        setName('')
        setAge('')
        await fetchStudents()
        window.alert('Student added successfully')
      } catch (error) {
        console.error('Error creating student:', error)
        window.alert('Error creating student')
      }
    }
  }

  const handleDelete = async (studentId) => {
    try {
      const response = await fetch(`${API_URL}/students/${studentId}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete student')
      await fetchStudents()
    } catch (error) {
      console.error('Error deleting student:', error)
      window.alert('Error deleting student')
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>Student Management</Typography>

        <Box sx={{ mb: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>Add New Student</Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Name *"
              value={name}
              fullWidth
              margin="normal"
              required
              onChange={(e) => setName(e.target.value)}
              error={Boolean(errors.name)}
              helperText={errors.name || ''}
            />

            <TextField
              label="Age (Optional)"
              type="number"
              value={age}
              fullWidth
              margin="normal"
              onChange={(e) => setAge(e.target.value)}
              error={Boolean(errors.age)}
              helperText={errors.age || ''}
            />

            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
              Add Student
            </Button>
          </form>
        </Box>

        <Typography variant="h6" gutterBottom>Students List</Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : students.length === 0 ? (
          <Typography>No students yet. Add one to get started!</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Age</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {Array.isArray(students) &&
                  students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.age || 'N/A'}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  )
}