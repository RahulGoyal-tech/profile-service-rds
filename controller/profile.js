const bcrypt = require('bcrypt');
const data = require('../credentials/credentials');

const getHealth = (_,res) => {
    res.send('Profile Service - Health Verified');
}
const getProfile = (_,res) => {
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
}
const verification = async (req,res) => {
    const cryptingToken = req.body.salt;
    const hash = await bcrypt.hash(data.chain_code,cryptingToken);
    res.send( JSON.stringify({
        hash: hash
    }));
}

module.exports = {
    getHealth,
    getProfile,
    verification
}