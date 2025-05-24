import app from "./controller/app"
import { meetRouter } from "./controller/routes/meetRouter";
import { userRouter } from "./controller/routes/userRouter"
import { wineRouter } from "./controller/routes/wineRouter"


app.use('/user', userRouter);
app.use('/vinhos', wineRouter);
app.use('/reunioes', meetRouter);
