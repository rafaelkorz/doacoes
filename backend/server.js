const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const dbConnection = require('./db')
app.use(express.json())

app.use('/api/users/' , require('./routes/usersRoute'))
app.use('/api/donation/' , require('./routes/donationsRoute'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))