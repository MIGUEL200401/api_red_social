import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * Solo se permite editar el contenido del comentario.
 * No se reasigna publicacion_id ni usuario_id por integridad de los datos.
 */
export class UpdateComentarioDto {

    @ApiProperty({
        description: 'Contenido del comentario',
        minLength: 1,
        maxLength: 300,
    })
    @IsString()
    @IsNotEmpty({ message: 'El contenido no puede estar vacio' })
    @MinLength(1, { message: 'El contenido debe tener minimo 1 caracter' })
    @MaxLength(300, { message: 'El contenido no puede superar 300 caracteres' })
    contenido!: string;
}
