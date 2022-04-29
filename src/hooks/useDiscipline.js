import { useContext } from "react";
import { DisciplineContext } from "../hoc/CreateDisciplineProvider";

const useDiscipline = () => {
    return useContext(DisciplineContext);
}

export default useDiscipline;