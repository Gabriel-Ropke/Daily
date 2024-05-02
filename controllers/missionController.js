const User = require("../models/user")

module.exports = class MissionController {
    static async userMissions(req, res) {
        const id = req.session.userid
        const user = await User.findOne({where: {id: id}, plain: true, raw: true})
        console.log(user)
        res.render("mission/missions", { user })
    }
}