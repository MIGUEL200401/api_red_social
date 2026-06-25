import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Seguidor, SeguidorSchema } from './schemas/seguidor.schema';
import { User, UserSchema } from '../usuarios/schemas/user.schema';
import { SeguidoresController } from './seguidores.controller';
import { SeguidoresService } from './seguidores.service';

@Module({

    controllers: [SeguidoresController],
    providers: [SeguidoresService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Seguidor.name,
                schema: SeguidorSchema,
            },
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
    ],
    exports: [SeguidoresService],
})
export class SeguidoresModule {}
