const { addMsg, getAllMsg } = require('../controllers/messageController');

const router = require('express').Router();

router.post("/addMsg",addMsg)
router.post("/getMsg",getAllMsg)

module.exports = router;
