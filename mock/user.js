module.exports = {
    "GET /api/userMsg": (req, res) => {
        const { password, username } = req.body;
        const isOk = password === "888888" && username === "admin";
        res.send({ status:  isOk ? "ok" : "error", type: "userMsg"});
    },
    "GET /api/userList": [
        "付小小",
        "曲丽丽",
        "林东东",
        "周星星",
        "吴加好",
        "朱偏右",
        "鱼酱",
        "乐哥",
        "谭小仪",
        "仲尼",
    ]
};

