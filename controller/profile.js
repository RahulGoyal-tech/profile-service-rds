const bcrypt = require('bcrypt');
const data = require('../credentials/credentials');

const getHealth = (_,res) => {
    res.send('Profile Service - Health Verified');
}
const getProfile = (req,res) => {
    try{
        const hash = req.headers.authorization;
        if (bcrypt.compareSync(data.chain_code, hash)){}
        else {return res.status(403).send("Invalid Hash")}
        res.send(JSON.stringify({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            yoe: data.yoe,
            company: data.company,
            designation: data.designation,
            github_id: data.github_id,
            linkedin_id: data.linkedin_id,
            twitter_id: data.twitter_id,
            instagram_id: data.instagram_id,
            website: data.website,
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
        const hash = await bcrypt.hash(data.chain_code,cryptingToken);
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