import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PublicacionDocument = Publicacion & Document;

/**
 * Coleccion de publicaciones
 */
@Schema({
    timestamps: true,
    collection: 'publicaciones',
})
export class Publicacion {

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    usuario_id!: Types.ObjectId;

    @Prop({
        required: true,
        trim: true,
    })
    contenido!: string;

    @Prop({
        required: false,
    })
    imagen?: string;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);

PublicacionSchema.index({ usuario_id: 1 });
