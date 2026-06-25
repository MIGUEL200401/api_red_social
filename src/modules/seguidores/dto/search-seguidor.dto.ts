import { IsMongoId, IsOptional } from 'class-validator';

export class SearchSeguidorDto {

    @IsOptional()
    @IsMongoId({ message: 'El seguidor_id debe ser un id valido de Mongo' })
    seguidor_id?: string;

    @IsOptional()
    @IsMongoId({ message: 'El seguido_id debe ser un id valido de Mongo' })
    seguido_id?: string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}
