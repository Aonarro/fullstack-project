const { prisma } = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res, next) => {
	const { email, password } = req.body

	if (!email && !password) {
		return res.send
			.status(400)
			.json({ message: 'Пожалуйста, заполните обязательные поля' })
	}

	const user = await prisma.user.findFirst({
		where: {
			email,
		},
	})

	const isPasswordCorrect =
		user && (await bcrypt.compare(password, user.password))

	if (user && isPasswordCorrect) {
		res.status(200).json({ id: user.id, email: user.email, name: user.name })
	}
}

const register = async (req, res, next) => {
	res.send('register')
}

const current = async (req, res, next) => {
	res.send('current')
}

module.exports = {
	login,
	register,
	current,
}
