import { useContext } from "react";
import { ModalMessages } from "../hoc/ModalProvider";

export const useModal = () => {
    return useContext(ModalMessages);
}