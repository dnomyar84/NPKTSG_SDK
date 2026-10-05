# Drawing rules

Apply these while making a panel. They do not replace the storyboard. They stop the same person, creature, or object looking like a new design from one picture to the next.

The storyboard is [harry-potter-philosophers-stone-panels.md](harry-potter-philosophers-stone-panels.md). Paste a lock from the detail files instead of inventing a new one:

- Clothes: [wardrobes.md](wardrobes.md)
- People and creatures: [characters.md](characters.md)
- Objects: [props.md](props.md)
- Who says what, and which funny beats must stay: [address-and-famous-beats.md](address-and-famous-beats.md)
- Flute music and sleepy heads: [flute-and-fluffy.md](flute-and-fluffy.md)

Drawn sheets, when they exist, are in `flipbook/art/characters/`. A written lock wins if a sheet is vague. Do not redraw old panels to match a new note. Use the lock on the next picture.

Keep the soft painted storybook look already used in the flipbook. Not a film photograph, and not a new cartoon style.

## Panel image size

Inkjet A4 landscape holds two A5 pages. A5 is 148.5 mm × 210 mm. The page margin is 5 px, the gap is 2 px, and the 1 px panel border is part of the cell. Sizes are even pixels. Dialogue is a band under the image, so these heights are the picture when there is no text. The largest panels have no dialogue.

### First generation (phone screen)

Generate the first pass at phone-screen resolution. A page fits the screen width on a large phone; a reader may also pinch one panel up to full width. The longest side of the largest panel is **1440 px** (covers a Galaxy S24 Ultra at 1440 px and an iPhone 16 Pro Max at about 1320 px when a panel is full-screen). Do not use 1722, 2K, or 4K for this pass. Scale from the print boxes below by 1440÷1722 and round to even pixels. Keep the same aspect ratios. After the pictures are approved, regenerate at the print sizes in the next section.

On a standard even row (`flex: 1`):

- Full row: 1440 × 662
- Two-thirds row: 958 × 662
- Half row: 718 × 662
- One-third row: 478 × 662

A scenery row is the tall row (`flex: 1.28`). On a page with one tall row:

- Two-thirds row: 958 × 774
- One-third row: 478 × 774
- Half row: 718 × 606

On a page with two tall rows, those pictures are shorter:

- Two-thirds row: 958 × 714
- One-third row: 478 × 714
- Half row: 718 × 558

Use the height of the row the panel sits in.

### Print regeneration (300 DPI, later)

After the phone pass is approved, regenerate each panel at 300 DPI of its printed cell, and no larger. 300 DPI is the inkjet photo standard.

On a standard even row:

- Full row: 1722 × 792
- Two-thirds row: 1144 × 792
- Half row: 858 × 792
- One-third row: 572 × 792

On a page with one tall row:

- Two-thirds row: 1144 × 926
- One-third row: 572 × 926
- Half row: 858 × 724

On a page with two tall rows:

- Two-thirds row: 1144 × 854
- One-third row: 572 × 854
- Half row: 858 × 668

Art already in `flipbook/art/` may be larger than either pass. Do not copy an old file’s pixel size for the next picture.

## One costume per scene

A person wears one costume for the whole scene. The default is whatever they wore in the previous scene. Change it only when a caption or an action still shows a reason: a time jump, a weather change, nightclothes, Quidditch, a feast, or a trip outside.

Outdoor and cold indoor spaces (the grounds, the boats, a cold Great Hall, a dungeon) get pointed hats and cloaks. Warm classrooms and the common room do not. Hats come off in an action still, not between two panels of the same room.

Winter jumpers are locked in [wardrobes.md](wardrobes.md). Harry’s Christmas jumper is emerald green with a gold H. Ron’s is maroon with a gold R. They are not the same jumper.

## No house robes before the Sorting

On the Hogwarts Express, first years wear the clothes they traveled in. They have not been Sorted, and they are not in house robes. House ties, crests, and scarves start at the Sorting. The lock is in [wardrobes.md](wardrobes.md).

