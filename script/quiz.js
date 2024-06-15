const axios = require("axios");

const questions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "What is the largest mammal?", answer: "Blue whale" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" },
  { question: "What is the chemical symbol for water?", answer: "H2O" },
  { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
  { question: "Which country is commonly associated with the Great Wall?", answer: "China" },
  { question: "Who developed the theory of relativity?", answer: "Albert Einstein" },
  { question: "What is the largest organ in the human body?", answer: "Skin" },
  { question: "What is the smallest planet in our solar system?", answer: "Mercury" },
  { question: "Who wrote 'Hamlet'?", answer: "William Shakespeare" },
  { question: "What is the tallest mountain in the world?", answer: "Mount Everest" },
  { question: "Which element has the chemical symbol 'Fe'?", answer: "Iron" },
  { question: "What is the capital of Japan?", answer: "Tokyo" },
  { question: "Who discovered penicillin?", answer: "Alexander Fleming" },
  { question: "What is the largest ocean on Earth?", answer: "Pacific Ocean" },
  { question: "Who is known as the 'Father of Computers'?", answer: "Charles Babbage" },
  { question: "Which famous scientist was awarded the Nobel Prize in Physics for his discovery of the photoelectric effect?", answer: "Albert Einstein" },
  { question: "What is the currency of Germany?", answer: "Euro" },
  { question: "Who painted the ceiling of the Sistine Chapel?", answer: "Michelangelo" },
  { question: "What is the largest continent by land area?", answer: "Asia" },
  { question: "Who was the first person to step on the moon?", answer: "Neil Armstrong" },
  { question: "Which gas do plants absorb from the atmosphere?", answer: "Carbon dioxide" },
  { question: "Who is the author of '1984'?", answer: "George Orwell" },
  { question: "What is the capital of Brazil?", answer: "Brasília" },
  { question: "Which country is famous for its tulips and windmills?", answer: "Netherlands" },
  { question: "Who wrote 'The Great Gatsby'?", answer: "F. Scott Fitzgerald" },
  { question: "What is the chemical symbol for gold?", answer: "Au" },
  { question: "Which city hosted the 2016 Summer Olympics?", answer: "Rio de Janeiro" },
  { question: "Who painted 'Starry Night'?", answer: "Vincent van Gogh" },
];

const userStates = {}; // Simulated database for user states

module.exports.config = {
  name: "quiz",
  version: "1.0.0",
  role: 1,
  credits: "azri",
  description: "Quiz game with 30 levels",
  commandCategory: "Game",
  usages: "[answer]",
  cooldowns: 0,
  hasPrefix: false
};

module.exports.run = async function({ api, event, args }) {
  const userId = event.senderID;
  const userMessage = args.join(" ");

  try {
    const currentLevel = userStates[userId] || 0;
    const { question, answer } = questions[currentLevel];

    if (userMessage.toLowerCase() === answer.toLowerCase()) {
      let response = "-----------------------------------------\n" +
                     "You guessed it right! Congratulations, you're a genius!\n" +
                     "-----------------------------------------";
      userStates[userId] = currentLevel + 1;

      if (currentLevel + 1 < questions.length) {
        const nextQuestion = questions[currentLevel + 1].question;
        response += `\n\n-----------------------------------------\n${nextQuestion}\n-----------------------------------------`;
      } else {
        response += "\n\nYou've completed all levels! Well done!";
      }

      await api.sendMessage(response, event.threadID);
    } else {
      const response = "-----------------------------------------\n" +
                       "Engk... you got it wrong. Better luck next time!\n" +
                       "-----------------------------------------";
      await api.sendMessage(response, event.threadID);
    }
  } catch (error) {
    console.error("Error processing quiz", error);
    await api.sendMessage('An error occurred while processing your answer. Please try again later.', event.threadID);
  }
};
