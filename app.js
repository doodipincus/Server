import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'

const app = express()
app.use(express.json())
const port = 3000
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


const users = [{
    id: '3',
    email: '1234@qwer.com',
    password: '1234'
}, {
    id: uuidv4(),
    email: '4567@qwer.com',
    password: '4567'
}, {
    id: uuidv4(),
    email: '7890@qwer.com',
    password: '7890'
}]

app.get('/', (req, res) => {

    res.status(200).json({ users })
})

app.get('/users/:id', (req, res) => {

    const id = req.params.id

    users.forEach(element => {
        if (element.id === id) {
            res.status(200).json({ element })
        }
    })
})

app.post('/', (req, res) => {

    const { id, email, password } = req.body

    users.push({
        id: id,
        email: email,
        password: password
    })
    res.send('the transaction completed successfully')
})

app.put('/users/:id', (req, res) => {

    const idParams = req.params.id
    const { id, email, password } = req.body

    users.forEach(element => {
        if (element.id === idParams) {
            if (id) {
                element.id = id
            }
            if (email) {
                element.email = email
            }
            if (password) {
                element.password = password
            }
        }
    })
    res.send('the transaction completed successfully')
})

app.delete('/users/:id', (req, res) => {

    const id = req.params.id

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            users.splice(i, 1)
        }
    }
    res.send('the transaction completed successfully')
})

app.post('/users', (req, res) => {

    const { email, password } = req.body
    let flag = null
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if (element.email === email && element.password === password) {
            flag = true
            break
        }
    }
    if (flag) {
        res.send('User is connected')
    } else {
        res.send('wrong credentials')
    }
})

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
})
