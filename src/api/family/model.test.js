import { Family } from '.'

let family

beforeEach(async () => {
  family = await Family.create({ name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = family.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(family.id)
    expect(view.name).toBe(family.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = family.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(family.id)
    expect(view.name).toBe(family.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
