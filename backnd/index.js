import express from 'express'
import multer from 'multer'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Path from 'path'
import { StoreModel } from './module/store.js'
import { CommentModel } from './module/feedback.js'
import { userModel } from './module/shippingAddresh.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static('public'))
const PORT = 8080;

try {
    mongoose.connect(process.env.MONGODB_URL)
    console.log('mongodb connected successfully');
} catch (error) {
    console.log(`mongoose connect error: ${error}`);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + Path.extname(file.originalname))

    }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), async (req, res) => {
    // console.log(req.file);
    // console.log(req.body.tital);
    // console.log(req.body.name);
    // console.log(req.body.price);
    // console.log(req.body.description);

    await StoreModel.create({
        photo: req.file.filename,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        categori: req.body.categori
    })
        .then((result) => res.json(result))
        .catch((err) => res.json(err))

})


app.post('/showData', async (req, res) => {
    await StoreModel.find()
        .then((result) => res.json(result))
        .catch((err) => res.json(err))

})

app.post('/redirect/:id', async (req, res) => {
    const { id } = req.params
    await StoreModel.findById({ _id: id })
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

app.post('/like/:id', async (req, res) => {
    const { id } = req.params

    try {
        const item = await StoreModel.findById(id)
        if (!item) {
            return res.status(404).json({ error: "Not Found" })
        }
        item.likes++
        await item.save()
        res.json({ message: 'Image liked', likes: item.likes });
    } catch (error) {
        console.log("Error liking image:", error);
        res.status(500).json({ error: 'Error liking image' });
    }


})

app.post('/unlike/:id', async (req, res) => {
    const { id } = req.params

    try {
        const item = await StoreModel.findById(id)
        if (!item) {
            return res.status(404).json({ error: "Likes Not Found" })
        }
        if (item.likes > 0) {
            item.likes--
            await item.save()

        }
        res.json({ message: 'Image liked', likes: item.likes });
    } catch (error) {
        console.log("Error liking image:", error);
        res.status(500).json({ error: 'Error liking items' });
    }

})


app.put('/edit/:id', async (req, res) => {
    const { id } = req.params
    await StoreModel.findOneAndUpdate({ _id: id }, {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        categori: req.body.categori,
    }).then((result) => res.json(result))
        .catch((err) => res.json(err))
})



app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    await StoreModel.findByIdAndDelete({ _id: id })
        .then((result) => res.json(result))
        .catch((err) => res.json(err))

})

// ----------------------------------feedback comment-------------------------------------- 
app.post('/feedback', async (req, res) => {
    console.log(req.body)
    const { comment } = req.body
    await CommentModel.create({
        comment: comment
    }).then((result) => res.json(result))
        .catch((err) => res.json(err))
})

app.get('/shippingInfo', async (req, res) => {
    const { name, email, address, pincode } = req.body;
    try {
        const result = await userModel.create({
            name: name,
            email: email,
            address: address,
            pincode: pincode,
        });
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});



app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${PORT}`);
})

