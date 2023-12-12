/* eslint-disable prefer-const */
const conversionTable = {
  xícara: 240,
  xícaras: 240,
  'a gosto': 1,
  'colher de sopa': 15,
  'colheres de sopa': 15,
  'colher de chá': 5,
  'colheres de chá': 5,
  ml: 1,
  mililitro: 1,
  mililitros: 1,
  'mililitro (ml)': 1,
  'mililitros (ml)': 1,
  l: 1000,
  litro: 1000,
  litros: 1000,
  'litro (l)': 1000,
  'litros (l)': 1000,
  g: 1,
  grama: 1,
  gramas: 1,
  'grama (g)': 1,
  'gramas (g)': 1,
  kg: 1,
  quilograma: 1000,
  quilogramas: 1000,
  'quilograma (kg)': 1000,
  'quilogramas (kg)': 1000,
  unidade: 1,
  unidades: 1,
  fatia: 1,
  fatias: 1,
  copo: 240,
  copos: 240,
  pitada: 1,
  pitadas: 1
}

let existingProducts = []

export async function algorithm (plates, products) {
  existingProducts = []
  return await checkRecipes(plates, products)
}

const checkRecipes = async (plates, products) => {
  // eslint-disable-next-line camelcase
  let available_plates = []
  // eslint-disable-next-line camelcase
  let not_available_plates = []
  for (const plate of plates) {
    const returnedData = await algorithmRunner(plate, products)
    if (returnedData.not_available_ingredients.length === 0) {
      available_plates.push({ plate, ...returnedData })
    } else {
      not_available_plates.push({ plate, ...returnedData })
    }
  }
  return Promise.resolve({ available_plates, not_available_plates })
}

const algorithmRunner = (plate, products) => {
  const availableIngredients = []
  const notAvailableIngredients = []
  for (const ingredient of plate.section.ingredients) {
    let found = false
    let amountedItem = 0
    let missingQuantity = 0

    if (existingProducts.length > 0) {
      for (const product of existingProducts) {
        if (
          ingredient.ingredients_name.toLowerCase() ===
                    product.name.toLowerCase()
        ) {
          const requiredQuantity = convertToMl(
            ingredient.ingredients_quantity,
            ingredient.ingredients_unit_measure?.toLowerCase()
          )
          const availableQuantity = convertToMl(
            product.amount,
            product.unitMeasure?.toLowerCase()
          )
          if (requiredQuantity <= availableQuantity) {
            found = true
            missingQuantity = 0
          } else if (availableQuantity > 0) {
            amountedItem += availableQuantity

            if (amountedItem >= requiredQuantity) {
              found = true
              missingQuantity = 0
            } else {
              missingQuantity = requiredQuantity - amountedItem
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
            ingredient.ingredients_unit_measure?.toLowerCase()
          )
          const availableQuantity = convertToMl(
            product.amount,
            product.unitMeasure?.toLowerCase()
          )

          if (requiredQuantity <= availableQuantity) {
            found = true
            missingQuantity = 0
            existingProducts.push(product)
          } else if (availableQuantity > 0) {
            amountedItem += availableQuantity

            if (amountedItem >= requiredQuantity) {
              found = true
              missingQuantity = 0
              existingProducts.push(product)
            } else {
              missingQuantity = requiredQuantity - amountedItem
            }
          }
        }
      }
    }

    if (!found) {
      notAvailableIngredients.push({
        ingredient_name: ingredient.ingredients_name,
        missing_quantity: missingQuantity
      })
    } else {
      availableIngredients.push(ingredient.ingredients_name)
    }
  }

  return {
    available_ingredients: availableIngredients,
    not_available_ingredients: notAvailableIngredients
  }
}

const convertToMl = (quantity, unit) => {
  if (conversionTable[unit]) {
    return quantity * conversionTable[unit]
  }
}
