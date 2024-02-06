import Incidence from '../../models/incidence.model'
import { createIncidence, getIncidenceById, getIncidences } from '../../services/incidence.service'
import { IIncidence } from '../../types/incidence'
import { getErrorMessage } from '../../utils/utils'

jest.mock('../../models/incidence.model')

const mockIncidence: IIncidence = {
  incidenceLocation: 1,
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

describe('getIncidences', () => {
  test('should return 200 status and all incidences for successful request', async () => {
    const incidences = [
      {
        _id: '65c13a60ff40cd5a38086d23',
        location: 23,
        basicDescription: 'test description',
        userId: '65c1341d7ae46e374ed87b39',
        assignedTo: '65c13a4f55870badc0ed59d8',
        status: 0,
        comments: [],
        images: [],
        createdAt: '2024-02-05T19:43:28.699Z',
        updatedAt: '2024-02-05T19:43:28.699Z',
      },
    ]

    ;(Incidence.find as jest.Mock).mockResolvedValue(incidences)

    const response = await getIncidences()

    expect(response).toEqual({
      success: true,
      status: 200,
      data: incidences,
    })
  })
})

describe('getIncidenceById', () => {
  test('should return 200 status and the incidence for successful request', async () => {
    const incidence = {
      // Aquí puedes poner algunos datos de incidencia de muestra
    }

    ;(Incidence.findById as jest.Mock).mockResolvedValue(incidence)

    const response = await getIncidenceById('1')

    expect(response).toEqual({
      success: true,
      status: 200,
      data: incidence,
    })
  })

  test('should return 404 status when incidence is not found', async () => {
    ;(Incidence.findById as jest.Mock).mockResolvedValue(null)

    const response = await getIncidenceById('1')

    expect(response).toEqual({
      success: false,
      status: 404,
      errorMessages: 'Incidence not found',
    })
  })
})
