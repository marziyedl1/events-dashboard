import { describe, it, expect } from 'vitest'
import type { ApiEvent } from '~/types'
import { validate } from '../../app/utils/formValidation';

describe('validate()', () => {
    it('returns empty array for a valid event', () => {
        const form: ApiEvent = {
            name: 'Test Event',
            year: 2024,
            startDate: new Date('2024-01-01').toDateString(),
            endDate: new Date('2024-01-02').toDateString(),
            type: 'Online',
        }

        const result = validate(form)

        expect(result).toEqual([])
    })

    it('returns validation errors for invalid event', () => {
        const form: ApiEvent = {
            name: '',
            year: 1800,
            startDate: new Date('2024-01-10').toDateString(),
            endDate: new Date('2024-01-01').toDateString(),
            type: 'OnSite'
        }

        const result = validate(form)

        expect(result).toEqual([
            'Name is required.',
            'Year looks invalid.',
            'Start date must be before end date.'
        ])
    })
})
