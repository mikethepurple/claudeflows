# Instagram Reel Scripts — ClaudeFlows

---

## Reel 1: "Claude keeps lying to me"

**Duration:** 45 seconds

### HOOK (0-3s)
- **Screen:** Terminal showing Claude's response: *"The file config.yaml doesn't exist in this directory"*
- **Voiceover:** "Claude just told me this file doesn't exist."
- **Text overlay:** `Claude just lied to my face`

### BODY (3-40s)

**Beat 1 (3-8s)**
- **Screen:** Run `ls` — the file is right there. Highlight it.
- **Voiceover:** "It's right there. This happens constantly."
- **Text overlay:** `it's literally right there`

**Beat 2 (8-15s)**
- **Screen:** Open CLAUDE.md in the editor. It's empty or missing.
- **Voiceover:** "The problem isn't Claude. It's that you gave it zero rules."
- **Text overlay:** `no CLAUDE.md = no rules = hallucinations`

**Beat 3 (15-25s)**
- **Screen:** Type one rule into CLAUDE.md: `Verify before asserting absence. Before saying "X doesn't exist" — actually check. Read the file, list the directory.`
- **Voiceover:** "One line. That's it. Tell it to verify before claiming something's missing."
- **Text overlay:** `one rule in CLAUDE.md`

**Beat 4 (25-38s)**
- **Screen:** Same prompt again. This time Claude runs `ls` first, finds the file, reads it, gives correct answer.
- **Voiceover:** "Same question. Now it checks first. No more ghost files."
- **Text overlay:** `before: "doesn't exist" // after: reads it correctly`

**Beat 5 (38-40s)**
- **Screen:** Quick scroll through a full CLAUDE.md with 15+ rules.
- **Voiceover:** "I've got 30 of these rules. They change everything."
- **Text overlay:** `30 rules that fix 90% of Claude's problems`

### CTA (40-45s)
- **Screen:** ClaudeFlows site, dark mode.
- **Voiceover:** "Comment RULES and I'll send you the list."
- **Text overlay:** `comment RULES for the full list`

### RECORDING NOTES
1. Stage it: create a project where Claude actually hallucinates a file's absence (easy — just don't have a CLAUDE.md). Screen record the fail.
2. Add the rule, re-run, screen record the fix.
3. Quick scroll of the full CLAUDE.md at the end — make it look dense and real.

---

## Reel 2: "I mass-automated startup research"

**Duration:** 55 seconds

### HOOK (0-3s)
- **Screen:** Terminal. A wall of agent spawn messages appearing rapidly — `[agent-1] researching...`, `[agent-2] researching...` stacking up.
- **Voiceover:** "31 agents. Running at the same time."
- **Text overlay:** `31 AI agents launched simultaneously`

### BODY (3-50s)

**Beat 1 (3-10s)**
- **Screen:** Pull back to show the full terminal — agents spawning, each with a company name.
- **Voiceover:** "Each one is researching a different startup. Funding, team, traction, product — everything."
- **Text overlay:** `each agent: 1 startup // funding, team, traction, product`

**Beat 2 (10-18s)**
- **Screen:** Time-lapse of terminal output. Agents reporting back one by one. Results populating.
- **Voiceover:** "They run in parallel. No waiting. Results start hitting in under a minute."
- **Text overlay:** `parallel execution — results in 60 seconds`

**Beat 3 (18-28s)**
- **Screen:** Show the raw output — structured markdown files appearing in a directory. Open one. Clean data: company name, funding rounds, key metrics.
- **Voiceover:** "Each agent writes a structured report. Same format every time."
- **Text overlay:** `structured output — same schema, every company`

**Beat 4 (28-38s)**
- **Screen:** Show the synthesis step — a final agent reading all 31 reports, producing a ranked summary.
- **Voiceover:** "Then a synthesis agent reads all 31 and ranks them."
- **Text overlay:** `synthesis agent reads all 31 → ranked summary`

**Beat 5 (38-48s)**
- **Screen:** Final output: a clean table or ranked list. Scroll through it.
- **Voiceover:** "This used to take me two weeks. Calls, Crunchbase, LinkedIn. Now it's one command."
- **Text overlay:** `2 weeks of research → 1 terminal command`

