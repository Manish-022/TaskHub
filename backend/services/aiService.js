const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function chatWithAI(userMessage) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured");
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are TaskHub's AI Assistant. You help users manage their tasks efficiently.
When users ask to create tasks, respond with clear instructions.
Keep responses concise and helpful.`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    throw new Error(error.message || "Failed to get AI response");
  }
}

module.exports = { chatWithAI };
