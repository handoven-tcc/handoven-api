import { Products } from '.'

describe('view', () => {
  it('returns simple view', async () => {
    const products = await Products.create({
      id: '63250b185712eb51f7dda775',
      name: 'Molho de Tomate',
      type: 'notRefrigerated',
      validity: '2022-10-29T00:00:00.000Z',
      category: 'Canned',
      cost: 3.95,
      amount: 3
    })

    const view = products.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(products.id)
    expect(view.name).toBe(products.name)
    expect(view.type).toBe(products.type)
    expect(view.validity).toBe(products.validity)
    expect(view.category).toBe(products.category)
    expect(view.cost).toBe(products.cost)
    expect(view.amount).toBe(products.amount)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
