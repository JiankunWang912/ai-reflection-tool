# AI Use Reflection and Disclosure Tool — Design Document

## 1. Design Rationale

### Purpose

Doctoral students increasingly use AI tools (ChatGPT, Claude, Copilot, Codex, and others) for research-related tasks including writing, coding, debugging, literature review, data analysis, brainstorming, and research communication. However, many students feel uncertain about when AI use is appropriate, when it should be disclosed, and how to discuss it with advisors or collaborators.

This app is a **reflection tool**, not a compliance system. Its purpose is to help doctoral students:

- **Reflect** on what role AI played in a specific research task
- **Document** their AI use in a lightweight, private format
- **Identify** possible considerations around authorship, originality, privacy, and interpretation
- **Generate** an optional disclosure draft or discussion summary

The app does **not** monitor, police, judge, or make determinations about the acceptability of AI use.

### Design Values

| Value | How the design embodies it |
|-------|---------------------------|
| **Supportive, not punitive** | Language avoids terms like "cheating," "misuse," or "violation." The welcome screen explicitly states this is not a compliance system. |
| **Lightweight** | The wizard flow takes 4 taps + one optional review; total interaction time is under 2 minutes. |
| **No moralizing** | Reflection categories use neutral labels (Low / Medium / High Concern). All results are framed as "reflective guidance — not a rule or judgment." |
| **Reflective judgment** | The app surfaces considerations; it does not automatically decide whether behavior is acceptable. Users make their own judgments. |
| **Researcher audience** | Microcopy assumes graduate-level vocabulary and avoids condescension. Options reflect real research workflows. |
| **Privacy-by-design** | No login, no network requests, no text-paste of research content. Users describe the *type* of help they received, never the content itself. All data stored locally only. |

---

## 2. User Journey / Storyboard

### Scenario
A doctoral student just finished debugging a data analysis script with the help of ChatGPT. The AI explained an error message and suggested a fix. The student wants to document this use before moving on.

### Step-by-step journey

**Step 1 — Trigger.**
The student finishes a research task that involved AI assistance. They open the AI Reflection Tool on their phone.

**Step 2 — Privacy orientation.**
The Welcome screen greets them with a brief explanation: this is a reflection aid, not a compliance system. A privacy notice reminds them not to enter sensitive content. They tap "Start Reflection."

**Step 3 — Categorize the task.**
The student selects "Data analysis" from a list of 9 research task types. Single selection — one tap, then Next.

**Step 4 — Describe AI involvement.**
The student selects "Explained an error or concept" and "Suggested analysis steps" from a multi-select list of 9 AI contribution types. Two taps, then Next.

**Step 5 — Reflect.**
Six yes/no/maybe questions prompt the student to consider data sensitivity, AI's intellectual contribution, whether AI-generated content will appear in the final work, and whether they'd feel comfortable explaining the AI use to an advisor. They answer honestly and tap "See My Reflection."

**Step 6 — Review and act.**
The Result screen shows a "Low Concern" badge with a generated summary: *"I used an AI assistant for support with data analysis. The AI explained an error or concept, suggested analysis steps. I reviewed and finalized all outputs myself."* The student optionally saves this to their local history, generates a disclosure draft, or starts a new reflection.

---

## 3. Screen-by-Screen Design and UX Microcopy

### Screen 1: Welcome & Privacy Notice

**Purpose:** Orient the user, set expectations, display privacy notice.

**Layout:**
- App title: "AI Reflection Tool"
- Tagline: "A private space to document and reflect on how AI assisted your research."
- Privacy card (teal left border, light teal background) with 4 bullet points
- Purpose statement paragraph
- Primary CTA button: "Start Reflection"
- Secondary link: "View saved reflections →"

**UX Microcopy:**

> **Before you begin**
> - All data is stored only on this device. Nothing is sent to any server.
> - Do not enter sensitive research content, unpublished data, or confidential material.
> - This tool does not determine whether your AI use is allowed or acceptable.
> - It is a personal reflection aid — like a lab notebook entry for your AI use.

> This tool helps you reflect on AI use, identify considerations around authorship and originality, and optionally generate a brief disclosure or discussion summary. It is not a compliance system.

---

### Screen 2: Select Research Task

**Purpose:** Classify the research task the user just completed.

