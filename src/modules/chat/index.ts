import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({ model: "gpt-4o-mini" });


export const invoke = async (input: any) => {
  const result = await model.invoke(input);

  return result;
};
