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
Return exactly 14 tasks. Do not return more than 14 tasks. Respond ONLY in valid JSON.

You are a world-class professional mentor and psychologist AI. Your job is to design a 14-day personal growth journey for a user based on their onboarding data.
${focusNote}
${addictionNote}
${socialNote}
Use evidence-based psychological methods (such as CBT, habit stacking, SMART goals, positive psychology, and behavioral activation) to create a sequence of daily tasks that build on each other for real, lasting change.

For each daily task:
- Make it unique, practical, and directly relevant to the user's goals and challenges.
- Avoid generic advice; tailor each task to the user's context and previous tasks.
- Vary the type of task (reflection, action, social, habit, etc.) across the 14 days.
- Ensure a logical progression: start simple, increase challenge or depth over time.
- Each task description should be no more than 1-2 sentences.

User Data:
- Name: ${name}
- Age: ${age}
- Goals: ${mainGoals}
- Confidence Levels: ${JSON.stringify(confidenceLevels)}
- Time Availability: ${timeAvailability}
- Addiction: ${addiction || 'None'}
- Social Life Categories: ${socialLifeCategories && socialLifeCategories.length ? socialLifeCategories.join(', ') : 'N/A'}

{
  "goal": "A concise, inspiring summary of the main growth goal for this user.",
  "tasks": [
    { "description": "Day 1: ..." },
    { "description": "Day 2: ..." }
    // ... (exactly 14 tasks)
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

  // PATCH: Trim to last complete closing bracket to handle truncated AI responses
  let lastArrayClose = cleanText.lastIndexOf(']');
  let lastObjectClose = cleanText.lastIndexOf('}');
  let trimIndex = Math.max(lastArrayClose, lastObjectClose);
  if (trimIndex !== -1 && trimIndex < cleanText.length - 1) {
    cleanText = cleanText.slice(0, trimIndex + 1);
  }
  // END PATCH

  // PATCH: Remove trailing commas before closing brackets
  cleanText = cleanText.replace(/,\s*([}\]])/g, '$1');
  // END PATCH

  // PATCH: Auto-close any missing brackets/braces
  let openBraces = (cleanText.match(/{/g) || []).length;
  let closeBraces = (cleanText.match(/}/g) || []).length;
  let openBrackets = (cleanText.match(/\[/g) || []).length;
  let closeBrackets = (cleanText.match(/\]/g) || []).length;
  while (closeBraces < openBraces) {
    cleanText += '}';
    closeBraces++;
  }
  while (closeBrackets < openBrackets) {
    cleanText += ']';
    closeBrackets++;
  }
  // END PATCH

  // Attempt to parse JSON, handle incomplete/truncated JSON
  let result;
  try {
    result = JSON.parse(cleanText);
  } catch (err) {
    console.error('AI response JSON.parse error:', err);
    console.error('Cleaned AI response text:', cleanText);
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
    // If still fails, try to remove the last incomplete task from the tasks array
    try {
      result = JSON.parse(attempt);
    } catch (err2) {
      console.error('AI response advanced recovery error:', err2);
      console.error('Advanced recovery attempt text:', attempt);
      // Try to remove the last incomplete task (if tasks array is present)
      const tasksArrayMatch = attempt.match(/("tasks"\s*:\s*\[)([\s\S]*)\]/);
      if (tasksArrayMatch) {
        let tasksContent = tasksArrayMatch[2];
        // Remove the last comma and everything after it (likely the incomplete task)
        let lastComma = tasksContent.lastIndexOf(',');
        if (lastComma !== -1) {
          let fixed = attempt.replace(/("tasks"\s*:\s*\[)[\s\S]*\]/, `$1${tasksContent.slice(0, lastComma)}]`);
          try {
            result = JSON.parse(fixed);
          } catch (err3) {
            console.error('Failed to parse AI response (after removing last incomplete task):', fixed);
            console.error('Final fallback: returning mock tasks. Last cleaned text:', cleanText);
            // Final fallback: return a safe object
            return { goal: 'Personal Development', tasks: [] };
          }
        } else {
          console.error('Failed to parse AI response (no recoverable tasks):', attempt);
          console.error('Final fallback: returning mock tasks. Last cleaned text:', cleanText);
          // Final fallback: return a safe object
          return { goal: 'Personal Development', tasks: [] };
        }
      } else {
        console.error('Failed to parse AI response (after advanced recovery):', attempt);
        console.error('Final fallback: returning mock tasks. Last cleaned text:', cleanText);
        // Final fallback: return a safe object
        return { goal: 'Personal Development', tasks: [] };
      }
    }
  }

  // Only keep tasks with a valid description
  if (result && Array.isArray(result.tasks)) {
    result.tasks = result.tasks.filter(
      t => t && typeof t.description === 'string' && t.description.trim().length > 0
    ).map(
      t => ({
        description: t.description
      })
    );
  }

  return result;
} 