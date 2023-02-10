import { User } from '.'

let user

beforeEach(async () => {
  user = await User.create({ name: 'test', birthDate: 'test', cpf: 'test', cell: 'test', email: 'test', password: 'test', familyId: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = user.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(user.id)
    expect(view.name).toBe(user.name)
    expect(view.birthDate).toBe(user.birthDate)
    expect(view.cpf).toBe(user.cpf)
    expect(view.cell).toBe(user.cell)
    expect(view.email).toBe(user.email)
    expect(view.password).toBe(user.password)
    expect(view.familyId).toBe(user.familyId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = user.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(user.id)
    expect(view.name).toBe(user.name)
    expect(view.birthDate).toBe(user.birthDate)
    expect(view.cpf).toBe(user.cpf)
    expect(view.cell).toBe(user.cell)
    expect(view.email).toBe(user.email)
    expect(view.password).toBe(user.password)
    expect(view.familyId).toBe(user.familyId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
