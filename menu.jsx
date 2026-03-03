const Menu = ({ 
    menuData, 
    currentCategory, 
    orderItems, 
    selectedTable, 
    orderNumber, 
    onSetCategory, 
    onAddToOrder, 
    onRemoveMenuItem, 
    onUpdateQuantity, 
    onSendOrder, 
    onCancelOrder 
}) => {

    const items = menuData[currentCategory].map(item => ({...item, category: currentCategory}));
    
    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const serviceFee = subtotal * 0.1;
    const total = subtotal + serviceFee;

    const renderMenuItems = () => (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
                <div 
                    key={item.id}
                    onClick={() => onAddToOrder(item)}
                    className="menu-item group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-border cursor-pointer animate-fadeIn"
                    style={{ animationDelay: `${index * 0.05}s` }}
                >
                    <button 
                        onClick={(e) => { e.stopPropagation(); onRemoveMenuItem(item.id); }}
                        className="delete-btn-menu absolute top-2 left-2 w-7 h-7 bg-white/80 hover:bg-red-500 text-red-500 hover:text-white rounded-full flex items-center justify-center z-10 transition-all shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>

                    <div className="relative h-32 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        {item.spicy && (
                            <div className="spicy-badge absolute top-2 right-2 bg-spicy text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                </svg>
                                Spicy
                            </div>
                        )}
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-textPrimary">{item.name}</h3>
                        <p className="text-xs text-textSecondary mt-1 line-clamp-2 h-8">{item.description || 'No description available.'}</p>
                        <div className="flex justify-between items-center mt-2">
                            <span className="font-display font-bold text-accent">${item.price.toFixed(2)}</span>
                            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {items.length === 0 && (
                 <div className="col-span-2 lg:col-span-3 text-center py-10 text-textSecondary">No items found.</div>
            )}
        </div>
    );

    return (
        <div className="flex-1 flex view-transition">
            {/* Left Side: Menu List */}
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="mb-6">
                    <h1 className="font-display text-2xl font-bold text-textPrimary">MENU</h1>
                    <p className="text-textSecondary mt-1">Table <span>{selectedTable || 'N/A'}</span> - Add items to order</p>
                </div>
                
                {/* Category Tabs */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                    {['starter', 'main', 'dessert', 'drinks'].map(cat => (
                        <button 
                            key={cat}
                            onClick={() => onSetCategory(cat)}
                            className={`category-tab px-5 py-2 rounded-lg font-semibold text-sm whitespace-nowrap ${currentCategory === cat ? 'active' : 'bg-white text-textSecondary border border-border'}`}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>
                
                {renderMenuItems()}
            </div>
            
            {/* Right Side: Order Panel */}
            <div className="w-80 bg-white border-l border-border p-6 flex flex-col">
                <div className="mb-4">
                    <span className="text-textSecondary text-sm">ORDER #</span>
                    <div className="font-display text-xl font-bold text-textPrimary">{orderNumber}</div>
                </div>
                
                {/* Order Items List */}
                <div className="flex-1 overflow-y-auto">
                    {orderItems.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-textSecondary text-sm">No items added yet</p>
                        </div>
                    ) : (
                        orderItems.map((item, index) => (
                            <div key={item.id} className="order-item flex gap-3 py-3 border-b border-border last:border-0">
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h4 className="font-semibold text-textPrimary text-sm">{item.name}</h4>
                                        <span className="font-semibold text-textPrimary">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-textSecondary text-xs">{item.category}</span>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => onUpdateQuantity(item.id, 'decrease')} className="qty-btn w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs">-</button>
                                            <span className="font-semibold text-sm w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(item.id, 'increase')} className="qty-btn w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                
                {/* Totals */}
                <div className="border-t border-border pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-textSecondary">Subtotal</span>
                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-3">
                        <span className="text-textSecondary">Service Fee (10%)</span>
                        <span className="font-semibold">${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4 text-lg">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-accent">${total.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex gap-3">
                        <button onClick={onCancelOrder} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-textPrimary font-semibold rounded-xl transition-all btn-press">
                            CANCEL
                        </button>
                        <button onClick={onSendOrder} disabled={orderItems.length === 0} className="flex-1 py-3 bg-accent hover:bg-accentHover text-white font-semibold rounded-xl transition-all btn-press disabled:opacity-50">
                            SEND
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};