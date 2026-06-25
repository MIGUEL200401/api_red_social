import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reaccion, ReaccionSchema } from './schemas/reaccion.schema';
import { Publicacion, PublicacionSchema } from '../publicaciones/schemas/publicacion.schema';
import { ReaccionesController } from './reacciones.controller';
import { ReaccionesService } from './reacciones.service';

@Module({

    controllers: [ReaccionesController],
    providers: [ReaccionesService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Reaccion.name,
                schema: ReaccionSchema,
            },
            {
                name: Publicacion.name,
                schema: PublicacionSchema,
            },
        ]),
    ],
    exports: [ReaccionesService],
})
export class ReaccionesModule {}
