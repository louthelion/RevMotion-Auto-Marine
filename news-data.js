/* RevMotion Auto & Marine — news data store.
   Rendered by news.js on news.html (served as /news).
   Fleet pattern (same shape as Family First Equity Group's news-data.js
   and Nuvexa IQ's MARKET_NEWS): dated editions of full-story briefings,
   read in full on the page, newest first.

   DATA CONTRACT — one story record:
     id          unique slug, never reused
     lane        "central-florida" | "world" | "coming" | "market"
     headline    the story headline
     dateISO     story date, YYYY-MM-DD
     dateDisplay the same date written out, e.g. "November 19, 2026"
     body        array of paragraph strings — the FULL story, in plain
                 language, written from the source's reporting
     source      the source's name, in plain text
     sourceDate  the source's date, written out

   There is deliberately NO link or URL field in this model: stories
   never link out, so a click-out door is impossible by construction.
   Sources are named in plain text at the end of each story so readers
   can verify the reporting themselves.

   SCOPE: car and boat news, plus the MARKET lane (stock-market
   coverage) added by the owner's ruling of November 20, 2026 —
   every company page carries market talk alongside its own subject.
   The parked-company rule still governs the selling side: news and
   information only — no offers, no listings, no RevMotion prices,
   no buying or selling calls to action, no lead capture. Market
   stories report index moves in percentages and points, in plain
   language, and are information only — never investment advice.

   DAILY EDITOR PASS — how to update:
     1. Set REVMOTION_NEWS_EDITION to the new edition date.
     2. Add each new story as a record at the TOP of REVMOTION_NEWS
        (news.js also sorts newest first, so order is a backstop).
     3. Research each story from a real source first; never invent a
        story, number, date, price or quote. Credit the source in
        the source / sourceDate fields, in plain text.
     4. Keep old stories in the file — they are the archive. */
var REVMOTION_NEWS_EDITION = {
  dateISO: "2026-11-20",
  dateDisplay: "Friday, November 20, 2026"
};