## The scar

Harry’s lightning scar is on his anatomical right brow. When he faces the viewer, it is on the viewer’s left. It never moves to the other side, the chin, or the cheek. Baby Harry has the same cut, fresh, on that same brow.

## Character and prop consistency

Recurring people and creatures use the paragraph in [characters.md](characters.md) every time. Recurring objects use [props.md](props.md).

The Philosopher’s Stone is one object: a small irregular blood-red stone with an inner glow, small enough for a child’s palm. It is never a necklace, a clear crystal, or a different gem.

The bathroom troll and the knocked-out dungeon troll are the same kind of creature, and the second one should look like the first one asleep. Hedwig is the same snowy owl. Scabbers is the same old rat. McGonagall’s cat is the same tabby, with spectacle marks. The Fat Lady is one painting. Ghosts stay pearly and bluish-white. Nicolas Flamel appears only as the engraved portrait in the book, never as a man in the room.

## Whole-school scenes

A Great Hall feast, a Quidditch crowd, and the House Cup show all four houses. A red-only crowd is wrong.

- Gryffindor: red and gold, lion
- Hufflepuff: yellow and black, badger
- Ravenclaw: blue and bronze, eagle. Not blue and silver.
- Slytherin: green and silver, snake

Four long tables, banners in those colors, house ties in those colors. The staff table is at the far end. The film does not keep one left-to-right table order, so do not invent a floor plan and then “correct” a panel. Gryffindor is the table Harry sits at after the Sorting. Slytherin is Draco’s green table. The other two tables are visible in any wide feast.

Four hourglasses stand at the side of the hall: Gryffindor rubies, Hufflepuff yellow stones, Ravenclaw blue stones, Slytherin emeralds. At the House Cup, green starts far ahead.

Quidditch: Gryffindor in the air in scarlet and gold, Slytherin in the air in green and silver, and all four houses in the stands.

## Static magic

A still panel has to show who did the magic. The caption is not enough.

**Wand, or Hagrid’s pink umbrella.** The wand is pointed at the target. A thin bright thread, a few sparks, or a narrow streak runs from that tip to the target. The thread is readable and thin. It does not fill the panel with glow. The umbrella is his wand. The spark leaves the umbrella tip.

**Chanted magic, no wand in the hand.** The caster’s eyes are locked on the target and the mouth is mid-word. A faint effect sits on the target. Do not leave a result floating while nobody looks at it.

**Flute.** Notes travel from the flute to the heads, and only a sleepy head gets Zzz. The full note is [flute-and-fluffy.md](flute-and-fluffy.md).

**Deluminator.** Not a wand spell. Do not draw a line from his wand. The silver lighter is in his hand, aimed at one street lamp. To darken the street, a thin ribbon of warm yellow runs from the lamp globe into the device, with a few sparks, and that lamp goes dark. Lamps behind him are out. Lamps ahead may still be lit. To return the lights, reverse the ribbon: from the device up into the lamp, and the lamps flare on. Same device, same hand. Do not flood the panel with glow. Pasteable lock: [props.md](props.md).

**Not a wand spell.** Do not add a fake wand line. McGonagall’s Animagus change is the same eyes and the same spectacle marks becoming her square glasses, mid-change, with no wand. Harry’s touch burning Quirrell is smoke where skin meets skin. The Mirror putting the Stone in a pocket is the glass and the pocket, not a spell streak. Lily’s protection is that burn, not a curse he casts.

**A mystery the story is still hiding.** At the Quidditch match, Snape’s stare and moving mouth read as the attack, and Quirrell is also mouthing but easy to miss. Do not add a bright line from Quirrell that solves the year early. The broom’s wildness is the effect. After the reveal, the rule above applies as usual.

## Weird staging

A strange magical picture has to name the camera, which way the body faces, and what sits on which side of the head. “Voldemort appears” is not a prompt. Do not draw two front-facing men, a face on a turban, or a second body.

