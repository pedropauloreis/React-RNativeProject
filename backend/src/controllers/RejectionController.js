const Booking = require('../models/Booking');


module.exports = {
    async store(req,res) {
        try
        {

        
            const {booking_id} = req.params;
            const booking = await Booking.findById(booking_id).populate('spot');

            if (!booking)
            {
                return res.status(400).json({ error: 'Provided booking_id not find in the database. Check docummentation for more details.' });
            }

            booking.approved = false;

            await booking.save();

            const bookingUserSocket = req.connectedUsers[booking.user];
        
            if (bookingUserSocket) {
                req.io.to(bookingUserSocket).emit('booking_response',booking);
            }

            return res.json(booking);
        }
        catch(err)
        {
            return res.status(400).json({ error: err.message });
        }
            
    }
};