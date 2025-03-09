import app from "./controller/app"
import { userRouter } from "./controller/routes/userRouter"
import { wineRouter } from "./controller/routes/wineRouter"


app.use('/usuario/', userRouter)
app.use('/vinhos/', wineRouter)
