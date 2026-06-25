import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { TipoReaccion } from '../schemas/reaccion.schema';

export class SearchReaccionDto {

    @IsOptional()
    @IsMongoId({ message: 'El publicacion_id debe ser un id valido de Mongo' })
    publicacion_id?: string;

    @IsOptional()
    @IsMongoId({ message: 'El usuario_id debe ser un id valido de Mongo' })
    usuario_id?: string;

    @IsOptional()
    @IsEnum(TipoReaccion, {
        message: `El tipo debe ser uno de los siguientes: ${Object.values(TipoReaccion).join(', ')}`,
    })
    tipo?: TipoReaccion;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}
