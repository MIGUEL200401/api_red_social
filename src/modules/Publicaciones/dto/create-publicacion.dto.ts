import { ApiProperty } from '@nestjs/swagger';
import {
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreatePublicacionDto {

    @ApiProperty({
        description: 'Id del usuario que crea la publicacion',
    })
    @IsMongoId({ message: 'El usuario_id debe ser un id valido de Mongo' })
    @IsNotEmpty({ message: 'El usuario_id es obligatorio' })
    usuario_id!: string;

    @ApiProperty({
        description: 'Contenido de la publicacion',
        minLength: 1,
        maxLength: 500,
    })
    @IsString()
    @IsNotEmpty({ message: 'El contenido no puede estar vacio' })
    @MinLength(1, { message: 'El contenido debe tener minimo 1 caracter' })
    @MaxLength(500, { message: 'El contenido no puede superar 500 caracteres' })
    contenido!: string;

    @ApiProperty({
        description: 'URL de la imagen asociada a la publicacion',
        required: false,
        maxLength: 300,
    })
    @IsOptional()
    @IsString()
    @MaxLength(300, { message: 'La imagen no puede superar 300 caracteres' })
    imagen?: string;
}
