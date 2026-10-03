import "dotenv/config";
import app from "./src/app.js";
import {aiAsk} from './src/services/models.service.js';

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

aiAsk("Education minister of india?")