import dotenv from 'dotenv';
import { ChatOpenAI } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { Chroma } from "@langchain/community/vectorstores/chroma";
// import { HumanMessage, SystemMessage } from "@langchain/core/messages";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Document } from "@langchain/core/documents";

const model = new ChatOpenAI({ model: "gpt-4o-mini" });
// Load environment variables from .env file
dotenv.config();

// Access environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// const systemTemplate = "Translate the following from English into {language}";

// const promptTemplate = ChatPromptTemplate.fromMessages([
//     ["system", systemTemplate],
//     ["user", "{text}"],
//   ]);

//   const prompt = await promptTemplate.invoke({
//     language: "Spanish",
//     text: "Hi there"
//   })

// const result = await model.invoke(prompt);
// console.log(result.content);


const documents = [
  new Document({
    pageContent:
      "Dogs are great companions, known for their loyalty and friendliness.",
    metadata: { source: "mammal-pets-doc" },
  }),
  new Document({
    pageContent: "Cats are independent pets that often enjoy their own space.",
    metadata: { source: "mammal-pets-doc" },
  }),
];

console.log(documents);

const loader = new PDFLoader("./assets/insurance.pdf");

const docs = await loader.load();
console.log(docs[0].pageContent);
console.log(docs[0].metadata);




// Your application logic here
