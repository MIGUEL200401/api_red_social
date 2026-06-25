import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TipoReaccion } from '../schemas/reaccion.schema';

/**
 * Solo se permite cambiar el tipo de la reaccion.
 * No se reasigna publicacion_id ni usuario_id por integridad de los datos.
 */
export class UpdateReaccionDto {

    @ApiProperty({
        description: 'Tipo de reaccion',
        enum: TipoReaccion,
        example: TipoReaccion.AMOR,
    })
    @IsEnum(TipoReaccion, {
        message: `El tipo debe ser uno de los siguientes: ${Object.values(TipoReaccion).join(', ')}`,
    })
    @IsNotEmpty({ message: 'El tipo de reaccion es obligatorio' })
    tipo!: TipoReaccion;
}
