const bcrypt = require('bcrypt');

const getHealth = (req,res) => {
    console.log("health request recieved");
    res.send('Profile Service - Health Verified');
}
const getProfile = (req,res) => {
    console.log("profile request recieved");
    res.send(JSON.stringify(
        {
            first_name: "first_name",
            last_name: "last_name",
            email: "mail_id",
            phone: "10 digit number",
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
    console.log("responded with profile details");
}
const verification = (req,res) => {
    console.log("Verification request recieved");
    const cryptingToken = req.body.salt;
    const hash = bcrypt.hashSync("ABCDEF",cryptingToken);
    res.send( JSON.stringify({
        hash: hash
    }));
    console.log(`Responded with hash = ${hash}`);
}

module.exports = {
    getHealth,
    getProfile,
    verification
}