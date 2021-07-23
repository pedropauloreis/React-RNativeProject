const Booking = require('../models/Booking');
const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
    async store(req,res) {
        
        try{

            const {user_id} = req.headers;
            const {spot_id} = req.params;
            const {date} = req.body;

            const user = await User.findById(user_id);
            const spot = await Spot.findById(spot_id);

            if (!user_id) {
                return res.status(400).json({ error: 'Logged user not provided.  Check docummentation for more details.' });
            }
            else if (!date) {
                return res.status(400).json({ error: 'Date not provided. Check docummentation for more details.' });
            }
            else if (isNaN(Date.parse(date))) {
                return res.status(400).json({ error: 'Date format invald. Please use dd-mm-yyyy.' });
            }
            else if (!user)
            {
                return res.status(400).json({ error: 'Provided user not find in the database. Check docummentation for more details.' });
            }
            else if (!spot)
            {
                return res.status(400).json({ error: 'Provided spot not find in the database. Check docummentation for more details.' });
            }

 

            const booking = await Booking.create({
                user: user_id,
                spot: spot_id,
                date
            });


            await booking.populate('spot').populate('user').execPopulate();

            const ownerSocket = req.connectedUsers[booking.spot.user];
            
            if (ownerSocket) {
                req.io.to(ownerSocket).emit('booking_request',booking);
            }

            return res.json({booking});
        }

        catch(err){
            return res.status(400).json({ error: err.message });
        }
    }
};