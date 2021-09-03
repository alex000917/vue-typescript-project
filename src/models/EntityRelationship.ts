
export class EntityRelationship {
    myspType="EntityRelationship"
    children: EntityRelationship[]=[];
    entityId: string|null =null;
    relationshipPropertyName: string|null=null;
    parent: string|null=null;
}
