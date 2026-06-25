import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SeguidorDocument = Seguidor & Document;

/**
 * Coleccion de relaciones de seguimiento entre usuarios
 */
@Schema({
    timestamps: true,
    collection: 'seguidores',
})
export class Seguidor {

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    seguidor_id!: Types.ObjectId; // usuario que sigue

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    seguido_id!: Types.ObjectId; // usuario que es seguido

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const SeguidorSchema = SchemaFactory.createForClass(Seguidor);

// Un usuario solo puede tener una relacion (activa o inactiva) de seguimiento hacia otro.
// Si vuelve a seguirlo, se reactiva la misma relacion en vez de crear un duplicado.
SeguidorSchema.index({ seguidor_id: 1, seguido_id: 1 }, { unique: true });
