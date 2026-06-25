import { IsMongoId, IsOptional } from 'class-validator';

export class SearchPublicacionDto {

    @IsOptional()
    contenido?: string;

    @IsOptional()
    @IsMongoId({ message: 'El usuario_id debe ser un id valido de Mongo' })
    usuario_id?: string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}
