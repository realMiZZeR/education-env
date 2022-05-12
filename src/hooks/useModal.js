import { useContext } from "react";
import { ModalMessages } from "../components/MainContent";

export const useModal = () => {
    return useContext(ModalMessages);
}