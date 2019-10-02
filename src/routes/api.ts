import * as express from "express"
import * as passport from "passport"


let router = express.Router();






router.get('/', (req, res) => {
    res.json('hello from json');
});


module.exports = router;
