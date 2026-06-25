import { IsMongoId, IsOptional } from 'class-validator';

export class SearchComentarioDto {

    @IsOptional()
    contenido?: string;

    @IsOptional()
    @IsMongoId({ message: 'El publicacion_id debe ser un id valido de Mongo' })
    publicacion_id?: string;

    @IsOptional()
    @IsMongoId({ message: 'El usuario_id debe ser un id valido de Mongo' })
    usuario_id?: string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}
