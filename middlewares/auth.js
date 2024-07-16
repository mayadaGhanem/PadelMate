require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
	const tokenList = req.header("Authorization").split(" ");
	const token = tokenList[1];
	if (!token) return res.status(401).json({ error: "Access denied" });
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		if (decoded.exp > new Date().getTime()) {
			return res
				.status(401)
				.send({ error: "Unauthorized! Access Token was expired!" });
		}
		req.userId = decoded.userId;
		next();
	} catch (error) {
		res.status(401).json({ error: "Invalid token" });
	}
}
module.exports = verifyToken;
