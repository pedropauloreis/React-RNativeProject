//index, show, store, update, destroy
const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {

    async index(req,res){
        const{tech} = req.query;
        
        if (!(tech))
        {
            return res.status(400).json({ error: 'Techs not provided. Check docummentation for more details.' });
        }
        const spots = await Spot.find({techs: tech});
        return res.json(spots);

    },

    async store(req,res) {
        if (!req.file) {
            return res.status(400).json({ error: 'Thumbnail not provided. Check docummentation for more details.' });
        }
        const {filename} = req.file;
        const {company, techs, price } = req.body;
        const {user_id} = req.headers;

        const user = await User.findById(user_id);


        if (!user_id) {
            return res.status(400).json({ error: 'Logged user not provided.  Check docummentation for more details.' });
        }
        else if (!user)
        {
            return res.status(400).json({ error: 'Provided user not find in the database. Check docummentation for more details.' });
        }
        else if (!(company))
        {
            return res.status(400).json({ error: 'Company name not provided. Check docummentation for more details.' });
        }
        else if (!(techs))
        {
            return res.status(400).json({ error: 'Techs not provided. Check docummentation for more details.' });
        }
        else if (!(price))
        {
            return res.status(400).json({ error: 'Price not provided. Check docummentation for more details.' });
        }


        

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })
        // const {email} = req.body

        // let user = await User.findOne({ email: email});
        // if (!user)
        // {
        //     user = await User.create({email: email});
        // }
    
        return res.json({spot});
    }
};