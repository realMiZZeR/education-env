import { useContext } from "react"
import { GroupContext } from "../hoc/CreateGroupProvider"

export const useGroup = () => {
    return useContext(GroupContext);
}