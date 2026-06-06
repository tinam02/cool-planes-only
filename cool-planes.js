// The "coolness" database. ICAO type designator -> { name, tier, cls, fact }
// tier 1 = legendary, tier 2 = rare, tier 3 = cool
// cls is just for the icon/grouping: airliner | military | warbird | odd
const COOL_TYPES = {
  // ---- Tier 1: legendary ----
  A124: {
    name: 'Antonov An-124 Ruslan',
    tier: 1,
    cls: 'odd',
    fact: 'One of the biggest cargo planes ever built. Its nose flips up like a hatch so it can swallow trains, satellites and entire yachts.',
  },
  A225: {
    name: 'Antonov An-225 Mriya',
    tier: 1,
    cls: 'odd',
    fact: 'The largest aircraft ever built — only one existed, and it was destroyed in Ukraine in 2022. If this shows up, something is very wrong (or very exciting).',
  },
  A3ST: {
    name: 'Airbus A300-600ST Beluga',
    tier: 1,
    cls: 'odd',
    fact: 'A plane shaped like a whale. Carries wings and fuselage sections of other Airbus planes between factories. Only 5 were built.',
  },
  A337: {
    name: 'Airbus A330-743L BelugaXL',
    tier: 1,
    cls: 'odd',
    fact: 'The Beluga’s bigger successor — Airbus painted an actual smiling whale face on it after a staff vote. Only 6 exist.',
  },
  BLCF: {
    name: 'Boeing 747 Dreamlifter',
    tier: 1,
    cls: 'odd',
    fact: 'A 747 with a hugely swollen body that ferries 787 parts between factories. Its entire tail swings open sideways. Only 4 exist.',
  },
  VC25: {
    name: 'Boeing VC-25 (Air Force One)',
    tier: 1,
    cls: 'military',
    fact: 'The US president’s personal 747, with mid-air refueling and hardened communications. If you see this, the president is literally up there.',
  },
  E4: {
    name: 'Boeing E-4B Nightwatch',
    tier: 1,
    cls: 'military',
    fact: 'The "Doomsday Plane" — a flying Pentagon designed to run a nuclear war from the air. One is on 24/7 alert, every day, since 1975.',
  },
  B52: {
    name: 'Boeing B-52 Stratofortress',
    tier: 1,
    cls: 'military',
    fact: 'Every B-52 flying today was built between 1960–62, and they’re planned to serve past 2050 — pilots fly the same jets their grandfathers flew.',
  },
  B1: {
    name: 'Rockwell B-1B Lancer',
    tier: 1,
    cls: 'military',
    fact: 'A supersonic bomber with swing wings that fold back like a paper plane for high-speed dashes.',
  },
  B2: {
    name: 'Northrop B-2 Spirit',
    tier: 1,
    cls: 'military',
    fact: 'A $2 billion stealth flying wing with no tail at all. Only 21 were built. Spotting one on a tracker is genuinely rare.',
  },
  U2: {
    name: 'Lockheed U-2 Dragon Lady',
    tier: 1,
    cls: 'military',
    fact: 'Cold War spy plane flying above 70,000 ft — so high the pilots wear spacesuits. It lands so badly a sports car chases it down the runway calling out its height.',
  },
  C5M: {
    name: 'Lockheed C-5M Super Galaxy',
    tier: 1,
    cls: 'military',
    fact: 'The largest aircraft in the US military. Opens at BOTH ends and can swallow six Apache helicopters or two tanks.',
  },
  C5: {
    name: 'Lockheed C-5 Galaxy',
    tier: 1,
    cls: 'military',
    fact: 'The largest aircraft in the US military. Opens at BOTH ends and can swallow six Apache helicopters or two tanks.',
  },
  TU95: {
    name: 'Tupolev Tu-95 Bear',
    tier: 1,
    cls: 'military',
    fact: 'Russian bomber from 1956 with propellers that spin faster than sound — it’s so loud that submerged submarines can hear it fly over.',
  },
  T160: {
    name: 'Tupolev Tu-160 Blackjack',
    tier: 1,
    cls: 'military',
    fact: 'The largest and heaviest supersonic warplane ever built. Russians call it the "White Swan".',
  },
  CONC: {
    name: 'Concorde',
    tier: 1,
    cls: 'airliner',
    fact: 'Retired in 2003. If this appears, either the database is broken or you should call every news outlet on Earth.',
  },

  // ---- Tier 2: rare airliners & classics ----
  B748: {
    name: 'Boeing 747-8',
    tier: 2,
    cls: 'airliner',
    fact: 'The longest 747 and the very last one built — when production ended in 2023 it closed a 54-year run. Only 155 exist, just 3 airlines fly the passenger version.',
  },
  B744: {
    name: 'Boeing 747-400',
    tier: 2,
    cls: 'airliner',
    fact: 'The "Queen of the Skies". Once the backbone of long-haul travel; now nearly all survivors haul cargo instead of people.',
  },
  B742: {
    name: 'Boeing 747-200',
    tier: 2,
    cls: 'airliner',
    fact: 'A 1970s-era 747 — almost extinct. Anything still flying is roughly 40+ years old.',
  },
  B743: {
    name: 'Boeing 747-300',
    tier: 2,
    cls: 'airliner',
    fact: 'The rarest mainstream 747 — only 81 were ever built, and you can count the survivors on your fingers.',
  },
  B74S: {
    name: 'Boeing 747SP',
    tier: 2,
    cls: 'airliner',
    fact: 'A 747 chopped short for extreme range in 1976. NASA flew one with a giant telescope sticking out the side. About 45 ever built.',
  },
  A388: {
    name: 'Airbus A380',
    tier: 2,
    cls: 'airliner',
    fact: 'The biggest passenger plane ever — a full double-decker with room for 850+. Only 251 built, and nothing this size will likely ever be built again.',
  },
  MD11: {
    name: 'McDonnell Douglas MD-11',
    tier: 2,
    cls: 'airliner',
    fact: 'Three engines — one buried in the tail. Famously tricky to land; today almost all survivors fly boxes, not people.',
  },
  DC10: {
    name: 'McDonnell Douglas DC-10',
    tier: 2,
    cls: 'airliner',
    fact: 'The classic 1970s tri-jet. A handful still fly, including one converted into a flying eye hospital.',
  },
  L101: {
    name: 'Lockheed L-1011 TriStar',
    tier: 2,
    cls: 'airliner',
    fact: 'Could land itself in zero visibility back in 1972 — tech a decade ahead of its time. Essentially extinct; one survivor launches rockets from its belly.',
  },
  A345: {
    name: 'Airbus A340-500',
    tier: 2,
    cls: 'airliner',
    fact: 'Once flew the longest route on Earth (Singapore–New York, 18+ hours). Four engines made it too thirsty to survive — only 34 built.',
  },
  A346: {
    name: 'Airbus A340-600',
    tier: 2,
    cls: 'airliner',
    fact: 'Was the longest airliner in the world at 75 m. Four engines, terrible fuel economy, retired young — a rare treat now.',
  },
  A342: {
    name: 'Airbus A340-200',
    tier: 2,
    cls: 'airliner',
    fact: 'Only 28 ever built. Mostly survives as VIP and government transport.',
  },
  A343: {
    name: 'Airbus A340-300',
    tier: 2,
    cls: 'airliner',
    fact: 'A four-engine long-hauler airlines are actively retiring — Lufthansa is among the last flying it with passengers. See it while you can.',
  },
  IL76: {
    name: 'Ilyushin Il-76',
    tier: 2,
    cls: 'odd',
    fact: 'Soviet heavy-lifter with a glass greenhouse nose where a navigator sits. Built to land on dirt strips in Siberia.',
  },
  IL96: {
    name: 'Ilyushin Il-96',
    tier: 2,
    cls: 'airliner',
    fact: 'Russia’s four-engine flagship — barely 30 built. The Russian president’s "Air Force One" is one of these.',
  },
  IL62: {
    name: 'Ilyushin Il-62',
    tier: 2,
    cls: 'airliner',
    fact: 'Soviet long-hauler with four engines clustered at the tail and a pop-out tail wheel so it doesn’t tip over backwards.',
  },
  IL18: {
    name: 'Ilyushin Il-18',
    tier: 2,
    cls: 'airliner',
    fact: 'A Soviet turboprop airliner from 1957. Anything still flying is a museum piece with a job.',
  },
  B722: {
    name: 'Boeing 727-200',
    tier: 2,
    cls: 'airliner',
    fact: 'Three engines on the tail and built-in rear stairs (famously used by hijacker D.B. Cooper to parachute out with the ransom).',
  },
  B721: {
    name: 'Boeing 727-100',
    tier: 2,
    cls: 'airliner',
    fact: 'The original short 727 from 1963. A tiny handful still fly, mostly as freighters or VIP rides.',
  },
  B703: {
    name: 'Boeing 707',
    tier: 2,
    cls: 'airliner',
    fact: 'The plane that started the jet age in 1958. Civilian ones are basically gone — survivors are mostly military tankers and testbeds.',
  },
  DC86: {
    name: 'Douglas DC-8-60',
    tier: 2,
    cls: 'airliner',
    fact: 'A 1960s jetliner. A DC-8 once broke the sound barrier in a dive — the first airliner ever to go supersonic.',
  },
  DC87: {
    name: 'Douglas DC-8-70',
    tier: 2,
    cls: 'airliner',
    fact: 'Re-engined 1960s jetliner; NASA flew one as a flying science lab. Nearly extinct.',
  },
  MD82: {
    name: 'McDonnell Douglas MD-82',
    tier: 2,
    cls: 'airliner',
    fact: 'The "Mad Dog" — loud, fast, loved by pilots and avgeeks. Nearly extinct in passenger service.',
  },
  MD83: {
    name: 'McDonnell Douglas MD-83',
    tier: 2,
    cls: 'airliner',
    fact: 'The "Mad Dog" — loud, fast, loved by pilots and avgeeks. Nearly extinct in passenger service.',
  },
  MD88: {
    name: 'McDonnell Douglas MD-88',
    tier: 2,
    cls: 'airliner',
    fact: 'The "Mad Dog" — loud, fast, loved by pilots and avgeeks. Nearly extinct in passenger service.',
  },
  MD90: {
    name: 'McDonnell Douglas MD-90',
    tier: 2,
    cls: 'airliner',
    fact: 'The final evolution of the Mad Dog family before Boeing absorbed McDonnell Douglas. Very few left.',
  },
  AN22: {
    name: 'Antonov An-22',
    tier: 2,
    cls: 'odd',
    fact: 'The largest turboprop aircraft ever built — a Soviet monster from 1965 with double propellers on each engine.',
  },

  // ---- Tier 2: warbirds & vintage ----
  DC3: {
    name: 'Douglas DC-3',
    tier: 2,
    cls: 'warbird',
    fact: 'First flew in 1935 and some are STILL working for a living. The saying goes: "the only replacement for a DC-3 is another DC-3".',
  },
  B17: {
    name: 'Boeing B-17 Flying Fortress',
    tier: 2,
    cls: 'warbird',
    fact: 'WWII heavy bomber. 12,731 were built; fewer than 10 still fly. Each one is a flying memorial.',
  },
  B25: {
    name: 'North American B-25 Mitchell',
    tier: 2,
    cls: 'warbird',
    fact: 'The WWII bomber that famously launched off an aircraft carrier to raid Tokyo in 1942 — something bombers aren’t supposed to be able to do.',
  },
  B29: {
    name: 'Boeing B-29 Superfortress',
    tier: 2,
    cls: 'warbird',
    fact: 'Only TWO airworthy B-29s exist on Earth ("Doc" and "FIFI"). If this is live, you’re watching one of them.',
  },
  LANC: {
    name: 'Avro Lancaster',
    tier: 2,
    cls: 'warbird',
    fact: 'Legendary British WWII bomber. Exactly two still fly in the entire world — one in the UK, one in Canada.',
  },
  SPIT: {
    name: 'Supermarine Spitfire',
    tier: 2,
    cls: 'warbird',
    fact: 'The icon of the Battle of Britain. Around 60 still fly, mostly over England on summer weekends.',
  },
  HURI: {
    name: 'Hawker Hurricane',
    tier: 2,
    cls: 'warbird',
    fact: 'Shot down more enemy planes in the Battle of Britain than the Spitfire did, but got less of the glory. Roughly a dozen still fly.',
  },
  P51: {
    name: 'North American P-51 Mustang',
    tier: 2,
    cls: 'warbird',
    fact: 'The WWII fighter that escorted bombers all the way to Berlin. Possibly the most beloved propeller fighter ever built.',
  },
  CONI: {
    name: 'Lockheed Constellation',
    tier: 2,
    cls: 'warbird',
    fact: 'The most beautiful airliner ever built, with a curved dolphin body and triple tail. Just a couple still fly worldwide.',
  },
  VULC: {
    name: 'Avro Vulcan',
    tier: 2,
    cls: 'warbird',
    fact: 'British delta-wing nuclear bomber that howls like a jet-age dragon. None currently fly — if this appears, check it twice.',
  },

  // ---- Tier 3: cool military / oddballs (still worth a look) ----
  C17: {
    name: 'Boeing C-17 Globemaster III',
    tier: 3,
    cls: 'military',
    fact: 'A 280-ton cargo jet that can land on a short dirt strip and even reverse-park using its own engines.',
  },
  A400: {
    name: 'Airbus A400M Atlas',
    tier: 3,
    cls: 'military',
    fact: 'Europe’s big military airlifter. Its 8-blade propellers on each wing spin in opposite directions toward each other.',
  },
  C130: {
    name: 'Lockheed C-130 Hercules',
    tier: 3,
    cls: 'military',
    fact: 'In continuous production since 1954 — the longest production run of any military aircraft ever. It has landed on an aircraft carrier. Without a hook.',
  },
  C30J: {
    name: 'Lockheed C-130J Super Hercules',
    tier: 3,
    cls: 'military',
    fact: 'The modern version of a design from 1954 — the longest-produced military aircraft in history.',
  },
  K35R: {
    name: 'Boeing KC-135 Stratotanker',
    tier: 3,
    cls: 'military',
    fact: 'A flying gas station from the late 1950s — fighter jets pull up behind it mid-air and plug in.',
  },
  K35E: {
    name: 'Boeing KC-135E Stratotanker',
    tier: 3,
    cls: 'military',
    fact: 'A flying gas station from the late 1950s — fighter jets pull up behind it mid-air and plug in.',
  },
  KC46: {
    name: 'Boeing KC-46 Pegasus',
    tier: 3,
    cls: 'military',
    fact: 'The newest US flying gas station — the refueling operator flies the boom using a 3D video screen instead of lying in a window at the back.',
  },
  E3TF: {
    name: 'Boeing E-3 Sentry (AWACS)',
    tier: 3,
    cls: 'military',
    fact: 'A Boeing 707 wearing a giant spinning radar frisbee — it can see every aircraft for 400 km in any direction.',
  },
  E3CF: {
    name: 'Boeing E-3 Sentry (AWACS)',
    tier: 3,
    cls: 'military',
    fact: 'A Boeing 707 wearing a giant spinning radar frisbee — it can see every aircraft for 400 km in any direction.',
  },
  E737: {
    name: 'Boeing E-7 Wedgetail',
    tier: 3,
    cls: 'military',
    fact: 'A 737 with a giant radar surfboard bolted on top. It’s the flying air-traffic-control tower for an entire air force.',
  },
  E6: {
    name: 'Boeing E-6 Mercury',
    tier: 3,
    cls: 'military',
    fact: 'Its job is talking to submerged nuclear submarines — it trails an antenna up to 8 km long behind it while flying in tight circles.',
  },
  E8: {
    name: 'Boeing E-8 JSTARS',
    tier: 3,
    cls: 'military',
    fact: 'A radar plane that watches vehicles moving on the ground from 200+ km away.',
  },
  P8: {
    name: 'Boeing P-8 Poseidon',
    tier: 3,
    cls: 'military',
    fact: 'A 737 turned submarine hunter — it drops listening buoys and torpedoes. Yes, a 737 with torpedoes.',
  },
  R135: {
    name: 'Boeing RC-135',
    tier: 3,
    cls: 'military',
    fact: 'A spy plane that vacuums up radio and radar signals. When one of these orbits near a conflict zone, it’s listening to everything.',
  },
  P3: {
    name: 'Lockheed P-3 Orion',
    tier: 3,
    cls: 'military',
    fact: 'A 1960s submarine hunter with a magnetic stinger tail that detects subs by the metal in their hulls. Also flies into hurricanes for science.',
  },
  F15: {
    name: 'F-15 Eagle',
    tier: 3,
    cls: 'military',
    fact: 'Air combat record: 104 kills, 0 losses. One once landed safely with an entire wing missing.',
  },
  F16: {
    name: 'F-16 Fighting Falcon',
    tier: 3,
    cls: 'military',
    fact: 'The world’s most common fighter jet — deliberately built unstable so it turns instantly; computers keep it flying.',
  },
  F18: {
    name: 'F/A-18 Hornet',
    tier: 3,
    cls: 'military',
    fact: 'A carrier fighter built to slam onto ship decks. The Blue Angels fly these.',
  },
  F18S: {
    name: 'F/A-18 Super Hornet',
    tier: 3,
    cls: 'military',
    fact: 'A carrier fighter built to slam onto ship decks. The Blue Angels fly these.',
  },
  F35: {
    name: 'F-35 Lightning II',
    tier: 3,
    cls: 'military',
    fact: 'A stealth fighter where the pilot’s $400,000 helmet lets them see THROUGH the plane via cameras in the skin.',
  },
  F22: {
    name: 'F-22 Raptor',
    tier: 3,
    cls: 'military',
    fact: 'The most capable air-to-air fighter ever built, and stealthy — seeing one broadcast its position is the irony of the day.',
  },
  EUFI: {
    name: 'Eurofighter Typhoon',
    tier: 3,
    cls: 'military',
    fact: 'Built jointly by four countries; deliberately unstable for agility — its computers make 100s of corrections a second.',
  },
  RFAL: {
    name: 'Dassault Rafale',
    tier: 3,
    cls: 'military',
    fact: 'France’s do-everything fighter — it can take off from a carrier with a nuclear missile under one wing.',
  },
  A10: {
    name: 'A-10 Thunderbolt II',
    tier: 3,
    cls: 'military',
    fact: 'Less a plane with a gun, more a giant gun with a plane built around it. The cockpit sits in a titanium bathtub.',
  },
  V22: {
    name: 'Bell-Boeing V-22 Osprey',
    tier: 3,
    cls: 'military',
    fact: 'Half plane, half helicopter — its entire engines swivel 90° so it takes off straight up, then flies like a plane.',
  },
  H47: {
    name: 'Boeing CH-47 Chinook',
    tier: 3,
    cls: 'military',
    fact: 'The banana-shaped helicopter with two giant rotors and no tail rotor. In service since 1962 and faster than most attack helicopters.',
  },
  H64: {
    name: 'Boeing AH-64 Apache',
    tier: 3,
    cls: 'military',
    fact: 'Attack helicopter whose gun is slaved to the pilot’s eye — wherever the pilot looks, the gun points.',
  },
  AN12: {
    name: 'Antonov An-12',
    tier: 3,
    cls: 'odd',
    fact: 'The Soviet answer to the C-130, complete with a glass nose and (originally) a tail gun turret. Still hauling odd cargo around the world.',
  },
  AN26: {
    name: 'Antonov An-26',
    tier: 3,
    cls: 'odd',
    fact: 'A rugged Soviet workhorse still flying freight in places where runways are a suggestion.',
  },
  AN24: {
    name: 'Antonov An-24',
    tier: 3,
    cls: 'odd',
    fact: 'A 1960s Soviet turboprop still carrying passengers in remote corners of the world.',
  },
  AN2: {
    name: 'Antonov An-2',
    tier: 3,
    cls: 'odd',
    fact: 'The world’s biggest single-engine biplane. It can fly so slowly its manual has no stall speed listed — it just sort of parachutes.',
  },
  SHIP: {
    name: 'Airship',
    tier: 3,
    cls: 'odd',
    fact: 'An actual airship. There are only about 25 active blimps left on the entire planet.',
  },
  BALL: {
    name: 'Balloon',
    tier: 3,
    cls: 'odd',
    fact: 'A balloon with a transponder — could be weather research, could be tourism, could be more interesting than that.',
  },
};

