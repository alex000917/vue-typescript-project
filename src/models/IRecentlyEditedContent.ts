
import { Entity } from "./Entity"
import { IBaseCreatableContent } from "./BaseCreatableContent"

export interface IRecentlyEditedContent extends IBaseCreatableContent {    

    // [Transient]
    entity: Entity | null

    // [Transient]
    itemType: number | null

    // [Transient]
    uniqueId: string | null

    // [Transient]
    isOutOfTheBox(): boolean
}
