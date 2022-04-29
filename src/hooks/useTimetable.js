import { useContext } from "react";
import { TimetableContext } from "../hoc/TimetableProvider";

export const useTimetable = () => {
    return useContext(TimetableContext);
}