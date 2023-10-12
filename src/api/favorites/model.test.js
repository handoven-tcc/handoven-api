import { Favorites } from '.'

let favorites

beforeEach(async () => {
  favorites = await Favorites.create({ plateId: '111111111111111111111111', familyId: '111111111111111111111111' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = favorites.view()
    expect(typeof view).toBe('object')
    expect(view.plateId).toBe(favorites.plateId)
    expect(view.familyId).toBe(favorites.familyId)
  })
})
