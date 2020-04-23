import { NEXT_CARD } from './actionTypes'
import { UNRESOLVE_CARD } from './actionTypes'
import { RESOLVE_CARD } from './actionTypes'

export const nextCard = limit => ({
    type: NEXT_CARD,
    limit
});
export const unresolveCard = idLesson => ({
    type: UNRESOLVE_CARD,
    idLesson
});
export const resolveCard = (idLesson, idCard) => ({
    type: RESOLVE_CARD,
    idLesson,
    idCard
});

