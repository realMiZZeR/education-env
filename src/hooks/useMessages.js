import { useContext } from "react";
import { MessagesContext } from "../hoc/MessagesProvider";

export const useMessages = () => {
    return useContext(MessagesContext);
}