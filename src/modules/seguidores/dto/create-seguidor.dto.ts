import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateSeguidorDto {

    @ApiProperty({
        description: 'Id del usuario que sigue',
    })
    @IsMongoId({ message: 'El seguidor_id debe ser un id valido de Mongo' })
    @IsNotEmpty({ message: 'El seguidor_id es obligatorio' })
    seguidor_id!: string;

    @ApiProperty({
        description: 'Id del usuario que sera seguido',
    })
    @IsMongoId({ message: 'El seguido_id debe ser un id valido de Mongo' })
    @IsNotEmpty({ message: 'El seguido_id es obligatorio' })
    seguido_id!: string;
}