Paste the lock from the detail file instead of inventing one:

- Quirrell’s turn and the face on the back of the bald head: [characters.md](characters.md)
- The one zoo snake: [characters.md](characters.md)
- Lily on the viewer’s left and James on the viewer’s right, same clothes: [characters.md](characters.md)
- The cloak, 90% transparent and only about 10% opacity, so Harry stays faintly visible: [props.md](props.md)
- Beats that are still missing, with a full prompt for a later insert: [address-and-famous-beats.md](address-and-famous-beats.md)

## Moving stairs

A moving Hogwarts staircase is one entire flight of stairs moving as a single solid object. Every step stays fixed relative to the other steps. Both railings are part of that same object and turn with it. The steps do not walk, shuffle, slide apart, blur, morph, or detach. It is not a staircase that changes shape.

The flight always pivots at the bottom. The lower end stays on its landing, or nearly so, and acts as the hinge. The upper end swings away from the landing it used to meet and toward a different landing, arch, or empty gap. It is a rigid rotation around the bottom, like a door hinged at the floor.

Whenever a panel shows the stairs actually turning, use this camera and state it in that panel: a three-quarter view from a landing, low enough that the bottom hinge and the top end are both visible mid-swing, with a gap opening between the moving upper end and the landing it is leaving. Do not use a flat head-on view that hides the pivot. Do not crop out the bottom hinge.

Students on the landings stop and stare at the turning flight. If someone is on the moving flight, they are almost losing balance: feet planted on the steps, body jerked sideways, a hand grabbing the railing that is turning with them, maybe a book sliding. They are not calmly walking. If the panel is only people watching from a landing, nobody is on the flight and their faces are turned toward it.

A staircase that is currently still may be walked on normally. The moment it turns, the rule above applies. Do not draw the whole castle’s stairs moving in one panel unless the storyboard already does. One flight is enough to read.

## Scene, face, and scale

The first panel of a new place walks the reader in: from the street, the door, the tunnel, or the room they just left. Do not cut to a new room with no arrival.

Inside one scene, the background, weather, furniture, and light stay put. A torchlit bathroom does not become daylight two panels later. A wet street stays wet.

An expression holds until the story changes it. Do not give a new smile in the next panel if nothing has happened.

Scale does not drift:

- A first-year is much smaller than Hagrid. Hagrid’s head nearly touches a cottage door.
- The troll is larger than the bathroom stalls and fills the doorway.
- Fluffy is the size of the room. One paw is the size of a door.
- Norbert’s head is about the size of a cat when he hatches, then he grows to the size of a big dog, then he leaves in a crate.
- Hedwig is a large owl. Scabbers is a fat rat that fills Ron’s hands, not a mouse.

A costume change, a bandage, glasses going on, or a hat coming off happens in an action still. The next panels keep the result.

## Address

Speech follows [address-and-famous-beats.md](address-and-famous-beats.md). In public, a student says Professor and the surname. Snape says Mr Potter, not Harry. Do not invent lines to demonstrate the rule.

## Balloons and picture briefs

A balloon may stay restricted, in the way the story keeps Harry in the dark. It can withhold a name, keep a metaphor, or leave the reader to work out what just happened. Do not turn that balloon into a lecture in the character's mouth. Do not use a heard line, or a line from the young-reader guide, as the instruction for the picture.

The picture brief is the other kind of telling. It is plain and complete for the artist: where the panel is, what each body is doing, what the person feels, what the face and hands show, and what a spell, creature, or object is physically doing. The image model gets `picture` on the panel. It does not get the balloon.

A caption may say the plain point for the reader. Easier wording and a spell-it-out note belong in the picture brief or the caption. They are not a new line to force into the mouth.

When the page must stay mysterious, the picture shows only what the people in the panel can see and feel. The Quidditch broom fights Harry and he does not know why. No bright line names who cast it. Voldemort's face stays hidden until the turban is off the back of the head.
