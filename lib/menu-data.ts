// Default image when a menu item has no specific image
export const DEFAULT_MENU_ITEM_IMAGE = '/image/feriado/aceituna.png';

export interface MenuItem {
  categoryId: string;
  name: string;
  description: string;
  price: string;
  image?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  description?: string;
  image?: string;
}

export type MenuLocationKey = 'espanola-way' | 'lincoln-road' | 'ocean-drive';

export const MENU_LOCATION_LABELS: Record<MenuLocationKey, string> = {
  'espanola-way': 'Española Way',
  'lincoln-road': 'Lincoln Road',
  'ocean-drive': 'Ocean Drive',
};

// ─── SHARED FOOD CATEGORIES (same for all 3 locations) ───────────────────────
const FOOD_CATEGORIES: MenuCategory[] = [
  { id: 'tortilla-soup', label: 'Tortilla Soup', description: 'Our iconic starter.', image: '/image/feriado/aceituna.png' },
  { id: 'guacamole', label: 'Guacamole', description: 'Fresh made guacamole two ways.', image: '/image/feriado/aceituna.png' },
  { id: 'appetizers', label: 'Appetizers', description: 'Small plates to start your meal.', image: '/image/feriado/aceituna.png' },
  { id: 'salads', label: 'Salads', description: 'Fresh salads with Mexican flair.', image: '/image/feriado/aceituna.png' },
  { id: 'seafood', label: 'Seafood Appetizers', description: 'Fresh from the sea.', image: '/image/Tostada-de-atun.jpg' },
  { id: 'tostadas', label: 'Tostadas', description: 'Crispy tostadas — $18 per order.', image: '/image/Tostada-de-atun.jpg' },
  { id: 'tacos', label: 'TACOH!S', description: 'Order of 3 tacos with white rice & refried black beans. Choose: Soft corn, Soft blue corn or Flour tortilla.', image: '/image/tacos-de-birria.jpg' },
  { id: 'specialties', label: 'Mexican Specialties', description: 'Traditional Mexican entrees.', image: '/image/molcajete-mixto.jpg' },
  { id: 'from-the-border', label: 'From the Border', description: 'Crowd favorites and comfort food.', image: '/image/feriado/aceituna.png' },
  { id: 'salsas', label: 'Homemade Salsas', description: 'Four house-made salsas.', image: '/image/feriado/aceituna.png' },
  { id: 'sides', label: 'Sides', description: 'Classic sides — $7 each.', image: '/image/feriado/aceituna.png' },
  { id: 'desserts', label: 'Desserts & Cordials', description: 'Sweet endings and after-dinner drinks.', image: '/image/feriado/aceituna.png' },
  { id: 'coffee-tea', label: 'Coffee & Tea', description: 'Espresso drinks and tea selection.', image: '/image/feriado/aceituna.png' },
];

// ─── DRINK CATEGORIES ────────────────────────────────────────────────────────
const DRINKS_CATEGORIES: MenuCategory[] = [
  { id: 'margaritas', label: 'Margaritas', description: 'Classic and fresh fruit margaritas — $19+.', image: '/image/Oh-Mexico-13.jpg' },
  { id: 'micheladas', label: 'Micheladas', description: 'Cold beer with freshly squeezed lemon and house mix.', image: '/image/Oh-Mexico-1.jpg' },
  { id: 'mocktails', label: 'Mocktails', description: 'Non-alcoholic cocktails — $13.', image: '/image/feriado/aceituna.png' },
  { id: 'tequila-pops', label: 'Tequila Pops', description: 'Tequila margaritas with fresh fruit popsicles — $17.', image: '/image/feriado/aceituna.png' },
  { id: 'cantaritos', label: 'Cantaritos', description: 'Mezcal served in traditional clay cups — $18.', image: '/image/feriado/aceituna.png' },
  { id: 'beer', label: 'Beer', description: 'Imported Mexican and craft beers — $10.', image: '/image/Oh-Mexico-1.jpg' },
  { id: 'mezcal', label: 'Mezcal', description: 'Premium mezcal selection.', image: '/image/feriado/aceituna.png' },
  { id: 'sodas', label: 'Sodas & Water', description: 'Mexican sodas and waters.', image: '/image/feriado/aceituna.png' },
  { id: 'tequila-blanco', label: 'Tequila Silver', description: 'Silver and Blanco tequilas.', image: '/image/feriado/aceituna.png' },
  { id: 'tequila-reposado', label: 'Tequila Reposado', description: 'Aged 2–12 months in oak barrels.', image: '/image/feriado/aceituna.png' },
  { id: 'tequila-anejo', label: 'Tequila Añejo', description: 'Aged 1–3+ years, extra smooth.', image: '/image/feriado/aceituna.png' },
];

const DRINK_CATEGORIES_OCEAN_DRIVE: MenuCategory[] = DRINKS_CATEGORIES.map((c) =>
  c.id === 'tequila-blanco' ? { ...c, label: 'Tequila Blanco' } : c
);

// ─── CATEGORIES PER LOCATION ─────────────────────────────────────────────────
export const menuCategoriesByLocation: Record<MenuLocationKey, MenuCategory[]> = {
  'espanola-way': [
    { id: 'all', label: 'All' },
    ...FOOD_CATEGORIES,
    ...DRINKS_CATEGORIES,
    { id: 'happy-hour', label: 'Happy Hour', description: 'Mon–Fri 4–7 pm specials.' },
  ],
  'lincoln-road': [
    { id: 'all', label: 'All' },
    ...FOOD_CATEGORIES,
    ...DRINKS_CATEGORIES,
    { id: 'happy-hour', label: 'Happy Hour', description: 'Mon–Fri 4–7 pm specials.' },
  ],
  'ocean-drive': [
    { id: 'all', label: 'All' },
    ...FOOD_CATEGORIES,
    ...DRINK_CATEGORIES_OCEAN_DRIVE,
    { id: 'happy-hour', label: 'Happy Hour', description: 'Mon–Fri 4–7 pm specials.' },
  ],
};

// ─── FILTER GROUPS (fewer options in menu page filter) ─────────────────────────
export interface MenuFilterGroup {
  id: string;
  label: string;
  categoryIds: string[];
}

const MENU_FILTER_GROUPS: MenuFilterGroup[] = [
  { id: 'all', label: 'All', categoryIds: [] },
  { id: 'starters', label: 'Starters', categoryIds: ['tortilla-soup', 'guacamole', 'appetizers'] },
  { id: 'salads-seafood', label: 'Salads & Seafood', categoryIds: ['salads', 'seafood'] },
  { id: 'tostadas', label: 'Tostadas', categoryIds: ['tostadas'] },
  { id: 'tacos', label: 'Tacos', categoryIds: ['tacos'] },
  { id: 'main-dishes', label: 'Main Dishes', categoryIds: ['specialties', 'from-the-border'] },
  { id: 'sides-salsas', label: 'Sides & Salsas', categoryIds: ['salsas', 'sides'] },
  { id: 'desserts-coffee', label: 'Desserts & Coffee', categoryIds: ['desserts', 'coffee-tea'] },
  { id: 'margaritas-cocktails', label: 'Margaritas & Cocktails', categoryIds: ['margaritas', 'tequila-pops', 'cantaritos'] },
  { id: 'beer-micheladas', label: 'Beer & Micheladas', categoryIds: ['beer', 'micheladas'] },
  { id: 'mocktails-sodas', label: 'Mocktails & Soft Drinks', categoryIds: ['mocktails', 'sodas'] },
  { id: 'tequila-mezcal', label: 'Tequila & Mezcal', categoryIds: ['tequila-blanco', 'tequila-reposado', 'tequila-anejo', 'mezcal'] },
  { id: 'happy-hour', label: 'Happy Hour', categoryIds: ['happy-hour'] },
];

