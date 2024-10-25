const express = require('express');
const app = express();
const PORT = 3000

app.use(express.json())

var usuarios = []

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios)
})



app.post('/usuarios', (req, res) =>{
    const {nome, email} = req.body

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ message: 'Nome é obrigatório e deve ser uma string.' });
    }
    if (!email || typeof email !== 'string' || !validateEmail(email)) {
        return res.status(400).json({ message: 'Email é obrigatório e deve ser um email válido.' });
    }

    const novoUsuario = {id: Date.now(), nome, email}
    usuarios.push(novoUsuario)
    res.status(201).json(novoUsuario)
})

app.put('/usuarios/:id', (req, res) => {
    const {id} = req.params
    const {nome, email} = req.body

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ message: 'Nome é obrigatório e deve ser uma string.' });
    }
    if (!email || typeof email !== 'string' || !validateEmail(email)) {
        return res.status(400).json({ message: 'Email é obrigatório e deve ser um email válido.' });
    }

    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === Number(id))
    if(usuarioIndex === -1) {
        return res.status(404).json({message: 'Usuário não encontrado'})
    }
    usuarios[usuarioIndex] = {id: Number(id), nome, email}
    res.json(usuarios[usuarioIndex])
    })

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    app.delete('/usuarios/:id', (req, res) => {
        const {id} = req.params
        const indexUsuario = usuarios.findIndex(usuario => usuario.id === Number(id))
        if(indexUsuario === -1){
            return res.status(404).json({message: 'Usuário não encontrado'})
        }

        usuarios.splice(indexUsuario, 1)
        res.status(204).send()
    })