import { useContext } from 'react';
import { SavedUsersContext } from '../hoc/CreateUserProvider';

export function useSavedUsers() {
    return useContext(SavedUsersContext);
}