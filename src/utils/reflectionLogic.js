// Pure function: takes wizard answers → returns { category, categoryLabel, summary, disclosureDraft }
// No side effects — easy to reason about and test independently of the UI.

const TASK_LABELS = {
  literature_review: 'literature review',
  brainstorming: 'brainstorming and ideation',
  writing: 'writing or revising text',
  coding: 'coding',
  debugging: 'debugging',
  data_analysis: 'data analysis',
  presentations: 'preparing presentations',
  communication: 'email or research communication',
  other: 'a research task',
};

const CONTRIBUTION_LABELS = {
  suggested_ideas: 'suggested ideas and directions',
  rewrote_text: 'rewrote or polished sentences',
  generated_code: 'generated code',
  explained_error: 'explained an error or concept',
  summarized: 'summarized papers or notes',
  analysis_steps: 'suggested analysis steps',
  organized_notes: 'organized notes or materials',
  created_outline: 'created an outline or structure',
  other: 'provided other assistance',
};

// Score the 6 reflection questions to compute a concern level.
// q1: sensitive data?  q2: AI text in output?  q3: substantive contribution?
// q4: influenced conclusions?  q5: comfortable explaining? (inverted)  q6: need to disclose?
export function computeReflection({ taskKey, contributions, answers }) {
  const { q1, q2, q3, q4, q5, q6 } = answers;

  // yes=2, maybe=1, no=0 ; q5 inverted (not comfortable = higher concern)
  const score =
    pts(q1) + pts(q2) + pts(q3) + pts(q4) + ptsInverted(q5) + pts(q6);

  // 0–3 = low, 4–7 = medium, 8–12 = high
  let category, categoryLabel, categoryColor, categoryBgColor;
  if (score <= 3) {
    category = 'low';
    categoryLabel = 'Low Concern';
    categoryColor = '#2E7D32';
    categoryBgColor = '#E8F5E9';
  } else if (score <= 7) {
    category = 'medium';
    categoryLabel = 'Medium Concern';
    categoryColor = '#E65100';
    categoryBgColor = '#FFF3E0';
  } else {
    category = 'high';
    categoryLabel = 'High Concern';
    categoryColor = '#B71C1C';
    categoryBgColor = '#FFEBEE';
  }

  const taskLabel = TASK_LABELS[taskKey] || 'a research task';
  const contribList = contributions
    .map(k => CONTRIBUTION_LABELS[k] || k)
    .join(', ');

  const summary = buildSummary(taskLabel, contribList, answers);
  const guidance = buildGuidance(category);
  const disclosureDraft = buildDisclosure(taskLabel, contribList, answers);

  return { category, categoryLabel, categoryColor, categoryBgColor, summary, guidance, disclosureDraft };
}

function pts(val) {
  if (val === 'yes') return 2;
  if (val === 'maybe') return 1;
  return 0;
}

function ptsInverted(val) {
  // q5 asks "comfortable explaining?" — answering "no" raises concern
  if (val === 'no') return 2;
  if (val === 'maybe') return 1;
  return 0;
}

function buildSummary(taskLabel, contribList, { q2, q3, q4 }) {
  const parts = [`I used an AI assistant for support with ${taskLabel}.`];

  if (contribList) {
    parts.push(`The AI ${contribList}.`);
  }

  const notes = [];
  if (q2 === 'yes') notes.push('some AI-generated content may appear in the final output');
  else if (q2 === 'maybe') notes.push('it is unclear whether AI-generated content will appear in the final output');

  if (q3 === 'yes') notes.push('the AI made a substantive intellectual contribution to this work');
  else if (q3 === 'maybe') notes.push('the extent of the AI\'s intellectual contribution is uncertain');

  if (q4 === 'yes') notes.push('AI output influenced my interpretation or conclusions');
  else if (q4 === 'maybe') notes.push('AI output may have influenced my interpretation or conclusions');

  if (notes.length > 0) {
    parts.push('I note that ' + notes.join(', and ') + '.');
  } else {
    parts.push('I reviewed and finalized all outputs myself.');
  }

  return parts.join(' ');
}

function buildGuidance(category) {
  if (category === 'low') {
    return 'Your reflection suggests this AI use is relatively routine. No immediate disclosure is likely required, but keeping your own record is good practice. Use your own judgment about whether to mention it.';
  }
  if (category === 'medium') {
    return 'Your reflection raises some considerations worth thinking through. Consider discussing this AI use with your advisor or collaborators, especially regarding authorship and intellectual contribution. This is reflective guidance, not a rule.';
  }
  return 'Your reflection suggests this AI use may warrant explicit disclosure or discussion — for example, in an author contribution statement, methods section, or conversation with your advisor. This is reflective guidance based on your answers, not a determination of acceptability.';
}

function buildDisclosure(taskLabel, contribList, { q2, q3 }) {
  const lines = [`I used an AI assistant to support ${taskLabel}.`];
  if (contribList) {
    lines.push(`The AI ${contribList}.`);
  }
  if (q2 === 'yes' || q2 === 'maybe') {
    lines.push('AI-generated text may appear in portions of the final output; all such content was reviewed and revised by the author.');
  }
  if (q3 === 'yes' || q3 === 'maybe') {
    lines.push('The AI contributed to the development of ideas; all interpretations, conclusions, and final decisions remain the responsibility of the author.');
  }
  lines.push('All final decisions, verification, and responsibility for the work remain with the author.');
  return lines.join(' ');
}
