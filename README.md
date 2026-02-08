# AI Voice Chatbot

This project is focused on building a high-performance, low-latency AI vocal chatbot using Next.js (App Router), TypeScript, and ElevenLabs Conversational AI. The chatbot will allow users to interact with an AI agent through voice commands, providing a seamless and engaging experience.

## Project Structure

- `app/` - Next.js App Router (UI & API Routes)
- `app/components/` - Store `Conversation.tsx` here.
- `app/api/get-signed-url/` - Route handler for ElevenLabs auth.
- `.env.local` - Contains `ELEVENLABS_API_KEY` and `NEXT_PUBLIC
- AGENT_ID`.
- `README.md` - Project overview and setup instructions.
- `package.json` - Project dependencies and scripts.
- `tsconfig.json` - TypeScript configuration.

## Setup Instructions

- Clone the Repository and navigate into the project directory:

  ```bash
  git clone https://github.com/emanuelefavero/ai-voice-chatbot.git
  cd ai-voice-chatbot
  ```

- Install Dependencies:

  ```bash
  npm install
  ```

- Create `.env.local` File:

  ```bash
  touch .env.local
  ```

- Add Environment Variables to `.env.local`:

  ```env
  ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
  NEXT_PUBLIC_AGENT_ID=your_agent_id_here
  ```

- Start Development Server:

  ```bash
  npm run dev
  ```

- Open your browser and navigate to `http://localhost:3000` to see the chatbot in action.

## Resources

- ElevenLabs Documentation: [https://elevenlabs.io/docs](https://elevenlabs.io/docs)
- Next.js Documentation: [https://nextjs.org/docs](https://nextjs.org/docs)
- Tailwind CSS Documentation: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

## License

- [MIT](LICENSE.md)

&nbsp;

---

&nbsp;

[**Go To Top &nbsp; ⬆️**](#ai-voice-chatbot)
