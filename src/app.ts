import dotenv from 'dotenv';
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { Chroma } from "@langchain/community/vectorstores/chroma";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({ model: "gpt-4o-mini" });
// Load environment variables from .env file
dotenv.config();

// Access environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log('OPENAI_API_KEY:', OPENAI_API_KEY);

const systemTemplate = "Translate the following from English into {language}";

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{text}"],
  ]);

  const prompt = await promptTemplate.invoke({
    language: "Spanish",
    text: "Hi there"
  })

const result = await model.invoke(prompt);
console.log(result.content);

/* 
const stream = await model.stream(messages);

const chunks = [];
for await (const chunk of stream) {
  chunks.push(chunk);
  console.log(`${chunk.content}|`);
}


const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large"
  });

  const vectorStore = new Chroma(embeddings, {
    collectionName: "a-test-collection",
  });
  
  console.log(vectorStore);*/



// Your application logic here
