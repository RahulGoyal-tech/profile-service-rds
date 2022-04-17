const bcrypt = require('bcrypt');

const getHealth = (req,res) => {
    res.send('Profile Service - Health Verified');
}
const getProfile = (req,res) => {
    res.send(JSON.stringify(
        {
            first_name: "Rahul",
            last_name: "Goyal",
            email: "rhgoyal01@gmail.com",
            phone: "9540717412",
            yoe: 0,
            company: "Bharati Vidyapeeth college of engineering",
            designation: "Student",
            github_id: "RahulGoyal-tech",
            linkedin_id: "rahul-goyal-69a9801b1",
            twitter_id: "",
            instagram_id: "",
            website: "",
        }
    ));
}
const verification = async (req,res) => {
    const cryptingToken = req.body.salt;
    const hash = await bcrypt.hash("UbTkVojl0cEWIf6AoOyQ",cryptingToken);
    res.send( JSON.stringify({
        hash: hash
    }));
}

module.exports = {
    getHealth,
    getProfile,
    verification
}