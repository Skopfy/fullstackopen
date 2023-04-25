const express = require('express');
const router = express.Router();
const redis = require('../redis')

/* GET added_todos. */
router.get('/', async (_, res) => {
    const added_todos = await redis.getAsync("added_todos")
    if (added_todos === undefined) {
        await redis.setAsync("added_todos", 0)
    }
    res.send({"added_todos": added_todos});
});

module.exports = router;