// dbFlags bits from the ADS-B aggregator
const FLAG_MILITARY = 1;
const FLAG_INTERESTING = 2;

const EMERGENCY_SQUAWKS = {
  7500: 'HIJACK',
  7600: 'RADIO FAILURE',
  7700: 'EMERGENCY',
};

const TIER_INFO = {
  0: { label: 'EMERGENCY', color: '#ff2d55' },
  1: { label: 'Legendary', color: '#ffd60a' },
  2: { label: 'Rare', color: '#ff9f0a' },
  3: { label: 'Cool', color: '#64d2ff' },
};

// Decide if an aircraft is cool. Returns { tier, name, cls, reason, fact? } or null.
function classify(ac) {
  const squawkLabel = EMERGENCY_SQUAWKS[ac.squawk];
  if (squawkLabel || (ac.emergency && ac.emergency !== 'none')) {
    return {
      tier: 0,
      name: squawkLabel || ac.emergency.toUpperCase(),
      cls: 'emergency',
      reason: `squawk ${ac.squawk}`,
      fact: 'This aircraft is broadcasting an emergency code. Crews drill for this constantly — it usually ends with an uneventful landing.',
    };
  }
  const type = (ac.t || '').trim().toUpperCase();
  const entry = COOL_TYPES[type];
  if (entry) return { ...entry, reason: type };
  if (ac.dbFlags & FLAG_MILITARY) {
    return {
      tier: 3,
      name: type ? `Military (${type})` : 'Military aircraft',
      cls: 'military',
      reason: 'military',
      fact: 'Flagged as a military aircraft in the registration database, even though the type isn’t in our cool list.',
    };
  }
  if (ac.dbFlags & FLAG_INTERESTING) {
    return {
      tier: 3,
      name: type ? `Interesting (${type})` : 'Interesting aircraft',
      cls: 'odd',
      reason: 'flagged interesting',
      fact: 'The tracking community has flagged this specific airframe as interesting — special history, special owner, or special job.',
    };
  }
  return null; // a 737/A320/etc. nobody cares
}