### CTA (48-55s)
- **Screen:** The terminal command that kicked it all off.
- **Voiceover:** "Comment RESEARCH if you want to see how to set this up."
- **Text overlay:** `comment RESEARCH`

### RECORDING NOTES
1. Use the actual scout/venture-studio pipeline. Run a real batch — capture the terminal as agents spawn.
2. Time-lapse the middle (2-3x speed on the waiting/output phase).
3. Show real output files — don't mock them. The messiness of real data looks more credible than clean demos.
4. The money shot is the final ranked table. Make sure it's readable on mobile (zoom in).

---

## Reel 3: "My Claude Code setup takes 2 minutes"

**Duration:** 50 seconds

### HOOK (0-3s)
- **Screen:** Empty terminal. Fresh directory. Just a blinking cursor.
- **Voiceover:** "New project. Zero config. Watch this."
- **Text overlay:** `fresh project — nothing installed`

### BODY (3-45s)

**Beat 1 (3-10s)**
- **Screen:** Run `claudeflows install`. Skills start downloading/appearing in `.claude/skills/`.
- **Voiceover:** "One command. Skills install in seconds."
- **Text overlay:** `claudeflows install → skills loaded`

**Beat 2 (10-18s)**
- **Screen:** Show the `.claude/skills/` directory populating. Quick `ls` to show what landed — checkpoint, save, vibecheck, research, etc.
- **Voiceover:** "Checkpoint. Auto-save. Security audit. Research pipeline. All just showed up."
- **Text overlay:** `checkpoint // save // vibecheck // research // all installed`

**Beat 3 (18-28s)**
- **Screen:** Show the CLAUDE.md that got generated — scroll through it briefly.
- **Voiceover:** "It writes the CLAUDE.md too. Rules, project structure, memory — configured."
- **Text overlay:** `CLAUDE.md auto-generated — rules + memory + structure`

**Beat 4 (28-38s)**
- **Screen:** Run one skill — `/checkpoint`. Show it saving state, writing files.
- **Voiceover:** "Run a skill. This one saves your entire session state so Claude remembers everything next time."
- **Text overlay:** `run /checkpoint → session state saved`

**Beat 5 (38-45s)**
- **Screen:** Split: left side = the fresh empty folder from the start. Right side = the fully configured project now.
- **Voiceover:** "Two minutes. From nothing to a Claude Code setup that actually works."
- **Text overlay:** `before: empty folder // after: production-grade AI setup // 2 minutes`

### CTA (45-50s)
- **Screen:** ClaudeFlows site or terminal prompt.
- **Voiceover:** "Save this. You'll need it."
- **Text overlay:** `save this`

### RECORDING NOTES
1. Actually create a fresh folder and run through this. Real-time is fine for the install — it should be fast enough to not need speed-up.
2. The before/after split at the end is the payoff. Capture both states clearly.
3. Keep the terminal font large enough to read on mobile. If commands are too long, that's fine — people read the text overlays, not the terminal.

---

## Reel 4: "I built a full app in 4 hours"

**Duration:** 55 seconds

### HOOK (0-3s)
- **Screen:** `mkdir invention-companion && cd invention-companion`. Empty folder. Timestamp: 10:00 AM.
- **Voiceover:** "Empty folder. Four hours. Let's go."
- **Text overlay:** `10:00 AM — empty folder`

### BODY (3-48s)

**Beat 1 (3-12s)**
- **Screen:** Time-lapse of Claude Code building. Schema files appearing. Database tables being created. Supabase commands running.
- **Voiceover:** "Database, auth, storage — Claude Code sets up the backend while I describe what I want."
- **Text overlay:** `hour 1: database + auth + storage`

**Beat 2 (12-22s)**
- **Screen:** Time-lapse continues. Frontend components appearing. Pages rendering in a browser preview.
- **Voiceover:** "Frontend builds itself. I'm giving direction, not writing code."
- **Text overlay:** `hour 2: frontend — directing, not coding`

**Beat 3 (22-32s)**
- **Screen:** The AI features — photo upload, Claude analyzing an image, response appearing.
- **Voiceover:** "Hour three. AI vision. You upload a photo of something broken, it tells you what's wrong and how to fix it."
- **Text overlay:** `hour 3: AI vision — photo → diagnosis → fix`

