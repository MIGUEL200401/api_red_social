import { ApiTags } from '@nestjs/swagger';
import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Query,
    Put,
    Patch,
    Delete,
} from '@nestjs/common';
import { ReaccionesService } from './reacciones.service';
import { CreateReaccionDto } from './dto/create-reaccion.dto';
import { UpdateReaccionDto } from './dto/update-reaccion.dto';
import { SearchReaccionDto } from './dto/search-reaccion.dto';

@ApiTags('reacciones')
@Controller('reacciones')
export class ReaccionesController {
    constructor(
        private readonly service: ReaccionesService,
    ) {}

    /**
     * Crear la reaccion de un usuario sobre una publicacion
     */
    @Post()
    create(
        @Body()
        dto: CreateReaccionDto,
    ) {
        return this.service.create(dto);
    }

    /**
     * Consultar reacciones
     */
    @Get()
    findAll(){
        return this.service.findAll();
    }

    /**
     * Consultar reacciones inactivas
     */
    @Get('inactivos')
    findInactive(){
        return this.service.findInactive();
    }

    /**
     * Consultar reaccion por id
     */
    @Get(':id')
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.service.findOne(id);
    }

    /**
     * Actualizar el tipo de una reaccion existente
     */
    @Put(':id')
    update(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateReaccionDto,
    ) {
        return this.service.update(id, dto);
    }

    /**
     * Actualizacion parcial (alias del update, mismo comportamiento ya que solo existe el tipo editable)
     */
    @Patch(':id')
    partialUpdate(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateReaccionDto,
    ) {
        return this.service.update(id, dto);
    }

    /**
     * Restaurar una reaccion eliminada logicamente
     */
    @Patch(':id/restaurar')
    restore(
        @Param('id')
        id: string,
    ) {
        return this.service.restore(id);
    }

    /**
     * Eliminacion logica de la reaccion por id
     */
    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ) {
        return this.service.remove(id);
    }
}
