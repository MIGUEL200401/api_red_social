import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * Tipos de reaccion disponibles para una publicacion
 */
export enum TipoReaccion {
    LIKE = 'like',
    AMOR = 'amor',
    RISA = 'risa',
    TRISTE = 'triste',
    ENOJO = 'enojo',
}

export type ReaccionDocument = Reaccion & Document;

/**
 * Coleccion de reacciones
 */
@Schema({
    timestamps: true,
    collection: 'reacciones',
})
export class Reaccion {

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
        type: String,
        enum: TipoReaccion,
        required: true,
    })
    tipo!: TipoReaccion;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const ReaccionSchema = SchemaFactory.createForClass(Reaccion);

// Un usuario solo puede tener una reaccion (activa o inactiva) por publicacion.
// Si reacciona de nuevo, se actualiza el tipo en vez de crear un duplicado.
ReaccionSchema.index({ publicacion_id: 1, usuario_id: 1 }, { unique: true });
