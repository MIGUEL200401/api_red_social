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
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@ApiTags('comentarios')
@Controller('comentarios')
export class ComentariosController {
    constructor(
        private readonly service: ComentariosService,
    ) {}

    /**
     * Crear comentario
     */
    @Post()
    create(
        @Body()
        dto: CreateComentarioDto,
    ) {
        return this.service.create(dto);
    }

    /**
     * Consultar comentarios
     */
    @Get()
    findAll(){
        return this.service.findAll();
    }

    /**
     * Consultar comentarios inactivos
     */
    @Get('inactivos')
    findInactive(){
        return this.service.findInactive();
    }

    /**
     * Consultar comentario por id
     */
    @Get(':id')
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.service.findOne(id);
    }

    /**
     * Actualizar el contenido de un comentario
     */
    @Put(':id')
    update(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateComentarioDto,
    ) {
        return this.service.update(id, dto);
    }

    /**
     * Actualizacion parcial (alias del update, mismo comportamiento ya que solo existe el contenido editable)
     */
    @Patch(':id')
    partialUpdate(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateComentarioDto,
    ) {
        return this.service.update(id, dto);
    }

    /**
     * Restaurar un comentario eliminado logicamente
     */
    @Patch(':id/restaurar')
    restore(
        @Param('id')
        id: string,
    ) {
        return this.service.restore(id);
    }

    /**
     * Eliminacion logica del comentario
     */
    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ) {
        return this.service.remove(id);
    }
}
