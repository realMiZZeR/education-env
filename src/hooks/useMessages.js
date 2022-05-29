import { useContext } from "react";
import { MessagesContext } from "../hoc/MessagesProvider";

function useMessages() {
    return useContext(MessagesContext);
}

export default useMessages;