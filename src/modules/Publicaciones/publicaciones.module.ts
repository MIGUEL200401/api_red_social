import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Publicacion, PublicacionSchema } from './schemas/publicacion.schema';
import { PublicacionesController } from './publicaciones.controller';
import { PublicacionesService } from './publicaciones.service';

@Module({

    controllers: [PublicacionesController],
    providers: [PublicacionesService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Publicacion.name,
                schema: PublicacionSchema,
            },
        ]),
    ],
    exports: [PublicacionesService],
})
export class PublicacionesModule {}
