const messageModel = require('../model/MessageModel');

module.exports.addMsg = async (req,res,next) => {
    try {
        const {from,to,msg} = req.body;
        const data = await messageModel.create({
            message: {text: msg},
            users: [from,to],
            sender: from,
        })
        if(data) return res.json({msg: "Message sent"});
        return res.json({msg: "Message error"});
    } catch (error) {
        next(error);
    }
}
module.exports.getAllMsg = async (req,res,next) => {
    try {
        const {from,to} = req.body;
        const messages = await messageModel.find({
            users: {
                $all: [from,to]
            }
        }).sort({updatedAt: 1});
        console.log(messages)
        const projectedMessages = messages.map((msg) => {
            return{
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })
        console.log(projectedMessages)
        res.json(projectedMessages);
    } catch (error) {
        next(error);
    }
}