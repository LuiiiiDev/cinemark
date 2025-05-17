import cookieParser from 'cookie-parser'
import express from 'express'
import empleadosRoutes from './src/routes/empleadosRoutes.js'
import clientesRoutes from './src/routes/clientesRoutes.js'
import peliculasRoutes from './src/routes/peliculasRoutes.js'
import registerClientsRoutes from './src/routes/registerClientsRoutes.js'
import registerEmployeesRoutes from './src/routes/registerEmployees.js'
import passwordRecoveryRoutes from './src/routes/passwordRecoveryRoutes.js'
import loginRoutes from './src/routes/loginRoutes.js'
import logoutRoutes from './src/routes/logoutRoutes.js'


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/clientes', clientesRoutes)
app.use('/api/empleados', empleadosRoutes)
app.use('/api/peliculas', peliculasRoutes)
app.use('/api/registerClients', registerClientsRoutes)
app.use('/api/registerEmployees', registerEmployeesRoutes)
app.use('/api/passwordRecovery', passwordRecoveryRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/logout', logoutRoutes)



export default app