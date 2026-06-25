import { ApiProperty } from '@nestjs/swagger';
import {
    IsMongoId,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateComentarioDto {

    @ApiProperty({
        description: 'Id de la publicacion a la que pertenece el comentario',
    })
    @IsMongoId({ message: 'El publicacion_id debe ser un id valido de Mongo' })
    @IsNotEmpty({ message: 'El publicacion_id es obligatorio' })
    publicacion_id!: string;

    @ApiProperty({
        description: 'Id del usuario que escribe el comentario',
    })
    @IsMongoId({ message: 'El usuario_id debe ser un id valido de Mongo' })
    @IsNotEmpty({ message: 'El usuario_id es obligatorio' })
    usuario_id!: string;

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
