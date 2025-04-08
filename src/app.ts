import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

// import { HumanMessage, SystemMessage } from "@langchain/core/messages";
// import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({ model: "gpt-4o-mini" });
// Load environment variables from .env file
dotenv.config();

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

const loader = new PDFLoader("./assets/insurance.pdf");

const docs = await loader.load();

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const allSplits = await textSplitter.splitDocuments(docs);

console.log(allSplits.length);

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large",
});

// const vector1 = await embeddings.embedQuery(allSplits[0].pageContent);
// const vector2 = await embeddings.embedQuery(allSplits[1].pageContent);

const vectorStore = await MemoryVectorStore.fromDocuments(
  allSplits,
  embeddings
);

const results1 = await vectorStore.similaritySearch(
  "What are the classifications of insurance?",
);

console.log(results1);

// Documents are already added via fromDocuments()

// Your application logic here
