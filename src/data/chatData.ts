import type { ChatIntent } from '../types/chat';

export const GHANA_KNOWLEDGE_BASE: ChatIntent[] = [
    {
        id: 'safety_general',
        keywords: ['safe', 'safety', 'danger', 'crime', 'security', 'travel safe'],
        response: () => {
            const responses = [
                "Yes o, Ghana is mostly safe. Most people that visit usually have a good time here and barely complain of theft. You see, we Ghanaians are very friendly and always willing to help. Just be smart, especially if you're travelling solo—watch your things, avoid dark areas at night, and if you have to go out, be extra alert in some busy parts of Accra like Circle and Teshie–Nungua, where pickpockets can operate. But overall, Ghanaians are welcoming, and it's a safe place to visit.",
                "Well, most of Ghana is safe, but like anywhere, there are areas you need to be careful in. Up north — Upper East, Upper West, and parts of the Savannah region — there can be some unrest and occasional security issues, but it's not something to worry too much about. It's a good idea to check local news, and if you're open-minded, you'll surely make a Ghanaian buddy who can help you out. In the cities, some neighborhoods at night, like parts of Accra, Kumasi, or Takoradi, can be a bit risky if you're not paying attention. But overall, most places are fine, and Ghanaians are friendly and always willing to help if you ask."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        },
    },
    {
        id: 'safety_violent_crime',
        keywords: ['violent', 'murder', 'attack', 'assault', 'robbery'],
        response: () => "Violent crime does happen in Ghana, but it's not something most visitors experience. Most people travel around safely, especially during the day. That said, you should still stay alert, especially at night in busy cities like Accra, Kumasi, or Takoradi. Keep your belongings close, don't flash money or valuables, and trust your instincts. If you're smart and aware, you'll enjoy Ghana without any problems — Ghanaians are mostly friendly and will usually help if you need guidance.",
    },
    {
        id: 'safety_pickpocket',
        keywords: ['pickpocket', 'theft', 'steal', 'stolen', 'petty crime'],
        response: () => "Pickpocketing and petty theft can happen, especially in busy places like markets, bus stations, and some tourist spots. As a Ghanaian, I'd advise you to pay extra attention to your belongings in areas like Accra Central — for example, Markola and its surroundings — and around Accra Circle, especially Tip Toe Lane, which is a hotspot for pickpockets. You should be extra vigilant, especially if you're travelling solo. You barely see pickpockets at major tourist spots, but it's always better to be careful. Don't carry too much cash, keep your bag close, and stay alert in crowded areas. Most Ghanaians are friendly and willing to help if you ask, but a little caution goes a long way.",
    },
    {
        id: 'safety_beaches',
        keywords: ['beach safe', 'beaches safe', 'ocean safe', 'swimming safe'],
        response: () => "Beaches in Ghana are mostly safe, but you need to be careful, especially at night. During the day, you can enjoy them without much worry. The main concern is petty theft — don't leave your things unattended, and avoid flaunting valuables. Some public beaches can get crowded, so keep an eye on your belongings. Overall, Ghanaians are friendly and will usually help if you ask, but it's always smart to stay alert.",
    },
    {
        id: 'safety_road',
        keywords: ['road safe', 'driving safe', 'highway', 'travel by road'],
        response: () => "Traveling by road in Ghana is generally fine, but you need to be careful. Roads in some areas can be rough, and night driving isn't always safe because of poor lighting and occasional highway robbery. If you're traveling long distances, try to go during the day and use reputable transport — like registered taxis or trusted bus services. Keep your doors locked and windows up, and always stay alert, especially in less familiar areas. Most Ghanaians are helpful, so don't be shy to ask locals for advice on safe routes.",
    },
    {
        id: 'safety_driving',
        keywords: ['can i drive', 'driving in ghana', 'rent a car', 'self drive'],
        response: () => "Yes, you can drive in Ghana, but you need to be careful. Roads can be tricky, some areas have poor street lighting, and traffic rules aren't always strictly followed. It's best to drive during the day, especially if you're new here. Keep your doors locked, windows up, and always be alert. If you're unsure, ask a local — Ghanaians are usually happy to give tips on the safer routes.",
    },
    {
        id: 'safety_transport',
        keywords: ['taxi safe', 'uber', 'bolt', 'tro tro', 'public transport', 'bus'],
        response: () => "Taxis and public transport in Ghana are generally safe if you take the right precautions. Always use registered taxis or app-based services — avoid unmarked or 'informal' taxis, especially at night. Tro-tros (shared minibuses) are cheap and popular, but they can be crowded and a bit chaotic, so watch your belongings. Most drivers are honest, but it's smart to stay alert, keep your bag close, and avoid flashing cash.",
    },
    {
        id: 'safety_kidnapping',
        keywords: ['kidnap', 'kidnapping', 'abduction', 'hostage'],
        response: () => "Kidnapping for tourists is not very common in Ghana, but it can happen, especially in certain areas or near the borders. Most visitors don't experience it at all. The main thing is to stay alert, avoid risky areas at night, and use trusted transport. If you're travelling to less familiar places, it's always a good idea to connect with locals who can guide you. Overall, Ghana is much safer than many people think, and most Ghanaians are welcoming and helpful.",
    },
    {
        id: 'safety_scams',
        keywords: ['scam', 'fraud', 'cheat', 'con', 'fake'],
        response: () => "Yes o, scams can happen, but don't worry too much — just be careful. Some people might try to trick tourists with fake jobs, fake taxi drivers, or even small street scams. The best thing is to always check who you're dealing with, don't hand over money to strangers, and use trusted services. Most Ghanaians are honest and friendly, and if you're cautious, you'll be fine and enjoy your stay.",
    },
    {
        id: 'safety_solo_female',
        keywords: ['solo female', 'woman alone', 'female traveler', 'girl traveling'],
        response: () => "Yes, Ghana can be safe for solo female travelers, but you need to be smart and take precautions. Stick to well-known areas, avoid walking alone at night, and use trusted transport. Most Ghanaians are very friendly and helpful, so don't hesitate to ask for directions or advice. Just stay aware of your surroundings, keep your belongings close, and you'll enjoy your trip without problems.",
    },
    {
        id: 'weather_august',
        keywords: ['august', 'weather', 'rain', 'climate'],
        response: () => "August is a fine time to visit! It's our 'little dry season' here in the South. The weather is cool (around 24-28°C) and not too hot, so you won't sweat too much. It's perfect for roaming around and enjoying festivals!",
    },
    {
        id: 'vaccination',
        keywords: ['vaccine', 'yellow fever', 'health', 'shots', 'medical'],
        response: () => "Yes o! You strictly need your **Yellow Fever vaccination card** to enter Ghana. They will check it at the airport before you even smell the fresh air. Also, malaria meds are a good idea. Abeg, see your doctor 4-6 weeks before you come.",
    },
    {
        id: 'beaches',
        keywords: ['beach', 'swim', 'ocean', 'coast', 'sea'],
        response: () => "You want to chill? Head to the Western Region—Busua and Axim are proper vibes for surfing and relaxing. If you are near Accra, Bojo Beach or Kokrobite are cool spots to catch some sea breeze and enjoy fresh tilapia!",
    },
    {
        id: 'expensive_december',
        keywords: ['december', 'cost', 'expensive', 'price', 'christmas'],
        response: () => "Ei, December in Ghana is a whole mood! We call it 'Detty December'. It's packed with parties like AfroFuture. But chale, prices for flights and hotels can double. If you want to come then, you strictly need to book months in advance!",
    },
    {
        id: 'cape_coast',
        keywords: ['cape coast', 'castle', 'slave', 'history', 'dungeon'],
        response: () => "Cape Coast Castle is very powerful. You will feel the history there. I recommend you go early morning, around 9 AM, so the sun doesn't beat you too much. It's about a 3-hour drive from Accra. You can also pass by Kakum National Park to walk on the canopy!",
        actions: [
            {
                label: "Show Cape Coast Tours",
                type: "SHOW_TOURS",
                payload: { region: "Central" }
            }
        ]
    },
    {
        id: 'regions',
        keywords: ['region', 'north', 'volta', 'ashanti', 'kumasi'],
        response: () => "We have 16 beautiful regions! Greater Accra is for city vibes, Ashanti is for deep culture and Kente, Central is for history, and Volta... ei, the waterfalls there are sweet! The North too gives you a proper safari experience. Where you want to go?",
    },
    {
        id: 'budget_tip',
        keywords: ['budget', 'cheap', 'save', 'money', 'cost'],
        response: () => "To save money, try our local street food—Waakye and Kelewele are sweet and cheap! Take Tro-tros (our minibuses) if you want the real experience, or just use Uber/Bolt. And abeg, don't forget to bargain small in the markets!",
        actions: [
            {
                label: "Calculate Budget",
                type: "CALCULATE_BUDGET"
            }
        ]
    },
    {
        id: 'greeting',
        keywords: ['hello', 'hi', 'hey', 'greetings', 'start'],
        response: () => "Hello there! My name is Akua Adepa, your trusted guide here to answer all your questions around Ghana.",
    },
    {
        id: 'budget_general_expensive',
        keywords: ['expensive', 'cost', 'price', 'cheap', 'budget', 'afford'],
        response: () => "Ghana is not too expensive, but it's not the cheapest either. Accommodation and transport are your biggest costs. Food and local experiences are very affordable, so with good planning Ghana becomes a comfortable mid-range destination.",
    },
    {
        id: 'budget_food_daily',
        keywords: ['food cost', 'meal price', 'eat cost', 'dining budget', 'food budget'],
        response: () => "If you mix local and restaurant meals: **GH₵120–250/day** for local food; **GH₵300–700/day** for restaurants, cafés, and beach spots. Local meals give you great value.",
    },
    {
        id: 'budget_weekly',
        keywords: ['week budget', '7 days cost', 'weekly cost', 'how much for a week'],
        response: () => "Budget depends on your travel style: **Budget $350–$550**, **Mid-range $650–$1,000**, **Comfort/Luxury $1,200+**. Accommodation and tours influence the cost most.",
    },
    {
        id: 'transport_accra_internal',
        keywords: ['transport inside accra', 'getting around accra', 'accra transport cost'],
        response: () => "Transportation inside of Accra is always dependent on which part you moving to. If you are moving within the central market area, or if you’re using Uber/Bolt plus a few trotros, **GH₵80–200/day** is enough. Traffic can increase prices during rush hour, but overall transport is affordable.",
    },
    {
        id: 'transport_taxi_expensive',
        keywords: ['taxi expensive', 'taxi price', 'taxi cost', 'negotiate taxi'],
        response: () => "Traditional taxis can be pricey if you don’t negotiate. Some drivers quote tourist rates. Always ask: “Boss, how much? Can you reduce small?” Uber/Bolt is usually cheaper and clearer. The trick here is act like a foreigner but think like a local... lol!",
    },
    {
        id: 'money_momo_useful',
        keywords: ['momo', 'mobile money', 'cash or momo', 'payment method'],
        response: () => "Yes! Mobile Money is very useful. Once you get a Ghana SIM, you can register easily. Markets, shops, and even many food vendors accept MoMo, so you don’t need to carry much cash. But one last trick: always carry a little cash because typical local food vendors not all will like the MoMo, but in all it's useful.",
    },
    {
        id: 'cost_attractions',
        keywords: ['attraction cost', 'castle cost', 'museum price', 'kakum cost', 'entry fee'],
        response: () => "Major attractions like Cape Coast Castle, Kakum, and museums cost **GH₵100-150** for foreigners. Local waterfalls and beaches range **GH₵20–70**. Some places are cheaper on weekdays.",
    },
    {
        id: 'budget_travel_good',
        keywords: ['budget travel', 'good for budget', 'cheap travel', 'backpacker'],
        response: () => "Yes. If you eat local food, use trotros, and stay in budget guesthouses, Ghana is very doable on **GH₵150–250/day**. Hotels in Accra are what push budgets up. But with me, Adepa, your local champion, trust that I recommend the best budget hotels in Accra you hardly find on the internet!",
    },
    {
        id: 'cost_water_snacks',
        keywords: ['water price', 'bottle water', 'snack cost', 'street food price'],
        response: () => "Water is **GH₵5–8** for a medium and **10-15 cedis** for a bottle... prices may be a little higher especially at some restaurants so be mindful. Snacks like meat pie, bofrot, or spring rolls cost **GH₵5–15**. Street food is cheap and filling.",
    },
    {
        id: 'budget_comparison_west_africa',
        keywords: ['west africa', 'togo', 'benin', 'ivory coast', 'expensive than'],
        response: () => "Ghana is slightly more expensive for accommodation compared to Togo, Benin, or Ivory Coast. But food and transport cost about the same or even cheaper. Safety and convenience make up for it.",
    },
    {
        id: 'transport_cape_coast_day_trip',
        keywords: ['cape coast day trip', 'visit cape coast', 'accra to cape coast cost'],
        response: () => "Budget: **GH₵250–400**. Mid-range Uber/private: **GH₵600–1200**. Tours: **$90–$150**. You can go cheaper with STC or trotros.",
    },
    {
        id: 'cost_nightlife_accra',
        keywords: ['nightlife cost', 'club entry', 'osu nightlife', 'east legon nightlife'],
        response: () => "Accra is the champion when it comes to nightlife! Clubs in Osu/East Legon sometimes charge **GH₵50–150** entry. Drinks range **GH₵20–150**. Local bars (spots) are much cheaper.",
    },
    {
        id: 'money_currency_exchange',
        keywords: ['usd', 'eur', 'gbp', 'exchange', 'bring cash', 'currency'],
        response: () => "Bring **USD** — it’s the easiest to exchange. EUR and GBP also work but may get slightly lower rates. Avoid airport exchange; use forex bureaus in town.",
    },
    {
        id: 'budget_cape_coast',
        keywords: ['cape coast budget', 'trip to cape coast', 'cost cape coast'],
        response: () => "For a 3-day trip to Cape Coast, budget around **GH₵900–1,300** for budget travel, **GH₵1,800–2,500** for mid-range, and **GH₵4,000+** for high-end. This covers accommodation, food, transport, and entry fees to places like the Castle and Kakum National Park.",
    },
    {
        id: 'money_daily_cash',
        keywords: ['cash daily', 'how much cash', 'carry cash'],
        response: () => "**GH₵100–250** is usually fine for daily cash needs if you're using MoMo or Uber for larger payments. Carrying too much cash isn't necessary as digital payments are widely accepted.",
    },
    {
        id: 'safety_solo',
        keywords: ['solo safe', 'solo traveler', 'safe for solo'],
        response: () => "Yes, Ghana is one of Africa’s safest countries for solo travelers. Just use normal street smarts, especially at night, and you'll be fine. Ghanaians are very friendly!",
    },
    {
        id: 'budget_food_daily',
        keywords: ['food budget', 'cost of food', 'eating cost'],
        response: () => "For food, budget around **GH₵40–80/day** for local food, **GH₵90–150/day** for a mix of local and restaurants, and **GH₵200+** if you plan to dine at fancy restaurants.",
    },
    {
        id: 'essentials_insurance',
        keywords: ['travel insurance', 'need insurance', 'medical insurance'],
        response: () => "It's highly recommended to have travel insurance. Clinics are good, but private care can be expensive without insurance. Better safe than sorry!",
    },
    {
        id: 'budget_outside_accra',
        keywords: ['outside accra', 'cheap travel', 'kumasi cost', 'tamale cost'],
        response: () => "Yes, traveling outside Accra is generally cheaper. Cities like Cape Coast, Kumasi, Ho, and Tamale offer lower prices for accommodation and food compared to the capital.",
    },
    {
        id: 'budget_hotel_average',
        keywords: ['hotel price', 'average hotel', 'cost of hotel'],
        response: () => "Average hotel prices vary: Budget spots are **GH₵200–350**, Mid-range around **GH₵450–900**, and High-end hotels (especially in Accra) can range from **GH₵1,500 to GH₵3,500+**.",
    },
    {
        id: 'essentials_power',
        keywords: ['power adapter', 'plug type', 'voltage'],
        response: () => "Ghana uses UK-style **Type G plugs** with **230V**. It's best to bring an adapter and a surge protector to keep your devices safe.",
    },
    {
        id: 'essentials_sim',
        keywords: ['sim card', 'data cost', 'mtn', 'airteltigo', 'internet cost'],
        response: () => "SIM cards are cheap, costing between **GH₵5–50** depending on the network. MTN has the widest coverage but can be pricier. Data bundles typically range from **GH₵50–150** for a week.",
    },
    {
        id: 'budget_souvenirs',
        keywords: ['souvenir cost', 'budget for souvenirs', 'art cost'],
        response: () => "Budget **GH₵50–200** for small items and **GH₵300–700** for larger art, crafts, or fabrics. Prices can be higher for foreigners, so don't forget to negotiate!",
    },
    {
        id: 'transport_uber_outside_accra',
        keywords: ['uber outside accra', 'bolt outside accra', 'uber long trip', 'bolt long trip'],
        response: () => "Yes, you can use Uber/Bolt for long trips, but it's expensive. It's better to use **STC, VIP buses**, or hire a private driver for long-distance routes.",
    },
    {
        id: 'transport_private_driver',
        keywords: ['private driver cost', 'driver for day', 'hire driver'],
        response: () => "A private driver typically costs **GH₵500–900/day** in Accra, depending on the distance and fuel prices. It's a comfortable way to get around!",
    },
    {
        id: 'money_tipping',
        keywords: ['tipping', 'do i need to tip', 'tip amount'],
        response: () => "Tipping isn't mandatory but is appreciated. For restaurants, **GH₵5–20** is standard. Small tips for drivers and porters are also welcome.",
    },
    {
        id: 'cost_laundry',
        keywords: ['laundry cost', 'wash clothes', 'laundry price'],
        response: () => "Laundry typically costs **GH₵20–50 per load** at local services. Hotels will usually charge more for laundry services.",
    },
    {
        id: 'transport_domestic_flights',
        keywords: ['domestic flight cost', 'flight to kumasi', 'flight to tamale', 'flight to takoradi'],
        response: () => "Domestic flights (Accra to Kumasi, Tamale, or Takoradi) usually cost **GH₵800–1,400 one-way**, depending on the route and booking time.",
    },
    {
        id: 'cost_beaches',
        keywords: ['beach entry fee', 'beach cost', 'free beaches'],
        response: () => "Some beaches are free, but private ones and popular spots in Accra usually charge **GH₵20–50** for entry.",
    },
    {
        id: 'cost_drinks',
        keywords: ['drink price', 'cost of beer', 'cocktail price', 'club drinks'],
        response: () => "Local beer costs **GH₵15–25**, cocktails range from **GH₵50–100**, and drinks at clubs are typically **GH₵80–150**.",
    },
    {
        id: 'budget_hidden_fees',
        keywords: ['hidden fees', 'extra costs', 'camera fee'],
        response: () => "Entry fees are usually straightforward, but watch out for small **camera fees (GH₵10–30)** at some tourist sites.",
    },
    {
        id: 'cost_internet',
        keywords: ['internet cost', 'wifi cost', 'data bundle price'],
        response: () => "Home WiFi costs **GH₵300–600/month**, while mobile data bundles range from **GH₵20–100** depending on your usage.",
    },
    {
        id: 'essentials_visa_arrival',
        keywords: ['visa on arrival', 'get visa at airport', 'visa availability'],
        response: () => "Visa on arrival is available for some travelers, mainly during 'Year of Return' events. Otherwise, it's best to **apply in advance** at a Ghanaian embassy.",
    },
    // ==========================================
    // CULTURAL ETIQUETTE
    // ==========================================
    {
        id: 'culture_greetings',
        keywords: ['greeting etiquette', 'how to greet', 'shaking hands'],
        response: () => "Greetings are very important in Ghana! Always greet people from right to left. A handshake is common, often followed by a finger snap. Always acknowledge elders first.",
    },
    {
        id: 'culture_right_hand',
        keywords: ['right hand', 'left hand', 'eating with hand', 'giving money'],
        response: () => "Always use your **right hand** for eating, shaking hands, and giving or receiving items. Using your left hand is considered disrespectful in Ghanaian culture.",
    },
    {
        id: 'culture_photos',
        keywords: ['taking photos', 'photo etiquette', 'can i take pictures'],
        response: () => "Always ask for permission before taking photos of people or market stalls. Some people may ask for a small tip (token) in exchange for a photo.",
    },
    {
        id: 'culture_dress_code',
        keywords: ['dress code', 'what to wear', 'clothing etiquette'],
        response: () => "Ghanaians generally dress smartly. Casual wear is fine, but avoid overly revealing clothes in conservative areas or villages. For church or formal events, dress your best!",
    },
    {
        id: 'culture_bargaining',
        keywords: ['how to bargain', 'negotiating prices', 'market prices'],
        response: () => "Bargaining is expected in markets and with taxi drivers. Start by offering about 50-60% of the initial price and meet somewhere in the middle. It's a friendly interaction!",
    },

    // ==========================================
    // LANGUAGE BASICS (TWI)
    // ==========================================
    {
        id: 'language_akwaaba',
        keywords: ['akwaaba meaning', 'what does akwaaba mean', 'welcome in ghana'],
        response: () => "**Akwaaba** means 'Welcome'. You'll hear this everywhere! The proper response is usually 'Medaase' (Thank you).",
    },
    {
        id: 'language_medaase',
        keywords: ['thank you in twi', 'how to say thank you', 'medaase meaning'],
        response: () => "**Medaase** (Me-daa-se) means 'Thank you'. Use it often – Ghanaians appreciate it when you try to speak the local language!",
    },
    {
        id: 'language_etesen',
        keywords: ['how are you in twi', 'ete sen meaning', 'greeting in twi'],
        response: () => "**Ete sen?** (Eh-teh-sen) means 'How are you?'. The response is usually **'Eyɛ'** (Eh-yeh), meaning 'It is good' or 'I am fine'.",
    },
    {
        id: 'language_obroni',
        keywords: ['obroni meaning', 'why call me obroni', 'white person ghana'],
        response: () => "**Obroni** means 'foreigner' or 'white person'. It is not an insult! It's often used affectionately or just to get your attention. Just smile and wave!",
    },
    {
        id: 'language_chale',
        keywords: ['chale meaning', 'what is chale', 'friend in ghana'],
        response: () => "**Chale** (Cha-lay) is Ghanaian slang for 'friend', 'buddy', or 'mate'. You'll hear it used constantly, like 'Chale, let's go!' or 'Oh chale!'.",
    },

    // ==========================================
    // FOOD DESCRIPTIONS
    // ==========================================
    {
        id: 'food_jollof',
        keywords: ['what is jollof', 'ghana jollof', 'best jollof'],
        response: () => "**Jollof Rice** is a legendary one-pot rice dish cooked in a spicy tomato stew. Ghana Jollof is arguably the best in the world (don't tell the Nigerians!). It's a must-try.",
    },
    {
        id: 'food_fufu',
        keywords: ['what is fufu', 'how to eat fufu', 'fufu ingredients'],
        response: () => "**Fufu** is a staple dish made from pounded cassava and plantain. It's swallowed (not chewed!) with a light soup like Goat Light Soup or Groundnut Soup. It's a hearty meal!",
    },
    {
        id: 'food_banku',
        keywords: ['what is banku', 'banku and tilapia', 'fermented corn'],
        response: () => "**Banku** is a fermented corn and cassava dough dish, usually served with grilled Tilapia and hot pepper sauce. It has a slightly sour taste and is delicious!",
    },
    {
        id: 'food_kelewele',
        keywords: ['what is kelewele', 'spicy plantain', 'street food'],
        response: () => "**Kelewele** is a popular street snack of spicy fried plantain cubes seasoned with ginger and pepper. It's sweet, spicy, and perfect for a night snack.",
    },
    {
        id: 'food_red_red',
        keywords: ['what is red red', 'bean stew', 'fried plantain beans'],
        response: () => "**Red Red** is a flavorful black-eyed bean stew cooked in palm oil, served with fried plantains (Gari optional). It's a favorite lunch dish and very filling!",
    },

    // ==========================================
    // HEALTH & EMERGENCY
    // ==========================================
    {
        id: 'health_malaria',
        keywords: ['malaria risk', 'malaria pills', 'mosquitoes in ghana'],
        response: () => "Malaria is a risk in Ghana. It's best to take anti-malaria medication prescribed by your doctor, use insect repellent, and sleep under treated mosquito nets.",
    },
    {
        id: 'health_emergency',
        keywords: ['emergency number', 'police number', 'ambulance number'],
        response: () => "In case of emergency, dial **193** for Ambulance/Fire or **191** for Police. Save these numbers on your phone just in case!",
    },
    {
        id: 'health_pharmacy',
        keywords: ['pharmacies', 'buying medicine', 'drug store'],
        response: () => "Pharmacies are common in cities and towns. They sell most basic medications, including malaria treatment and painkillers. Look for the green cross sign.",
    },

    // ==========================================
    // FESTIVALS & EVENTS
    // ==========================================
    {
        id: 'festival_homowo',
        keywords: ['homowo festival', 'ga festival', 'accra festival'],
        response: () => "**Homowo** ('Hooting at Hunger') is celebrated by the Ga people of Accra in August/September. It involves sprinkling traditional food (Kpokpoi) and street carnivals.",
    },
    {
        id: 'festival_akwasidae',
        keywords: ['akwasidae festival', 'ashanti festival', 'kumasi festival'],
        response: () => "**Akwasidae** is a magnificent Ashanti celebration held every 42 days at the Manhyia Palace in Kumasi. It's a great chance to see the Asantehene (King) in full regalia.",
    },
    {
        id: 'festival_chale_wote',
        keywords: ['chale wote', 'street art festival', 'jamestown festival'],
        response: () => "**Chale Wote** is a massive street art festival held in Jamestown, Accra, every August. It features graffiti, music, dance, and alternative art. It's a vibe!",
    },

    // ==========================================
    // WEATHER & BEST TIME
    // ==========================================
    {
        id: 'weather_general',
        keywords: ['best time to visit', 'rainy season', 'ghana weather', 'when to go'],
        response: () => "The best time to visit is **November to March** (Dry Season) when it's sunny and humid. The rainy season is April to June and September to October. August is cool and dry—perfect for festivals!",
    },

    // ==========================================
    // LOCAL LAWS & TABOOS
    // ==========================================
    {
        id: 'laws_drugs',
        keywords: ['drugs in ghana', 'marijuana laws', 'smoking weed'],
        response: () => "Drug laws are strict in Ghana. Possession of marijuana (wee) is illegal and can lead to jail time. Police do conduct searches, so please stay safe and avoid illegal substances.",
    },
    {
        id: 'laws_lgbtq',
        keywords: ['lgbtq safe', 'gay travel', 'homosexuality laws'],
        response: () => "Ghana is a conservative country with strict laws regarding LGBTQ+ activities. Public displays of affection (for anyone) are generally frowned upon. It's best to be discreet and respectful of local norms to ensure a safe trip.",
    },
    {
        id: 'laws_photography',
        keywords: ['photo restrictions', 'government buildings', 'drone laws'],
        response: () => "Avoid taking photos of government buildings, military zones, or the airport—it's prohibited. Always ask permission before photographing people. Drones require a permit from the Civil Aviation Authority.",
    },
    {
        id: 'culture_taboos',
        keywords: ['what to avoid', 'taboos', 'cultural mistakes', 'rude behavior'],
        response: () => "Avoid using your left hand for giving/receiving. Don't smell food before eating (it's rude). Avoid public outbursts of anger. And never insult someone's mother—that's a big no-no!",
    },

    // ==========================================
    // BEST PLACES (NATURE & HISTORY)
    // ==========================================
    {
        id: 'places_nature',
        keywords: ['nature spots', 'waterfalls', 'hiking', 'wildlife', 'mole park'],
        response: () => "For nature, visit **Kakum National Park** (Canopy Walk), **Mole National Park** (Elephants!), **Wli Waterfalls** (highest in West Africa), and **Aburi Botanical Gardens** (cool mountain air).",
    },
    {
        id: 'places_history',
        keywords: ['historical sites', 'castles', 'museums', 'slave trade'],
        response: () => "For history, **Cape Coast & Elmina Castles** are essential. In Accra, visit the **Kwame Nkrumah Mausoleum** and **Black Star Square**. In Kumasi, the **Manhyia Palace Museum** tells the Ashanti story.",
    }
];

export const FALLBACK_RESPONSE = "Oh chale, I didn't catch that one. Try asking me about safety, best time to visit, food, or specific places like Cape Coast or Accra. I dey for you!";
