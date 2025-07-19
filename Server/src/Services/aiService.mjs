import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Generate a psychologically proven, personalized 21-day growth journey using OpenAI
 * @param {Object} onboardingData - User's onboarding data
 * @returns {Promise<{goal: string, tasks: Array<{description: string}>}>}
 */
export async function generateJourneyWithAI(onboardingData) {
  const { name, age, goals, confidenceLevels, timeAvailability, addiction, socialLifeCategories } = onboardingData;
  // Build a highly engineered prompt for the AI
  const prompt = `You are a world-class professional mentor and psychologist AI. Your job is to design a 21-day personal growth journey for a user based on their onboarding data. Use evidence-based psychological methods (such as CBT, habit stacking, SMART goals, positive psychology, and behavioral activation) to create a sequence of daily tasks that build on each other for real, lasting change. Each task should be:
- Specific, actionable, and achievable in a day
- Directly relevant to the user's stated goals, confidence levels, time availability, and any challenges (e.g., addiction, social life)
- Progressively more challenging or rewarding
- Written in a motivating, supportive tone
- Include a mix of reflection, action, and social/behavioral components

User Data:
- Name: ${name}
- Age: ${age}
- Goals: ${goals && goals.length ? goals.join(', ') : 'N/A'}
- Confidence Levels: ${JSON.stringify(confidenceLevels)}
- Time Availability: ${timeAvailability}
- Addiction: ${addiction || 'None'}
- Social Life Categories: ${socialLifeCategories && socialLifeCategories.length ? socialLifeCategories.join(', ') : 'N/A'}

Respond ONLY in valid JSON (no explanation, no markdown):
{
  "goal": "A concise, inspiring summary of the main growth goal for this user.",
  "tasks": [
    { "description": "Day 1: ..." },
    { "description": "Day 2: ..." },
    ... (21 tasks total, one for each day)
  ]
}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful, professional mentor AI.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  // Parse the AI's response as JSON
  const responseText = completion.choices[0].message.content;
  try {
    const result = JSON.parse(responseText);
    return result;
  } catch (err) {
    throw new Error('Failed to parse AI response: ' + responseText);
  }
}//done 