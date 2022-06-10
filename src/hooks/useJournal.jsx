import { useContext } from "react"
import { JournalContext } from "../hoc/JournalProvider"

export const useJournal = () => {
    return useContext(JournalContext);
}