var REVMOTION_NEWS = [
  {
    id: "market-wrap-2026-11-20",
    lane: "market",
    headline: "Wall Street's worst week since April 2025 ends in a rout: S&P 500 and Dow in correction, Nasdaq's 2026 gains gone",
    dateISO: "2026-11-20",
    dateDisplay: "November 20, 2026",
    body: [
      "Friday was the hardest day of a brutal week on Wall Street. The Nasdaq Composite plunged 5.28%, losing 1,261.47 points — the second-largest one-day points drop in the index's history. The S&P 500 fell 3.70%, or 265.44 points, its seventh straight losing session. The Dow Jones Industrial Average dropped 1.93%, or 949.73 points.",
      "Both the S&P 500 and the Dow are now in correction territory, meaning each has fallen more than 10% from its recent record high. The Nasdaq's drop erased every gain it had made in 2026, leaving it down about 2.7% for the year. For the full week, the Dow fell 8%, the S&P 500 fell 8.6%, and the Nasdaq fell 10% — the market's worst week since the first week of April 2025, when tariff announcements sent stocks into a tailspin.",
      "Two forces drove the selling: investors are unwinding the artificial-intelligence trade that led the market for two years, and minutes from the Federal Reserve's October meeting, released Wednesday, pointed to further interest-rate increases ahead. The VIX, Wall Street's fear gauge, jumped 26% on Friday to near 36."
    ],
    source: "Investopedia, Markets News",
    sourceDate: "November 20, 2026"
  },
  {
    id: "ai-trade-unwinds-2026-11-20",
    lane: "market",
    headline: "The AI trade unwinds: Nvidia falls 14% in a day, and even Anthropic's record IPO cannot lift the market",
    dateISO: "2026-11-20",
    dateDisplay: "November 20, 2026",
    body: [
      "The stocks that led the market up led it down. Nvidia, the bellwether of the AI boom, fell 14% on Friday, leading the Dow's decliners; its shares have lost about a third of their value in two weeks. Advanced Micro Devices dropped 13%, and Broadcom, Marvell Technology, and Micron each posted double-digit declines.",
      "Not even the biggest IPO on record could change the mood. Anthropic, the AI lab that debuted on Thursday — its shares jumped to $111.50 from an $83 IPO price and closed that day around $97 — fell nearly 9% on Friday to around $89 in its second session.",
      "The retreat spread well beyond chips: Meta Platforms fell 6%, and Tesla and SpaceX each fell 8%. Away from stocks, bitcoin traded around $59,000, its lowest level since June, gold futures fell 4%, oil futures rose 1.1%, and the yield on the 10-year Treasury note eased to 4.94% from 5.05% the day before."
    ],
    source: "Investopedia, Markets News",
    sourceDate: "November 20, 2026"
  },
  {
    id: "orange-county-boating-hearing-2026-12-01",
    lane: "central-florida",
    headline: "Orange County sets December 1 hearing on new boating speed and wake zones for local lakes",
    dateISO: "2026-11-20",
    dateDisplay: "November 20, 2026",
    body: [
      "Boaters on some of Central Florida's busiest lakes could soon be running under new speed and wake rules. Orange County is proposing changes to Chapter 8 of the county code, its Boats and Water Safety ordinance, and the plan goes to a public hearing before the Board of County Commissioners on Tuesday, December 1, 2026, at 2:00 p.m. in the Commission Chambers at 201 South Rosalind Avenue in Orlando. Residents may attend and comment.",
      "The proposal would designate idle speed, no wake areas and slow speed, minimum wake areas in certain portions of Big Sand Lake, the Butler Chain of Lakes, the Conway Chain of Lakes, Lake Hart, Lake Jessamine, Johns Lake, Lake Mary Jane and Lake Pickett. It would also designate a swim area and vessel-exclusion zone in a portion of Lake Butler. The county has already created a Swim Area and Vessel Exclusion (SAVE) zone at Egret Island, also called Bird Island, on Lake Butler: the swim area is marked by buoys, and no vessel of any kind may operate inside it.",
      "The changes are Phase II of the county's work to bring Chapter 8 up to date with current Florida law on boating safety zones. The county's Environmental Protection Commission held its own public hearing on the proposal on November 17, 2026. If the commissioners adopt the ordinance on December 1, it takes effect after approval by the Florida Fish and Wildlife Conservation Commission. Until then, the posted markers and the existing rules on each lake remain the ones to follow."
    ],
    source: "Orange County Government, Boats & Water Safety Ordinance (ocfl.net)",
    sourceDate: "November 17, 2026"
  },
  {
    id: "hyundai-elantra-2027-reveal",
    lane: "coming",
    headline: "Hyundai reveals the 2027 Elantra: bigger, bolder, with a hybrid to follow",
    dateISO: "2026-11-19",
    dateDisplay: "November 19, 2026",
    body: [
      "Hyundai has officially revealed the new Elantra at the 2026 Los Angeles Auto Show. The Elantra is Hyundai's second-best-selling model in America, and the new car follows the same playbook as the recently revealed Tucson: bigger, bolder styling and more room inside. The car was first shown in June for the Korean market, where it is sold as the Avante.",
      "The new Elantra is 3.4 inches longer overall, with a wheelbase 1.2 inches longer and a body 1.2 inches wider than the car it replaces. Rear-seat passengers gain 1.1 inches of legroom, 0.4 inch of headroom and 0.9 inch of shoulder room, and the trunk grows from 14.2 to 16.9 cubic feet. Hyundai quotes a drag coefficient of 0.26 for the new shape. Inside, a 12.9-inch infotainment screen runs Hyundai's newest Android Automotive-based operating system, with physical controls for climate and audio kept below it, and a 9.9-inch instrument display ahead of the driver.",
      "Standard models use a revised naturally aspirated 2.0-liter four-cylinder with 147 horsepower and 132 pound-feet of torque, paired with a CVT. The hybrid pairs a 1.6-liter four-cylinder with a more powerful electric motor and a slightly larger battery pack, making 155 horsepower in total, and Hyundai estimates 53 mpg combined for the most frugal configuration. The hybrid also gets Stay Mode, which lets owners run the climate and sound systems off the hybrid battery for up to half an hour.",
      "The first of the new Elantras will reach dealers early next year as 2027 models, starting with the non-hybrid cars; the hybrid follows soon after, as a 2028 model. Each version comes in three trim levels: SE, SEL Sport and Limited. Hyundai has not announced pricing. Speaking to media at the show, Hyundai Motor North America CEO Randy Parker noted that sedans account for over 20 percent of Hyundai sales, saying: 'While others have walked away from this segment, we have never left.'"
    ],
    source: "CarBuzz report on the Hyundai reveal",
    sourceDate: "November 19, 2026"
  },
  {
    id: "lamborghini-temerario-spyder-unveil",
    lane: "world",
    headline: "Lamborghini unveils the Temerario Spyder, its first Spyder with a retractable hard top",
    dateISO: "2026-11-19",
    dateDisplay: "November 19, 2026",
    body: [
      "Lamborghini has unveiled the Temerario Spyder in Sant'Agata Bolognese, Italy, and in Los Angeles: an open-top version of its V8 hybrid supercar, and the first Lamborghini Spyder ever fitted with a retractable hard top, where every Spyder before it used a fabric roof. The launch also marks 50 years of open-top series-production Lamborghinis, a line that began with the 1976 Silhouette.",
      "The fully electric hard top stows in a patented vertical position behind the seats, driven by ten electric actuators instead of a traditional electro-hydraulic system. The cycle takes about 17 seconds and can be performed at speeds of up to about 31 mph. Lamborghini says stowing the roof this way lowers the car's center of gravity by 3 mm compared with the closed configuration, without changing its weight distribution. Two hexagonal cowls behind the seats mark the Spyder out from the coupe, and the seats carry a three-stage neck warmer for cooler top-down days.",
      "The powertrain carries over from the coupe unchanged: a twin-turbocharged 4.0-liter V8 paired with three electric motors, producing a combined 907 horsepower and 590 pound-feet of torque. Lamborghini quotes 0 to 62 mph in 2.8 seconds and a top speed of 213 mph, the same as the fixed-roof car. Pricing has not yet been announced."
    ],
    source: "AutoGuide report on the Lamborghini announcement",
    sourceDate: "November 19, 2026"
  },
  {
    id: "rossinavi-seazens-launch",
    lane: "world",
    headline: "Rossinavi launches Seazens, a 47.5-meter adventure yacht built around her tenders",
    dateISO: "2026-11-12",
    dateDisplay: "November 12, 2026",
    body: [
      "Italian shipyard Rossinavi has launched its latest custom superyacht, Seazens, in Viareggio, Italy. The 47.5-meter adventure yacht, previously known as Project Berserk 47, is the shipyard's first purpose-designed adventure yacht, built to combine long-distance cruising with the flexibility to explore remote destinations.",
      "Seazens has a steel hull and an aluminum superstructure, with a gross tonnage below 500 GT. Her exterior design was developed in-house by Rossinavi, naval architecture is by Arrabito Naval Architects, and the interiors by The Touch Studio use organic forms, timber finishes and natural stone. She accommodates up to 11 guests across five cabins, including a full-beam owner's suite on the main deck, and her indoor beach club on the lower deck includes a gym, sauna and shower facilities.",
      "The design is organized around the owner's activities on the water. The main-deck cockpit can carry two large tenders measuring 37 feet and 21 feet, launched and recovered by a concealed crane with an 8.6-meter boom and a lifting capacity of up to 5.5 tonnes; when the tenders are deployed, the same deck converts into an outdoor lounge. Twin Caterpillar C32 ACERT engines are expected to give a maximum speed of about 15 knots and a cruising speed of 12 knots, with a projected range of approximately 4,000 nautical miles at 10 knots. The launch is a construction milestone rather than a delivery: Rossinavi has not confirmed a final delivery date."
    ],
    source: "Rossinavi launch announcement via PressMare",
    sourceDate: "November 12, 2026"
  },
  {
    id: "pearl-100-hybrid-fort-lauderdale-premiere",
    lane: "coming",
    headline: "Pearl 100 Hybrid makes its world debut at Fort Lauderdale, the builder's first hybrid flagship",
    dateISO: "2026-11-11",
    dateDisplay: "November 11, 2026",
    body: [
      "British builder Pearl Yachts used the 2026 Fort Lauderdale International Boat Show to introduce the Pearl 100 Hybrid, a new 30-meter flagship and the first hybrid propulsion installation in the company's range. The show's organizer had listed the model among its 2026 world-debut yachts ahead of the event, which ran October 28 to November 1, and Pearl's announcement of the world premiere notes that the model was also named a finalist in the show's Best of Show Awards.",
      "The hybrid system is an e-Motion installation that connects two MAN V12 diesel engines, each rated at 2,000 horsepower, with two radial-flux permanent-magnet electric motors through a twin-shaft arrangement. The published arrangement is intended to support different operating modes, including periods of electric propulsion and the ability to supply the yacht's hotel loads from an associated power pack. Pearl's release sets out the concept and the equipment; it does not publish independently verified fuel-saving or performance figures.",
      "The raised-pilothouse yacht carries five en-suite guest cabins, including a main-deck owner's suite with a private foredeck terrace and a second full-beam suite amidships on the lower deck, plus separate accommodation for four or five crew. Exterior styling and naval architecture are by Dixon Yacht Design, and the interiors are by Kelly Hoppen Interiors. The Pearl 100 Hybrid extends a range that had already moved into the over-24-meter market with the Pearl 82."
    ],
    source: "Superyacht Guide report on the Pearl Yachts announcement",
    sourceDate: "November 11, 2026"
  }
];
