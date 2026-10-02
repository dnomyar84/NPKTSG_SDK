#!/usr/bin/env python3
"""Build story.js and STORY.md from the panel script."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
panels = []


def add(page, scene, expressions, *lines):
    dialogue = []
    for line in lines:
        who, text = line.split("|", 1)
        dialogue.append({"who": who, "line": text})
    n = len(panels) + 1
    art = f"art/panel-{n:03d}.jpg" if n <= 36 else None
    panels.append({
        "n": n,
        "page": page,
        "scene": scene,
        "expressions": expressions,
        "dialogue": dialogue,
        "art": art,
    })


# Page 1 — The Clock Shop
add(1,
    "A narrow seaside clock shop at sunrise. Brass clocks cover the walls. Sun comes through a wavy window. An orange cat sleeps on a stool. Lila peeks from the stair door. Grandad winds a tall clock.",
    "Lila looks sleepy and curious. Grandad looks content and calm. The cat is fast asleep.",
    "Lila|The big clock is humming.",
    "Grandad|Clocks do that when the day is ready.")
add(1,
    "The small kitchen behind the shop. Two bowls of porridge, a blue teapot, and toast cooling on a rack.",
    "Lila smiles with a milk mustache. Grandad chuckles.",
    "Grandad|Eat first. Wonders can wait.",
    "Lila|What if the wonder is in the porridge?")
add(1,
    "Lila's spoon lifts a tiny warm glow, like a firefly, out of the porridge. The glow fades.",
    "Lila's eyes go wide with delight, not fear. Grandad's eyebrows rise, then he gives a small knowing smile.",
    "Lila|It winked at me.",
    "Grandad|Then wink back, and finish your bowl.")
add(1,
    "Lila sits on a stool at the shop counter, feet swinging, dusting a tiny clock shaped like a boat.",
    "She concentrates, tongue peeking out, then looks proud.",
    "Lila|This one ticks like rain.")
add(1,
    "Lila stands in the shop doorway. The ordinary street has a bakery, a bicycle, gulls, and laundry. Children walk to school with satchels.",
    "Lila looks thoughtful and a little lonely.",
    "Lila|Everyone else has a bell that tells them where to go.")
add(1,
    "Grandad rests a hand on Lila's shoulder. They look toward the sea at the end of the street.",
    "Grandad looks tender. Lila leans into him.",
    "Grandad|Your bell is just a quiet one. Quiet bells still call.")

# Page 2 — Small Glows
add(2,
    "The garden behind the shop. Rain falls up out of a puddle for a moment, then down again.",
    "Lila kneels, mouth open in a happy O. The cat sits nearby, unbothered.",
    "Lila|Grandad! The rain forgot which way is down.")
add(2,
    "Grandad stands in the doorway with a towel. The last drop falls upward and pops into a spark.",
    "Grandad looks calm, fond, and a little wistful.",
    "Grandad|It remembers you. That is all.")
add(2,
    "Lila cups the spark. It sits in her palms like a warm marble of light.",
    "Her face shows wonder. Her hands are careful. Her eyes shine.",
    "Lila|It feels like a secret that likes me.")
add(2,
    "The spark hops onto a drooping potted daisy, and the daisy stands up.",
    "Lila is delighted. Grandad watches from the step, eyes shiny.",
    "Grandad|You mended it by wanting it well. That is wick-magic.")
add(2,
    "Grandad and Lila sit together on the step. The spark rests between them.",
    "Grandad looks serious but kind. Lila listens hard.",
    "Grandad|Hearthfolk live in towns like ours. Wickfolk live where small lights are ordinary.")
add(2,
    "Lila points at her chest. A faint warm glow shows under her open raincoat.",
    "Lila looks hopeful. Grandad nods once.",
    "Lila|Am I both?",
    "Grandad|You are Lila. And yes. You are invited, if you want to go.")

# Page 3 — The Swallow Letter
add(3,
    "A paper kite shaped like a swallow flies against the wind toward the shop. A cream letter is tied to its tail. A few townspeople look up.",
    "The townspeople look mildly confused. Lila bounces, thrilled.",
    "Lila|It is coming to our door on purpose!")
add(3,
    "The kite lands neatly on the counter. The letter unfolds by itself like a flower. The words are simple and large.",
    "Lila looks reverent. Grandad's hands hover, respectful, not grabbing.",
    "Letter|Lila Moss, the Lantern Line stops at the clock tower tonight. A seat is warmed for you.")
add(3,
    "Lila reads the letter, finger under the words.",
    "Her lips move as she concentrates, then she breaks into a huge grin.",
    "Lila|A seat. Warmed. For me.")
add(3,
    "Grandad opens a tin on a high shelf. Inside is his own old paper swallow, faded and folded flat.",
    "Grandad looks nostalgic, with a soft smile. Lila looks surprised and proud of him.",
    "Grandad|Mine came when I was seven too. I learned to listen to weather. Then I came home to fix clocks.")
add(3,
    "Lila hugs Grandad around the middle in the shop.",
    "Lila looks brave, with a little fear underneath. Grandad is steady, arms around her.",
    "Lila|Will I come home?",
    "Grandad|At leaf-turn. And letters can fly both ways.")
add(3,
    "Lila packs a small bag on her bed: her red scarf, a clock key, a sandwich, and a drawing of Grandad and the cat.",
    "She looks determined, sniffs once, then smiles at the drawing.",
    "Lila|I will tell the school about you, Biscuit.")

# Page 4 — The Moon Door
add(4,
    "Dusk on the street. Lila wears her yellow raincoat and red scarf. Grandad carries an ordinary oil lantern. They pass the bakery.",
    "The baker waves, curious. Lila waves back, excited. Grandad looks peaceful.",
    "Baker|Night fishing?",
    "Grandad|Something like fishing. We are catching a train.")
add(4,
    "They pass the ordinary school. The building is dark and quiet.",
    "Lila glances at it, noticing, not sad. Grandad looks at her with pride.",
    "Lila|Their bell is asleep.",
    "Grandad|Yours is waking.")
add(4,
    "The town clock tower stands at the end of the harbor. The moon rises behind it. Gulls settle.",
    "Lila looks small and awed. The lantern lights both their faces warm.",
    "Lila|It looks taller tonight.")
add(4,
    "Close on the clock face. A moon is painted near the center. Both clock hands slide until they rest together across that moon.",
    "Lila holds her breath, eyes huge. Grandad counts softly, calm.",
    "Grandad|When both hands rest on the moon, the door remembers.")
add(4,
    "A round, child-height wooden door draws itself in soft light on the tower stones. The handle is shaped like a star.",
    "Lila reaches, hesitant and then brave. Grandad kneels so they are the same height.",
    "Lila|Do I knock?",
    "Grandad|You may. It already knows your name.")
add(4,
    "Lila knocks. The door opens onto warm green light and the smell of wet ferns. Grandad stays outside.",
    "Lila looks back, eyes wet and brave. Grandad smiles and raises one hand in a still wave.",
    "Grandad|I will be at this moon again at leaf-turn.",
    "Lila|I will bring you a story.")

# Page 5 — The Fern Platform
add(5,
    "Inside the tower is a small platform of ferns and wood. Lanterns hang from roots. A track is not there yet.",
    "Lila steps in. Wonder replaces the fear. Her shoulders drop.",
    "Lila|It smells like rain and toast.")
add(5,
    "Conductor Bramble stands by a little gate in a moss-green patched coat and a cap with a tiny lantern. He holds a ticket punch.",
    "Bramble's eyes crinkle in welcome. Lila is shy, then grins.",
    "Bramble|Lila Moss. I kept your seat away from the draft.",
    "Lila|Thank you. I am seven.")
add(5,
    "Bramble punches a star-shaped hole in a honey-colored ticket and hands it to Lila.",
    "Lila studies the ticket like treasure. Bramble looks proud of his punch.",
    "Bramble|A star-hole means you may ride, and you may ask questions.")
add(5,
    "A few other children step out of small round doors of different colors in the tower wall.",
    "Some children look nervous and some bounce. Lila lifts a small hello.",
    "Lila|Hello. I am new too, if you are new.")
add(5,
    "Pip Quinn skids in. Marbles spill. One marble rolls uphill back into his hand.",
    "Pip looks embarrassed, then delighted. Lila laughs kindly.",
    "Pip|They do that when I am late.",
    "Lila|Then they are good marbles.")
add(5,
    "Sera Voss steps through a blue door, braid over her shoulder, holding a sprig that leans toward Lila.",
    "Sera gives a quiet small smile. Lila looks curious and gentle.",
    "Sera|The sprig likes your coat.",
    "Lila|My coat likes your sprig.")

# Page 6 — All Aboard
add(6,
    "A whistle like a kettle sounds. A short tram arrives: three carriages like greenhouses, lanterns at the corners, no smoke. Glowing bricks appear under the wheels.",
    "Lila, Pip, and Sera are lit gold, mouths open in joy. Bramble looks pleased.",
    "Bramble|Greenhouse cars. Mind the leaves. They like to wave.")
add(6,
    "They climb aboard. The seats are wooden benches with blankets. Tomato vines and ferns grow along the windows.",
    "Pip bounces once, then sits on his hands to be polite. Sera is careful. Lila pats a fern hello.",
    "Pip|Are we allowed to be this happy?",
    "Lila|I think that is the ticket.")
add(6,
    "The tram rolls out of the tower onto a low bridge of fog over the night sea. The town lights behind them look small and dear.",
    "Lila presses her face softly to the glass. She misses Grandad and is still excited. She wipes one tear and smiles.",
    "Lila|Goodnight, clock shop.")
add(6,
    "Inside the carriage, Pip offers a marble, Sera offers a bite of pear, and Lila breaks her sandwich into three.",
    "All three look shy, then easy. A friendship is starting.",
    "Lila|Sharing makes it taste bigger.",
    "Sera|That is true at my house too.")
add(6,
    "A corner lantern flickers and goes dim. The ferns droop a little.",
    "Bramble's smile slips into a worry he tries to hide. The children notice. Lila looks alert and caring.",
    "Bramble|Do not fret. The lamps are only thirsty.",
    "Lila|Thirsty for what?")
add(6,
    "Through the front glass, a small stone schoolhouse sits on a sea cliff among apple trees. Some branches wear frost and pink blossom at the same time. The tram lanterns glow weaker.",
    "The children look awed and a little uneasy. Bramble looks kind but concerned. Lila lifts her chin, ready.",
    "Bramble|That is Wickermere. The Season Bell should have lit our lamps by now.",
    "Lila|Then we will go and listen to it.")

# Page 7 — The Mixed-up Trees
add(7,
    "The tram stops at a wooden gate in a stone wall. Beyond it, apple trees hold blossom and frost together. A path of round stones leads in.",
    "Lila steps down, brave. Pip clutches his satchel. Sera breathes in, calm.",
    "Pip|It is pretty and a bit mixed up.",
    "Sera|The trees cannot pick a season.")
add(7,
    "Miss Wren waits at the gate in a teal dress, her hair in a bun. Her lantern is steady, unlike the tram's.",
    "Miss Wren's smile is warm and steady. The children look up.",
    "Miss Wren|I am Miss Wren. You are safe, and you are wanted.")
add(7,
    "Miss Wren kneels to their height and looks at the dim lantern in Bramble's hands.",
    "Miss Wren is concerned, not afraid. Bramble looks as if the train has let someone down. Lila watches them both.",
    "Miss Wren|The bell has been quiet for three days.",
    "Bramble|The Line feels it.")
add(7,
    "Close on one branch: an apple blossom, a tiny green apple, and frost crystals, all together.",
    "Lila's finger stays back, respectful. Her face is thoughtful.",
    "Lila|The tree is trying to be every day at once. That seems tiring.")
add(7,
    "Miss Wren nods, still kneeling by the branch.",
    "Miss Wren's eyes are kind and bright. Lila looks a little shy at being right.",
    "Miss Wren|That is a good way to say it. Tired trees need a gentle bell, not a loud one.")
add(7,
    "The children walk the stone path. A grey cat with a silent bell on its collar leads them. The schoolhouse windows are warm.",
    "Pip whispers to the cat. Sera smiles. Lila says hello the way she does at home.",
    "Pip|Even the cat bell is shy.",
    "Miss Wren|Old Pell wrapped the big bell. He was trying to help.")

# Page 8 — Lamp, Loaf, Leaf, Lore
add(8,
    "A round wooden hall. Four circles are painted on the floor: a lamp, a loaf, a leaf, and an open book. Children already there sit where they like, mixed together.",
    "The new children look curious. The older children, still young, smile welcomes.",
    "Miss Wren|You may stand in lamp, loaf, leaf, or lore. You may move tomorrow if you wish.")
add(8,
    "Pip stands on the loaf circle. Sera stands on the leaf circle. Lila stands between them, not chosen yet.",
    "Pip looks proud and hungry for the idea. Sera looks peaceful. Lila thinks, finger on her chin.",
    "Pip|Loaf. I am very good at second helpings.",
    "Sera|Leaf. The sprig told me to.")
add(8,
    "Lila steps onto the lamp circle. Her palms give a small warm glow that fades.",
    "She looks surprised at herself, then pleased. Miss Wren nods.",
    "Lila|Lamp. I want to learn why lights go thirsty.")
add(8,
    "A welcome supper at long tables: apple slices, bread, and milk. Children talk. Lila holds up her ticket.",
    "Mouths are full. Faces are polite and happy.",
    "Lila|The hole is a star so we may ask questions.",
    "Pip|I have nine questions and one spare.")
add(8,
    "A night loft with three small beds and blankets in lamp-gold, loaf-brown, and leaf-green. The window shows the mixed orchard under the moon.",
    "They are in pajamas and sleepy. Lila sits up. Pip is already a lump. Sera brushes her braid.",
    "Sera|Do you miss someone?",
    "Lila|Grandad. And Biscuit the cat. I can miss them and still like it here.")
add(8,
    "Lila stands at the loft window. Far off, the bell arch on the cliff is dark. A cloth-wrapped shape hangs inside it.",
    "Lila's face is determined and soft, like a promise, not a sneaky plan.",
    "Lila|Tomorrow we listen. We do not poke a tired thing.")

# Page 9 — The Wrapped Bell
add(9,
    "Morning mist on the cliff path. Miss Wren hands Lila a small unlit loan-lamp. Pip and Sera carry a basket.",
    "Miss Wren looks trusting. Lila holds the lamp carefully. Pip and Sera look ready.",
    "Miss Wren|Look, and be kind. If Pell is gruff, it is because he is worried, not because he is unkind.")
add(9,
    "The bell arch. A large bronze bell is wrapped in many knitted scarves. Old Pell sits on a stool with arms folded.",
    "Pell's eyes are tired. His mouth is soft even while he tries to look firm. The children are polite, not scared.",
    "Pell|No poking. It has a crack. I will not let the sea wind make it worse.")
add(9,
    "Lila does not touch the bell. She sits on the ground so she is lower than Pell and looks up.",
    "Lila looks respectful. Pell's shoulders drop a little.",
    "Lila|My grandad wraps clocks when they are scared of dust. May we just look?")
add(9,
    "Pell sighs and lifts the edge of one scarf. Under it, a dark line shows on the bronze.",
    "Pell's face crumples with care. The children lean in, concerned.",
    "Pell|There. A crack. If it rings, I fear it will split.")
add(9,
    "Sera tilts her head. The line is perfectly straight and ends in a tiny painted leaf.",
    "Sera looks thoughtful, almost smiling. Pell looks confused. Pip squints.",
    "Sera|Cracks are wiggly. This line is tidy. It has a leaf at the end.")
add(9,
    "Lila points, still not touching. The painted leaf is clear at the end of the line.",
    "Lila looks certain and gentle. Pell looks startled. Hope fights with worry on his face.",
    "Lila|That is a lesson mark. Someone painted it. The bell is not broken.")

# Page 10 — Not a Crack
add(10,
    "Pell sits down hard on the stool, scarves in his lap.",
    "Pell's eyes are wet, and he wears a small embarrassed smile. The children do not laugh at him. Pip's hand rests on Pell's sleeve.",
    "Pell|I hid a well bell. I am sorry.",
    "Pip|You were brave to guard it. Even if it did not need a guard.")
add(10,
    "They unwrap the bell together and fold the scarves neatly. The bronze is whole and dull, not glowing.",
    "Careful hands. Teamwork faces. Pell looks grateful.",
    "Sera|It is quiet, but it is whole.")
add(10,
    "Lila holds up the loan-lamp and wishes hard. It does not light.",
    "Lila puffs her cheeks in frustration, then lets the puff go. The others wait.",
    "Lila|Wishing loud is not the same as mending.")
add(10,
    "Pip taps the bell very softly with a marble. It makes a clunk and does not ring.",
    "Pip winces, sorry. Pell shakes his head, not angry.",
    "Pip|Sorry. Marbles are not music.",
    "Pell|No harm. It does not want noise.")
add(10,
    "Miss Wren arrives with a tray of tea and sits on the low wall, as if she knew they would be here.",
    "Miss Wren looks calm and proud that they asked. The children look to her.",
    "Miss Wren|The Season Bell rings when a true small kindness happens beside it. Not a show. A real one.")
add(10,
    "Pell, Miss Wren, and the three children look at one another. Lila's eyes move to Pip's satchel.",
    "They look thoughtful and a little stuck, then a small idea starts.",
    "Lila|Then we should not perform. We should notice who needs a small true thing.")

# Page 11 — Three True Things
add(11,
    "On the path, a tiny student about six searches the grass, upset.",
    "The small child is near tears. Pip's jokey face turns serious and kind.",
    "Tiny student|My blue marble. It finds me when I am lost. Now it is lost.")
add(11,
    "Pip kneels, opens his tin, and holds out his favorite blue marble.",
    "Pip's smile is wobbly but real. He is giving something he loves. The tiny student's face lights up.",
    "Pip|This one rolls home. It can be yours. I have others.")
add(11,
    "The marble rolls from Pip's palm into the child's hand by itself.",
    "Both children laugh. Lila and Sera watch with soft eyes.",
    "Tiny student|It likes you still.",
    "Pip|It can like us both.")
add(11,
    "Sera kneels by a frost-burned seedling. Its leaves are curled.",
    "Sera looks tender and whispers. The leaves turn toward her.",
    "Sera|You do not have to bloom and freeze today. Just be a small green thing.")
add(11,
    "Sera loosens the blue thread from her braid, ties a tiny wind shield, and pours a sip of her water on the roots.",
    "Sera is focused and gentle. Her braid is a little messy. The seedling stands up a fraction.",
    "Sera|There. A sip and a scarf. Same as Pell, but smaller.")
add(11,
    "Lila breaks the last of her home sandwich and gives half to Pell, who forgot breakfast.",
    "Pell looks surprised and moved. Lila is matter-of-fact, not proud of herself.",
    "Lila|Grandad says worry is hungry. This has butter.",
    "Pell|It tastes like a hearth.")

# Page 12 — The Bell Remembers
add(12,
    "The three kindnesses happened away from the bell. The children walk back along the cliff. The sky is ordinary.",
    "They look hopeful, not like they expect fireworks. Their faces are quiet.",
    "Lila|If it did not see us, that is all right. The kindness still happened.")
add(12,
    "At the arch, the unwrapped bell gives a thin warm sound, like a spoon on a cup.",
    "Everyone goes still. Eyes widen. Smiles grow slowly. Pell's hand covers his mouth.",
    "Pell|It heard anyway.")
add(12,
    "A thread of gold light travels from the bell down the cliff path and into the tram lanterns. Each lantern pops awake. Bramble, small in the distance, throws his cap in the air.",
    "The children cheer quietly, as if not to scare the light.",
    "Bramble|They are drinking! The lamps are drinking!")
add(12,
    "The orchard seems to breathe out. Frost melts into dew. Blossoms settle into a few early apples. The season becomes early autumn.",
    "The trees look restful. The children laugh and spin once. Miss Wren's eyes close, content.",
    "Miss Wren|Early autumn. A fine season for beginners.")
add(12,
    "Supper in the hall: apple tarts, bread, and pears. Pell gets the first slice and looks shy. Pip gets the second and does not look shy.",
    "Crumbs, joy, and belonging. A faint happy glow shows in Lila's palms.",
    "Pip|Second helpings are a kind of kindness.",
    "Miss Wren|Sometimes.")
add(12,
    "Night in the loft. Lila folds a new paper swallow at the desk by the window and whispers to it.",
    "She misses Grandad and looks peaceful. The paper bird is bright and friendly, not eerie.",
    "Lila|Tell him I am warm. Tell him the bell was only waiting. Tell Biscuit I said goodnight.")

# Page 13 — Letters Both Ways
add(13,
    "Dawn at the loft window. The paper swallow lifts and flies toward the sea town.",
    "Lila waves with both hands. Sera and Pip stand sleepy and supportive in the doorway.",
    "Sera|Will it find one clock shop in a whole town?",
    "Lila|It found me. It can find him.")
add(13,
    "The clock shop door opens. The swallow lands on the counter. Biscuit the cat sniffs it.",
    "Grandad's face crumples into a glad smile. His eyes are wet. The cat looks unimpressed and loving.",
    "Grandad|There you are, story.")
add(13,
    "Grandad reads, finger under the simple words. He reaches the line about butter.",
    "He laughs softly and looks proud.",
    "Grandad|She gave the butter away. Good.")
add(13,
    "Grandad writes back on the same paper in careful big letters and tucks a tiny decorative clock gear into the fold.",
    "He concentrates, tongue peeking out the way Lila does. The look is love.",
    "Grandad|I will write small words so the wind does not have to carry heavy ones.")
add(13,
    "Lunchtime at Wickermere. The swallow returns. Lila reads on the school steps.",
    "Lila beams and hugs the letter. Pip and Sera lean in, invited.",
    "Letter|The shop is fine. Biscuit sleeps on your stool. I am proud. Eat your greens and your wonders.")
add(13,
    "Lila shows them the tiny gear. Pip holds a marble beside it. They do not match, and nobody minds.",
    "Friendship looks easy. Lila looks grateful.",
    "Lila|Home can fit in a paper bird.",
    "Pip|And in a pocket.")

# Page 14 — Small Lessons
add(14,
    "A round lesson room of unlit candles. Miss Wren stands in the middle.",
    "Children concentrate. Some candles flicker. Lila's candle stays steady.",
    "Miss Wren|Light likes honesty. It does not like showing off.")
add(14,
    "Lila's candle glows. She is thinking of the porridge spoon that winked.",
    "Lila looks serene, with a small smile. The candle flame is warm.",
    "Lila|I am thinking of a spoon that winked.")
add(14,
    "Pip's candle sputters. A thought-bubble of tarts is not needed; his face tells it.",
    "Pip looks sheepish and grinning. The class shares a kind giggle, not a mean one.",
    "Pip|I was honest about tarts. The candle is being fussy.")
add(14,
    "Outdoors, Sera listens with her ear near apple-tree bark. The others stay quiet.",
    "Sera is focused and respectful.",
    "Sera|It says thank you for picking one season. It was very busy being three.")
add(14,
    "A loaf lesson at a floured table. Pip's dough is fine. Another child's dough is too dry. Pip pushes his dough over so they can squash the two together.",
    "Pip has flour on his nose and looks generous. The other child looks relieved.",
    "Pip|We can squish them together. That is a recipe called friends.")
add(14,
    "An old picture book lies open. The painted leaf mark is shown as a teacher's underline meaning the bell is whole. Pell stands in the doorway.",
    "Pell laughs at himself kindly, hand on his heart. The children show him the page.",
    "Pell|I guarded an underline.",
    "Lila|You guarded what you loved. Next time we will read first.")

# Page 15 — A Lamp Far Away
add(15,
    "Evening on the cliff. The school lanterns are bright. Far down the coast, one lonely tower lamp flickers.",
    "Lila spots it, brow pinched with care. Sera follows her gaze.",
    "Lila|That one is thirsty too.")
add(15,
    "Bramble lets them look through a spyglass. The far lamp sits on a ruined jetty with no houses.",
    "Bramble looks thoughtful, not alarmed. The children look serious.",
    "Bramble|That is the Old Turn. There was a little bell there once. Fishers used it in fog.")
add(15,
    "Miss Wren joins them with a shawl. She does not shut the wonder down. They stand together looking along the coast.",
    "Miss Wren looks open and careful. Lila asks with her whole face.",
    "Lila|Is it another Season Bell?",
    "Miss Wren|A cousin bell. Smaller. It called boats home.")
add(15,
    "Lila looks at her palms. They glow faintly when she thinks of the far lamp. Miss Wren kneels.",
    "Lila looks called, not burdened. She is seven, and the adult meets her there.",
    "Miss Wren|Not tonight. You are new. The far bell can wait until you know your way back to breakfast.")
add(15,
    "Lila nods. Pip looks relieved. Sera is already planning in a kind way.",
    "Lila accepts peacefully. She is a child who will help later, with friends and with adults.",
    "Lila|All right. Breakfast first. Wonders second.",
    "Sera|We can pack water for a seedling if we go one day.")
add(15,
    "They hang the loan-lamp back on its peg. It glows steadily in a row of student lamps.",
    "Lila's shoulders are easy. She looks like she belongs.",
    "Lila|Our lamps are full.",
    "Pip|Like me.")

# Page 16 — Ask the Wind
add(16,
    "A gentle storm drill in the orchard. Clouds practice a rumble. Children hum low to ask the weather to slow down.",
    "They look playful and focused. Hair lifts a little. Nobody is scared.",
    "Miss Wren|We do not fight weather. We ask it to take its time.")
add(16,
    "Lila hums. The wind slows enough to set a fallen flower back on a step.",
    "Lila looks quietly proud. The flower rests.",
    "Lila|Take your time, wind.")
add(16,
    "Pip's hum is off-key. A gust steals his cap and drops it onto Sera's head, over her glasses.",
    "Pip laughs. Sera looks dignified, then laughs.",
    "Sera|Your note is silly. The wind agrees.",
    "Pip|It has taste.")
add(16,
    "Pell shows the knitted scarves used now as tiny wind shields for seedlings. Children help tie them.",
    "Pell looks useful and happy, no longer ashamed.",
    "Pell|A scarf can guard a true small thing. I learned the size.")
add(16,
    "Soft rain falls downward only. Lila holds out a hand to check.",
    "She remembers the upward rain at home and smiles.",
    "Lila|This rain remembers the way. Good.")
add(16,
    "They run to the hall through puddles, joyful, not panicked. One drop hops up and taps Lila's nose, then falls properly.",
    "Lila goes cross-eyed at the drop and giggles. Her friends are around her.",
    "Lila|Hello, drop.")

# Page 17 — A Visit of Light
add(17,
    "Night in the loft. A shape of lamplight like a cat settles on the windowsill. It is a visit made of light, not a spooky ghost.",
    "Lila wakes delighted and whispers. She is not afraid.",
    "Lila|Biscuit? You are made of light. Grandad must be thinking of me.")
add(17,
    "The light-cat kneads the blanket and settles by Lila's feet. Sera is awake in the next bed.",
    "Lila looks blissful, eyes closing. Sera smiles secretly and does not interrupt.",
    "Sera|I see it too. I will not tell the morning unless you want.")
add(17,
    "Morning. The light-cat is gone. A warm dent remains in the blanket. Pip stares at it.",
    "Lila looks wondering and happy. Pip looks impressed.",
    "Pip|Your cat travels fancy.",
    "Lila|Only when I am very missed, I think.")
add(17,
    "Breakfast table. Lila tells Miss Wren. Miss Wren listens without waving it away.",
    "Miss Wren looks interested and respectful.",
    "Miss Wren|Hearth-love can walk a long way if a bell is awake. It does not stay. It visits.")
add(17,
    "Lila writes in a big-letter notebook: Love can visit.",
    "She forms her letters carefully, tongue out, a determined student.",
    "Lila|I want to remember the true rules, not the scary guesses.")
add(17,
    "She closes the notebook. The cover shows a child's drawing of a bell, a tram, a cat, and Grandad's glasses.",
    "She looks satisfied. There is a smudge of ink on her nose.",
    "Lila|Book one of me.")

# Page 18 — A Button and a Bun
add(18,
    "Bramble's birthday. The tram is parked at the gate with paper leaves in the bright lamps. The children hide a bun behind their backs, badly.",
    "Bramble pretends he forgot, eyes twinkling.",
    "Bramble|What a normal day with no buns.",
    "Pip|You can smell it. We are bad at secrets.")
add(18,
    "They give Bramble a bun and a new brass button sewn with Sera's help.",
    "Bramble is moved. His mustache wobbles. The children look proud.",
    "Bramble|A button and a bun. I am wealthy.")
add(18,
    "Each child pulls the kettle-whistle once. Lila's note is gentle. Pip's note is huge.",
    "Joy. Hands over ears. Laughing.",
    "Lila|Sorry, gulls.")
add(18,
    "A gull flies back and drops Pip's stolen crumb on his head.",
    "Pip looks dignified in defeat. Everyone laughs with him.",
    "Pip|The gull heard my whistle as a dinner bell.")
add(18,
    "They stand still so Miss Wren can draw them in a sketchbook. Their frozen smiles break into real ones.",
    "Miss Wren looks amused and fond.",
    "Miss Wren|Hold still.",
    "Lila|My smile is slipping.",
    "Miss Wren|Let it slip. True is better.")
add(18,
    "The finished sketch shows the three children, Bramble, and a tiny Grandad in the corner because Lila asked.",
    "Lila is touched and hugs Miss Wren's arm.",
    "Lila|Thank you for putting him in the picture.",
    "Miss Wren|He is part of your light.")

# Page 19 — A Small Light Is Enough
add(19,
    "Lesson room. Lila cannot light her candle. She sets it down carefully anyway.",
    "She is frustrated, with watery eyes. This is a real sad, not a tantrum.",
    "Lila|I cannot find the spoon-memory. It keeps turning into the empty stool.")
add(19,
    "Lila sits under a settled apple tree, knees up.",
    "She looks small and quietly sad. The tree looks calm.",
    "Lila|I like it here. I also want my grandad's stairs.")
add(19,
    "Sera sits on one side of Lila and offers the sprig. Pip sits on the other and offers a marble, with no joke yet.",
    "The friends are patient. Lila leans a little toward Sera.",
    "Sera|You can want both. Wanting both is not a crack.")
add(19,
    "Pip tells the truth about his own goodbye.",
    "Pip's ears are red. He looks honest. Lila looks less alone.",
    "Pip|I waved at my mum until my arm hurt. Then I pretended I was fine. I was not fine yet. I am more fine now.")
add(19,
    "Lila breathes. A tiny glow appears in her palm without the candle.",
    "Relief and a soft smile. A little sadness is still allowed to stay.",
    "Lila|There. A small light. It does not have to be a big one today.")
add(19,
    "They stay under the tree. Far away, the bell gives one tiny spoon-ring.",
    "All three look toward the arch, surprised and comforted.",
    "Lila|It heard a sad kindness too. Staying with someone is a kindness.")

# Page 20 — The Apology Tart
add(20,
    "Pell holds a lopsided tart with both hands, ready to flee if this was a bad idea. The children stand by the bell.",
    "Pell looks awkward and hopeful. The children look encouraging.",
    "Pell|Bells do not eat. I know. It is for the people who listen.")
add(20,
    "They eat under the bell. Pell tells how he came to Wickermere long ago and was afraid of breaking things.",
    "Pell looks younger in his eyes as he tells it. The children rest their chins on their hands.",
    "Pell|I held cups with two hands for a year. My teacher told me the cups liked careful people.")
add(20,
    "Lila gives Pell the tiny gear Grandad sent, as a loan, to hang in the bell arch.",
    "Lila looks generous. Pell looks honored and careful.",
    "Lila|It is a gift from a clock man. It means a thing can tick even if someone worried.",
    "Pell|I will keep it safe and give it back at leaf-turn.")
add(20,
    "The gear spins once in the wind. The bell answers with a bright clear note.",
    "Everyone jumps, then laughs. Pell wipes a happy tear with a scarf.",
    "Pip|That note was a thank-you.",
    "Sera|And a yes.")
add(20,
    "At a table they paint a new tiny leaf mark in the lesson book, next to the old one, meaning they checked and the bell is whole.",
    "Paint on fingers. Concentrating teamwork faces.",
    "Lila|Future children should not have to guess.")
add(20,
    "Pell hangs the scarves on a line under the apple branches, a row of wool for seedlings. The children stand beneath them.",
    "Pell looks proud and peaceful. The children look festive.",
    "Pell|Look. Now they guard the small true things.")

# Page 21 — Leaf-turn Near
add(21,
    "A board with paper leaves pinned on it. Many leaves are gold. Miss Wren moves one gold leaf to a space marked soon.",
    "Lila feels excitement and sadness at the same time, and she holds both.",
    "Miss Wren|Leaf-turn is near. The Line will take you home for a visit, then bring you back if you choose.")
add(21,
    "Lila, Pip, and Sera sit on the school steps, talking.",
    "They look serious and capable. Nobody is pushing them.",
    "Pip|I will go home and come back. My mum will want the marble story.",
    "Sera|I will come back. The seedling expects me.")
add(21,
    "Lila nods on the steps, the orchard gold behind her.",
    "She looks decided, calm, and bright.",
    "Lila|I will hug Grandad for a long time. Then I will come back. The far lamp is still thirsty, and I have friends to walk with.")
add(21,
    "Lila packs the notebook, a copy of the sketch, and a wrapped tart for Grandad. The gear stays on its hook by the bell.",
    "She packs happily this time, tongue out, organized.",
    "Lila|Tart, book, scarf. The gear stays. A promise stays.")
add(21,
    "The night before leaving. They sit by the bell and do nothing fancy.",
    "Quiet grateful faces. The bell looks softly warm.",
    "Lila|Thank you for waiting for kindness.",
    "Sera|Thank you for one season.",
    "Pip|Thank you for lamps that drink.")
add(21,
    "The bell gives a bedtime note. The loft lamps dim themselves kindly. The three walk back with arms linked.",
    "Sleepy smiles.",
    "Pip|Even the lights know bedtime.",
    "Lila|Good lights.")

# Page 22 — The Fog Bridge Home
add(22,
    "Morning at the gate. Miss Wren, Pell, and younger children wave. Every tram lantern is full. Lila holds a new blank letter.",
    "It is a warm farewell, not a forever one.",
    "Miss Wren|Eat wonders and greens.",
    "Pell|I will not wrap the bell. I may wrap a seedling.")
add(22,
    "On the tram, Bramble punches a second star into their tickets.",
    "Bramble looks ceremonial and silly. The children are delighted.",
    "Bramble|Two stars. One for riding. One for coming back.")
add(22,
    "The fog bridge in morning gold. The sea is calm. The town ahead grows larger. The clock tower is visible.",
    "Lila is eager, nose to the glass. Pip and Sera enjoy the ride, less nervous than before.",
    "Lila|I can see the clock. It looks just the right height.")
add(22,
    "They share the last pear, three bites. A fern pats Lila's ear.",
    "They giggle. Lila pretends the fern is Biscuit.",
    "Lila|Biscuit would be jealous of this fern.")
add(22,
    "The colored round doors open onto the fern platform. Pip's mum has paint on her hands. Sera's father holds a plant pot. Grandad's glasses are fogged. Lila runs.",
    "Open arms. Grandad kneels. Reunion faces.",
    "Lila|I brought you a story and a tart.",
    "Grandad|I brought you a hug that does not fit in a shop.")
add(22,
    "The hug. Biscuit in a basket puts a paw on Lila's scarf.",
    "Lila laughs into Grandad's vest. The cat looks offended and pleased.",
    "Lila|Hello, Biscuit. I told a bell about you.")

# Page 23 — The Shop Still Ticks
add(23,
    "Evening in the clock shop. Clocks tick. Lila sits on her stool beside the little boat-clock.",
    "Lila looks at home in her bones. Grandad watches from the counter, content.",
    "Lila|It still ticks like rain.",
    "Grandad|It waited.")
add(23,
    "Lila tells the story while the tart is sliced in two. She does not skip Pell's mistake. She tells it kindly.",
    "Grandad listens as if it is the best tale. Lila's hands glow faintly on the funny parts.",
    "Lila|He guarded a painted line. Then he learned. We all checked the book.")
add(23,
    "Grandad hangs the paper swallow above the counter like a kite at rest. They both look up.",
    "Peace on both faces.",
    "Grandad|Letters both ways. That was always the rule. I am glad you lived it.")
add(23,
    "Morning. Lila, Pip, and Sera stand at the bakery. Lila pays with an ordinary coin for buns.",
    "The baker looks amazed and kind. The children look ordinary and magical at once.",
    "Baker|Catch the train all right?",
    "Lila|We did. It catches us back, too.")
add(23,
    "In the garden, rain falls down. One drop hops up, taps Lila's nose, and then behaves.",
    "Lila, Pip, and Sera grin. It is a private joke.",
    "Pip|Your rain knows jokes.",
    "Lila|Only small ones.")
add(23,
    "Night. Three bedrolls in the shop loft. Through the window, a tiny lamp flickers far along the coast. Grandad stands in the doorway.",
    "The children look ready, not rushed. Grandad looks trusting.",
    "Grandad|The far lamp can wait until you are rested.",
    "Lila|We know. Breakfast first.")

# Page 24 — Seats Warmed
add(24,
    "The visit's end, evening. Families walk with the children as far as the clock tower. Grandad's hand rests on Lila's shoulder.",
    "Bittersweet and brave. They are held, not pushed.",
    "Grandad|Same moon. Same door. New story waiting.")
add(24,
    "Pip's mum tries to straighten his hair. It pops up again.",
    "They both laugh, fond and funny.",
    "Pip's mum|Bring the marble home next time so I can see it roll.",
    "Pip|It will show off. It is awful.")
add(24,
    "Sera's father hands her a new sprig wrapped in a damp cloth.",
    "Sera looks serious and loved. Her father looks proud.",
    "Sera's father|Tell the trees I am learning to listen too.")
add(24,
    "Lila and Grandad touch foreheads, a still moment, before the round door.",
    "Love, with no panic. Lila looks sure.",
    "Lila|I am lantern-hearted and hearth-hearted.",
    "Grandad|That is a whole heart. Go on.")
add(24,
    "The three children step through the round door and look back to wave. The door stays open a moment so the families can see the fern light. Bramble tips his cap inside.",
    "Waves and smiles. A few tears are allowed. Bramble looks glad.",
    "Bramble|Seats warmed. Questions welcome.",
    "Lila|We have better questions now.")
add(24,
    "Wide last picture. Wickermere in early autumn, lamps full, the bell unwrapped. The tram crosses the fog bridge with three small figures in the greenhouse car. Far away, one jetty lamp still flickers, small in the corner, a promise and not a threat.",
    "If their faces show, they look eager and safe. The whole landscape feels hopeful.",
    "Lila|Next time, we take the far lamp a kindness. Together.",
    "Pip|And buns.",
    "Sera|And time.")


def main():
    assert len(panels) == 144, len(panels)
    counts = {}
    for panel in panels:
        counts[panel["page"]] = counts.get(panel["page"], 0) + 1
    assert counts == {i: 6 for i in range(1, 25)}, counts
    assert [p["n"] for p in panels] == list(range(1, 145))

    story = {
        "title": "Lila and the Lantern Line",
        "book": "Book One: The Season Bell",
        "pageCount": 24,
        "panelsPerPage": 6,
        "samplePages": 6,
        "intro": (
            "This is an original story about a seven-year-old who lives in an ordinary seaside town "
            "and rides a magic tram to a cliff school. Hearthfolk keep the everyday world. Wickfolk "
            "live where small kindnesses make light. Nothing here is taken from another book or film. "
            "Book One is the whole first adventure, from the invitation to the ride home and back."
        ),
        "pageTitles": [
            {"n": 1, "title": "The Clock Shop"},
            {"n": 2, "title": "Small Glows"},
            {"n": 3, "title": "The Swallow Letter"},
            {"n": 4, "title": "The Moon Door"},
            {"n": 5, "title": "The Fern Platform"},
            {"n": 6, "title": "All Aboard"},
            {"n": 7, "title": "The Mixed-up Trees"},
            {"n": 8, "title": "Lamp, Loaf, Leaf, Lore"},
            {"n": 9, "title": "The Wrapped Bell"},
            {"n": 10, "title": "Not a Crack"},
            {"n": 11, "title": "Three True Things"},
            {"n": 12, "title": "The Bell Remembers"},
            {"n": 13, "title": "Letters Both Ways"},
            {"n": 14, "title": "Small Lessons"},
            {"n": 15, "title": "A Lamp Far Away"},
            {"n": 16, "title": "Ask the Wind"},
            {"n": 17, "title": "A Visit of Light"},
            {"n": 18, "title": "A Button and a Bun"},
            {"n": 19, "title": "A Small Light Is Enough"},
            {"n": 20, "title": "The Apology Tart"},
            {"n": 21, "title": "Leaf-turn Near"},
            {"n": 22, "title": "The Fog Bridge Home"},
            {"n": 23, "title": "The Shop Still Ticks"},
            {"n": 24, "title": "Seats Warmed"},
        ],
        "chapters": [
            {"title": "A Quiet Bell", "pages": [1, 2, 3, 4], "summary": "Lila finds a small light in an ordinary clock shop, gets a paper-bird invitation, and leaves with Grandad's blessing."},
            {"title": "The Lantern Line", "pages": [5, 6, 7, 8], "summary": "She meets Pip, Sera, and Conductor Bramble, rides the greenhouse tram, and arrives at a school whose trees cannot pick a season."},
            {"title": "The Wrapped Bell", "pages": [9, 10, 11, 12], "summary": "Old Pell has wrapped the Season Bell to protect a line he thinks is a crack. Three small kindnesses wake it."},
            {"title": "Lessons for Small Lights", "pages": [13, 14, 15, 16], "summary": "Letters fly both ways. Lessons stay small and honest. A far lamp flickers, and the adults say it can wait."},
            {"title": "Staying Kind", "pages": [17, 18, 19, 20], "summary": "Home-love visits as light. A sad day is allowed. Pell's apology becomes part of the bell's true note."},
            {"title": "Leaf-turn", "pages": [21, 22, 23, 24], "summary": "The children go home for a visit and choose to come back. A cousin bell down the coast is left for a later book."},
        ],
        "characters": [
            {"name": "Lila Moss, 7", "blurb": "Lives above a clock shop with Grandad. Warm medium-brown skin, dark curly hair in two puffs with yellow ribbons, yellow raincoat, red scarf. Curious, kind, and allowed to miss home."},
            {"name": "Grandad Moss", "blurb": "Repairs clocks and once rode the Lantern Line himself. Deep brown skin, silver hair, round glasses, green knitted vest. He tells the truth and expects Lila home at leaf-turn."},
            {"name": "Biscuit", "blurb": "The orange shop cat. He does not do magic. Love of him can visit as lamplight."},
            {"name": "Pip Quinn, 7", "blurb": "Freckles, sandy hair, blue jumper, a tin of marbles that roll toward people who need finding. Jokes first, then tells the truth."},
            {"name": "Sera Voss, 7", "blurb": "Long braid with a blue thread, round glasses, plum coat. Listens to plants and does not rush a sad friend."},
            {"name": "Conductor Bramble", "blurb": "Short and stout, moss-green patched coat, cap with a tiny lantern. Punches a star so children may ask questions."},
            {"name": "Miss Wren", "blurb": "Teacher at Wickermere. Teal dress, ink on her fingers. She keeps children safe and does not send them at a far problem on the first night."},
            {"name": "Old Pell", "blurb": "Groundskeeper. He wraps the bell because he is worried, not because he is cruel. He learns to read the mark he feared."},
        ],
        "rules": [
            "Hearthfolk live in ordinary towns. Wickfolk live where small lights are part of the day. A child can be both.",
            "The invitation is a paper swallow. It comes when a child mends something by wanting it well.",
            "The station is inside the town clock tower. The round door appears when both clock hands rest on the painted moon.",
            "The Lantern Line is a short greenhouse tram. Its lamps stay bright while the Season Bell is content.",
            "Wickermere is a cliff schoolhouse in an apple orchard, not a castle. Children may stand in lamp, loaf, leaf, or lore, and they may move the next day.",
            "The Season Bell rings for a true small kindness nearby. It is not a contest and not a weapon.",
            "Adults stay in the story. Children help, and they also eat breakfast.",
        ],
        "panels": panels,
    }

    (ROOT / "story.js").write_text(
        "window.LANTERN = " + json.dumps(story, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    (ROOT / "STORY.md").write_text(render_markdown(story), encoding="utf-8")
    print(f"Wrote {len(panels)} panels")


def render_markdown(story):
    titles = {item["n"]: item["title"] for item in story["pageTitles"]}
    lines = [
        f"# {story['title']}",
        "",
        f"**{story['book']}**",
        "",
        story["intro"],
        "",
        "This page is the full script to vet. Each page has six panels. **Scene** is the picture. **Expressions** are faces and feelings. **Dialogue** is what people say, in words a seven-year-old can follow.",
        "",
        "Pages 1–6 are drawn. Open the flip book from the hosted site at `lantern-line/index.html` to check the art style. On GitHub itself, this file is for reading the script, and the pictures for those six pages are shown below.",
        "",
        "## People",
        "",
        "![Lila, Biscuit, and Grandad](art/ref-lila-grandad.jpg)",
        "",
        "![Pip, Sera, and Conductor Bramble](art/ref-friends-conductor.jpg)",
        "",
    ]
    for person in story["characters"]:
        lines.append(f"- **{person['name']}.** {person['blurb']}")
    lines += ["", "## World rules", ""]
    for rule in story["rules"]:
        lines.append(f"- {rule}")
    lines += ["", "## Chapters", ""]
    for chapter in story["chapters"]:
        pages = chapter["pages"]
        lines.append(f"- **{chapter['title']}** (pages {pages[0]}–{pages[-1]}). {chapter['summary']}")
    by_page = {}
    for panel in story["panels"]:
        by_page.setdefault(panel["page"], []).append(panel)
    for page in range(1, 25):
        lines += ["", f"## Page {page} — {titles[page]}", ""]
        for panel in by_page[page]:
            lines.append(f"### Panel {panel['n']}")
            lines.append("")
            if panel["art"]:
                lines.append(f"![Panel {panel['n']}]({panel['art']})")
                lines.append("")
            else:
                lines.append("*Art not drawn yet.*")
                lines.append("")
            lines.append(f"- **Scene:** {panel['scene']}")
            lines.append(f"- **Expressions:** {panel['expressions']}")
            if panel["dialogue"]:
                spoken = " ".join(f"**{d['who']}:** “{d['line']}”" for d in panel["dialogue"])
                lines.append(f"- **Dialogue:** {spoken}")
            else:
                lines.append("- **Dialogue:** None.")
            lines.append("")
    lines.append("End of Book One. A later book can follow the cousin bell at the Old Turn, if you want that story next.")
    lines.append("")
    return "\n".join(lines)


if __name__ == "__main__":
    main()
