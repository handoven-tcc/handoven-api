const conversionTable = {
    "Xícara": 240,
    "Colher de sopa": 15,
    "Colher de chá": 5,
    "Mililitros (ml)": 1,
    "Litros (L)": 1000,
    "Gramas (g)": 1,
    "Quilogramas (kg)": 1000,
    "Unidades": 1,
    "Fatias": 1,
    "Copos": 240,
    "Pitadas": 1,
  };

const mockProducts = [
{
    id: "6518b2336989e00054d0a791",
    name: "Azeita em conserva pote",
    amount: 700,
    unitMeasure: "Quilogramas (kg)",
    expiryProduct: false,
},
{
    id: "6518b2336989e00054d0a791",
    name: "Leite",
    amount: 1,
    unitMeasure: "Litros (L)",
    expiryProduct: false,
},
{
    id: "6518b2336989e00054d0a791",
    name: "Ovos",
    amount: 4,
    unitMeasure: "Unidades",
    expiryProduct: false,
},
{
    id: "6518b2336989e00054d0a791",
    name: "Cacau em Pó",
    amount: 179,
    unitMeasure: "Gramas (g)",
    expiryProduct: false,
},
{
    id: "6518b2336989e00054d0a791",
    name: "Cacau em Pó",
    amount: 180,
    unitMeasure: "Gramas (g)",
    expiryProduct: false,
},
{
    id: "6518b2336989e00054d0a791",
    name: "Açucar",
    amount: 600,
    unitMeasure: "Gramas (g)",
    expiryProduct: false,
},
{
    id: "6518b2336989e00054d0a791",
    name: "Farinha de Trigo",
    amount: 600,
    unitMeasure: "Gramas (g)",
    expiryProduct: false,
},
{
    id: "6518b2336989e00054d0a791",
    name: "Queijo Mussarela",
    amount: 350,
    unitMeasure: "Gramas (g)",
    expiryProduct: false,
},
{
    id: "6518b2336989e00054d0a791",
    name: "Massa De Lasanha",
    amount: 3,
    unitMeasure: "Unidades",
    expiryProduct: false,
},
{
    id: "6518b2336989e00054d0a791",
    name: "Peito de Frango",
    amount: 1.5,
    unitMeasure: "Unidades",
    expiryProduct: false,
},
{
    id: "6518b2336989e00054d0a791",
    name: "Cebola",
    amount: 15,
    unitMeasure: "Unidades",
    expiryProduct: false,
},
{
    id: "6518b2336989e00054d0a791",
    name: "Cenoura",
    amount: 2,
    unitMeasure: "Unidades",
    expiryProduct: false,
},
{
    id: "6518b2336989e00054d0a791",
    name: "Tomate",
    amount: 5,
    unitMeasure: "Unidades",
    expiryProduct: false,
},
];

const mockPlates = [
    {
        image: "stringimagembase64",
        name: "Bolo de Chocolate",
        category: 1,
        favorited: true,
        section: {
            ingredients: [
            {
                ingredients_name: "Farinha de Trigo",
                ingredients_quantity: 2,
                ingredients_category: 7,
                ingredients_notes: "peneirada",
                ingredients_unit_measure: "Xícara",
            },
            {
                ingredients_name: "Açucar",
                ingredients_quantity: 1.5,
                ingredients_category: 1,
                ingredients_unit_measure: "Xícara",
            },
            {
                ingredients_name: "Cacau em Pó",
                ingredients_quantity: 1.5,
                ingredients_category: 4,
                ingredients_unit_measure: "Xícara",
            },
            {
                ingredients_name: "Ovos",
                ingredients_quantity: 4,
                ingredients_category: 19,
                ingredients_notes: "grandes",
                ingredients_unit_measure: "Unidades",
            },
            {
                ingredients_name: "Leite",
                ingredients_quantity: 1,
                ingredients_category: 12,
                ingredients_unit_measure: "Xícara",
            },
            ],
            prepare_mode: [
            "1. Pré-aqueça o forno a 180°C.",
            "2. Misture a farinha de trigo, o cacau em pó e o açúcar em uma tigela.",
            "3. Adicione os ovos e o leite à mistura seca e misture bem.",
            "4. Despeje a massa em uma forma untada e asse por 30-35 minutos.",
            "5. Deixe esfriar e sirva.",
            ],
            extras: [
            "Tempo de Preparo: 20 minutos",
            "Rendimento: 8 porções",
            ],
        },
    },
    {
        image: "stringimagembase64",
        name: "Lasanha com frango ao molho branco",
        category: 1,
        favorited: true,
        section: {
        ingredients: [
            {
            ingredients_name: "Queijo Mussarela",
            ingredients_quantity: 50,
            ingredients_category: 7,
            ingredients_notes: "peneirada",
            ingredients_unit_measure: "Gramas (g)",
            },
            {
            ingredients_name: "Massa De Lasanha",
            ingredients_quantity: 2,
            ingredients_category: 1,
            ingredients_unit_measure: "Unidades",
            },
            {
            ingredients_name: "Peito de Frango",
            ingredients_quantity: 1,
            ingredients_category: 4,
            ingredients_unit_measure: "Unidades",
            },
            {
            ingredients_name: "Cebola",
            ingredients_quantity: 4,
            ingredients_category: 19,
            ingredients_notes: "grandes",
            ingredients_unit_measure: "Unidades",
            },
            {
            ingredients_name: "Tomate",
            ingredients_quantity: 5,
            ingredients_category: 12,
            ingredients_unit_measure: "Unidades",
            },
        ],
        },
    },
    {
        image: "stringimagembase64",
        name: "Bolo de Cenoura",
        category: 1,
        favorited: true,
        section: {
        ingredients: [
            {
            ingredients_name: "Farinha de Trigo",
            ingredients_quantity: 2,
            ingredients_category: 7,
            ingredients_notes: "peneirada",
            ingredients_unit_measure: "Xícara",
            },
            {
            ingredients_name: "Açucar",
            ingredients_quantity: 1.5,
            ingredients_category: 1,
            ingredients_unit_measure: "Xícara",
            },
            {
            ingredients_name: "Cenoura",
            ingredients_quantity: 2,
            ingredients_category: 4,
            ingredients_unit_measure: "Unidades",
            },
            {
            ingredients_name: "Ovos",
            ingredients_quantity: 4,
            ingredients_category: 19,
            ingredients_notes: "grandes",
            ingredients_unit_measure: "Unidades",
            },
            {
            ingredients_name: "Leite",
            ingredients_quantity: 1,
            ingredients_category: 12,
            ingredients_unit_measure: "Xícara",
            },
        ],
        },
    },
];

