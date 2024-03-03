import Incidence from '../../models/incidence.model'
import { createIncidence } from '../../services/incidence.service'
import { IIncidence } from '../../types/incidence'

jest.mock('../../models/incidence.model')

const mockIncidence: IIncidence = {
  location: 1,
  basicDescription: 'Incidence description',
  userId: 'test',
  assignedTo: 'test@test.com',
  status: 0,
}

describe('createIncidence', () => {
  it('should create a new incidence', async () => {
    ;(Incidence.findOne as jest.Mock).mockResolvedValue(null)
    ;(Incidence.prototype.save as jest.Mock).mockResolvedValue(mockIncidence)

    const result = await createIncidence(mockIncidence)

    expect(result).toEqual({
      success: true,
      status: 201,
      data: mockIncidence,
    })
  })

  it('should return an error if the incidence already exists', async () => {
    ;(Incidence.findOne as jest.Mock).mockResolvedValue(mockIncidence)

    const result = await createIncidence(mockIncidence)

    expect(result).toEqual({
      success: false,
      status: 400,
      errorMessages: 'Incidence already exists',
    })
  })
})
