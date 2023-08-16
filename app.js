import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'

const app = express()
app.use(express.json())
const port = 3000
const saltRounds = 10;


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

    let { id, email, password } = req.body
    const hash = bcrypt.hashSync(password, saltRounds)

    users.push({
        id: id,
        email: email,
        password: hash
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
                const hash = bcrypt.hashSync(password, saltRounds)
                element.password = hash
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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = users.find(user => user.email === email);
        console.log(user)
        if (user) {
            const result = await bcrypt.compare(password, user.password);
            console.log(result)
            if (result) {
                res.send('User is connected');
            } else {
                res.send('Wrong credentials');
            }
        } else {
            res.send('User not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

// app.post('/login', (req, res) => {

//     const { email, password } = req.body
//     let flag = null
//     for (let i = 0; i < users.length; i++) {
//         const element = users[i];
//         if (element.email === email) {
//             bcrypt.compare(password, element.password, function (err, result) {
//                 // console.log(element.password)
//                 // console.log(password)
//                 // console.log(element.email)
//                 console.log(result)
//                 flag = result
//             });
//             // console.log(flag)
//             break
//             // flag = true
//         }
//     }
//     if (flag) {
//         res.send('User is connected')
//     } else {
//         res.send('wrong credentials')
//     }
// })

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
})