const existingProducts = [];

export async function algorithm(plates, products){
    let available_plates = []
    let not_available_plates = []
    const checkRecipes = async (plates, products) => {
        for (const plate of plates) {
            const returnedData = await algorithmRunner(plate, products);
            if (returnedData.not_available_ingredients.length === 0) {
                console.log(`Pode fazer a receita: ${plate.name}`);
                available_plates.push({plate, ...returnedData});
            } else {
                console.log(`Não pode fazer a receita: ${plate.name}`);
                not_available_plates.push({plate, ...returnedData});
            }
        }
        return Promise.resolve({available_plates, not_available_plates});
    };
    return await checkRecipes(mockPlates, mockProducts);
}

const algorithmRunner = (plate, products) => {
    const availableIngredients = [];
    const notAvailableIngredients = [];
    for (const ingredient of plate.section.ingredients) {
        let found = false;
        let amountedItem = 0;
        let missingQuantity = 0;

        if (existingProducts.length > 0) {
            for (const product of existingProducts) {
                if (
                    ingredient.ingredients_name.toLowerCase() ===
                    product.name.toLowerCase()
                ) {
                    const requiredQuantity = convertToMl(
                    ingredient.ingredients_quantity,
                    ingredient.ingredients_unit_measure
                    );
                    const availableQuantity = convertToMl(
                    product.amount,
                    product.unitMeasure
                    );
        
                    if (requiredQuantity <= availableQuantity) {
                        found = true;
                        missingQuantity = 0;
                    } else if (availableQuantity > 0) {
                        amountedItem += availableQuantity;
        
                        if (amountedItem >= requiredQuantity) {
                            found = true;
                            missingQuantity = 0;
                        } else {
                            missingQuantity = requiredQuantity - amountedItem;
                        }
                    }
                }
            }
        }

        if (!found) {
            for (const product of products) {
                if (
                    ingredient.ingredients_name.toLowerCase() ===
                    product.name.toLowerCase()
                    ) {
                    const requiredQuantity = convertToMl(
                    ingredient.ingredients_quantity,
                    ingredient.ingredients_unit_measure
                    );
                    const availableQuantity = convertToMl(
                    product.amount,
                    product.unitMeasure
                    );
        
                    if (requiredQuantity <= availableQuantity) {
                        found = true;
                        missingQuantity = 0;
                        existingProducts.push(product);
                    } else if (availableQuantity > 0) {
                        amountedItem += availableQuantity;
            
                        if (amountedItem >= requiredQuantity) {
                            found = true;
                            missingQuantity = 0;
                            existingProducts.push(product);
                        } else {
                            missingQuantity = requiredQuantity - amountedItem;
                        }
                    }
                }
            }
        }   
  
        if (!found) {
            notAvailableIngredients.push({
                ingredient_name: ingredient.ingredients_name,
                missing_quantity: missingQuantity,
            });
        } else {
            availableIngredients.push(ingredient.ingredients_name);
        }
    }
  
    return {
      available_ingredients: availableIngredients,
      not_available_ingredients: notAvailableIngredients,
    };
};

const convertToMl = (quantity, unit) => {
    if (conversionTable[unit]) {
        return quantity * conversionTable[unit];
    }
};