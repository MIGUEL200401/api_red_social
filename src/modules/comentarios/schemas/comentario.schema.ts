import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ComentarioDocument = Comentario & Document;

/**
 * Coleccion de comentarios
 */
@Schema({
    timestamps: true,
    collection: 'comentarios',
})
export class Comentario {

    @Prop({
        type: Types.ObjectId,
        ref: 'Publicacion',
        required: true,
    })
    publicacion_id!: Types.ObjectId;

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
        default: true,
    })
    activo!: boolean;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);

ComentarioSchema.index({ publicacion_id: 1 });
ComentarioSchema.index({ usuario_id: 1 });
