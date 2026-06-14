// Matchmaker knowledge base.
//
// A curated layer of real, human-written metadata for every title on the shelf
// (keyed by ISBN, matching lib/seedArrivals.ts). This is what lets the Next Read
// Matchmaker make *good* recommendations grounded in real books — it never
// invents titles, and it matches on substance (mood, theme, read-alikes), not
// just keywords. Both the AI and the keyless heuristic matcher read from here.
//
// `blurb`     — one-sentence, accurate synopsis (also shown to the reader).
// `moods`     — tone/vibe descriptors a reader might ask for.
// `themes`    — subject matter / what the book is "about".
// `readAlikes`— comparable titles, so "something like X" prompts can match.

export interface BookKnowledge {
  blurb: string;
  moods: string[];
  themes: string[];
  readAlikes?: string[];
}

export const bookKnowledge: Record<string, BookKnowledge> = {
  // ── Psychological thrillers ──
  "9781250301697": {
    blurb:
      "A criminal psychotherapist is determined to unravel why a celebrated painter shot her husband and then never spoke again.",
    moods: ["dark", "twisty", "suspenseful", "propulsive"],
    themes: ["murder", "obsession", "secrets", "marriage"],
    readAlikes: ["Gone Girl", "The Girl on the Train"],
  },
  "9781538724736": {
    blurb:
      "A struggling writer hired to finish a bestselling author's series uncovers a manuscript that reads like a chilling confession.",
    moods: ["dark", "twisty", "steamy", "suspenseful"],
    themes: ["secrets", "obsession", "marriage", "writing"],
    readAlikes: ["Gone Girl", "The Silent Patient"],
  },
  "9781538742570": {
    blurb:
      "A woman with a troubled past takes a live-in job for a wealthy couple whose immaculate home hides something sinister.",
    moods: ["dark", "twisty", "fast-paced", "suspenseful"],
    themes: ["secrets", "class", "domestic", "revenge"],
    readAlikes: ["The Silent Patient", "Gone Girl"],
  },
  "9780307588371": {
    blurb:
      "When a wife vanishes on her fifth anniversary, her husband becomes the prime suspect in a marriage built on lies.",
    moods: ["dark", "twisty", "gritty", "propulsive"],
    themes: ["marriage", "deception", "media", "revenge"],
    readAlikes: ["The Girl on the Train", "The Silent Patient"],
  },
  "9781594634024": {
    blurb:
      "A divorcee who watches a seemingly perfect couple from her commuter train becomes tangled in their disappearance.",
    moods: ["dark", "tense", "unsettling", "suspenseful"],
    themes: ["memory", "addiction", "obsession", "marriage"],
    readAlikes: ["Gone Girl"],
  },
  "9780593356159": {
    blurb:
      "A socially awkward, big-hearted hotel maid becomes the prime suspect when she finds a wealthy guest dead in his suite.",
    moods: ["cozy", "charming", "twisty", "heartwarming"],
    themes: ["mystery", "neurodivergence", "found-family", "justice"],
    readAlikes: ["A Man Called Ove", "Remarkably Bright Creatures"],
  },

  // ── Literary & book-club fiction ──
  "9780735219090": {
    blurb:
      "An abandoned girl raises herself in the North Carolina marsh and, years later, becomes a murder suspect.",
    moods: ["atmospheric", "lyrical", "emotional", "slow-burn"],
    themes: ["isolation", "coming-of-age", "nature", "murder", "small-town"],
  },
  "9780525559474": {
    blurb:
      "Between life and death lies a library where a despairing woman gets to try on all the lives she might have lived.",
    moods: ["hopeful", "emotional", "thoughtful", "uplifting"],
    themes: ["second-chances", "regret", "mental-health", "identity"],
  },
  "9780804172707": {
    blurb:
      "Four college friends build lives in New York, shadowed by one man's unspeakable past and unshakable pain.",
    moods: ["heartbreaking", "devastating", "immersive", "dark"],
    themes: ["friendship", "trauma", "abuse", "found-family"],
  },
  "9781984822178": {
    blurb:
      "Two Irish young people circle each other through school and university, in and out of love and class divides.",
    moods: ["intimate", "melancholy", "literary", "slow-burn"],
    themes: ["relationships", "class", "coming-of-age", "love"],
  },
  "9780063251922": {
    blurb:
      "A boy born to a teenage mom in Appalachia narrates his way through foster care, addiction, and sheer survival.",
    moods: ["gritty", "heartbreaking", "vivid", "propulsive"],
    themes: ["poverty", "addiction", "foster-care", "resilience"],
    readAlikes: ["David Copperfield"],
  },
  "9780525536291": {
    blurb:
      "Identical twins from a small Black town split apart — one passing as white — their choices echoing across generations.",
    moods: ["immersive", "thoughtful", "emotional", "sweeping"],
    themes: ["identity", "race", "family", "belonging"],
  },
  "9780063204157": {
    blurb:
      "A grieving widow forms an unlikely friendship with a curmudgeonly giant octopus who knows what happened to her son.",
    moods: ["heartwarming", "cozy", "charming", "uplifting"],
    themes: ["grief", "friendship", "family", "mystery"],
    readAlikes: ["The Maid", "A Man Called Ove"],
  },
  "9780593243732": {
    blurb:
      "Four devoted sisters and the wounded young man who marries into their family navigate love and loss across decades.",
    moods: ["emotional", "warm", "sweeping", "tender"],
    themes: ["sisters", "family", "love", "grief"],
    readAlikes: ["Little Women"],
  },
  "9780593321201": {
    blurb:
      "Two friends become video-game-making partners across thirty years of love, art, rivalry, and reinvention.",
    moods: ["immersive", "emotional", "clever", "bittersweet"],
    themes: ["friendship", "creativity", "games", "ambition"],
  },
  "9780385547345": {
    blurb:
      "A brilliant 1960s chemist pushed out of the lab reinvents herself as a beloved, defiantly scientific cooking-show host.",
    moods: ["funny", "feminist", "charming", "uplifting"],
    themes: ["sexism", "science", "motherhood", "reinvention"],
  },

  // ── Historical fiction ──
  "9780312577223": {
    blurb: "Two sisters take very different paths of courage and resistance in Nazi-occupied France.",
    moods: ["emotional", "heartbreaking", "sweeping", "immersive"],
    themes: ["war", "sisters", "resistance", "sacrifice"],
    readAlikes: ["The Four Winds"],
  },
  "9781250178602": {
    blurb: "A mother fights to keep her family alive and together through the Dust Bowl and the Great Depression.",
    moods: ["sweeping", "heartbreaking", "gritty", "emotional"],
    themes: ["motherhood", "survival", "poverty", "depression-era"],
    readAlikes: ["The Nightingale"],
  },

  // ── Mythology ──
  "9780316556347": {
    blurb: "The banished witch-goddess of Greek myth comes into her own power across centuries of gods and mortals.",
    moods: ["lyrical", "immersive", "feminist", "atmospheric"],
    themes: ["mythology", "power", "transformation", "solitude"],
    readAlikes: ["The Song of Achilles"],
  },
  "9780062060624": {
    blurb: "The tender, tragic love story of Achilles and Patroclus on the long road to the Trojan War.",
    moods: ["lyrical", "romantic", "heartbreaking", "emotional"],
    themes: ["mythology", "love", "war", "fate"],
    readAlikes: ["Circe"],
  },

  // ── Romance ──
  "9781501110368": {
    blurb: "A florist's whirlwind romance forces her to confront the cycle of abuse she grew up watching.",
    moods: ["emotional", "heartbreaking", "romantic"],
    themes: ["domestic-abuse", "love", "family", "resilience"],
  },
  "9781984806734": {
    blurb: "A romance writer and a literary novelist, neighbors for a summer, swap genres and fall for each other.",
    moods: ["witty", "swoony", "warm", "funny"],
    themes: ["writers", "grief", "opposites-attract", "second-chances"],
    readAlikes: ["Book Lovers", "Happy Place"],
  },
  "9780593334836": {
    blurb: "A cutthroat literary agent keeps colliding with a brooding editor in a town straight out of a novel.",
    moods: ["witty", "swoony", "funny", "warm"],
    themes: ["publishing", "sisters", "small-town", "enemies-to-lovers"],
    readAlikes: ["Beach Read", "Happy Place"],
  },
  "9780593336823": {
    blurb: "A PhD student fake-dates a notoriously cold professor and the chemistry turns very real.",
    moods: ["swoony", "funny", "charming", "low-angst"],
    themes: ["academia", "stem", "fake-dating", "slow-burn"],
  },
  "9780593441275": {
    blurb: "A quietly broken-up couple pretends they're still together on their friend group's annual getaway.",
    moods: ["emotional", "swoony", "warm", "bittersweet"],
    themes: ["second-chances", "friendship", "found-family", "grief"],
    readAlikes: ["Beach Read"],
  },

  // ── Romantasy & fantasy ──
  "9781649374042": {
    blurb: "At a brutal war college for dragon riders, a general's frail daughter must bond with a dragon — or die.",
    moods: ["steamy", "fast-paced", "addictive", "high-stakes"],
    themes: ["dragons", "magic", "war", "enemies-to-lovers"],
    readAlikes: ["A Court of Thorns and Roses", "Iron Flame"],
  },
  "9781649374172": {
    blurb: "The dragon-rider saga continues as Violet faces a deadlier year, harder truths, and a brewing rebellion.",
    moods: ["steamy", "fast-paced", "high-stakes", "intense"],
    themes: ["dragons", "magic", "war", "rebellion"],
    readAlikes: ["Fourth Wing"],
  },
  "9781619634442": {
    blurb: "A huntress dragged into a faerie court discovers the beast-cursed lord there is not what he seems.",
    moods: ["steamy", "romantic", "immersive", "dark"],
    themes: ["fae", "magic", "enemies-to-lovers", "curses"],
    readAlikes: ["Fourth Wing"],
  },
  "9780765326355": {
    blurb: "On a storm-scoured world, a slave, a scholar, and a broken soldier are drawn toward an ancient war.",
    moods: ["epic", "immersive", "intricate", "slow-burn"],
    themes: ["war", "magic", "honor", "destiny"],
  },

  // ── Sci-fi ──
  "9780593135204": {
    blurb: "A lone astronaut wakes with amnesia on a last-ditch mission to save Earth — and makes an unlikely friend.",
    moods: ["fun", "propulsive", "uplifting", "clever"],
    themes: ["space", "survival", "science", "friendship", "first-contact"],
  },

  // ── Nonfiction / memoir ──
  "9780735211292": {
    blurb: "A practical system for building good habits and breaking bad ones through tiny, compounding changes.",
    moods: ["motivating", "practical", "clear"],
    themes: ["self-improvement", "productivity", "psychology", "habits"],
  },
  "9780399590504": {
    blurb: "A woman raised off-grid by survivalist parents teaches herself enough to reach Cambridge — at a cost.",
    moods: ["gripping", "emotional", "inspiring"],
    themes: ["family", "education", "survival", "self-determination"],
  },

  // ── Classics ──
  "9780141439518": {
    blurb: "Spirited Elizabeth Bennet and proud Mr. Darcy spar their way toward love in Regency England.",
    moods: ["witty", "romantic", "charming", "classic"],
    themes: ["class", "marriage", "family", "first-impressions"],
  },
  "9780451524935": {
    blurb: "Under the all-seeing Party, one man's quiet rebellion of love and truth meets the machinery of Big Brother.",
    moods: ["bleak", "tense", "thought-provoking", "dystopian"],
    themes: ["surveillance", "totalitarianism", "freedom", "truth"],
  },
  "9780743273565": {
    blurb: "A mysterious millionaire throws lavish parties chasing a dream just across the bay, and just out of reach.",
    moods: ["lyrical", "tragic", "glamorous", "wistful"],
    themes: ["wealth", "longing", "american-dream", "class"],
  },
  "9780061120084": {
    blurb: "A girl in the Depression-era South watches her lawyer father defend a Black man falsely accused.",
    moods: ["warm", "poignant", "classic", "thought-provoking"],
    themes: ["justice", "race", "childhood", "morality"],
  },
  "9780399501487": {
    blurb: "Boys stranded on a deserted island slide from fragile order into savagery.",
    moods: ["bleak", "tense", "allegorical", "dark"],
    themes: ["civilization", "human-nature", "power", "survival"],
  },
  "9780316769488": {
    blurb: "A disenchanted teen wanders New York after being expelled, raging against a world he finds phony.",
    moods: ["melancholy", "wry", "restless", "classic"],
    themes: ["coming-of-age", "alienation", "grief", "identity"],
  },

  // ── Mystery & crime ──
  "9781984880963": {
    blurb: "Four sharp-witted retirement-village friends who meet to solve cold cases stumble onto a real murder.",
    moods: ["cozy", "witty", "charming", "clever"],
    themes: ["mystery", "friendship", "aging", "crime"],
    readAlikes: ["The Maid"],
  },
  "9780062868930": {
    blurb: "A glamorous wedding on a remote Irish island turns deadly when a body is found during the celebration.",
    moods: ["twisty", "atmospheric", "suspenseful", "tense"],
    themes: ["murder", "secrets", "marriage", "revenge"],
    readAlikes: ["Then She Was Gone", "The Silent Patient"],
  },
  "9781501154645": {
    blurb: "Three years after her daughter vanished, a grieving mother meets a man whose young daughter is her uncanny double.",
    moods: ["dark", "emotional", "twisty", "suspenseful"],
    themes: ["grief", "missing-person", "obsession", "family"],
    readAlikes: ["The Girl on the Train"],
  },

  // ── Literary & book-club fiction ──
  "9781594631931": {
    blurb: "A privileged Afghan boy's betrayal of his closest friend haunts him from Kabul to America and back.",
    moods: ["heartbreaking", "sweeping", "emotional", "redemptive"],
    themes: ["friendship", "guilt", "redemption", "war", "family"],
  },
  "9781476738024": {
    blurb: "A grumpy, rule-loving widower's plan to give up keeps being interrupted by his irrepressible new neighbors.",
    moods: ["heartwarming", "funny", "cozy", "bittersweet"],
    themes: ["grief", "found-family", "community", "loneliness"],
    readAlikes: ["Remarkably Bright Creatures", "The Maid"],
  },
  "9780375842207": {
    blurb: "In Nazi Germany, a foster girl steals books and shares them aloud while Death itself narrates her story.",
    moods: ["heartbreaking", "lyrical", "emotional", "immersive"],
    themes: ["war", "books", "death", "found-family"],
    readAlikes: ["The Nightingale"],
  },
  "9780735224315": {
    blurb: "An enigmatic artist and her daughter upend a picture-perfect Ohio suburb as a custody battle splits the town.",
    moods: ["immersive", "thoughtful", "simmering", "emotional"],
    themes: ["motherhood", "class", "secrets", "identity"],
  },
  "9780593318171": {
    blurb: "An artificial friend watches the human world with tender, searching hope as she's chosen to care for a sick girl.",
    moods: ["tender", "melancholy", "thoughtful", "quiet"],
    themes: ["ai", "love", "sacrifice", "humanity"],
    readAlikes: ["Never Let Me Go"],
  },
  "9781455563937": {
    blurb: "Four generations of a Korean family endure exile, prejudice, and quiet endurance in 20th-century Japan.",
    moods: ["sweeping", "immersive", "emotional", "sober"],
    themes: ["family-saga", "immigration", "identity", "resilience"],
  },
  "9780316055437": {
    blurb: "A boy who survives a museum bombing clings to a small Dutch painting through grief, crime, and obsession.",
    moods: ["immersive", "literary", "melancholy", "sprawling"],
    themes: ["grief", "art", "addiction", "fate"],
  },
  "9781400031702": {
    blurb: "A clique of brilliant, charismatic classics students at an elite college follow their obsessions into murder.",
    moods: ["dark", "atmospheric", "immersive", "literary"],
    themes: ["dark-academia", "murder", "obsession", "guilt"],
    readAlikes: ["Babel", "The Goldfinch"],
  },

  // ── Fantasy & sci-fi ──
  "9780756404741": {
    blurb: "A legendary wizard, now hiding as a humble innkeeper, recounts how he became the most notorious magician of his age.",
    moods: ["immersive", "lyrical", "epic", "slow-burn"],
    themes: ["magic", "music", "coming-of-age", "legend"],
    readAlikes: ["The Way of Kings", "A Game of Thrones"],
  },
  "9780553593716": {
    blurb: "Noble houses scheme, betray, and war over the Iron Throne while an ancient threat stirs in the frozen north.",
    moods: ["epic", "gritty", "immersive", "intricate"],
    themes: ["war", "politics", "power", "betrayal"],
    readAlikes: ["The Name of the Wind", "The Way of Kings"],
  },
  "9780765360960": {
    blurb: "In a world ruled by an immortal tyrant, a street thief joins a crew of magic-wielding rebels to topple a god.",
    moods: ["fast-paced", "clever", "immersive", "high-stakes"],
    themes: ["magic", "rebellion", "heist", "destiny"],
    readAlikes: ["The Way of Kings", "Six of Crows"],
  },
  "9780547928227": {
    blurb: "A comfort-loving hobbit is swept into a quest to win a dragon's hoard with thirteen dwarves and a wizard.",
    moods: ["cozy", "adventurous", "charming", "whimsical"],
    themes: ["adventure", "courage", "greed", "home"],
  },
  "9780441013593": {
    blurb: "On a desert planet prized for a mind-bending spice, a betrayed heir becomes the messiah of its native people.",
    moods: ["epic", "immersive", "cerebral", "atmospheric"],
    themes: ["politics", "religion", "ecology", "destiny"],
  },
  "9780553418026": {
    blurb: "Stranded alone on Mars, an astronaut must science the hell out of survival until a rescue can reach him.",
    moods: ["funny", "propulsive", "clever", "tense"],
    themes: ["space", "survival", "science", "ingenuity"],
    readAlikes: ["Project Hail Mary"],
  },
  "9780063021426": {
    blurb: "At a 19th-century Oxford translation institute powered by silver and language, a colonial student faces an impossible choice.",
    moods: ["dark", "immersive", "cerebral", "angry"],
    themes: ["dark-academia", "colonialism", "language", "rebellion"],
    readAlikes: ["The Secret History"],
  },

  // ── Romance ──
  "9780062439598": {
    blurb: "Two executive assistants who claim to despise each other discover the line between hate and desire is razor-thin.",
    moods: ["swoony", "funny", "witty", "low-angst"],
    themes: ["enemies-to-lovers", "office", "rivalry", "slow-burn"],
    readAlikes: ["The Love Hypothesis"],
  },
  "9781250316776": {
    blurb: "The U.S. president's son and the Prince of Wales go from rivals to a secret romance that could shake two nations.",
    moods: ["swoony", "funny", "heartwarming", "charming"],
    themes: ["lgbtq", "enemies-to-lovers", "politics", "first-love"],
  },
  "9781984806758": {
    blurb: "Two best friends who haven't spoken in a year take one more summer trip to mend what broke between them.",
    moods: ["swoony", "warm", "funny", "bittersweet"],
    themes: ["friends-to-lovers", "travel", "second-chances"],
    readAlikes: ["Beach Read", "Happy Place"],
  },

  // ── Young adult ──
  "9780439023528": {
    blurb: "A girl volunteers for a televised fight to the death to save her sister — and sparks a rebellion.",
    moods: ["propulsive", "tense", "gripping", "dark"],
    themes: ["dystopian", "survival", "rebellion", "sacrifice"],
  },
  "9780525478812": {
    blurb: "Two teens who meet in a cancer support group fall fiercely, wittily in love against the clock.",
    moods: ["heartbreaking", "funny", "tender", "emotional"],
    themes: ["illness", "first-love", "mortality", "grief"],
  },
  "9781627792127": {
    blurb: "Six dangerous young outcasts attempt an impossible heist in a city of greed, gambling, and magic.",
    moods: ["fast-paced", "clever", "gritty", "immersive"],
    themes: ["heist", "found-family", "magic", "revenge"],
    readAlikes: ["A Game of Thrones", "Mistborn: The Final Empire"],
  },

  // ── Horror ──
  "9780307743657": {
    blurb: "A struggling writer takes a winter caretaker job at an isolated hotel that preys on his family and his sanity.",
    moods: ["terrifying", "atmospheric", "tense", "dark"],
    themes: ["horror", "addiction", "isolation", "family"],
  },
  "9780525620808": {
    blurb: "A glamorous socialite investigates her cousin's haunted marriage in a decaying mansion with a sinister secret.",
    moods: ["atmospheric", "eerie", "gothic", "creeping"],
    themes: ["horror", "family", "colonialism", "gothic"],
    readAlikes: ["Jane Eyre"],
  },

  // ── Nonfiction ──
  "9780062316097": {
    blurb: "A sweeping, provocative history of how Homo sapiens came to dominate the world.",
    moods: ["thought-provoking", "sweeping", "accessible", "clear"],
    themes: ["history", "anthropology", "society", "big-ideas"],
  },
  "9781524763138": {
    blurb: "Michelle Obama's intimate memoir of her journey from the South Side of Chicago to the White House.",
    moods: ["inspiring", "warm", "candid", "reflective"],
    themes: ["memoir", "identity", "family", "leadership"],
    readAlikes: ["Educated"],
  },
  "9780143127741": {
    blurb: "A landmark exploration of how trauma reshapes the body and brain — and the paths back to healing.",
    moods: ["illuminating", "compassionate", "clear"],
    themes: ["trauma", "psychology", "healing", "science"],
  },

  // ── Classics ──
  "9780141441146": {
    blurb: "An orphaned governess falls for her brooding employer, whose locked attic hides a devastating secret.",
    moods: ["gothic", "romantic", "atmospheric", "classic"],
    themes: ["romance", "independence", "secrets", "morality"],
  },
  "9780060850524": {
    blurb: "In an engineered society of pleasure and conformity, a few misfits glimpse the cost of manufactured happiness.",
    moods: ["bleak", "thought-provoking", "satirical", "dystopian"],
    themes: ["dystopian", "conformity", "technology", "freedom"],
    readAlikes: ["1984"],
  },
};
