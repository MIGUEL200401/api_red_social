import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { TipoReaccion } from '../schemas/reaccion.schema';

export class CreateReaccionDto {

    @ApiProperty({
        description: 'Id de la publicacion a la que se reacciona',
    })
    @IsMongoId({ message: 'El publicacion_id debe ser un id valido de Mongo' })
    @IsNotEmpty({ message: 'El publicacion_id es obligatorio' })
    publicacion_id!: string;

    @ApiProperty({
        description: 'Id del usuario que reacciona',
    })
    @IsMongoId({ message: 'El usuario_id debe ser un id valido de Mongo' })
    @IsNotEmpty({ message: 'El usuario_id es obligatorio' })
    usuario_id!: string;

    @ApiProperty({
        description: 'Tipo de reaccion',
        enum: TipoReaccion,
        example: TipoReaccion.LIKE,
    })
    @IsEnum(TipoReaccion, {
        message: `El tipo debe ser uno de los siguientes: ${Object.values(TipoReaccion).join(', ')}`,
    })
    @IsNotEmpty({ message: 'El tipo de reaccion es obligatorio' })
    tipo!: TipoReaccion;
}