**Layout:**
- Progress bar: "Step 1 of 6"
- Heading: "What research task did you just do?"
- Subheading: "Select the one that best fits."
- 9 selectable pills (single-select)
- Footer with Back and Next buttons

**Options:**
1. Literature review
2. Brainstorming or ideation
3. Writing or revising text
4. Coding
5. Debugging
6. Data analysis
7. Preparing presentations
8. Email or research communication
9. Other

**Interaction:** Single-select. Next button disabled until one is chosen.

---

### Screen 3: Select AI Contribution

**Purpose:** Record what the AI helped with. Multi-select because AI often assists in multiple ways within a single task.

**Layout:**
- Progress bar: "Step 2 of 6"
- Heading: "What did the AI help with?"
- Subheading: "Select all that apply."
- 9 selectable pills (multi-select)
- Footer with Back and Next buttons

**Options:**
1. Suggested ideas or directions
2. Rewrote or polished sentences
3. Generated code
4. Explained an error or concept
5. Summarized papers or notes
6. Suggested analysis steps
7. Organized notes or materials
8. Created an outline or structure
9. Other

**Interaction:** Multi-select. At least one required to proceed.

---

### Screen 4: Reflection Questions

**Purpose:** Prompt structured self-reflection through 6 short questions.

**Layout:**
- Progress bar: "Step 3 of 6"
- Heading: "Reflection questions"
- Subheading (framing text)
- 6 question cards, each with Yes / Maybe / No toggle buttons
- Footer with Back and "See My Reflection" button

**UX Microcopy (subheading):**

> Answer honestly. There are no right or wrong answers — your responses shape a personal reflection summary, not a compliance record.

**Questions:**
1. Did this task involve private, sensitive, or restricted data?
2. Is AI-generated text or content likely to appear in the final output?
3. Did the AI make a substantive intellectual contribution to the work?
4. Did AI output influence your interpretation, claims, or conclusions?
5. Would you feel comfortable explaining this AI use to an advisor, collaborator, or reviewer?
6. Do you think this AI use should be discussed or disclosed?

**Interaction:** All 6 must be answered (yes, maybe, or no) before proceeding. The "Maybe" option prevents forced binary choices on genuinely ambiguous questions.

**Hint text (shown when incomplete):**

> Answer all questions to continue.

---

### Screen 5: Reflection Result

**Purpose:** Display the reflection category, generated summary, and guidance. Allow saving and disclosure generation.

**Layout:**
- Category badge (colored border + background): e.g., "Low Concern"
- Subtitle in badge: "Reflective guidance — not a rule or judgment"
- "What this means" card with guidance text
- "Your AI-use summary" card with generated summary
- "Sample outputs for reference" card with all three category examples
- Three buttons: "Generate Disclosure Draft →", "Save to History", "Start New Reflection"

**UX Microcopy — Guidance by category:**

**Low Concern:**
> Your reflection suggests this AI use is relatively routine. No immediate disclosure is likely required, but keeping your own record is good practice. Use your own judgment about whether to mention it.

**Medium Concern:**
> Your reflection raises some considerations worth thinking through. Consider discussing this AI use with your advisor or collaborators, especially regarding authorship and intellectual contribution. This is reflective guidance, not a rule.

**High Concern:**
> Your reflection suggests this AI use may warrant explicit disclosure or discussion — for example, in an author contribution statement, methods section, or conversation with your advisor. This is reflective guidance based on your answers, not a determination of acceptability.

**Sample outputs for reference:**
> **Low concern:** Routine support (e.g., spell-check, quick syntax fix) with no significant authorship implications.
>
> **Medium concern:** AI contributed ideas or generated text that appears in the work — worth discussing with advisor.
>
> **High concern:** AI played a substantial intellectual role; explicit disclosure in author statements is recommended.

---

### Screen 6: Disclosure Draft (Optional)

**Purpose:** Generate a ready-to-adapt disclosure statement.

**Layout:**
- Heading: "Disclosure Draft"
- Framing text
- Draft card (teal left border) with generated text
- Adaptation hint
- "Copy to Clipboard" button
- "← Back to Result" button
- "Start New Reflection" link

**UX Microcopy (framing):**

> This is a starting point for a disclosure statement or conversation with your advisor. Adapt it to fit your context, discipline, and institution's norms. This is not a legal or official statement.

**Example generated draft:**

