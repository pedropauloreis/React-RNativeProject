//index, show, store, update, destroy
const User = require('../models/User');
const commonFunctions = require('../util/commonFunctions');

module.exports = {
    async store(req,res) {

        try{

            const {email} = req.body

            
            if (!commonFunctions.validateEmail(email)) {
                return res.status(400).json({ error: 'Email invalid or not provided.  Check docummentation for more details.' });
            }

            let user = await User.findOne({ email: email});
            if (!user)
            {
                user = await User.create({email: email});
            }
            
            return res.json(user);
        }
        catch(err)
        {
            return res.status(400).json({ error: err.message });
        }
    }
};