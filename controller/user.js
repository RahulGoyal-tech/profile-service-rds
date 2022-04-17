const bcrypt = require('bcrypt');

const getHealth = (req,res) => {
    res.send('Profile Service - Health Verified');
}
const getProfile = (req,res) => {
    res.send(JSON.stringify(
        {
            first_name: "Lakshay",
            last_name: "Manchanda",
            email: "mans@lakshay.com",
            phone: "9999999999",
            yoe: 1,
            company: "YUDEK",
            designation: "SDE Intern",
            github_id: "lakshayman",
            linkedin_id: "lakshayman",
            twitter_id: "",
            instagram_id: "",
            website: "lakshaymanchanda.me",
        }
    ));
}
const verification = async (req,res) => {
    const cryptingToken = req.body.salt;
    const hash = await bcrypt.hash("19klSc2SCGtWDopbaVoj",cryptingToken);
    res.send( JSON.stringify({
        hash: hash
    }));
}

module.exports = {
    getHealth,
    getProfile,
    verification
}