> I used an AI assistant to support coding. The AI generated code, explained an error or concept. AI-generated text may appear in portions of the final output; all such content was reviewed and revised by the author. All final decisions, verification, and responsibility for the work remain with the author.

**Adaptation hint:**

> You may adapt this for an author contribution section, methods note, cover letter, or conversation with your advisor or collaborators.

---

### Screen 7: Saved Reflections / History

**Purpose:** Show previously saved reflection entries. Allow deletion.

**Layout:**
- Header with "← Back" and "Saved Reflections" title
- List of entry cards, each showing:
  - Date (e.g., "Apr 27, 2026")
  - Reflection category with color (e.g., "Low Concern" in green)
  - Research task type (e.g., "Coding")
  - AI-use summary (truncated to 3 lines)
  - "Delete" link (red text)
- Empty state if no entries saved

**UX Microcopy (empty state):**

> No reflections saved yet.
> Complete a reflection to see it here.

---

## 4. Privacy Notice (Full Text)

The following privacy notice is displayed on the Welcome screen before any user interaction:

> **Before you begin**
>
> - All data is stored only on this device. Nothing is sent to any server.
> - Do not enter sensitive research content, unpublished data, or confidential material.
> - This tool does not determine whether your AI use is allowed or acceptable.
> - It is a personal reflection aid — like a lab notebook entry for your AI use.
>
> This tool helps you reflect on AI use, identify considerations around authorship and originality, and optionally generate a brief disclosure or discussion summary. It is not a compliance system.

### Privacy design decisions

- **No login or account creation.** The app has no authentication system.
- **No network requests.** The app makes zero HTTP calls. All data stays on-device.
- **No text input of research content.** Users select from predefined options and answer yes/no/maybe questions. They never paste research text, code, or data into the app.
- **Local storage only.** Reflection entries are stored in the device's AsyncStorage (or browser localStorage for web). They are never transmitted.
- **User-controlled deletion.** Any saved entry can be permanently deleted from the History screen at any time.

---

## 5. Design Risks and Mitigations

| Risk | How the prototype addresses it |
|------|-------------------------------|
| **App feels like surveillance or compliance** | Welcome screen explicitly states "It is not a compliance system." Result screen labels all categories as "Reflective guidance — not a rule or judgment." |
| **Users feel judged by the category** | Category colors are muted (green/orange/red tones, not bright alarm colors). Every category is always paired with non-judgmental guidance. The word "concern" was chosen over "risk" or "severity." |
| **Users paste sensitive research content** | The app has no free-text input fields for research content. Users select from predefined options. The privacy notice explicitly warns against entering sensitive material. |
| **Reflection logic produces unexpected or unfair results** | The scoring function is a pure, testable function. Thresholds are documented. The logic uses a simple additive model so users can reason about how their answers map to the category. |
| **App makes authoritative or legal claims** | All output language uses hedging ("may," "consider," "recommend discussing"). The app never says "you must," "this is a violation," or "this is acceptable." Disclosure drafts are explicitly labeled as starting points. |
| **History screen feels like an audit trail** | Labeled "Saved Reflections," not "Activity Log" or "Usage Record." Entries are fully deletable at any time with a single tap + confirmation. |
| **Categories are misinterpreted as rules** | Every category display includes the subtitle "Reflective guidance — not a rule or judgment." Guidance text for each category emphasizes personal judgment and conversation. |
| **App could be co-opted as a monitoring tool** | No network connectivity, no login, no way to export or share data programmatically. The app is structurally incapable of reporting to third parties. |

---

## 6. Reflection Category Scoring Logic

The app scores answers to 6 yes/no/maybe questions using a simple additive model:

- **Yes** = 2 points
- **Maybe** = 1 point
- **No** = 0 points

Question 5 ("Would you feel comfortable explaining this AI use to an advisor?") is **inverted**: answering "No" (not comfortable) adds 2 points, "Maybe" adds 1, and "Yes" adds 0.

| Total Score (0–12) | Category | Color |
|---------------------|----------|-------|
| 0 – 3 | Low Concern | Green |
| 4 – 7 | Medium Concern | Orange |
| 8 – 12 | High Concern | Red |

This model was chosen for transparency: users can reason about how their answers map to the output. The thresholds are deliberately conservative — a single "yes" on a sensitive question (e.g., q1: sensitive data) does not by itself produce a "High Concern" result.
