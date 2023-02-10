import { Plates } from '.'

let plates

beforeEach(async () => {
  plates = await Plates.create({ name: 'test', category: 'test', ingredients: 'test', available: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = plates.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(plates.id)
    expect(view.name).toBe(plates.name)
    expect(view.category).toBe(plates.category)
    expect(view.ingredients).toBe(plates.ingredients)
    expect(view.available).toBe(plates.available)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = plates.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(plates.id)
    expect(view.name).toBe(plates.name)
    expect(view.category).toBe(plates.category)
    expect(view.ingredients).toBe(plates.ingredients)
    expect(view.available).toBe(plates.available)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