export const menuFilterGroupsByLocation: Record<MenuLocationKey, MenuFilterGroup[]> = {
  'espanola-way': MENU_FILTER_GROUPS,
  'lincoln-road': MENU_FILTER_GROUPS,
  'ocean-drive': MENU_FILTER_GROUPS,
};

export function getCategoryIdsForFilterGroup(filterGroupId: string): string[] {
  const group = MENU_FILTER_GROUPS.find((g) => g.id === filterGroupId);
  return group?.categoryIds ?? (filterGroupId === 'all' ? [] : [filterGroupId]);
}

// ─── SHARED FOOD ITEMS ────────────────────────────────────────────────────────
const SHARED_FOOD_ITEMS: MenuItem[] = [
  // ── Tortilla Soup ──
  {
    categoryId: 'tortilla-soup',
    name: 'Tortilla Soup',
    description: 'Tomato, guajillo pepper, chicken broth, tortilla strips, panela cheese, sour cream, diced avocado, crispy pork crackling & smoky Pasilla pepper strips.',
    price: '13',
    image: '/image/feriado/aceituna.png',
  },

  // ── Guacamole ──
  {
    categoryId: 'guacamole',
    name: 'Classic Guacamole',
    description: 'Hass avocado, tomato, onions, serrano peppers & cilantro.',
    price: '16',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'guacamole',
    name: 'Oh! Mexico Guacamole',
    description: 'Fresh hass avocados, tomatoes, charred corn, serrano peppers, red onions, cilantro & roasted pumpkin seeds.',
    price: '18',
    image: '/image/feriado/aceituna.png',
  },

  // ── Appetizers ──
  {
    categoryId: 'appetizers',
    name: 'Chips & Salsa Sampler',
    description: 'Crispy white corn tortilla chips served with pico de gallo, green tomatillo salsa, homemade orejona salsa, red chile de arbol salsa & 12 chiles salsa.',
    price: '10',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'appetizers',
    name: 'Esquites',
    description: 'Char grilled corn kernels, red peppers, onion, garlic, cilantro, all tossed in mayonnaise and topped with cotija cheese & tajin spice. Add: shrimp +6.',
    price: '11',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'appetizers',
    name: 'Queso Fundido',
    description: 'Melted Mexican cheese served with warm flour tortillas. Add: poblano pepper strips +3 · chorizo +5.',
    price: '15',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'appetizers',
    name: 'Volcano',
    description: 'Crispy corn tortilla topped with melted Mexican cheese & avocado, served with salsa verde. Add: chorizo +5 · steak +8 · shrimp +8.',
    price: '12',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'appetizers',
    name: 'Quesadilla',
    description: 'Large flour tortilla filled with melted Mexican cheese topped with shredded iceberg lettuce, chipotle mayo, pico de gallo & Mexican crema. Add: chicken +6 · steak +8 · shrimp +8.',
    price: '17',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'appetizers',
    name: 'Nachos',
    description: 'Large platter of crispy tortilla chips with cheese sauce, pickled jalapeño, pico de gallo, refried black beans, guacamole & cilantro sour cream. Add: chorizo +5 · chicken +6 · steak +8 · shrimp +8.',
    price: '17',
    image: '/image/feriado/aceituna.png',
  },

  // ── Salads ──
  {
    categoryId: 'salads',
    name: 'Mexican Caesar',
    description: 'Romaine heart, red cabbage slaw, pico de gallo, corn tortilla chips, queso fresco, cotija cheese & chopped cilantro. Add: chicken +6 · steak +8 · shrimp +8.',
    price: '16',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'salads',
    name: 'Chipotle Chopped Salad',
    description: 'Romaine and iceberg lettuce, roasted corn, poblano peppers, red peppers, red onion, avocado, green onions, cilantro tossed in a chipotle mayo dressing and fried onions on top. Add: chicken +6 · steak +8 · shrimp +8.',
    price: '17',
    image: '/image/feriado/aceituna.png',
  },

  // ── Seafood Appetizers ──
  {
    categoryId: 'seafood',
    name: 'Mexican Ceviche',
    description: 'Catch of the day, shrimp, lime juice, tomato, onion, cucumbers, cilantro, avocado, tortilla strips & saltine crackers.',
    price: '19',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'seafood',
    name: 'Green Aguachile',
    description: 'Citrus marinated shrimp, cucumber, red onion & serrano chili-lime sauce. *Raw or undercooked.',
    price: '21',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'seafood',
    name: 'Shrimp Cocktail Acapulco',
    description: 'Poached black tiger shrimp, red Mexican style cocktail sauce, avocado, tomato, cucumber, celery & saltine crackers. *Raw or undercooked.',
    price: '21',
    image: '/image/feriado/aceituna.png',
  },

  // ── Tostadas ──
  {
    categoryId: 'tostadas',
    name: 'Crispy Shrimp Tostada',
    description: 'Beer battered shrimp, guacamole, chipotle mayo & red cabbage slaw.',
    price: '18',
    image: '/image/Tostada-de-atun.jpg',
  },
  {
    categoryId: 'tostadas',
    name: 'Seared Tuna Loin Tostada',
    description: 'Crispy tortilla topped with fresh seared tuna, sesame seeds, chipotle aioli, avocado & crispy fried leeks.',
    price: '18',
    image: '/image/Tostada-de-atun.jpg',
  },
  {
    categoryId: 'tostadas',
    name: 'Ceviche Tostada',
    description: 'Fresh corvina ceviche, smashed avocado & cilantro crema.',
    price: '18',
    image: '/image/feriado/aceituna.png',
  },

  // ── TACOH!S ──
  {
    categoryId: 'tacos',
    name: 'Al Pastor',
    description: 'Slow roasted guajillo marinated pork, pineapple, onion & cilantro. Soft corn tortilla suggested.',
    price: '23',
    image: '/image/tacos-de-birria.jpg',
  },
  {
    categoryId: 'tacos',
    name: 'Carne Asada',
    description: 'Grilled steak, white onion & cilantro. Soft corn tortilla suggested. Add cheese +2.',
    price: '23',
    image: '/image/tacos-de-birria.jpg',
  },
  {
    categoryId: 'tacos',
    name: 'Cochinita Pibil Tacos',
    description: 'Yucatan style slow roasted pork, pickled red onion & cilantro. Blue corn tortilla suggested.',
    price: '23',
    image: '/image/tacos-de-birria.jpg',
  },
  {
    categoryId: 'tacos',
    name: 'Grilled Shrimp Tacos',
    description: 'Char grilled shrimp, red onion, green and red pepper, garlic mayo & cilantro. Soft corn tortilla suggested.',
    price: '24',
    image: '/image/tacos-de-birria.jpg',
  },
  {
    categoryId: 'tacos',
    name: 'Shrimp Enchipotlado',
    description: 'Chipotle stewed shrimp, pickled red cabbage slaw & cilantro crema. Flour tortilla suggested.',
    price: '24',
    image: '/image/tacos-de-birria.jpg',
  },
  {
    categoryId: 'tacos',
    name: 'Baja Fish',
    description: 'Beer battered white fish, creamy coleslaw, garlic mayo & cilantro. Flour tortilla suggested.',
    price: '24',
    image: '/image/tacos-de-birria.jpg',
  },
  {
    categoryId: 'tacos',
    name: 'Taco Birria',
    description: 'Slow braised beef, melted Mexican cheese, birria broth, onion & cilantro. Soft corn tortilla suggested.',
    price: '24',
    image: '/image/tacos-de-birria.jpg',
  },
  {
    categoryId: 'tacos',
    name: 'Taco Gobernador',
    description: 'Sauteed shrimp mixed with peppers, onions, garlic & melted Mexican cheese, served over refried black bean puree, topped with avocado slices. Soft corn tortilla suggested.',
    price: '24',
    image: '/image/tacos-de-birria.jpg',
  },
  {
    categoryId: 'tacos',
    name: 'Baja Chicken',
    description: 'Seared chicken breast, melted Mexican cheese, crispy bacon, black beans, avocado & chipotle mayo. Flour tortilla suggested.',
    price: '23',
    image: '/image/tacos-de-birria.jpg',
  },

  // ── Mexican Specialties ──
  {
    categoryId: 'specialties',
    name: 'Enchiladas',
    description: 'Soft corn tortillas filled with chicken or cheese, covered with your choice of green tomatillo sauce, red guajillo pepper sauce or our homemade mole, topped with Mexican cream and avocado. Served with white rice & refried black beans.',
    price: '26',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'specialties',
    name: 'Mole',
    description: 'Shredded chicken breast mixed with our traditional homemade mole sauce including 36 authentic Mexican ingredients, white rice, refried black beans & warm corn tortillas.',
    price: '27',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'specialties',
    name: 'Cochinita Pibil',
    description: 'Achiote marinated, Yucatecan style pork slow roasted in banana leaves, topped with pickled red onions. Served with a side of white rice, refried black beans & warm corn tortillas.',
    price: '28',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'specialties',
    name: 'Salmon al Cilantro',
    description: 'Marinated in olive oil & garlic, cilantro-lime sauce, white rice, sauteed vegetables.',
    price: '32',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'specialties',
    name: 'Pescado a la Talla',
    description: 'Fresh locally caught, grilled red snapper in a Guajillo pepper and garlic sauce, served with house salad & white rice.',
    price: '38',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'specialties',
    name: 'Chile Relleno',
    description: 'Lightly battered and fried fire roasted poblano peppers filled with queso fresco and served over a rich tomato sauce, white rice & refried black beans.',
    price: '28',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'specialties',
    name: 'Tampiqueña Steak',
    description: 'Skirt steak served with a cheese filled enchilada covered in guajillo sauce, accompanied with guacamole, white rice & refried black beans. *May be served rare.',
    price: '39',
    image: '/image/Tampiquena-steak2.jpg',
  },
  {
    categoryId: 'specialties',
    name: 'Molcajete',
    description: 'A lava rock bowl filled with Mexican guajillo sauce or green tomatillo sauce, grilled nopales and bell peppers, onion, chorizo & Mexican cheese.\nChicken $33 · Shrimp $36 · Steak $39 · Mixed $45 · Lobster $65.',
    price: '',
    image: '/image/molcajete-mixto.jpg',
  },

  // ── From the Border ──
  {
    categoryId: 'from-the-border',
    name: 'Classic Burger',
    description: 'Coal grilled Angus beef, cheese, chipotle mayo, green leaf lettuce, tomato, onion, pickles on a sesame seed bun with fries.',
    price: '24',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'from-the-border',
    name: 'Flautas Doradas de Papa',
    description: 'Crispy rolled corn tortilla filled with smashed potatoes, covered in green tomatillo sauce and topped with iceberg lettuce, guacamole, pico de gallo, cotija cheese & Mexican crema.',
    price: '19',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'from-the-border',
    name: 'Flautas Doradas de Pollo',
    description: 'Crispy rolled corn tortilla filled with pulled chicken & cheese, topped with iceberg lettuce, guacamole, pico de gallo, cream.',
    price: '23',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'from-the-border',
    name: 'Quesabirria',
    description: 'Giant flour tortilla filled with slow braised birria meat with onions & cilantro, served with a side of dipping broth, white rice & refried black beans.',
    price: '24',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'from-the-border',
    name: 'Oh! Mexico Burrito',
    description: 'Flour tortilla wrap filled with green and red peppers, lettuce, onion, cheese, sour cream, white rice & refried black beans.\nGrilled chicken $22 · Steak $25.',
    price: '',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'from-the-border',
    name: 'Fajitas',
    description: 'Your choice of vegetables or protein on a hot sizzling platter served with guacamole, sour cream, white rice, refried black beans & warm tortillas.\nVegetables $26 · Chicken $29 · Shrimp $31 · Steak $34 · Steak & Chicken $36 · Mixed $38.',
    price: '',
    image: '/image/feriado/aceituna.png',
  },

  // ── Homemade Salsas ──
  {
    categoryId: 'salsas',
    name: 'Red Chile de Arbol',
    description: 'Arbol peppers, morita peppers, garlic, tomato.',
    price: '',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'salsas',
    name: 'Orejona',
    description: 'Orange habaneros, carrots, leeks, garlic.',
    price: '',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'salsas',
    name: '12 Chiles',
    description: 'Serrano peppers, lime, olive oil.',
    price: '',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'salsas',
    name: 'Green Tomatillo',
    description: 'Serrano peppers, tomatillo, cilantro.',
    price: '',
    image: '/image/feriado/aceituna.png',
  },

  // ── Sides ──
  { categoryId: 'sides', name: 'Rice', description: '', price: '7' },
  { categoryId: 'sides', name: 'Refried Black Beans', description: '', price: '7' },
  { categoryId: 'sides', name: 'Pico de Gallo', description: '', price: '7' },

  // ── Desserts & Cordials ──
  {
    categoryId: 'desserts',
    name: 'Churros',
    description: 'Crispy fried churro sticks coated with cinnamon-sugar and served with Mexican hot chocolate and dulce de leche sauce.',
    price: '13',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'desserts',
    name: 'Homemade Flan',
    description: 'Smooth creamy custard topped with caramel sauce.',
    price: '13',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'desserts',
    name: 'Cinco Leches',
    description: 'Tres leches soaked cake, dulce de leche, caramelized rice crispies, Horchata espuma, cinnamon dust.',
    price: '13',
    image: '/image/feriado/aceituna.png',
  },
  { categoryId: 'desserts', name: 'Carajillo', description: '', price: '12' },
  { categoryId: 'desserts', name: 'Licor 43', description: '', price: '12' },
  { categoryId: 'desserts', name: 'Sambuca', description: '', price: '12' },

  // ── Coffee & Tea ──
  { categoryId: 'coffee-tea', name: 'Espresso', description: 'One espresso shot.', price: '4' },
  { categoryId: 'coffee-tea', name: 'Double Espresso', description: 'Two espresso shots.', price: '5' },
  { categoryId: 'coffee-tea', name: 'Cortadito', description: 'Espresso shot & foam.', price: '5' },
  { categoryId: 'coffee-tea', name: 'Cafe Latte', description: 'Espresso shot & steamed milk.', price: '5.50' },
  { categoryId: 'coffee-tea', name: 'Americano', description: 'Espresso & hot water.', price: '5' },
  { categoryId: 'coffee-tea', name: 'Cappuccino', description: 'Espresso, steamed milk & foam.', price: '6' },
  { categoryId: 'coffee-tea', name: 'Iced Coffee', description: 'Espresso & ice.', price: '5' },
  { categoryId: 'coffee-tea', name: 'Iced Latte', description: 'Espresso, milk & ice.', price: '6' },
  {
    categoryId: 'coffee-tea',
    name: 'Tea Selection',
    description: 'Matcha Super Green · English Breakfast · Turmeric Ginger · Chamomile Medley · Jasmin.',
    price: '6',
  },
];

