const Home = ({ 
    tables, 
    selectedTable, 
    currentFloor, 
    orderNumber, 
    onSelectTable, 
    onCycleStatus, 
    onRemoveTable, 
    onSetFloor, 
    onGoToMenu 
}) => {

    const filteredTables = tables.filter(t => t.floor === currentFloor);

    const renderTables = () => (
        <div className="grid grid-cols-3 gap-6">
            {filteredTables.map((table, index) => {
                let statusColor = 'bg-green-100 text-green-700';
                let statusText = 'Available';
                let borderClass = 'border-border';
                
                if (table.status === 'reserved') {
                    statusColor = 'bg-blue-100 text-blue-700';
                    statusText = 'Reserved';
                    borderClass = 'border-blue-500';
                } else if (table.status === 'occupied') {
                    statusColor = 'bg-red-100 text-red-700';
                    statusText = 'Occupied';
                    borderClass = 'border-red-500';
                }

                return (
                    <div key={table.id} className="relative animate-fadeIn group" style={{ animationDelay: `${index * 0.05}s` }}>
                        {/* Delete Button */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); onRemoveTable(table.id); }}
                            className="delete-btn absolute -top-2 -right-2 w-6 h-6 bg-red-100 hover:bg-red-500 text-red-500 hover:text-white rounded-full flex items-center justify-center z-10 transition-all shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* Status Button */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); onCycleStatus(table.id); }}
                            className="status-toggle-btn absolute top-2 left-2 z-10 px-2 py-1 rounded-full text-xs font-semibold capitalize shadow-sm hover:opacity-80 transition-all"
                        >
                            <span className={statusColor + " px-2 py-1 rounded-full"}>{statusText}</span>
                        </button>

                        {/* Main Table Card */}
                        <button 
                            onClick={() => onSelectTable(table.id)}
                            className={`table-btn bg-white rounded-2xl p-6 shadow-sm border-2 w-full h-full ${selectedTable === table.id ? 'selected' : borderClass}`}
                        >
                            <div className="text-4xl font-display font-bold text-textPrimary mb-2 mt-4">{table.id}</div>
                            <div className="flex items-center justify-center gap-1 text-textSecondary text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>{table.seats} seats</span>
                            </div>
                        </button>
                    </div>
                );
            })}
            {filteredTables.length === 0 && (
                <div className="col-span-3 text-center py-10 text-textSecondary">No tables found on this floor.</div>
            )}
        </div>
    );

    return (
        <div className="flex-1 flex view-transition">
            {/* Left Side: Table List */}
            <div className="flex-1 p-8">
                <div className="mb-6">
                    <h1 className="font-display text-2xl font-bold text-textPrimary">TABLE LIST</h1>
                    <p className="text-textSecondary mt-1">Select a table to start ordering</p>
                </div>
                
                {/* Floor Tabs */}
                <div className="flex gap-4 mb-6">
                    {[1, 2, 3].map(floor => (
                        <button 
                            key={floor}
                            onClick={() => onSetFloor(floor)}
                            className={`floor-tab px-6 py-2 rounded-lg font-semibold text-sm ${currentFloor === floor ? 'active' : 'bg-white text-textSecondary border border-border'}`}
                        >
                            {floor === 1 ? 'First Floor' : floor === 2 ? 'Second Floor' : 'Terrace'}
                        </button>
                    ))}
                </div>
                
                {renderTables()}
            </div>
            
            {/* Right Side: Order Info Panel */}
            <div className="w-80 bg-white border-l border-border p-6 flex flex-col">
                <div className="mb-4">
                    <span className="text-textSecondary text-sm">ORDER #</span>
                    <div className="font-display text-xl font-bold text-textPrimary mt-1">{orderNumber}</div>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <p className="text-textSecondary text-sm">NO PRODUCTS IN THIS MOMENT ADDED</p>
                    </div>
                </div>
                
                <div className="border-t border-border pt-4 mt-4">
                    <div className="flex justify-between mb-4">
                        <div>
                            <span className="text-textSecondary text-sm">TABLE</span>
                            <div className="font-display font-bold text-lg">{selectedTable || '-'}</div>
                        </div>
                    </div>
                    <button 
                        onClick={onGoToMenu}
                        disabled={!selectedTable}
                        className="w-full py-4 bg-accent hover:bg-accentHover text-white font-semibold rounded-xl transition-all btn-press disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        SELECT AND CONTINUE
                    </button>
                </div>
            </div>
        </div>
    );
};