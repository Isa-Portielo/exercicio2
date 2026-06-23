
import mongoose from "mongoose";

const url = "mongodb+srv://isabellematielobg022_db_user:eAm2sAWI96JmoENc@cluster0.kx4kddg.mongodb.net/?appName=Cluster0";

const conexao = await mongoose.connect(url)

export default conexao;