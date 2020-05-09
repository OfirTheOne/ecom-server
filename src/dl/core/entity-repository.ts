import { Document, Model} from 'mongoose'

export abstract class EntityRepository <Entity, EntityDoc extends Document&Entity> {

    public abstract projectSafeEntity(entity: EntityDoc): Partial<EntityDoc>;
    public abstract ingestSafeEntity(data: any): Partial<Entity>;

    constructor(public entityModel: Model<EntityDoc, {}>) { }

    public async create(data: Partial<Entity>) {
        const safeData = this.ingestSafeEntity(data);
        return await this.entityModel.create(safeData);

    }
    
}