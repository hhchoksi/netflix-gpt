import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
export const model = client.getGenerativeModel({model: "gemini-pro"});