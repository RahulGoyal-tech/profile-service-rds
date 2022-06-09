const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

const getHealth = (_,res) => {
    res.send('Profile Service - Health Verified');
}
const getProfile = (req,res) => {
    try{
        var token = req.headers.authorization;
        if(!token){return res.status(401).send('Unauthorized Access, Hash Not Found')}
        var field = token.split(" ");
        const hash = field[1];
        if (bcrypt.compareSync(process.env.CHAIN_CODE, hash)){}
        else {return res.status(401).send('Invalid Hash')}
        res.send(JSON.stringify({
            first_name: process.env.FIRST_NAME,
            last_name: process.env.LAST_NAME,
            email: process.env.EMAIL,
            phone: process.env.PHONE,
            yoe: parseInt(process.env.YOE),
            company: process.env.COMPANY,
            designation: process.env.DESIGNATION,
            github_id: process.env.GITHUB_ID,
            linkedin_id: process.env.LINKEDIN_ID,
            twitter_id: process.env.TWITTER_ID,
            instagram_id: process.env.INSTAGRAM_ID,
            website: process.env.WEBSITE,
        }));
    } catch(err) {
        console.error(`Error while getting profile data: ${err}`);
        return res.status(500).send("Error getting profile data");
    }
}
const verification = async (req,res) => {
    if(!req.body.salt){
        return res.status(404).send("Salt not found");
    }
    try{
        const cryptingToken = req.body.salt;
        const hash = await bcrypt.hash(process.env.CHAIN_CODE,cryptingToken);
        res.send( JSON.stringify({
            hash: hash
        }));
    } catch (err) {
        console.error(`Error while verification: ${err}`);
        return res.status(500).send("Error while encryption");
    }
}

module.exports = {
    getHealth,
    getProfile,
    verification
}