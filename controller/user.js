const bcrypt = require('bcrypt');

const getHealth = (req,res) => {
    res.send('Profile Service - Health Verified');
}
const getProfile = (req,res) => {
    res.send(JSON.stringify(
        {
            first_name: "first_name",
            last_name: "last_name",
            email: "mail_id",
            phone: "10 digit contact number",
            yoe: "Years of Experience",
            company: "Current company",
            designation: "Current Position",
            github_id: "Github_ID",
            linkedin_id: "LinkedIn_ID",
            twitter_id: "Twitter_ID",
            instagram_id: "Instagram_ID",
            website: "Portfolio_Website",
        }
    ));
}
const verification = async (req,res) => {
    const cryptingToken = req.body.salt;
    const hash = await bcrypt.hash("rejYFnN3tim27Mwb87Wj",cryptingToken);
    res.send( JSON.stringify({
        hash: hash
    }));
}

module.exports = {
    getHealth,
    getProfile,
    verification
}