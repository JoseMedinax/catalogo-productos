// Product Catalog Component
const ProductCatalog = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    // Categories
    const categories = [
        { id: 'all', name: 'Todos los Productos' },
        { id: 'facial', name: 'Línea Facial' },
        { id: 'corporal', name: 'Línea Corporal' },
        { id: 'serums', name: 'Serums' },
        { id: 'new', name: 'Nuevos Productos' }
    ];

    // Products data
    const products = [
        {
            category: 'facial',
            name: 'Fango Termal Activo',
            description: 'Máscara facial y corporal. Mezcla de lava volcánica con Agua Termal que la naturaleza maceró durante siglos',
            benefits: 'Limpieza profunda, rejuvenecimiento, deshidratación, seborrea, poros dilatados, manchas, flaccidez celulitis, alopecias',
            variants: [
                { size: '100 gr', price: 14000 },
                { size: '370 gr', price: 18400 },
                { size: '570 gr', price: 23500 }
            ]
        },
        // Add more products here
    ];

    // Filter products based on category and search term
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.benefits.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Loading simulation
    React.useEffect(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 500);
    }, [selectedCategory, searchTerm]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Search and Filters */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    selectedCategory === category.id
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white text-gray-600 hover:bg-green-50'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
                        />
                        <svg 
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
                    <div key={idx} className="product-card bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="mb-4">
                                <h4 className="font-medium text-green-600 mb-2">Beneficios:</h4>
                                <p className="text-gray-600">{product.benefits}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-green-600 mb-2">Presentaciones:</h4>
                                <div className="space-y-2">
                                    {product.variants.map((variant, vidx) => (
                                        <div key={vidx} className="flex justify-between items-center">
                                            <span className="text-gray-600">{variant.size}</span>
                                            <span className="font-semibold">
                                                ${variant.price.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Results Message */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-600">No se encontraron productos que coincidan con tu búsqueda.</p>
                </div>
            )}
        </div>
    );
};

// Make the component available globally
window.ProductCatalog = ProductCatalog;