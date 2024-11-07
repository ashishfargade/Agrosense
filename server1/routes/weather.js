import express, { response } from 'express';
import axios from 'axios';

import { accuweather_key } from '../config.js';
import jwtauth from '../middleware/jwtauth.js';

const router = express.Router();

// @router GET /weather/getweather
// @desc location weather
// @access Private
router.get("/getweather", jwtauth, async (req, res) => {
    try {
        

        const params1 = {
            apikey: accuweather_key,
            q: req.query.pincode,
            details: false,
        }

        // console.log(params1)

        const response1 = await axios.get("http://dataservice.accuweather.com/locations/v1/postalcodes/IN/search",{
            params: params1
        }
        )

        // console.log(response1.data);
        // res.json(response1.data[0].Key);

        const locationKey = response1.data[0].Key;
        const params2 = {
            apikey: accuweather_key,
            details: true
        }

        const response2 = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,{
            params: params2
        }
        );

        console.log(response2.data[0]);
        res.json( response2.data[0])


    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
})

export default router;