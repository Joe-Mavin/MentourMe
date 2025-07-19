// This is the ONLY valid AI service file. Uses OpenRouter/DeepSeek for journey generation. Do NOT use or create any other aiService.mjs files.
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

/**
 * Generate a psychologically proven, personalized 21-day growth journey using OpenRouter/DeepSeek
 * @param {Object} onboardingData - User's onboarding data
 * @returns {Promise<{goal: string, tasks: Array<{description: string}>}>}
 */
export async function generateJourneyWithAI(onboardingData) {
  const { name, age, goals, confidenceLevels, timeAvailability, addiction, socialLifeCategories } = onboardingData;
  const prompt = `You are a world-class professional mentor and psychologist AI. Your job is to design a 21-day personal growth journey for a user based on their onboarding data. Use evidence-based psychological methods (such as CBT, habit stacking, SMART goals, positive psychology, and behavioral activation) to create a sequence of daily tasks that build on each other for real, lasting change. Each task should be:\n- Specific, actionable, and achievable in a day\n- Directly relevant to the user's stated goals, confidence levels, time availability, and any challenges (e.g., addiction, social life)\n- Progressively more challenging or rewarding\n- Written in a motivating, supportive tone\n- Include a mix of reflection, action, and social/behavioral components\n\nUser Data:\n- Name: ${name}\n- Age: ${age}\n- Goals: ${goals && goals.length ? goals.join(', ') : 'N/A'}\n- Confidence Levels: ${JSON.stringify(confidenceLevels)}\n- Time Availability: ${timeAvailability}\n- Addiction: ${addiction || 'None'}\n- Social Life Categories: ${socialLifeCategories && socialLifeCategories.length ? socialLifeCategories.join(', ') : 'N/A'}\n\nRespond ONLY in valid JSON (no explanation, no markdown):\n{\n  "goal": "A concise, inspiring summary of the main growth goal for this user.",\n  "tasks": [\n    { "description": "Day 1: ..." },\n    { "description": "Day 2: ..." },\n    ... (21 tasks total, one for each day)\n  ]\n}`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://onyangojp.tech',
      'X-Title': 'MentourMe AI Journey'
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
      messages: [
        { role: 'system', content: 'You are a helpful, professional mentor AI.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('OpenRouter API error:', response.status, errorBody);
    throw new Error(`OpenRouter API error: ${response.status} - ${errorBody}`);
  }

  const data = await response.json();
  const responseText = data.choices?.[0]?.message?.content;
  if (!responseText) {
    console.error('No response from OpenRouter:', JSON.stringify(data));
    throw new Error('No response from OpenRouter');
  }

  try {
    const result = JSON.parse(responseText);
    return result;
  } catch (err) {
    console.error('Failed to parse AI response:', responseText);
    throw new Error('Failed to parse AI response: ' + responseText);
  }
} 