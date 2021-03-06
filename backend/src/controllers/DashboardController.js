const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {

    async show(req,res){

        try
        {
            const {user_id} = req.headers;

            const user = await User.findById(user_id);
                

            if (!user_id) {
                return res.status(400).json({ error: 'Logged user not provided.  Check docummentation for more details.' });
            }
            
            const spots = await Spot.find({user: user_id});
            return res.json(spots);    
        }
        catch(err)
        {
            return res.status(400).json({ error: err.message });
        }
    }
};
    

