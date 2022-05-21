import { useContext } from "react";
import { FacultyContext } from "../hoc/CreateFacultyProvider";

export function useFaculty() {
    return useContext(FacultyContext);
}