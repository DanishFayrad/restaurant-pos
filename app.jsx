const { useState, useRef } = React;

const App = () => {
    // ============ STATE ============
    const [menuData, setMenuData] = useState({
        starter: [
            { id: 1, name: 'Chicken Wings', price: 20, description: 'Crispy fried chicken wings with hot sauce.', image: 'https://images.unsplash.com/photo-1567670847-1ba3472a4b88?w=300&h=200&fit=crop', spicy: true },
            { id: 2, name: 'Summer Salad', price: 10, description: 'Fresh greens, tomatoes, and citrus dressing.', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=200&fit=crop', spicy: false },
            { id: 3, name: 'French Fries', price: 5, description: 'Classic golden french fries with ketchup.', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=300&h=200&fit=crop', spicy: false },
            { id: 4, name: 'Garlic Bread', price: 8, description: 'Toasted bread with garlic butter and herbs.', image: 'https://images.unsplash.com/photo-1619531040576-f9416740661b?w=300&h=200&fit=crop', spicy: false },
            { id: 5, name: 'Mozzarella Sticks', price: 12, description: 'Deep fried mozzarella with marinara sauce.', image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=300&h=200&fit=crop', spicy: false },
            { id: 6, name: 'Spicy Nachos', price: 15, description: 'Tortilla chips with cheese, jalapenos, and salsa.', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300&h=200&fit=crop', spicy: true },
        ],
        main: [
            { id: 7, name: 'Grilled Salmon', price: 35, description: 'Fresh Atlantic salmon with vegetables.', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop', spicy: false },
            { id: 8, name: 'Beef Steak', price: 45, description: 'Premium cut beef steak with mushroom sauce.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=300&h=200&fit=crop', spicy: false },
            { id: 9, name: 'Chicken Pasta', price: 28, description: 'Creamy alfredo pasta with grilled chicken.', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=200&fit=crop', spicy: true },
            { id: 10, name: 'Vegetable Curry', price: 22, description: 'Mixed vegetables in spicy coconut curry.', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&h=200&fit=crop', spicy: true },
        ],
        dessert: [
            { id: 11, name: 'Chocolate Cake', price: 12, description: 'Rich chocolate lava cake with ice cream.', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop', spicy: false },
            { id: 12, name: 'Ice Cream', price: 8, description: 'Vanilla and chocolate scoop with waffle.', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300&h=200&fit=crop', spicy: false },
        ],
        drinks: [
            { id: 13, name: 'Fresh Juice', price: 6, description: 'Freshly squeezed orange juice.', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=200&fit=crop', spicy: false },
            { id: 14, name: 'Iced Coffee', price: 5, description: 'Cold brew coffee with milk and ice.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop', spicy: false },
            { id: 15, name: 'Soft Drink', price: 4, description: 'Choice of Coke, Sprite, or Fanta.', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=300&h=200&fit=crop', spicy: false },
        ]
    });

    const [tables, setTables] = useState([
        { id: 'T1', seats: 4, floor: 1, status: 'available' },
        { id: 'T2', seats: 2, floor: 1, status: 'available' },
        { id: 'T3', seats: 6, floor: 2, status: 'reserved' },
        { id: 'T4', seats: 4, floor: 2, status: 'available' },
        { id: 'T5', seats: 2, floor: 3, status: 'occupied' },
        { id: 'T6', seats: 4, floor: 3, status: 'available' },
    ]);

    const [currentView, setCurrentView] = useState('table');
    const [selectedTable, setSelectedTable] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('starter');
    const [currentFloor, setCurrentFloor] = useState(1);
    const [orderItems, setOrderItems] = useState([]);
    const [orderNumber, setOrderNumber] = useState(Math.floor(Math.random() * 90000000) + 10000000);
    
    // Search & Modals
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false);
    const [isAddMenuItemModalOpen, setIsAddMenuItemModalOpen] = useState(false);

    // Form Refs
    const newTableNameRef = useRef(null);
    const newTableSeatsRef = useRef(null);
    const newTableFloorRef = useRef(null);
    const newItemNameRef = useRef(null);
    const newItemDescRef = useRef(null);
    const newItemPriceRef = useRef(null);
    const newItemCategoryRef = useRef(null);
    const newItemImageRef = useRef(null);
    const newItemSpicyRef = useRef(null);

    // ============ HANDLERS ============
    const selectTable = (tableId) => setSelectedTable(tableId);

    const cycleTableStatus = (tableId) => {
        setTables(prev => prev.map(t => {
            if (t.id === tableId) {
                const nextStatus = t.status === 'available' ? 'reserved' : t.status === 'reserved' ? 'occupied' : 'available';
                return { ...t, status: nextStatus };
            }
            return t;
        }));
    };

    const removeTable = (tableId) => {
        setTables(prev => prev.filter(t => t.id !== tableId));
        if (selectedTable === tableId) setSelectedTable(null);
    };

    const addToOrder = (item) => {
        setOrderItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i);
            }
            return [...prev, {...item, quantity: 1}];
        });
        setSearchTerm('');
    };

    const updateQuantity = (itemId, action) => {
        setOrderItems(prev => {
            const item = prev.find(i => i.id === itemId);
            if (!item) return prev;

            if (action === 'increase') {
                return prev.map(i => i.id === itemId ? {...i, quantity: i.quantity + 1} : i);
            } else {
                if (item.quantity <= 1) {
                    return prev.filter(i => i.id !== itemId);
                }
                return prev.map(i => i.id === itemId ? {...i, quantity: i.quantity - 1} : i);
            }
        });
    };

    const removeMenuItem = (itemId) => {
        const newData = {...menuData};
        for (const cat in newData) {
            const index = newData[cat].findIndex(i => i.id === itemId);
            if (index !== -1) {
                newData[cat].splice(index, 1);
                break;
            }
        }
        setMenuData(newData);
        setOrderItems(prev => prev.filter(i => i.id !== itemId));
    };

    const resetOrder = () => {
        setOrderItems([]);
        setSelectedTable(null);
        setOrderNumber(Math.floor(Math.random() * 90000000) + 10000000);
        setCurrentView('table');
    };

    // Navigation
    const goToMenuView = () => setCurrentView('menu');
    const goToPaymentView = () => setCurrentView('payment');

    // Form Submissions
    const handleAddTable = (e) => {
        e.preventDefault();
        const name = newTableNameRef.current.value;
        const seats = parseInt(newTableSeatsRef.current.value);
        const floor = parseInt(newTableFloorRef.current.value);
        
        setTables(prev => [...prev, { id: name, seats, floor, status: 'available' }]);
        setIsAddTableModalOpen(false);
        e.target.reset();
    };

    const handleAddMenuItem = (e) => {
        e.preventDefault();
        const name = newItemNameRef.current.value;
        const description = newItemDescRef.current.value;
        const price = parseFloat(newItemPriceRef.current.value);
        const category = newItemCategoryRef.current.value;
        const image = newItemImageRef.current.value || 'https://via.placeholder.com/300x200';
        const spicy = newItemSpicyRef.current.checked;
        
        const newId = Math.max(...Object.values(menuData).flat().map(i => i.id)) + 1;

        setMenuData(prev => ({
            ...prev,
            [category]: [...prev[category], { id: newId, name, description, price, image, spicy }]
        }));

        setIsAddMenuItemModalOpen(false);
        e.target.reset();
    };

    // Search Logic
    const searchResults = { tables: [], menuItems: [] };
    if (searchTerm) {
        searchResults.tables = tables.filter(t => t.id.toLowerCase().includes(searchTerm.toLowerCase()));
        Object.keys(menuData).forEach(cat => {
            menuData[cat].forEach(item => {
                if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    searchResults.menuItems.push({...item, category: cat});
                }
            });
        });
    }
    
    const totals = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subtotal = totals;
    const serviceFee = subtotal * 0.1;
    const total = subtotal + serviceFee;

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="w-20 bg-sidebar flex flex-col items-center py-6 flex-shrink-0">
                <div className="mb-10">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                        <span className="font-display font-bold text-white text-xl">B</span>
                    </div>
                </div>
                
                <nav className="flex-1 w-full">
                    <ul className="space-y-2">
                        <li>
                            <button onClick={() => { resetOrder(); setCurrentView('table'); }} className={`nav-item w-full py-4 flex justify-center ${currentView === 'table' ? 'active' : ''}`}>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setCurrentView('menu')} className={`nav-item w-full py-4 flex justify-center ${currentView === 'menu' ? 'active' : ''}`}>
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Global Search Header */}
                <div className="bg-white border-b border-border p-4 flex justify-between items-center relative z-20">
                    <div></div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                placeholder="Search tables or menu..." 
                                className="pl-10 pr-10 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm w-80" 
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            
                            {/* Search Dropdown */}
                            {searchTerm && isSearchFocused && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-border max-h-96 overflow-y-auto z-50">
                                    {searchResults.tables.length === 0 && searchResults.menuItems.length === 0 ? (
                                        <div className="p-4 text-center text-textSecondary text-sm">No results found.</div>
                                    ) : (
                                        <>
                                            {searchResults.tables.length > 0 && (
                                                <>
                                                    <div className="p-3 border-b border-border bg-gray-50 font-semibold text-xs text-textSecondary uppercase tracking-wider">Tables</div>
                                                    <div className="p-2">
                                                        {searchResults.tables.map(t => (
                                                            <button 
                                                                key={t.id}
                                                                onClick={() => { setCurrentFloor(t.floor); setSelectedTable(t.id); setCurrentView('table'); setSearchTerm(''); }}
                                                                className="w-full text-left p-2 hover:bg-gray-100 rounded-lg flex justify-between items-center"
                                                            >
                                                                <span className="font-semibold text-textPrimary">{t.id}</span>
                                                                <span className="text-xs text-textSecondary">Floor {t.floor}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                            {searchResults.menuItems.length > 0 && (
                                                <>
                                                    <div className="p-3 border-b border-border bg-gray-50 font-semibold text-xs text-textSecondary uppercase tracking-wider">Menu Items</div>
                                                    <div className="p-2">
                                                        {searchResults.menuItems.map(item => (
                                                            <button 
                                                                key={item.id}
                                                                onClick={() => { addToOrder(item); setSearchTerm(''); }}
                                                                className="w-full text-left p-2 hover:bg-gray-100 rounded-lg flex justify-between items-center"
                                                            >
                                                                <div>
                                                                    <span className="font-semibold text-textPrimary block">{item.name}</span>
                                                                    <span className="text-xs text-textSecondary">{item.category}</span>
                                                                </div>
                                                                <span className="font-bold text-accent">${item.price.toFixed(2)}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <button 
                            onClick={() => currentView === 'menu' ? setIsAddMenuItemModalOpen(true) : setIsAddTableModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accentHover text-white font-semibold rounded-lg transition-all btn-press"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>{currentView === 'menu' ? 'Add Menu' : 'Add Table'}</span>
                        </button>
                    </div>
                </div>

                {/* Views Container */}
                <div className="flex-1 flex overflow-hidden">
                    
                    {/* VIEW 1: HOME (TABLES) */}
                    {currentView === 'table' && (
                        <Home 
                            tables={tables}
                            selectedTable={selectedTable}
                            currentFloor={currentFloor}
                            orderNumber={orderNumber}
                            onSelectTable={selectTable}
                            onCycleStatus={cycleTableStatus}
                            onRemoveTable={removeTable}
                            onSetFloor={setCurrentFloor}
                            onGoToMenu={goToMenuView}
                        />
                    )}
                    
                    {/* VIEW 2: MENU */}
                    {currentView === 'menu' && (
                        <Menu 
                            menuData={menuData}
                            currentCategory={currentCategory}
                            orderItems={orderItems}
                            selectedTable={selectedTable}
                            orderNumber={orderNumber}
                            onSetCategory={setCurrentCategory}
                            onAddToOrder={addToOrder}
                            onRemoveMenuItem={removeMenuItem}
                            onUpdateQuantity={updateQuantity}
                            onSendOrder={goToPaymentView}
                            onCancelOrder={resetOrder}
                        />
                    )}
                    
                    {/* VIEW 3: PAYMENT (Simple implementation inside App) */}
                    {currentView === 'payment' && (
                         <div className="flex-1 flex view-transition">
                            <div className="flex-1 p-8 overflow-y-auto">
                                <div className="mb-6">
                                    <h1 className="font-display text-2xl font-bold text-textPrimary">ORDER SUMMARY</h1>
                                    <p className="text-textSecondary mt-1">Order #{orderNumber} - Table {selectedTable || 'N/A'}</p>
                                </div>
                                
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    {orderItems.map(item => (
                                        <div key={item.id} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                                            <div className="flex items-center gap-4">
                                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                                                <div>
                                                    <h4 className="font-semibold text-textPrimary">{item.name}</h4>
                                                    <span className="text-textSecondary text-sm">{item.category}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                                <span className="text-textSecondary text-sm block">x{item.quantity}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="w-96 bg-white border-l border-border p-6 flex flex-col">
                                <div className="mb-6">
                                    <h2 className="font-display text-xl font-bold text-textPrimary">PAYMENT</h2>
                                </div>
                                
                                <div className="flex-1">
                                    <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                                        <div className="text-center mb-4">
                                            <span className="text-textSecondary text-sm">Amount to Pay</span>
                                            <div className="font-display text-4xl font-bold text-textPrimary">${(total).toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3 mt-6">
                                    <button onClick={resetOrder} className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-textPrimary font-semibold rounded-xl transition-all btn-press">
                                        CANCEL
                                    </button>
                                    <button onClick={resetOrder} className="flex-1 py-4 bg-success hover:bg-green-600 text-white font-semibold rounded-xl transition-all btn-press">
                                        PAY NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Modals (Kept in App as they are global) */}
            {isAddTableModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-scaleIn">
                        <h3 className="font-display text-xl font-bold text-textPrimary mb-6">Add New Table</h3>
                        <form onSubmit={handleAddTable}>
                            <div className="mb-4">
                                <label className="block text-textSecondary text-sm mb-2">Table Name/Number</label>
                                <input type="text" ref={newTableNameRef} required className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="e.g. T7" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-textSecondary text-sm mb-2">Seats</label>
                                <input type="number" ref={newTableSeatsRef} required min="1" className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50" placeholder="4" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-textSecondary text-sm mb-2">Floor</label>
                                <select ref={newTableFloorRef} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50">
                                    <option value="1">First Floor</option>
                                    <option value="2">Second Floor</option>
                                    <option value="3">Terrace</option>
                                </select>
                            </div>
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setIsAddTableModalOpen(false)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-textPrimary font-semibold rounded-xl transition-all btn-press">CANCEL</button>
                                <button type="submit" className="flex-1 py-3 bg-accent hover:bg-accentHover text-white font-semibold rounded-xl transition-all btn-press">ADD TABLE</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isAddMenuItemModalOpen && (
                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-scaleIn max-h-[90vh] overflow-y-auto">
                        <h3 className="font-display text-xl font-bold text-textPrimary mb-6">Add New Menu Item</h3>
                        <form onSubmit={handleAddMenuItem}>
                            <div className="mb-4">
                                <label className="block text-textSecondary text-sm mb-2">Item Name</label>
                                <input type="text" ref={newItemNameRef} required className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-textSecondary text-sm mb-2">Price ($)</label>
                                <input type="number" ref={newItemPriceRef} required min="1" step="0.01" className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50" />
                            </div>
                             <div className="mb-4">
                                <label className="block text-textSecondary text-sm mb-2">Category</label>
                                <select ref={newItemCategoryRef} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50">
                                    <option value="starter">Starter</option>
                                    <option value="main">Main Course</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-textSecondary text-sm mb-2">Description</label>
                                <textarea ref={newItemDescRef} rows="2" className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50"></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-textSecondary text-sm mb-2">Image URL</label>
                                <input type="url" ref={newItemImageRef} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50" />
                            </div>
                            <div className="mb-6 flex items-center gap-2">
                                <input type="checkbox" ref={newItemSpicyRef} id="spicyCheck" className="w-4 h-4 accent-accent" />
                                <label htmlFor="spicyCheck" className="text-textSecondary text-sm">Spicy Item</label>
                            </div>
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setIsAddMenuItemModalOpen(false)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-textPrimary font-semibold rounded-xl transition-all btn-press">CANCEL</button>
                                <button type="submit" className="flex-1 py-3 bg-accent hover:bg-accentHover text-white font-semibold rounded-xl transition-all btn-press">ADD ITEM</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);