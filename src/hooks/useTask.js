import { useContext } from "react";
import { TaskContext } from "../hoc/CreateTaskProvider";

export function useTask() {
    return useContext(TaskContext);
}