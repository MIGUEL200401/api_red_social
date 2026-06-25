import { ApiTags } from '@nestjs/swagger';
import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Put,
    Patch,
    Delete,
} from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';

@ApiTags('publicaciones')
@Controller('publicaciones')
export class PublicacionesController {
    constructor(
        private readonly service: PublicacionesService,
    ) {}

    /**
     * Crear publicacion
     */
    @Post()
    create(
        @Body()
        dto: CreatePublicacionDto,
    ) {
        return this.service.create(dto);
    }

    /**
     * Consultar publicaciones
     */
    @Get()
    findAll(){
        return this.service.findAll();
    }

    /**
     * Consultar roles inactivos
     */
    @Get('inactivos')
    findInactive(){
        return this.service.findInactive();
    }

    /**
     * Consultar publicacion por id
     */
    @Get(':id')
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.service.findOne(id);
    }

    /**
     * Actualizar publicacion completa
     */
    @Put(':id')
    update(
        @Param('id')
        id: string,
        @Body()
        dto: UpdatePublicacionDto,
    ) {
        return this.service.update(id, dto);
    }

    /**
     * Actualizacion parcial de la publicacion
     */
    @Patch(':id')
    partialUpdate(
        @Param('id')
        id: string,
        @Body()
        dto: UpdatePublicacionDto,
    ) {
        return this.service.partialUpdate(id, dto);
    }

    /**
     * Restaurar una publicacion eliminada logicamente
     */
    @Patch(':id/restaurar')
    restore(
        @Param('id')
        id: string,
    ) {
        return this.service.restore(id);
    }

    /**
     * Eliminacion logica de la publicacion
     */
    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ) {
        return this.service.remove(id);
    }
}