// ─── SHARED DRINK ITEMS (same for Española Way & Lincoln Road) ────────────────
const SHARED_DRINKS_ESPA_LINCOLN: MenuItem[] = [
  // Margaritas
  {
    categoryId: 'margaritas',
    name: 'Oh! Mexico Margarita',
    description: 'Astral Blanco Tequila, triple sec, fresh lime juice, nectar agave, salt, Tajín & lime slice.',
    price: '20',
    image: '/image/Oh-Mexico-13.jpg',
  },
  {
    categoryId: 'margaritas',
    name: 'Skinny Margarita',
    description: 'Milagro Blanco, quality premium triple sec & fresh lime juice. 158 calories.',
    price: '19',
    image: '/image/Oh-Mexico-13.jpg',
  },
  {
    categoryId: 'margaritas',
    name: 'Cadillac Margarita',
    description: 'Milagro Blanco, quality premium triple sec & fresh lime juice. 158 calories.',
    price: '21',
    image: '/image/Oh-Mexico-13.jpg',
  },
  {
    categoryId: 'margaritas',
    name: 'La Vieja',
    description: 'Herradura Añejo, Cointreau, fresh lime juice & organic agave nectar.',
    price: '22',
    image: '/image/Oh-Mexico-13.jpg',
  },
  {
    categoryId: 'margaritas',
    name: 'Kiwi Margarita',
    description: 'Jimador Silver, orange liquor, fresh lime juice, fresh kiwi & organic agave nectar. On the rocks.',
    price: '19',
    image: '/image/Oh-Mexico-13.jpg',
  },
  {
    categoryId: 'margaritas',
    name: 'Jalapeño Margarita',
    description: 'José Cuervo, orange liquor, fresh lime juice, fresh fruit slices, organic agave nectar. On the rocks.',
    price: '19',
    image: '/image/Oh-Mexico-13.jpg',
  },
  {
    categoryId: 'margaritas',
    name: 'Cucumber Margarita',
    description: 'José Cuervo, orange liquor, fresh lime juice, fresh cucumber slices & organic agave nectar. On the rocks.',
    price: '19',
    image: '/image/Oh-Mexico-13.jpg',
  },
  {
    categoryId: 'margaritas',
    name: 'Watermelon Margarita',
    description: 'José Cuervo, orange liquor, fresh lime juice, smashed fresh watermelon & organic agave nectar. On the rocks.',
    price: '19',
    image: '/image/Oh-Mexico-13.jpg',
  },
  {
    categoryId: 'margaritas',
    name: 'Strawberry Margarita',
    description: 'José Cuervo, orange liquor, fresh lime juice, organic agave nectar & strawberry mix. Natural or frozen.',
    price: '19',
    image: '/image/Oh-Mexico-13.jpg',
  },
  {
    categoryId: 'margaritas',
    name: 'Mango Margarita',
    description: 'José Cuervo, orange liquor, fresh lime juice, organic agave nectar & mango mix. Natural or frozen.',
    price: '19',
    image: '/image/Oh-Mexico-13.jpg',
  },
  // Micheladas
  {
    categoryId: 'micheladas',
    name: 'Chelada',
    description: 'Lime juice & salt.',
    price: '11',
    image: '/image/Oh-Mexico-1.jpg',
  },
  {
    categoryId: 'micheladas',
    name: 'Michelada',
    description: 'Fresh lime juice, clamato juice & secret sauce.',
    price: '13',
    image: '/image/Oh-Mexico-1.jpg',
  },
  {
    categoryId: 'micheladas',
    name: 'Mango Chelada',
    description: 'Fresh lime juice, clamato juice, mango mix & chamoy sauce.',
    price: '14',
    image: '/image/Oh-Mexico-1.jpg',
  },
  // Mocktails
  {
    categoryId: 'mocktails',
    name: 'Blueberry Mint Lemonade',
    description: 'Blueberries, mint leaves, agave nectar, lemon juice, coconut water.',
    price: '13',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'mocktails',
    name: 'Spicy Watermelon Lemonade',
    description: 'Fresh watermelon juice, jalapeños, cilantro, lemon juice, agave.',
    price: '13',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'mocktails',
    name: 'Pineapple Jalapeño',
    description: 'The margarita you love without alcohol. Smoke pineapple juice, jalapeños, agave nectar, fresh lime juice.',
    price: '13',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'mocktails',
    name: 'Dragon Fruit Mule',
    description: 'Dragon fruit pure, lime juice, infused sugar cane, ginger beer.',
    price: '13',
    image: '/image/feriado/aceituna.png',
  },
  // Tequila Pops
  {
    categoryId: 'tequila-pops',
    name: 'Mango Peach Pop',
    description: 'Tequila, coconut rim & mango popsicle.',
    price: '17',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'tequila-pops',
    name: 'Watermelon Blackberry Pop',
    description: 'Tequila, lemon, jalapeño, Tajín rim & watermelon popsicle.',
    price: '17',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'tequila-pops',
    name: 'Pasion Fruit Strawberry Pop',
    description: 'Tequila, Tajín rim & strawberry popsicle.',
    price: '17',
    image: '/image/feriado/aceituna.png',
  },
  // Cantaritos
  {
    categoryId: 'cantaritos',
    name: 'Flor de Mayo',
    description: 'Ojo de Tigre Mezcal, fresh mango fruit, agave nectar, fresh lime juice, cranberry juice & fresh mint.',
    price: '18',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'cantaritos',
    name: 'Smoky Watermelon',
    description: 'El Silencio Mezcal, fresh watermelon, fresh cucumber, jalapenos, agave & chili Tajin.',
    price: '18',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'cantaritos',
    name: 'Paloma',
    description: 'Jimador Silver or Ojo de Tigre Mezcal, fresh lime juice & grapefruit juice soda.',
    price: '18',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'cantaritos',
    name: 'Chachalaca',
    description: 'Ojo de Tigre Mezcal, Combier, pineapple juice, fresh orange juice, fresh lime juice & cranberry juice.',
    price: '18',
    image: '/image/feriado/aceituna.png',
  },
  {
    categoryId: 'cantaritos',
    name: 'Mezcal Negroni',
    description: 'El Silencio Mezcal, Campari & sweet vermouth.',
    price: '18',
    image: '/image/feriado/aceituna.png',
  },
  // Beer
  { categoryId: 'beer', name: 'Dos Equis Lager', description: 'Pale Lager 4.5%', price: '10', image: '/image/Oh-Mexico-1.jpg' },
  { categoryId: 'beer', name: 'Dos Equis Ambar', description: 'Pale Lager 4.7%', price: '10', image: '/image/Oh-Mexico-1.jpg' },
  { categoryId: 'beer', name: 'Modelo Especial', description: 'Pale lager 4.4%', price: '10', image: '/image/Oh-Mexico-1.jpg' },
  { categoryId: 'beer', name: 'Negra Modelo', description: 'Dunkel lager 5.4%', price: '10', image: '/image/Oh-Mexico-1.jpg' },
  { categoryId: 'beer', name: 'Tecate', description: 'Golden lager 4.5%', price: '10', image: '/image/Oh-Mexico-1.jpg' },
  { categoryId: 'beer', name: 'Tecate Light', description: 'Light lager 3.9%', price: '10', image: '/image/Oh-Mexico-1.jpg' },
  { categoryId: 'beer', name: 'Corona', description: 'Pale lager 4.5%', price: '10', image: '/image/Oh-Mexico-1.jpg' },
  { categoryId: 'beer', name: 'Corona Light', description: 'Light lager 4.1%', price: '10', image: '/image/Oh-Mexico-1.jpg' },
  { categoryId: 'beer', name: 'Victoria', description: 'Amber lager 4.0%', price: '10', image: '/image/Oh-Mexico-1.jpg' },
  { categoryId: 'beer', name: 'Pacifico', description: 'Pale lager 4.5%', price: '10', image: '/image/Oh-Mexico-1.jpg' },
  { categoryId: 'beer', name: 'Lagunitas IPA', description: 'IPA 6.2%', price: '10', image: '/image/Oh-Mexico-1.jpg' },
  { categoryId: 'beer', name: 'Blue Moon', description: 'Wheat-Ale 5.4%', price: '10', image: '/image/Oh-Mexico-1.jpg' },
  { categoryId: 'beer', name: 'Heineken', description: 'Pilsner 5.2%', price: '10', image: '/image/Oh-Mexico-1.jpg' },
  // Mezcal (Española Way & Lincoln Road)
  { categoryId: 'mezcal', name: 'Casamigos Mezcal', description: '', price: '24' },
  { categoryId: 'mezcal', name: 'Chichicapa', description: '', price: '16' },
  { categoryId: 'mezcal', name: 'Ilegal Añejo', description: '', price: '19' },
  { categoryId: 'mezcal', name: 'Ilegal Joven', description: '', price: '17' },
  { categoryId: 'mezcal', name: 'Ilegal Reposado', description: '', price: '18' },
  { categoryId: 'mezcal', name: 'Los Amantes Reposado', description: '', price: '27' },
  { categoryId: 'mezcal', name: 'Monte Alban', description: '', price: '16' },
  { categoryId: 'mezcal', name: 'Montelobos', description: '', price: '21' },
  { categoryId: 'mezcal', name: 'Ojo de Tigre', description: '', price: '16' },
  { categoryId: 'mezcal', name: 'Pechuga', description: '', price: '22' },
  { categoryId: 'mezcal', name: 'Tobala', description: '', price: '25' },
  { categoryId: 'mezcal', name: 'Unión Silver', description: '', price: '16' },
  { categoryId: 'mezcal', name: 'Vida', description: '', price: '16' },
  { categoryId: 'mezcal', name: 'Zignum Añejo', description: '', price: '18' },
  { categoryId: 'mezcal', name: 'Zignum Reposado', description: '', price: '17' },
  { categoryId: 'mezcal', name: 'Los Amantes Joven', description: '', price: '27' },
  { categoryId: 'mezcal', name: 'Santo Domingo de Albarradas', description: '', price: '16' },
  // Sodas & Water
  { categoryId: 'sodas', name: 'Coca Cola', description: '', price: '5' },
  { categoryId: 'sodas', name: 'Diet Coke', description: '', price: '5' },
  { categoryId: 'sodas', name: 'Sprite', description: '', price: '5' },
  { categoryId: 'sodas', name: 'Jarritos', description: '', price: '5' },
  { categoryId: 'sodas', name: 'Sangria Soda', description: '', price: '5' },
  { categoryId: 'sodas', name: 'Sidral', description: '', price: '5' },
  { categoryId: 'sodas', name: 'Horchata', description: '', price: '6' },
  { categoryId: 'sodas', name: 'Tamarindo', description: '', price: '6' },
  { categoryId: 'sodas', name: 'Acqua Panna', description: 'Large bottle.', price: '8' },
  { categoryId: 'sodas', name: 'Topo Chico', description: 'Small bottle.', price: '5' },
  // Tequila Silver (Española Way & Lincoln Road)
  { categoryId: 'tequila-blanco', name: '512 Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: '1800 Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Avion Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Azunia Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Cabo Wabo Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Casamigos Silver', description: '', price: '17' },
  { categoryId: 'tequila-blanco', name: 'Cazadores Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Clase Azul Silver', description: '', price: '55' },
  { categoryId: 'tequila-blanco', name: 'Chinaco Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Corralejo Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Corzo Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'DeLeon Silver', description: '', price: '18' },
  { categoryId: 'tequila-blanco', name: 'Don Julio Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Don Ramón Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'El Jimador Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Espolón Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Exótico Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Gran Centenario Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Herradura Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'José Cuervo Tradicional Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Maestro Dobel Silver', description: '', price: '17' },
  { categoryId: 'tequila-blanco', name: 'Milagro Silver', description: '', price: '17' },
  { categoryId: 'tequila-blanco', name: 'Milagro Selection Silver', description: '', price: '18' },
  { categoryId: 'tequila-blanco', name: 'Monte Alban Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Partida Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Patrón Silver', description: '', price: '17' },
  { categoryId: 'tequila-blanco', name: 'Peligroso Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Riazul Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Sauza Blue Agave Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Sauza Hornitos Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Sauza Tres Generaciones Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Siete Leguas Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Teremana Silver', description: '', price: '17' },
  { categoryId: 'tequila-blanco', name: 'Tesoro Silver', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Casa Dragones Silver', description: '', price: '18' },
  // Tequila Reposado (Española Way & Lincoln Road)
  { categoryId: 'tequila-reposado', name: '512 Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: '1800 Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Avion Reposado', description: '', price: '18' },
  { categoryId: 'tequila-reposado', name: 'Cabo Wabo Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Casamigos Reposado', description: '', price: '20' },
  { categoryId: 'tequila-reposado', name: 'Casa Dragones Reposado', description: '', price: '21' },
  { categoryId: 'tequila-reposado', name: 'Cazadores Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Clase Azul Reposado', description: '', price: '65' },
  { categoryId: 'tequila-reposado', name: 'Chinaco Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Corazón Reposado', description: '', price: '16' },
  { categoryId: 'tequila-reposado', name: 'Corralejo Triple Destilado', description: '', price: '28' },
  { categoryId: 'tequila-reposado', name: 'Corzo Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'DeLeon Reposado', description: '', price: '19' },
  { categoryId: 'tequila-reposado', name: 'Don Julio Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Monte Alban Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Dulce Vida Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'El Jimador Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Espolón Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Exótico Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Gran Centenario Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Herradura Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'José Cuervo Tradicional Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Lobos Reposado', description: '', price: '18' },
  { categoryId: 'tequila-reposado', name: 'Maestro Dobel Reposado', description: '', price: '18' },
  { categoryId: 'tequila-reposado', name: 'Milagro Reposado', description: '', price: '18' },
  { categoryId: 'tequila-reposado', name: 'Patrón Reposado', description: '', price: '18' },
  { categoryId: 'tequila-reposado', name: 'Riazul Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Sauza Blue Agave Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Sauza Hornitos Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Sauza Tres Generaciones Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Siete Leguas Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Teremana Reposado', description: '', price: '18' },
  { categoryId: 'tequila-reposado', name: 'Tesoro Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Milagro Seleccion Reposado', description: '', price: '20' },
  { categoryId: 'tequila-reposado', name: 'Corralejo Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Casamigos Cristalino Reposado', description: '', price: '28' },
  // Tequila Añejo (Española Way & Lincoln Road)
  { categoryId: 'tequila-anejo', name: '512 Añejo', description: '', price: '19' },
  { categoryId: 'tequila-anejo', name: '1800 Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: '1800 Cristalino', description: '', price: '24' },
  { categoryId: 'tequila-anejo', name: '1800 Milenio', description: '', price: '60' },
  { categoryId: 'tequila-anejo', name: 'Avion Añejo', description: '', price: '19' },
  { categoryId: 'tequila-anejo', name: 'Avion 44 Extra Añejo', description: '', price: '60' },
  { categoryId: 'tequila-anejo', name: 'Blue Nectar Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'Cabo Wabo Añejo', description: '', price: '20' },
  { categoryId: 'tequila-anejo', name: 'Casamigos Añejo', description: '', price: '24' },
  { categoryId: 'tequila-anejo', name: 'Cazadores Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'Caza Dragones Añejo', description: '', price: '28' },
  { categoryId: 'tequila-anejo', name: 'Casa Noble Añejo', description: '', price: '27' },
  { categoryId: 'tequila-anejo', name: 'Centinela 3 Years', description: '', price: '48' },
  { categoryId: 'tequila-anejo', name: 'Chinaco Añejo', description: '', price: '20' },
  { categoryId: 'tequila-anejo', name: 'Chinaco Negro', description: '', price: '40' },
  { categoryId: 'tequila-anejo', name: 'Clase Azul Añejo', description: '', price: '135' },
  { categoryId: 'tequila-anejo', name: 'Corazón Extra Añejo', description: '', price: '27' },
  { categoryId: 'tequila-anejo', name: 'Corralejo Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'Corralejo 99000 hrs', description: '', price: '28' },
  { categoryId: 'tequila-anejo', name: 'Corralejo Extra 1821', description: '', price: '46' },
  { categoryId: 'tequila-anejo', name: 'Corzo Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'DeLeon Añejo', description: '', price: '21' },
  { categoryId: 'tequila-anejo', name: 'Don Julio Añejo', description: '', price: '20' },
  { categoryId: 'tequila-anejo', name: 'Don Julio 1942', description: '', price: '50' },
  { categoryId: 'tequila-anejo', name: 'Don Ramón Reserve Añejo', description: '', price: '25' },
  { categoryId: 'tequila-anejo', name: 'Sauza Blue Agave Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'Dulce Vida Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'Dulce Vida Extra Añejo', description: '', price: '55' },
  { categoryId: 'tequila-anejo', name: 'El Jimador Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'Espolon Añejo', description: '', price: '19' },
  { categoryId: 'tequila-anejo', name: 'Gran Centenario Añejo', description: '', price: '20' },
  { categoryId: 'tequila-anejo', name: 'Gran Coramino Cristalino', description: '', price: '23' },
  { categoryId: 'tequila-anejo', name: 'Gran Coramino Añejo', description: '', price: '30' },
  { categoryId: 'tequila-anejo', name: 'Gran Corralejo RSV', description: '', price: '40' },
  { categoryId: 'tequila-anejo', name: 'Herencia Mexicana Añejo', description: '', price: '20' },
  { categoryId: 'tequila-anejo', name: 'Herradura Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'Herradura Teq. Sel. Suprema', description: '', price: '110' },
  { categoryId: 'tequila-anejo', name: 'José Cuervo Teq. RSV Familia', description: '', price: '55' },
  { categoryId: 'tequila-anejo', name: 'Maestro Dobel Añejo', description: '', price: '19' },
  { categoryId: 'tequila-anejo', name: 'Milagro Añejo', description: '', price: '19' },
  { categoryId: 'tequila-anejo', name: 'Partida Elegante Extra', description: '', price: '120' },
  { categoryId: 'tequila-anejo', name: 'Patrón Añejo', description: '', price: '19' },
  { categoryId: 'tequila-anejo', name: 'Rey Sol', description: '', price: '70' },
  { categoryId: 'tequila-anejo', name: 'Riazul Añejo', description: '', price: '19' },
  { categoryId: 'tequila-anejo', name: 'Rock n Roll Añejo', description: '', price: '19' },
  { categoryId: 'tequila-anejo', name: 'Sauza Hornitos Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'Sauza Tres Generaciones Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'Siete Leguas Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'Teremana Añejo', description: '', price: '19' },
  { categoryId: 'tequila-anejo', name: 'Tesoro Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'Tesoro Añejo Paradise', description: '', price: '35' },
  { categoryId: 'tequila-anejo', name: 'Milagro Seleccion Añejo', description: '', price: '35' },
  { categoryId: 'tequila-anejo', name: 'Don Julio 70 Años', description: '', price: '' },
  { categoryId: 'tequila-anejo', name: 'Dulce Vida 5 Años', description: '', price: '' },
];

// ─── HAPPY HOUR ITEMS (Española Way) ─────────────────────────────────────────
const HAPPY_HOUR_ESPANOLA: MenuItem[] = [
  { categoryId: 'happy-hour', name: 'Tacos (Happy Hour)', description: 'Veggie · Pastor · Baja Chicken. Daily 3–7 pm.', price: '4' },
  { categoryId: 'happy-hour', name: 'Mexican Beers (Happy Hour)', description: 'XX Lager · XX Ambar · Tecate · Heineken. Daily 3–7 pm.', price: '6' },
  { categoryId: 'happy-hour', name: 'Classic Margarita (Happy Hour)', description: 'Daily 3–7 pm.', price: '8' },
  { categoryId: 'happy-hour', name: 'Tequila & Vodka Shots (Happy Hour)', description: 'Daily 3–7 pm.', price: '8' },
  { categoryId: 'happy-hour', name: 'Tequila Pops (Happy Hour)', description: 'Mango Peach · Passion Fruit Strawberry · Watermelon Blackberry. Daily 3–7 pm.', price: '8' },
  { categoryId: 'happy-hour', name: 'Margaritas Mon–Fri', description: 'Oh! Mexico · Jalapeño · Kiwi · Cucumber · Strawberry · Watermelon. Mon–Fri 4–7 pm.', price: '8' },
  { categoryId: 'happy-hour', name: 'Classic Cocktails Mon–Fri', description: 'Mojito · Cuba Libre · Gin Tonic. Mon–Fri 4–7 pm.', price: '8' },
  { categoryId: 'happy-hour', name: 'Tequila Pops Mon–Fri', description: 'Mango Peach · Passion Fruit Strawberry · Watermelon Blackberry. Mon–Fri 4–7 pm.', price: '8' },
  { categoryId: 'happy-hour', name: 'Beers Mon–Fri', description: 'Tecate · Pacifico · Heineken. Mon–Fri 4–7 pm.', price: '6' },
  { categoryId: 'happy-hour', name: 'Classic Guacamole (Happy Hour)', description: 'Mexican Bites. Mon–Fri 4–7 pm.', price: '8' },
];

// ─── HAPPY HOUR ITEMS (Lincoln Road) ─────────────────────────────────────────
const HAPPY_HOUR_LINCOLN: MenuItem[] = [
  { categoryId: 'happy-hour', name: 'Tacos (Happy Hour)', description: 'Veggie · Pastor · Baja Chicken. Daily 3–7 pm.', price: '4' },
  { categoryId: 'happy-hour', name: 'Classic Margarita (Happy Hour)', description: 'Daily 3–7 pm.', price: '8' },
  { categoryId: 'happy-hour', name: 'Mexican Beers (Happy Hour)', description: 'XX Lager · XX Ambar · Tecate · Heineken. Daily 3–7 pm.', price: '6' },
  { categoryId: 'happy-hour', name: 'Tequila & Vodka Shots (Happy Hour)', description: 'Daily 3–7 pm.', price: '8' },
  { categoryId: 'happy-hour', name: 'Tequila Pops (Happy Hour)', description: 'Mango Peach · Pasion Fruit Strawberry · Watermelon Blackberry. Daily 3–7 pm.', price: '8' },
  { categoryId: 'happy-hour', name: 'Margaritas Mon–Fri', description: 'Oh! Mexico · Jalapeño · Kiwi · Cucumber · Strawberry · Watermelon. Mon–Fri 4–7 pm.', price: '8' },
  { categoryId: 'happy-hour', name: 'Classic Cocktails Mon–Fri', description: 'Mojito · Cuba Libre · Gin Tonic. Mon–Fri 4–7 pm.', price: '8' },
  { categoryId: 'happy-hour', name: 'Tequila Pops Mon–Fri', description: 'Mango Peach · Passion Fruit Strawberry · Watermelon Blackberry. Mon–Fri 4–7 pm.', price: '8' },
  { categoryId: 'happy-hour', name: 'Beers Mon–Fri', description: 'Tecate · Pacifico · Heineken. Mon–Fri 4–7 pm.', price: '6' },
  { categoryId: 'happy-hour', name: 'Classic Guacamole (Happy Hour)', description: 'Mexican Bites. Mon–Fri 4–7 pm.', price: '8' },
];

// ─── OCEAN DRIVE SPECIFIC DRINKS ─────────────────────────────────────────────
const OCEAN_DRIVE_DRINKS: MenuItem[] = [
  // Margaritas (same as shared)
  ...SHARED_DRINKS_ESPA_LINCOLN.filter((i) => i.categoryId === 'margaritas'),
  // Micheladas (same)
  ...SHARED_DRINKS_ESPA_LINCOLN.filter((i) => i.categoryId === 'micheladas'),
  // Mocktails (Ocean Drive has 4 items, same names but in different order)
  { categoryId: 'mocktails', name: 'Blueberry Mint Lemonade', description: 'Blueberries, mint leaves, agave nectar, lemon juice, coconut water.', price: '13', image: '/image/feriado/aceituna.png' },
  { categoryId: 'mocktails', name: 'Dragon Fruit Mule', description: 'Dragon fruit pure, lime juice, infused sugar cane, ginger beer.', price: '13', image: '/image/feriado/aceituna.png' },
  { categoryId: 'mocktails', name: 'Spicy Watermelon Lemonade', description: 'Fresh watermelon juice, jalapeños, cilantro, lemon juice, agave.', price: '13', image: '/image/feriado/aceituna.png' },
  { categoryId: 'mocktails', name: 'Pineapple Jalapeño', description: 'The margarita you love without alcohol. Smoke pineapple juice, jalapeños, agave nectar, fresh lime juice.', price: '13', image: '/image/feriado/aceituna.png' },
  // Cantaritos
  { categoryId: 'cantaritos', name: 'Flor de Mayo', description: 'Ojo de Tigre Mezcal, fresh mango fruit, agave nectar, fresh lime juice, cranberry juice & fresh mint.', price: '18' },
  { categoryId: 'cantaritos', name: 'Smoky Watermelon', description: 'El Silencio Mezcal, fresh watermelon, fresh cucumber, jalapenos, agave & chili Tajin.', price: '18' },
  { categoryId: 'cantaritos', name: 'Paloma', description: 'Jimador Silver or El Silencio Mezcal, fresh lime juice & grapefruit juice soda.', price: '18' },
  { categoryId: 'cantaritos', name: 'Chachalaca', description: 'Ojo de Tigre Mezcal, Combier, pineapple juice, fresh orange juice, fresh lime juice & cranberry juice.', price: '18' },
  { categoryId: 'cantaritos', name: 'Mezcal Negroni', description: 'El Silencio Mezcal, Campari & sweet vermouth.', price: '18' },
  // Tequila Pops (same)
  ...SHARED_DRINKS_ESPA_LINCOLN.filter((i) => i.categoryId === 'tequila-pops'),
  // Beer (same)
  ...SHARED_DRINKS_ESPA_LINCOLN.filter((i) => i.categoryId === 'beer'),
  // Mezcal (Ocean Drive — different list)
  { categoryId: 'mezcal', name: 'Ojo de Tigre', description: '', price: '16' },
  { categoryId: 'mezcal', name: 'El Silencio', description: '', price: '17' },
  { categoryId: 'mezcal', name: 'Del Maguey Vida', description: '', price: '16' },
  { categoryId: 'mezcal', name: 'Amaras Cupreata', description: '', price: '21' },
  { categoryId: 'mezcal', name: 'Illegal Joven', description: '', price: '17' },
  { categoryId: 'mezcal', name: 'Illegal Reposado', description: '', price: '18' },
  { categoryId: 'mezcal', name: 'Illegal Añejo', description: '', price: '19' },
  { categoryId: 'mezcal', name: '400 Conejos Espadín', description: '', price: '18' },
  { categoryId: 'mezcal', name: '400 Conejos Cuishe', description: '', price: '16' },
  { categoryId: 'mezcal', name: 'Union Mezcal', description: '', price: '16' },
  { categoryId: 'mezcal', name: 'Akul Espadín', description: '', price: '16' },
  { categoryId: 'mezcal', name: 'Akul Cirial', description: '', price: '22' },
  { categoryId: 'mezcal', name: 'Sacrvm Ensamble', description: '', price: '16' },
  { categoryId: 'mezcal', name: 'Montelobos', description: '', price: '21' },
  { categoryId: 'mezcal', name: 'Casamigos Mezcal', description: '', price: '24' },
  { categoryId: 'mezcal', name: 'Sotol Por Siempre', description: 'Sotol.', price: '17' },
  { categoryId: 'mezcal', name: 'Nocheluna Sotol', description: 'Sotol.', price: '22' },
  // Sodas & Water (same)
  ...SHARED_DRINKS_ESPA_LINCOLN.filter((i) => i.categoryId === 'sodas'),
  // Tequila Blanco (Ocean Drive)
  { categoryId: 'tequila-blanco', name: '512 Blanco', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: '1800 Blanco', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Casamigos Blanco', description: '', price: '17' },
  { categoryId: 'tequila-blanco', name: 'Cazadores Blanco', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Don Julio Blanco', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Herradura Blanco', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Tromba Blanco', description: '', price: '17' },
  { categoryId: 'tequila-blanco', name: 'Patrón Blanco', description: '', price: '17' },
  { categoryId: 'tequila-blanco', name: 'Clase Azul Blanco', description: '', price: '55' },
  { categoryId: 'tequila-blanco', name: 'El Jimador Blanco', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'José Cuervo Tradicional Blanco', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Maestro Dobel Blanco', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Ocho Blanco', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Espolón Blanco', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Milagro Blanco', description: '', price: '17' },
  { categoryId: 'tequila-blanco', name: 'Siete Leguas Blanco', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Teremana Blanco', description: '', price: '17' },
  { categoryId: 'tequila-blanco', name: 'Sauza Blue Agave Blanco', description: '', price: '16' },
  { categoryId: 'tequila-blanco', name: 'Casa Dragones Blanco', description: '', price: '18' },
  // Tequila Reposado (Ocean Drive)
  { categoryId: 'tequila-reposado', name: '512 Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: '1800 Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Casamigos Reposado', description: '', price: '20' },
  { categoryId: 'tequila-reposado', name: 'Cazadores Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Caza Dragones Reposado', description: '', price: '21' },
  { categoryId: 'tequila-reposado', name: 'Don Julio Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Herradura Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Tromba Reposado', description: '', price: '18' },
  { categoryId: 'tequila-reposado', name: 'Patrón Reposado', description: '', price: '18' },
  { categoryId: 'tequila-reposado', name: 'Clase Azul Reposado', description: '', price: '65' },
  { categoryId: 'tequila-reposado', name: 'El Jimador Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Ocho Reposado', description: '', price: '18' },
  { categoryId: 'tequila-reposado', name: 'Espolón Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Milagro Reposado', description: '', price: '18' },
  { categoryId: 'tequila-reposado', name: 'Siete Leguas Reposado', description: '', price: '17' },
  { categoryId: 'tequila-reposado', name: 'Teremana Reposado', description: '', price: '18' },
  { categoryId: 'tequila-reposado', name: 'KOMOS Rosa', description: '', price: '30' },
  // Tequila Añejo (Ocean Drive)
  { categoryId: 'tequila-anejo', name: '512 Añejo', description: '', price: '19' },
  { categoryId: 'tequila-anejo', name: '1800 Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: '1800 Cristalino', description: '', price: '24' },
  { categoryId: 'tequila-anejo', name: '1800 Milenio', description: '', price: '60' },
  { categoryId: 'tequila-anejo', name: 'Casamigos Añejo', description: '', price: '24' },
  { categoryId: 'tequila-anejo', name: 'Casa Dragones Añejo', description: '', price: '28' },
  { categoryId: 'tequila-anejo', name: 'Casa Dragones Joven', description: '', price: '25' },
  { categoryId: 'tequila-anejo', name: 'Don Julio Añejo', description: '', price: '20' },
  { categoryId: 'tequila-anejo', name: 'Don Julio 1942', description: '', price: '50' },
  { categoryId: 'tequila-anejo', name: 'Don Julio 70', description: '', price: '30' },
  { categoryId: 'tequila-anejo', name: 'Herradura Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'Herradura Ultra Añejo', description: '', price: '25' },
  { categoryId: 'tequila-anejo', name: 'Herradura Seleccion Supreme', description: '', price: '110' },
  { categoryId: 'tequila-anejo', name: 'Tromba Añejo', description: '', price: '21' },
  { categoryId: 'tequila-anejo', name: 'Patrón Añejo', description: '', price: '19' },
  { categoryId: 'tequila-anejo', name: 'Rey Sol', description: '', price: '70' },
  { categoryId: 'tequila-anejo', name: 'Clase Azul Añejo', description: '', price: '135' },
  { categoryId: 'tequila-anejo', name: 'El Jimador Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'Ocho Añejo', description: '', price: '20' },
  { categoryId: 'tequila-anejo', name: 'Espolon Añejo', description: '', price: '19' },
  { categoryId: 'tequila-anejo', name: 'Milagro Añejo', description: '', price: '19' },
  { categoryId: 'tequila-anejo', name: 'Siete Leguas Añejo', description: '', price: '18' },
  { categoryId: 'tequila-anejo', name: 'Komos Añejo Cristalino', description: '', price: '35' },
  { categoryId: 'tequila-anejo', name: 'Teremana Añejo', description: '', price: '19' },
  { categoryId: 'tequila-anejo', name: 'Sauza Blue Agave Añejo', description: '', price: '18' },
];

// ─── HAPPY HOUR (Ocean Drive) ─────────────────────────────────────────────────
const HAPPY_HOUR_OCEAN: MenuItem[] = [
  { categoryId: 'happy-hour', name: 'Tacos (Happy Hour)', description: 'Veggie · Pastor · Baja Chicken. Daily 3–7 pm.', price: '4' },
  { categoryId: 'happy-hour', name: 'Classic Margarita (Happy Hour)', description: 'Daily 3–7 pm.', price: '9' },
  { categoryId: 'happy-hour', name: 'Tequila & Vodka Shots (Happy Hour)', description: 'Daily 3–7 pm.', price: '9' },
  { categoryId: 'happy-hour', name: 'Tequila Pops (Happy Hour)', description: 'Mango Peach · Pasion Fruit Strawberry · Watermelon Blackberry. Daily 3–7 pm.', price: '9' },
  { categoryId: 'happy-hour', name: 'Mexican Beers (Happy Hour)', description: 'XX Lager · XX Ambar · Tecate · Heineken. Daily 3–7 pm.', price: '7' },
  { categoryId: 'happy-hour', name: 'Margaritas Mon–Fri', description: 'Oh! Mexico · Jalapeño · Kiwi · Cucumber · Strawberry · Watermelon. Mon–Fri 4–7 pm.', price: '' },
  { categoryId: 'happy-hour', name: 'Classic Cocktails Mon–Fri', description: 'Mojito · Cuba Libre · Gin Tonic. Mon–Fri 4–7 pm.', price: '' },
  { categoryId: 'happy-hour', name: 'Tequila Pops Mon–Fri', description: 'Mango Peach · Passion Fruit Strawberry · Watermelon Blackberry. Mon–Fri 4–7 pm.', price: '' },
  { categoryId: 'happy-hour', name: 'Beers Mon–Fri', description: 'Tecate · Pacifico · Heineken. Mon–Fri 4–7 pm.', price: '7' },
  { categoryId: 'happy-hour', name: 'Classic Guacamole (Happy Hour)', description: 'Mexican Bites. Mon–Fri 4–7 pm.', price: '8' },
];

// ─── MENU ITEMS BY LOCATION ───────────────────────────────────────────────────
export const menuItemsByLocation: Record<MenuLocationKey, MenuItem[]> = {
  'espanola-way': [
    ...SHARED_FOOD_ITEMS,
    ...SHARED_DRINKS_ESPA_LINCOLN,
    ...HAPPY_HOUR_ESPANOLA,
  ],
  'lincoln-road': [
    ...SHARED_FOOD_ITEMS,
    ...SHARED_DRINKS_ESPA_LINCOLN,
    ...HAPPY_HOUR_LINCOLN,
  ],
  'ocean-drive': [
    ...SHARED_FOOD_ITEMS,
    ...OCEAN_DRIVE_DRINKS,
    ...HAPPY_HOUR_OCEAN,
  ],
};

// ─── UTILITY FUNCTIONS ────────────────────────────────────────────────────────

/** Generates a URL-safe slug from a product name */
export function getMenuItemSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/ñ/g, 'n')
    .replace(/é/g, 'e')
    .replace(/á/g, 'a')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'item';
}

/** Finds a menu item by location, category and product slug. Returns null if not found. */
export function getMenuItemBySlug(
  location: string,
  categoryId: string,
  productSlug: string
): MenuItem | null {
  const locationKey = location as MenuLocationKey;
  if (!menuItemsByLocation[locationKey]) return null;
  const items = menuItemsByLocation[locationKey];
  return (
    items.find(
      (item) =>
        item.categoryId === categoryId && getMenuItemSlug(item.name) === productSlug
    ) ?? null
  );
}

/** Valid location segment for URL */
export function isValidMenuLocation(location: string): location is MenuLocationKey {
  return location === 'espanola-way' || location === 'lincoln-road' || location === 'ocean-drive';
}

/** Returns the display label for a category */
export function getCategoryLabel(location: MenuLocationKey, categoryId: string): string {
  const categories = menuCategoriesByLocation[location];
  const found = categories.find((c) => c.id === categoryId);
  if (found) return found.label;
  return categoryId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Returns full category (with optional description, image) by location and id */
export function getCategoryByLocationAndId(
  location: MenuLocationKey,
  categoryId: string
): MenuCategory | null {
  const categories = menuCategoriesByLocation[location];
  return categories.find((c) => c.id === categoryId) ?? null;
}

/** Returns menu items for a location and category */
export function getMenuItemsByLocationAndCategory(
  location: MenuLocationKey,
  categoryId: string
): MenuItem[] {
  const items = menuItemsByLocation[location] ?? [];
  return items.filter((item) => item.categoryId === categoryId);
}

/** Returns other menu items in the same location and category, excluding the current product */
export function getRelatedMenuItems(
  location: MenuLocationKey,
  categoryId: string,
  excludeProductSlug: string
): MenuItem[] {
  const items = menuItemsByLocation[location] ?? [];
  return items
    .filter(
      (item) =>
        item.categoryId === categoryId &&
        getMenuItemSlug(item.name) !== excludeProductSlug
    )
    .slice(0, 4);
}
