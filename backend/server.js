const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

const dbConnection = require('./db')

app.use(cors());

app.use('/api/stripe/', require('./routes/webhooksRoute'))

app.use(express.json())

app.use('/api/stripe/', require('./routes/stripeRoute'))
app.use('/api/users/', require('./routes/usersRoute'))
app.use('/api/donation/', require('./routes/donationsRoute'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))