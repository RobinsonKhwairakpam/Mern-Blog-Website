const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })

const UserModel = require('./models/User')
const PostModel = require('./models/Post')

const PORT = process.env.PORT || 8000
const salt = bcrypt.genSaltSync(10)
const secret = 'asdwqe12314dsf12sdas'

//initialise middleware 
//cors to allow cross origin between client and server
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))      //to allow cookies as credentials in the front end port    
app.use(express.json())                                                  //parses incoming json payload (had to use bodyparser earlier, now is built-in)
app.use(cookieParser())                                                  //parses incoming cookies
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.connect('mongodb+srv://blog:aqcMBRpgt9iSEH0v@cluster0.fgv4pq0.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req, res) => {
    const {username, password} = req.body
    try {
        const userDoc = await UserModel.create({
            username, 
            password: bcrypt.hashSync(password, salt)          //to avoid password being seen in plain sight
        })
        res.json(userDoc)
    } catch(err){
        res.status(400).json(err)
    }    
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body 
    const userDoc = await UserModel.findOne({username})
    const passOk = bcrypt.compareSync(password, userDoc.password)

    if(passOk){
        jwt.sign({username, id: userDoc._id}, secret, {}, (err, token) => {             //sign token and send as cookie
            if(err) throw err
            res.cookie('token', token).json({
                id: userDoc._id,
                username
            })
        })
    }else{
        res.status(400).json('Wrong credentials')
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies
    jwt.verify(token, secret, {}, (err, info) => {                                  //verify token from the cookie and send userInfo 
        if(err) throw err
        res.json(info)
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')                                                 //set the token to empty
})

app.post('/post', uploadMiddleware.single('file') , async (req, res) => {
    const {title, content, summary} = req.body
    const {originalname, path} = req.file

    //renaming new uploaded file without ext to file.ext with the original name ext
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)

    //verify token for author's User Id
    const {token} = req.cookies
    jwt.verify(token, secret, {}, async (err, info) => {                                  //verify token from the cookie and send userInfo 
        if(err) throw err
        //creating Post document to the database
        const postDoc = await PostModel.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id
        })
        res.json(postDoc)
    })    
})

app.get('/post', async (req, res) => {
    //populate author field with the username only (not password, etc)
    const posts = await PostModel.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    res.json(posts)
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params
    const postDoc = await PostModel.findById(id).populate('author', ['username'])
    res.json(postDoc)
})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null
    if(req.file){
        const {originalname, path} = req.file

        //renaming new uploaded file without ext to file.ext with the original name ext
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        newPath = path + '.' + ext
        fs.renameSync(path, newPath)
    }

    //verify token for author's User Id
    const {token} = req.cookies
    jwt.verify(token, secret, {}, async (err, info) => {                                  //verify token from the cookie and send userInfo 
        if(err) throw err
        const {id, title, content, summary} = req.body
        const postDoc = await PostModel.findById(id)
        //check if author id is equal to the current user id
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,   //update if there is new image
        });

        res.json(postDoc)
    })    
})

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params

    //verify token for author's User Id
    const {token} = req.cookies
    jwt.verify(token, secret, {}, async (err, info) => {                                  //verify token from the cookie and send userInfo 
        if(err) throw err
        const postDoc = await PostModel.findById(id)
        //check if author id is equal to the current user id
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }
        await postDoc.deleteOne({_id: id})
        res.json(postDoc)
    })
})

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))

