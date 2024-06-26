import { pool } from '../db.js'
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js'

export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const [result] = await pool.query('INSERT INTO user(email, username, password) VALUES(?,?,?)', [email, username, passwordHash])

        //register
        const token = await createAccessToken({id: result.insertId})

        res.cookie('token', token)
        res.json({ 
            message: "User created successfully"
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const login = (req, res) => res.send('login')
