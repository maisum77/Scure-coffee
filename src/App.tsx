import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight, Star, Coffee, UtensilsCrossed, Heart, Edit3, MapPin, Send, Pin } from 'lucide-react';

type Page = 'home' | 'menu' | 'about' | 'locations' | 'journal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow pt-16 md:pt-32 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'menu' && <MenuPage />}
            {currentPage === 'about' && <AboutPage />}
            {(currentPage === 'locations' || currentPage === 'journal') && (
              <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h1 className="text-5xl text-primary mb-8 font-headline">Coming Soon</h1>
                <p className="text-2xl text-stone-600 font-body">The Editor is still scribbling this section...</p>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="mt-8 text-primary font-bold border-b-2 border-primary/30 hover:border-primary transition-all flex items-center gap-2 mx-auto font-body"
                >
                  Back Home <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function Header({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b-[1.5px] border-stone-200/30 hand-drawn-border shadow-[4px_4px_0px_0px_rgba(7,69,137,0.1)] py-4 px-4">
      <nav className="flex justify-between items-center w-full max-w-screen-2xl mx-auto">
        <div 
          className="text-2xl md:text-3xl font-bold font-headline text-primary -rotate-2 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setCurrentPage('home')}
        >
          The Analog Cafe
        </div>
        <div className="hidden md:flex items-center gap-8">
          {(['menu', 'about', 'locations', 'journal'] as Page[]).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`capitalize text-lg transition-all duration-200 hover:rotate-1 font-body ${
                currentPage === page 
                  ? 'text-primary font-bold border-b-2 border-primary translate-y-[-2px]' 
                  : 'text-stone-600 font-medium hover:text-secondary'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button className="text-primary hover:scale-110 transition-transform">
            <ShoppingBag className="w-6 h-6" />
          </button>
          <button className="bg-primary text-white px-4 md:px-6 py-2 rotate-1 hand-drawn-border font-headline text-lg md:text-xl paper-shadow hover:rotate-[-1deg] transition-all active:scale-95">
            Order Now
          </button>
        </div>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <div className="space-y-32">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mt-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <h1 className="text-5xl md:text-8xl text-on-surface leading-tight -rotate-1 font-headline">
            Scribbled, Steeped, <br />
            <span className="text-primary wavy-underline">& Served.</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 max-w-xl leading-relaxed font-body">
            A quiet corner for the thinkers, the dreamers, and the ink-stained. We brew coffee with the same intentionality as a handwritten letter.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="bg-secondary text-white px-8 md:px-10 py-3 md:py-4 text-xl md:text-2xl font-headline hand-drawn-border paper-shadow rotate-[-1deg] hover:rotate-1 transition-all">
              View Menu
            </button>
            <div className="flex items-center gap-2 text-primary font-bold ml-4 rotate-2 cursor-pointer group font-body">
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              <span>Find your desk</span>
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-tertiary-fixed opacity-50 hand-drawn-border -rotate-12 -z-10"></div>
          <div className="relative rotate-2 group">
            <img 
              src="https://picsum.photos/seed/analog-coffee/800/800" 
              alt="Coffee Mug" 
              className="w-full max-w-lg hand-drawn-border paper-shadow grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -left-6 bg-tertiary-fixed text-tertiary p-4 hand-drawn-border rotate-[-4deg] paper-shadow font-headline text-lg max-w-[200px]">
              "Best roast in the city." — Local Poet
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl text-primary font-headline">The Editor's Choice</h2>
          <div className="w-24 h-1 bg-primary mx-auto hand-drawn-border"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Star className="w-10 h-10" />}
            title="Hand-Roasted"
            description="Small batches, roasted in-house until the ink... we mean beans, are perfect."
            rotation="rotate-1"
            accent="tape"
          />
          <FeatureCard 
            icon={<Coffee className="w-10 h-10" />}
            title="Cozy Space"
            description="Nooks designed for focus. No loud music, just the scratch of pens and soft jazz."
            rotation="rotate-[-2deg]"
            accent="thumbtack"
            bgColor="bg-surface-container-low"
          />
          <FeatureCard 
            icon={<UtensilsCrossed className="w-10 h-10" />}
            title="Local Pastries"
            description="Flaky croissants and rustic tarts delivered daily from the bakery next door."
            rotation="rotate-2"
            accent="tape-tertiary"
          />
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-tertiary-fixed p-8 md:p-12 hand-drawn-border paper-shadow rotate-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 text-tertiary/10 rotate-12">
            <Edit3 className="w-48 h-48" />
          </div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl text-tertiary font-headline">Join the Editor's List</h2>
            <p className="text-lg md:text-xl text-tertiary max-w-md font-body">Get weekly coffee notes, new roast alerts, and secret menu sketches.</p>
            <form className="flex flex-col md:flex-row gap-4 mt-8" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="your@ink-spill.com" 
                className="flex-1 bg-transparent border-b-2 border-tertiary font-body text-xl px-2 py-3 focus:outline-none placeholder:text-tertiary/50"
              />
              <button className="bg-primary text-white px-8 py-3 font-headline text-xl hand-drawn-border paper-shadow rotate-[-2deg] hover:rotate-0 transition-transform">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, rotation, accent, bgColor = 'bg-surface-container' }: any) {
  return (
    <div className={`relative ${bgColor} p-8 hand-drawn-border ${rotation} paper-shadow flex flex-col items-center text-center group hover:scale-105 transition-all`}>
      {accent === 'tape' && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-surface-container-highest/60 backdrop-blur-sm -rotate-2 border-x border-stone-300"></div>
      )}
      {accent === 'tape-tertiary' && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-tertiary-fixed/40 backdrop-blur-sm rotate-3 border-x border-stone-300"></div>
      )}
      {accent === 'thumbtack' && (
        <div className="absolute top-4 right-4 w-4 h-4 bg-secondary rounded-full shadow-inner"></div>
      )}
      <div className={`w-20 h-20 flex items-center justify-center mb-6 rounded-full ${accent === 'thumbtack' ? 'bg-secondary-fixed' : 'bg-primary-fixed'}`}>
        <div className="text-primary group-hover:scale-110 transition-transform">{icon}</div>
      </div>
      <h3 className="text-3xl font-headline mb-4">{title}</h3>
      <p className="text-lg text-stone-600 font-body">{description}</p>
    </div>
  );
}

function MenuPage() {
  const menuItems = {
    coffee: [
      { name: "The Editor's Pour-over", desc: "Single origin, rotating daily selection.", price: "6.50" },
      { name: "Smudged Latte", desc: "Double shot with house-made lavender syrup.", price: "5.75", highlight: "Must Try!" },
      { name: "Draft Cold Brew", desc: "12-hour steep for deep, chocolatey notes.", price: "5.25" },
    ],
    tea: [
      { name: "Vellum Matcha", desc: "Ceremonial grade whisked to order.", price: "6.00" },
      { name: "Earl Grey Scribble", desc: "Bergamot with a hint of dried cornflower.", price: "4.50" },
    ],
    bites: [
      { name: "Hand-Laminated Croissant", desc: "Artisan sourdough pastry flaky layers.", price: "4.75", image: "https://picsum.photos/seed/croissant/400/300" },
      { name: "The Editor's Toast", desc: "Sourdough, smashed avocado, chili flakes, and a 'correction' of lemon.", price: "9.50" },
      { name: "Ink-Spot Brownie", desc: "70% dark chocolate with sea salt flakes.", price: "5.00" },
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16 relative">
        <h1 className="text-6xl md:text-8xl text-primary -rotate-1 mb-4 font-headline">Our Daily Ink</h1>
        <p className="text-xl md:text-2xl text-stone-600 max-w-md mx-auto rotate-1 font-body">Hand-picked, slow-poured, and scribbled with care.</p>
        <div className="absolute -top-10 -right-4 hidden lg:block">
          <Edit3 className="text-secondary text-5xl rotate-12" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-16">
          <section className="relative p-8 bg-white hand-drawn-border paper-shadow -rotate-1">
            <h2 className="text-4xl text-primary mb-8 border-b-2 border-primary/20 inline-block font-headline">Coffee</h2>
            <div className="space-y-8">
              {menuItems.coffee.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row justify-between md:items-end gap-2 md:gap-4 group relative">
                  <div className="flex-1">
                    <span className="text-2xl font-headline group-hover:text-primary transition-colors">{item.name}</span>
                    <p className="text-stone-500 text-lg font-body">{item.desc}</p>
                  </div>
                  <div className="text-2xl text-secondary font-headline">${item.price}</div>
                  {item.highlight && (
                    <div className="absolute -right-24 top-0 hidden md:block rotate-12 text-primary font-headline">
                      <ArrowRight className="w-6 h-6 rotate-180 -scale-y-100" />
                      <span className="text-sm">Must Try!</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="relative p-8 bg-white hand-drawn-border paper-shadow rotate-1">
            <h2 className="text-4xl text-primary mb-8 border-b-2 border-primary/20 inline-block font-headline">Tea</h2>
            <div className="space-y-8">
              {menuItems.tea.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row justify-between md:items-end gap-2 md:gap-4 group">
                  <div className="flex-1">
                    <span className="text-2xl font-headline group-hover:text-primary transition-colors">{item.name}</span>
                    <p className="text-stone-500 text-lg font-body">{item.desc}</p>
                  </div>
                  <div className="text-2xl text-secondary font-headline">${item.price}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-12">
          {/* Special Post-it */}
          <div className="bg-tertiary-fixed p-10 hand-drawn-border rotate-3 post-it-shadow relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/40 rotate-2"></div>
            <span className="text-sm text-tertiary uppercase tracking-widest mb-2 block opacity-70 font-body">Special of the Week</span>
            <h3 className="text-3xl text-tertiary mb-4 font-headline">Burnt Honey Cardamom Latte</h3>
            <p className="text-xl text-tertiary/80 mb-6 leading-tight font-body">
              A nostalgic blend of toasted honey and fresh ground cardamom pods. Like a warm hug in a ceramic mug.
            </p>
            <div className="text-3xl text-secondary text-right font-headline">$7.25</div>
            <Heart className="absolute bottom-4 left-4 text-primary/10 w-12 h-12 rotate-12" />
          </div>

          <section className="p-8 bg-white hand-drawn-border paper-shadow -rotate-2">
            <h2 className="text-4xl text-primary mb-8 border-b-2 border-primary/20 inline-block font-headline">Bites</h2>
            <div className="space-y-8">
              {menuItems.bites.map((item, i) => (
                <div key={i} className="group">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-40 object-cover hand-drawn-border mb-4 grayscale group-hover:grayscale-0 transition-all duration-500" 
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="flex justify-between items-end mb-1">
                    <div className="text-2xl font-headline group-hover:text-primary transition-colors">{item.name}</div>
                    <div className="text-xl text-secondary font-headline font-headline">${item.price}</div>
                  </div>
                  <p className="text-stone-500 text-lg leading-snug font-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 space-y-40">
      <section className="grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 relative">
          <div className="absolute -top-10 -left-10 text-primary/5 rotate-12">
            <Edit3 className="w-64 h-64" />
          </div>
          <h1 className="text-6xl text-primary mb-8 leading-tight -rotate-1 font-headline">Our Story: Scribbled in Coffee Stains</h1>
          <div className="drop-cap text-2xl text-stone-600 leading-relaxed max-w-2xl space-y-6 font-body">
            <p>
              It began with a leaky fountain pen and a cold ceramic mug. We didn't want a "concept," we wanted a conversation. The Analog Cafe was founded on the radical idea that coffee tastes better when you aren't staring at a blue-light screen.
            </p>
            <p>
              Every table in our shop is slightly uneven, just like a good morning. We keep a stack of postcards and a basket of stamps by the door. We believe in the tactile—the crunch of a fresh croissant, the smell of old paper, and the rhythmic clicking of a typewriter in the corner.
            </p>
          </div>
        </div>
        <div className="md:col-span-5 flex flex-col items-center gap-16">
          <div className="bg-white p-4 pb-12 shadow-xl rotate-3 hand-drawn-border relative w-72 group">
            <img 
              src="https://picsum.photos/seed/retro-1/400/400" 
              alt="Retro scene" 
              className="w-full h-56 object-cover grayscale group-hover:grayscale-0 transition-all" 
              referrerPolicy="no-referrer"
            />
            <p className="mt-4 text-center text-stone-500 italic font-headline">The First Pour, 2014</p>
            <Pin className="absolute -top-4 -right-2 text-secondary rotate-45 fill-secondary w-8 h-8" />
          </div>
          <div className="bg-white p-4 pb-12 shadow-xl -rotate-6 hand-drawn-border relative w-72 group">
            <img 
              src="https://picsum.photos/seed/retro-2/400/400" 
              alt="Desk scene" 
              className="w-full h-56 object-cover grayscale group-hover:grayscale-0 transition-all" 
              referrerPolicy="no-referrer"
            />
            <p className="mt-4 text-center text-stone-500 italic font-headline">Founders' Messy Desk</p>
            <Pin className="absolute -top-4 -left-2 text-primary -rotate-12 fill-primary w-8 h-8" />
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto">
        <div className="bg-tertiary-fixed p-10 hand-drawn-border shadow-lg -rotate-1 relative">
          <Star className="absolute -top-6 -left-6 text-secondary w-12 h-12 fill-secondary" />
          <p className="text-2xl italic text-tertiary leading-snug font-body">
            "This place feels like a warm hug from an old friend who still sends handwritten letters. I came for the espresso, but I stayed for the peace of mind. Best mistake I ever made."
          </p>
          <div className="mt-6 flex items-center gap-4 font-body">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary">
              <img src="https://i.pravatar.cc/100?u=elara" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="font-bold text-primary font-headline">Elara Vance</p>
              <p className="text-stone-500 text-sm">Professional Daydreamer</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl text-primary mb-4 rotate-1 font-headline">Find Our Hidden Nooks</h2>
          <div className="w-32 h-1 bg-secondary mx-auto wobbly-line"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="relative p-8 bg-surface-container-low hand-drawn-border border-stone-200 shadow-inner min-h-[400px] flex items-center justify-center">
            <div className="text-center text-stone-400 font-body italic">
              <MapPin className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>*Map not to scale. Follow the smell of roasting beans.</p>
            </div>
            <div className="absolute top-1/4 left-1/4 bg-white px-3 py-1 hand-drawn-border shadow-md rotate-2 border border-stone-200">
              <span className="text-sm font-headline whitespace-nowrap text-secondary flex items-center gap-1">
                <MapPin className="w-4 h-4 fill-secondary" /> Inkwell Alley
              </span>
            </div>
            <div className="absolute bottom-1/4 right-1/4 bg-white px-3 py-1 hand-drawn-border shadow-md -rotate-2 border border-stone-200">
              <span className="text-sm font-headline whitespace-nowrap text-primary flex items-center gap-1">
                <MapPin className="w-4 h-4 fill-primary" /> The Paper Mill
              </span>
            </div>
          </div>
          <div className="space-y-12">
            <LocationCard 
              name="Inkwell Alley" 
              label="THE ORIGINAL" 
              address="122b Fountain Pen Lane, Old Town District"
              hours="Mon - Fri: 7am - 4pm"
              phone="(555) 012-INKY"
              color="bg-tertiary-fixed"
              rotation="rotate-1"
            />
            <LocationCard 
              name="The Paper Mill" 
              label="ROASTERY" 
              address="Building 4, Warehouse Row, The Waterfront"
              hours="Daily: 8am - 8pm"
              phone="Roasting on Tuesdays"
              color="bg-surface-container-highest"
              rotation="rotate-[-1deg]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function LocationCard({ name, label, address, hours, phone, color, rotation }: any) {
  return (
    <div className={`${color} p-8 hand-drawn-border post-it-shadow ${rotation} group hover:scale-105 transition-all`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-3xl text-primary font-headline">{name}</h3>
        <span className="bg-white/50 px-3 py-1 text-xs hand-drawn-border font-body font-bold">{label}</span>
      </div>
      <p className="text-xl mb-6 text-on-surface-variant font-body">{address}</p>
      <div className="space-y-2 text-on-surface-variant text-lg font-body">
        <p>• {hours}</p>
        <p>• {phone}</p>
      </div>
      <button className="mt-8 text-primary font-bold border-b-2 border-primary/30 hover:border-primary transition-all flex items-center gap-2 font-body">
        Get Directions <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-surface border-t border-stone-100 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-12 max-w-7xl mx-auto text-center md:text-left">
        <div className="space-y-4">
          <div className="text-2xl text-stone-800 font-headline">The Analog Cafe</div>
          <p className="text-stone-500 max-w-xs leading-tight font-body">© 2024 The Analog Editor Coffee Co. Scribbled with love.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-base tracking-wide text-stone-500 font-body">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Sustainability</a>
          <a href="#" className="hover:text-primary transition-colors">Careers</a>
        </div>
        <div className="flex gap-4">
          <Send className="text-primary w-6 h-6 cursor-pointer hover:rotate-12 transition-transform" />
          <Coffee className="text-primary w-6 h-6 cursor-pointer hover:rotate-[-12deg] transition-transform" />
        </div>
      </div>
    </footer>
  );
}
