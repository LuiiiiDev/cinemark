import cookieParser from 'cookie-parser'
import express from 'express'
import empleadosRoutes from './src/routes/empleadosRoutes.js'
import clientesRoutes from './src/routes/clientesRoutes.js'
import peliculasRoutes from './src/routes/peliculasRoutes.js'
import registerClientsRoutes from './src/routes/registerClientsRoutes.js'
import registerEmployeesRoutes from './src/routes/registerEmployees.js'
import passwordRecoveryRoutes from './src/routes/passwordRecoveryRoutes.js'


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/clientes', clientesRoutes)
app.use('/api/empleados', empleadosRoutes)
app.use('/api/peliculas', peliculasRoutes)
app.use('/api/registerClients', registerClientsRoutes)
app.use('/api/registerEmployees', registerEmployeesRoutes)


export default app