**Beat 4 (32-40s)**
- **Screen:** Deploy command running. Vercel or similar. URL appearing. Timestamp: 2:00 PM.
- **Voiceover:** "Hour four. Deployed. Live URL. Real users can hit it."
- **Text overlay:** `hour 4: deployed to production // 2:00 PM`

**Beat 5 (40-48s)**
- **Screen:** The live app at app.erikov.me. Click through it — upload a photo, get a response, show the UI.
- **Voiceover:** "This is live right now. Built in one afternoon."
- **Text overlay:** `live at app.erikov.me — built in one afternoon`

### CTA (48-55s)
- **Screen:** Terminal showing the skills/setup that made it possible.
- **Voiceover:** "The setup that makes this possible — comment BUILD and I'll send it."
- **Text overlay:** `comment BUILD`

### RECORDING NOTES
1. This needs prep. Screen record a condensed version of the build — or pull from any existing recordings of the Invention Companion session.
2. Timestamps in the corner sell the speed. Add them in post if needed.
3. The live app walkthrough at the end must be smooth. Practice the click path: open app, upload photo, show response. 8 seconds max.
4. Don't fake the deploy. Show a real deploy command with a real URL. Authenticity is the whole point.

---

## Reel 5: "Stop doing this with Claude Code"

**Duration:** 55 seconds

### HOOK (0-3s)
- **Screen:** Someone typing a massive prompt into Claude Code with no CLAUDE.md, no skills, no memory. Raw terminal.
- **Voiceover:** "You're using Claude Code wrong."
- **Text overlay:** `you're using Claude Code wrong`

### BODY (3-48s)

**Beat 1 (3-10s)**
- **Screen:** Show the "wrong" setup — no CLAUDE.md file. Run `ls -la` to prove it's bare. Claude starts a task and immediately asks a question it should already know the answer to.
- **Voiceover:** "No CLAUDE.md. No memory. Every session starts from zero."
- **Text overlay:** `no CLAUDE.md // no memory // starts from zero every time`

**Beat 2 (10-18s)**
- **Screen:** Claude hallucinates a package name. Tries to install it. Fails. User has to correct it.
- **Voiceover:** "It hallucinates packages. Forgets decisions you made yesterday. Repeats mistakes."
- **Text overlay:** `hallucinated packages // forgotten decisions // repeated mistakes`

**Beat 3 (18-22s)**
- **Screen:** Hard cut. Black screen or terminal clear. Text: "Now watch."
- **Voiceover:** "Now watch."
- **Text overlay:** `now watch`

**Beat 4 (22-34s)**
- **Screen:** Same project but with CLAUDE.md, `.claude/skills/`, memory files. Quick tour: show the CLAUDE.md with rules, show skills directory, show a memory file with decisions from previous sessions.
- **Voiceover:** "Same project. CLAUDE.md with rules. Skills for common workflows. Memory so it remembers what you decided last Tuesday."
- **Text overlay:** `CLAUDE.md → rules // skills → workflows // memory → persistence`

**Beat 5 (34-45s)**
- **Screen:** Run the same task again. Claude checks before asserting. Uses a skill to automate a step. References a past decision from memory.
- **Voiceover:** "Same task. No hallucination. Automated the boring part. Remembered my decisions. Night and day."
- **Text overlay:** `no hallucination // automated steps // remembered past decisions`

**Beat 6 (45-48s)**
- **Screen:** Side by side — the bare setup vs. the configured one.
- **Voiceover:** "This is the difference."
- **Text overlay:** `bare Claude Code vs. configured Claude Code`

### CTA (48-55s)
- **Screen:** ClaudeFlows site.
- **Voiceover:** "Comment FLOWS for the setup guide."
- **Text overlay:** `comment FLOWS for the setup guide`

### RECORDING NOTES
1. Record the "wrong" way first. It's easy — just use Claude Code in a bare folder. Let it fail naturally.
2. Then set up the same folder properly and re-run. The contrast should be obvious without any exaggeration.
3. The side-by-side at the end can be done in post (CapCut split screen) or just a quick cut between the two terminals.
4. Key: both recordings should use the same prompt/task so the comparison is apples-to-apples. Something like "add a rate limiter to this API" works well — it's a task where Claude commonly suggests nonexistent packages.
