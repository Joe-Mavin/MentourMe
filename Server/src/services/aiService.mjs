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
  const mainGoals = goals && goals.length ? goals.join(', ') : 'N/A';
  const focusNote = (goals && goals.length)
    ? `The user's main goal(s) are: ${mainGoals}. Focus the journey and daily tasks on these area(s).`
    : '';
  const addictionNote = addiction ? `The user wants to address addiction: ${addiction}.` : '';
  const socialNote = (socialLifeCategories && socialLifeCategories.length)
    ? `The user wants to improve these social life areas: ${socialLifeCategories.join(', ')}.`
    : '';

  const prompt = `
You are a world-class professional mentor and psychologist AI. Your job is to design a 21-day personal growth journey for a user based on their onboarding data.
${focusNote}
${addictionNote}
${socialNote}
Use evidence-based psychological methods (such as CBT, habit stacking, SMART goals, positive psychology, and behavioral activation) to create a sequence of daily tasks that build on each other for real, lasting change.

For each daily task:
- Make it unique, practical, and directly relevant to the user's goals and challenges.
- Avoid generic advice; tailor each task to the user's context and previous tasks.
- Vary the type of task (reflection, action, social, habit, etc.) across the 21 days.
- Ensure a logical progression: start simple, increase challenge or depth over time.
- Include a 1-sentence rationale for each task (as a 'reason' field) explaining why it is useful.
- Each task and reason should be no more than 1-2 sentences.

User Data:
- Name: ${name}
- Age: ${age}
- Goals: ${mainGoals}
- Confidence Levels: ${JSON.stringify(confidenceLevels)}
- Time Availability: ${timeAvailability}
- Addiction: ${addiction || 'None'}
- Social Life Categories: ${socialLifeCategories && socialLifeCategories.length ? socialLifeCategories.join(', ') : 'N/A'}

Respond ONLY in valid JSON (no explanation, no markdown). If you cannot fit all 21 tasks, return as many as possible in a valid JSON array.
{
  "goal": "A concise, inspiring summary of the main growth goal for this user.",
  "tasks": [
    { "description": "Day 1: ...", "reason": "Why this is useful" },
    { "description": "Day 2: ...", "reason": "Why this is useful" }
    // ... (up to 21 tasks)
  ]
}
`;

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

  // Log the raw AI response for debugging
  console.log('Raw AI response:', responseText);

  // Remove all code block markers and leading/trailing whitespace
  let cleanText = responseText.trim()
    .replace(/^```[a-zA-Z]*\n?/, '') // Remove opening code block (with or without language)
    .replace(/```$/, '') // Remove closing code block
    .replace(/\n```\s*$/, '') // Remove closing code block with newline
    .replace(/\r?\n?```[a-zA-Z]*\r?\n?/g, '') // Remove any stray code block markers
    .trim();

  // Attempt to parse JSON, handle incomplete/truncated JSON
  let result;
  try {
    result = JSON.parse(cleanText);
  } catch (err) {
    // Try to recover from truncated JSON by trimming to last complete bracket
    let attempt = cleanText;
    let lastBrace = attempt.lastIndexOf('}');
    if (lastBrace !== -1 && lastBrace < attempt.length - 1) {
      attempt = attempt.slice(0, lastBrace + 1);
    }
    // Remove trailing commas before closing brackets (common AI mistake)
    attempt = attempt.replace(/,\s*([}\]])/g, '$1');
    // If still missing closing brackets, try to auto-close
    let openBraces = (attempt.match(/{/g) || []).length;
    let closeBraces = (attempt.match(/}/g) || []).length;
    let openBrackets = (attempt.match(/\[/g) || []).length;
    let closeBrackets = (attempt.match(/\]/g) || []).length;
    while (closeBraces < openBraces) {
      attempt += '}';
      closeBraces++;
    }
    while (closeBrackets < openBrackets) {
      attempt += ']';
      closeBrackets++;
    }
    try {
      result = JSON.parse(attempt);
    } catch (err2) {
      console.error('Failed to parse AI response (after advanced recovery):', attempt);
      throw new Error('Failed to parse AI response: ' + attempt);
    }
  }
  return result;
} 