import {Environment} from "./type";
require('dotenv').config()

console.log(process.env);
export const environment: Environment = {
    env: process.env.REACT_APP_TYPE || "local",
    api: process.env.REACT_APP_API || "http://localhost:3001",
};
