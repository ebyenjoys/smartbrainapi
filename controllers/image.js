const clarifai = require('clarifai');
const app = new Clarifai.App({
	apiKey: 'e93112981c674b298af6ea5f485dc143'
});

const handleApiCall = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data =>{
        res.json(data);
        console.log('call from api')
    })
    .catch(err => res.status(400).json('unable to work with api'))
}


const handleImage = (req,res,db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1).returning('entries')
    .then(entries => {res.json(entries)})
    .catch(err => {res.status(400).json('unable to find the entreis')})
}

module.exports = {
    handleImage,
    handleApiCall
}