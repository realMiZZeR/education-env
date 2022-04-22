import { useContext } from 'react';
import { SavedUsersContext } from '../layouts/AdminCreateLayout';

export function useSavedUsers() {
    return useContext(SavedUsersContext);
}