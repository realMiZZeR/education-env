import { useContext } from "react";
import { TasksContext } from "../hoc/TasksProvider";

const useTasks = () => {
    return useContext(TasksContext);
}

export { useTasks };