import{
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose'
import { time, timeStamp } from 'console';

import { Document } from 'mongoose'

export type RoleDocument= Role & Document;

@Schema({
    timestamps: true,
})
export class Role{

    @Prop({
        required: true,
        unique: true,
    })
    nombre!: string;

    @Prop({
        default: true,
    })
    activo!:boolean;
}

export const RolesSchema = SchemaFactory.createForClass(Role);