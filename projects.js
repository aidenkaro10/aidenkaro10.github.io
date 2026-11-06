/* ==========================================================
   ALL THE PROJECT DATA LIVES HERE.
   The site reads this file and builds the project list and
   the animated diagrams on its own.

   HOW TO ADD A PROJECT:
   1. Copy one whole { ... }, block (from { to },)
   2. Paste it where you want it in the list
   3. Change the text

   What each field means:
   - name, tag, year: shown at the top
   - status: "Live", "Hackathon", "On GitHub" or "In progress" (each gets its own color)
   - line: one short line for the list on the left
   - blurb: two or three sentences for the big panel
   - stats: big numbers. Each one is ["the number", "what it means"]. Optional.
   - steps: the animated diagram. Keep it to 5 steps or fewer.
       label = what happens (2 to 4 words)
       tool  = what does it
       say   = the sentence shown under the diagram while that step is lit
       many  = optional little chips inside a step (like 4 AI models)
   - video + poster: a short muted clip that loops, and the picture shown before it loads. Optional.
   - image: a screenshot, if there's no video. Optional.
   - mediaAlt: a sentence describing the video or picture, for screen readers
   - stack: the tech chips
   - live, code: links. Leave them out if there's no public link.
   ========================================================== */

window.PROJECTS = [
  {
    name: "LLM Council",
    tag: "Web app",
    year: "2026",
    status: "Live",
    line: "4 AIs answer, judge each other, and argue it out in 3D.",
    blurb: "Ask one question and four AI models answer it, then rank each other without knowing who wrote what. A chairman model writes one final verdict while the models argue it out in a 3D courtroom with voices and captions. Runs fully in your browser.",
    stats: [["4", "models per question"], ["~$0.07", "per question"], ["0", "servers"]],
    steps: [
      { label: "Ask a question", tool: "React", say: "You type one question into the app." },
      { label: "4 models answer", tool: "OpenRouter", many: ["GPT", "Claude", "Gemini", "Grok"], say: "OpenRouter sends it to 4 models at the same time." },
      { label: "Blind peer ranking", tool: "OpenRouter", say: "Each model ranks the others' answers without seeing names." },
      { label: "Chairman verdict", tool: "LLM judge", say: "A chairman model reads everything and writes one verdict." },
      { label: "3D courtroom", tool: "three.js", say: "The models argue it out in 3D with voices and captions." }
    ],
    stack: ["React", "Vite", "three.js", "OpenRouter", "Web Speech API", "Tailwind", "GitHub Actions"],
    image: "assets/llm-council.jpg",
    mediaAlt: "LLM Council: AI lawyers in a 3D courtroom, with the verdict panel on the left",
    live: "https://aidenkaro10.github.io/llm-council/",
    code: "https://github.com/aidenkaro10/llm-council"
  },
  {
    name: "Redline",
    tag: "SwampHacks XII hackathon",
    year: "2026",
    status: "3rd place",
    line: "A wristband that warns outdoor workers before they overheat.",
    blurb: "A custom wristband that predicts heat strain in outdoor workers before it happens. Neural nets forecast body temperature, a hazard model reads Florida weather and OSHA injury data, and a planning agent schedules the crew's day around the heat. If someone falls, it calls for help. Placed 3rd in the Sperry Tech PlanIT Control track.",
    stats: [["23%", "more accurate than the Army method"], ["88%", "of heat warnings caught, 17 min early"], ["729", "tests"]],
    steps: [
      { label: "Read the wristband", tool: "ESP32, BLE", say: "The wristband streams heart rate and detects falls over Bluetooth." },
      { label: "Estimate core temp", tool: "Kalman filter", say: "A Kalman filter turns heart rate into body temperature." },
      { label: "Forecast the heat", tool: "GRU ensemble", say: "Neural nets forecast body temperature, and a hazard model scores the weather risk." },
      { label: "Plan the shift", tool: "Planning agent", say: "A self-improving agent plans breaks. Claude is distilled into a local Qwen3 model so it runs offline." },
      { label: "Alert or call 911", tool: "ElevenLabs, Twilio", say: "Live alerts on the dashboard, and a voice agent calls if someone goes down." }
    ],
    stack: ["Python", "PyTorch", "scikit-learn", "ESP32 C++", "FastAPI", "Next.js", "Claude", "Qwen3 + LoRA", "Twilio"],
    video: "assets/media/redline.mp4",
    poster: "assets/media/redline.jpg",
    mediaAlt: "The Redline wristband on a worker's arm, zooming out to a job site with cranes and crews",
    code: "https://github.com/aidenkaro10/redline"
  },
  {
    name: "Study Brain",
    tag: "Web app",
    year: "2026",
    status: "In progress",
    line: "All your Canvas classes in one AI study app.",
    blurb: "Pulls all your Canvas courses into one place. You can chat with your class material, take quizzes made from your own lectures, plan your week, and see which topics you're weakest on.",
    stats: [["49", "API routes"], ["6", "study modes"], ["Daily", "Canvas sync"]],
    steps: [
      { label: "Sync Canvas", tool: "Chrome extension", say: "A Chrome extension pulls your courses from Canvas every day." },
      { label: "Read syllabus + notes", tool: "Claude, Gemini", say: "Claude reads the syllabus, and lectures become a course wiki." },
      { label: "Store it safely", tool: "Supabase", say: "Everything is saved in Supabase, locked to your account." },
      { label: "Chat, quiz, plan", tool: "Flask + Claude", say: "Chat, quiz and planner tabs all run on Claude." },
      { label: "Track weak spots", tool: "Calendar export", say: "It tracks weak topics and exports your plan to your calendar." }
    ],
    stack: ["Python", "Flask", "Claude API", "Gemini", "Supabase", "Chrome extension", "three.js", "Docker"]
  },
  {
    name: "Second Brain",
    tag: "AI tool",
    year: "2026",
    status: "On GitHub",
    line: "Text a bot anything. It becomes a wiki you can chat with.",
    blurb: "Send videos, screenshots, PDFs or voice memos to a Telegram bot. It breaks them down and builds a linked wiki of everything you've saved, and you can chat with it to pull up what you need.",
    stats: [["5", "content types"], ["15 min", "auto-update cycle"]],
    steps: [
      { label: "Send it anything", tool: "Telegram bot", say: "You send a video, screenshot, PDF or voice memo to the bot." },
      { label: "Download it", tool: "yt-dlp", say: "It grabs the file, even from a link." },
      { label: "Break it down", tool: "Gemini", say: "Gemini transcribes it and pulls out the key ideas." },
      { label: "Build the wiki", tool: "Claude", say: "Claude writes it into linked notes in your wiki." },
      { label: "Chat with notes", tool: "Flask", say: "Ask a question and it answers from your own notes." }
    ],
    stack: ["Python", "Flask", "Gemini", "Claude API", "yt-dlp", "Supabase", "Markdown"],
    code: "https://github.com/aidenkaro10/second-brain"
  },
  {
    name: "Internship Finder",
    tag: "Automation",
    year: "2026",
    status: "In progress",
    line: "Watches 1,000 job boards and emails you your best matches.",
    blurb: "Checks about 1,000 company job boards twice a day. Every new internship gets scored against the student from 1 to 10 and sorted into reach, target or safety. The best ones get emailed out the same day.",
    stats: [["~1,000", "job boards watched"], ["2x", "a day"], ["60+", "security tests"]],
    steps: [
      { label: "Find companies", tool: "Serper, GitHub", say: "It builds a list of about 1,000 companies that hire interns." },
      { label: "Check job boards", tool: "Greenhouse, Lever", say: "Twice a day, it checks every board for new postings." },
      { label: "Score the fit", tool: "Rules engine", say: "Each posting gets a 1 to 10 score and a reach, target or safety label." },
      { label: "Save + track", tool: "Supabase", say: "Matches are saved so nothing gets sent twice." },
      { label: "Email the best", tool: "Gmail", say: "Anything 7 or higher lands in your inbox." }
    ],
    stack: ["Python", "GitHub Actions", "Supabase", "React", "Tailwind", "GSAP", "Playwright"]
  },
  {
    name: "Intro Maker",
    tag: "Web app",
    year: "2026",
    status: "In progress",
    line: "Turns your clips into beat-synced reel intros.",
    blurb: "Upload your clips, pick a template, and it cuts them to the beat of the song. You get a 1080p reel intro, or a scrapbook-style YouTube thumbnail from your photos.",
    stats: [["11", "intro templates"], ["13", "thumbnail templates"], ["1080p", "export"]],
    steps: [
      { label: "Pick a template", tool: "Templates", say: "Pick one of 11 intro styles or 13 thumbnail styles." },
      { label: "Upload clips", tool: "Supabase", say: "Sign in and upload your clips. They auto-delete after 24 hours." },
      { label: "Sync to the beat", tool: "Beat detection", say: "It finds the song's beats and retimes every cut to hit them." },
      { label: "Live preview", tool: "Remotion", say: "You watch it play in the browser before rendering." },
      { label: "Render 1080p", tool: "Remotion server", say: "The server renders a 1080p video or a thumbnail." }
    ],
    stack: ["Next.js", "React", "Remotion", "three.js", "MediaPipe", "Supabase", "Docker"]
  },
  {
    name: "How a Founder Is Made",
    tag: "AI film, Israel edition",
    year: "2026",
    status: "Live",
    line: "An AI-made scroll film about becoming a founder in Israel.",
    blurb: "A scroll-driven film. You follow Omer or Shira from childhood to a startup in Tel Aviv. Every scene, voice and piece of music was made with AI, then stitched into a website you scroll through. Made with Guy Taylor.",
    stats: [["51", "AI video clips"], ["2", "story paths"], ["~10 min", "of narration"]],
    steps: [
      { label: "Research + script", tool: "Writing", say: "Research the story and write every scene." },
      { label: "Characters + frames", tool: "Nano Banana Pro", say: "AI draws character sheets and the first frame of each scene." },
      { label: "Make the video", tool: "Seedance 2.0", say: "Each frame becomes an 8-second AI video clip." },
      { label: "Voices + music", tool: "ElevenLabs", say: "ElevenLabs makes the narration, voices and music." },
      { label: "Scroll website", tool: "JavaScript", say: "It all plays as you scroll, with pencil-sketch reveals." }
    ],
    video: "assets/media/founder.mp4",
    poster: "assets/media/founder.jpg",
    mediaAlt: "Five scenes from the film: a kibbutz, army selection, a backpacking trip, a startup apartment, and a Tel Aviv office",
    stack: ["JavaScript", "HTML / CSS", "Python", "fal.ai", "ElevenLabs", "GitHub Pages"],
    live: "https://aidenkaro10.github.io/how-a-founder-is-made/",
    liveText: "Watch it",
    code: "https://github.com/aidenkaro10/how-a-founder-is-made"
  },
  {
    name: "Campus Tab",
    tag: "Chrome extension",
    year: "2026",
    status: "Live",
    line: "A new tab page in your school's colors, for any campus.",
    blurb: "A Chrome new tab page themed to your university. Your school's colors and campus photos, plus a clock, quick links, library and dining hours, and a focus timer. Works for over 2,000 US schools.",
    stats: [["2,349", "universities"], ["9", "widgets"]],
    steps: [
      { label: "Pick your school", tool: "School dataset", say: "Pick from 2,349 US universities." },
      { label: "Apply the theme", tool: "React", say: "The page switches to your school's colors and links." },
      { label: "Load campus photos", tool: "Wikimedia API", say: "It pulls real photos of your campus." },
      { label: "Add widgets", tool: "Chrome APIs", say: "Clock, bookmarks, hours and a focus timer show up." },
      { label: "Save settings", tool: "On-device", say: "Your settings stay on your computer." }
    ],
    image: "assets/media/campus-tab.jpg",
    mediaAlt: "Campus Tab's start page: a night skyline of a campus clock tower with a search box to find your university",
    stack: ["React", "TypeScript", "Vite", "Chrome Extension APIs", "Playwright"],
    live: "https://aidenkaro10.github.io/campus-tab/",
    code: "https://github.com/aidenkaro10/campus-tab"
  },
  {
    name: "Video Editor",
    tag: "Automation",
    year: "2026",
    status: "In progress",
    line: "Raw footage in, captioned video with graphics out.",
    blurb: "A command-line tool that takes raw talking-head footage and turns it into a finished video. It cuts the silences and retakes, adds graphics, and burns in word-by-word captions. I approve each stage before it moves on.",
    stats: [["7", "stages"], ["5", "approval checkpoints"]],
    steps: [
      { label: "Transcribe", tool: "Whisper", say: "Whisper writes out every word with timestamps." },
      { label: "Cut + clean audio", tool: "ffmpeg", say: "ffmpeg cuts silences and retakes, and evens out the volume." },
      { label: "Pick graphics", tool: "Python rules", say: "Each part of the script gets a matching graphic." },
      { label: "Render overlays", tool: "Hyperframes", say: "The graphics get rendered on top of the video." },
      { label: "Burn in captions", tool: "ffmpeg, PIL", say: "Word-by-word captions go on, and it exports." }
    ],
    stack: ["Python", "Whisper", "ffmpeg", "PIL", "Hyperframes"]
  }
];

/* Diagrams used elsewhere on the page (like Rekko in Experience).
   Same format as "steps" above. */
window.FLOWS = {
  rekko: [
    { label: "New client", tool: "Onboarding form", say: "A new home-service business signs up." },
    { label: "Scrape them + rivals", tool: "Firecrawl", say: "Firecrawl scrapes their site and their competitors' sites." },
    { label: "Build context", tool: "Claude, Supabase", say: "Claude turns it into context that every deliverable uses." },
    { label: "Run 12+ services", tool: "AI agents", many: ["Reviews", "GBP", "Schema", "Keywords"], say: "AI agents run reviews, Google posts, schema, keywords and more." },
    { label: "Show up first", tool: "Google, AI, Twilio", say: "The business ranks higher on Google and in AI answers." }
  ]
};
