# AI Code Analyzer

AI Code Analyzer is a web application designed to provide feedback on TypeScript and JavaScript code using AI-powered analysis. The app leverages Google's Gemini AI model to analyze code and offer insights on best practices, performance improvements, and potential errors.

## Features

### 1. **Code Analysis**
- Submit TypeScript or JavaScript code to receive detailed feedback from the AI.
- Feedback includes suggestions for improving code quality, identifying potential issues, and optimizing performance.

### 2. **Analysis History**
- View a history of all previously analyzed code submissions.
- Easily revisit past analyses and load them back into the editor for further refinement.

### 3. **Interactive Tabs**
- **Code Input Tab**: Paste or write your code for analysis.
- **Analysis Result Tab**: View AI-generated feedback for the submitted code.
- **History Tab**: Access and manage your analysis history.

### 4. **User-Friendly Interface**
- Modern, responsive UI built with React, TailwindCSS, and Framer Motion.
- Dark theme with smooth animations for an enhanced user experience.

### 5. **Clipboard Integration**
- Copy AI feedback to the clipboard with a single click for easy sharing or further use.

### 6. **Error Handling**
- Clear error messages for invalid input or server issues.
- Toast notifications for success and error states.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **TypeScript**: For type-safe development.
- **Vite**: For fast development and build processes.
- **TailwindCSS**: For styling.
- **Framer Motion**: For animations.
- **React Query**: For managing API calls and caching.

### Backend
- **Node.js**: For server-side development.
- **Express**: For building RESTful APIs.
- **Google GenAI SDK**: For interacting with the Gemini AI model.
- **TypeScript**: For type-safe development.
- **Jest**: For unit testing.

### Deployment
- The app is designed to run locally but can be deployed to any cloud platform supporting Node.js and React.

## How It Works

1. **Submit Code**: Paste your TypeScript or JavaScript code into the input field and click "Analyze Code."
2. **AI Feedback**: The app sends the code to the backend, which interacts with the Gemini AI model to generate feedback.
3. **View Results**: The feedback is displayed in the "Analysis Result" tab, formatted for easy readability.
4. **History Management**: All analyzed code is saved in the "History" tab, allowing you to revisit and reload past submissions.

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- A valid Google GenAI API key.

### Installation
1. Clone the repository:
 ```bash
 git clone https://github.com/your-repo/ai-code-analyzer.git
 cd ai-code-analyzer
 ```
2. Set up the backend:
  ```bash
  cd backend
  npm install
  cp env.example .env
  # Add your Google GenAI API key and desired port to the `.env` file
  npm run dev
  ```
3. Set up the frontend:
  ```bash
    cd ../frontend
    npm install
    npm run dev
  ```
4. Open the app in your browser at `http://localhost:5173`

## Presentation
### Prompt tab
![no prompt](https://github.com/user-attachments/assets/ddc7351f-54ae-40a8-9947-6a4bc499f9f9)

### Prompt ready to analysis
![prompt](https://github.com/user-attachments/assets/12ec11b6-c04a-4bd3-8f8b-629b4628a95c)

### AI feedback
![prompt_result_1](https://github.com/user-attachments/assets/a47e0c85-dd9f-4a05-a2d9-86567e742640)

![prompt_result_2](https://github.com/user-attachments/assets/4795376b-d4ad-4576-9e59-483c530ea2c8)

### Prompt history
![prompt_history](https://github.com/user-attachments/assets/44702dbf-1940-4880-a5ce-2baa3e9d6bd5)
