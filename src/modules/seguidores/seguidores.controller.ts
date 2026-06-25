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
import { SeguidoresService } from './seguidores.service';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';

@ApiTags('seguidores')
@Controller('seguidores')
export class SeguidoresController {
    constructor(
        private readonly service: SeguidoresService,
    ) {}

    /**
     * Seguir a un usuario
     */
    @Post()
    create(
        @Body()
        dto: CreateSeguidorDto,
    ) {
        return this.service.create(dto);
    }

    /**
     * Consultar seguidores
     */
    @Get()
    findAll(){
        return this.service.findAll();
    }

    /**
     * Consultar seguidores inactivos
     */
    @Get('inactivos')
    findInactive(){
        return this.service.findInactive();
    }

    /**
     * Consultar seguidor por id
     */
    @Get(':id')
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.service.findOne(id);
    }

    /**
     * Actualizar seguidor
     */
    @Put(':id')
    update (
        @Param('id')
        id: string,

        @Body()
        dto: UpdateSeguidorDto,
    ) {
        return this.service.update(id, dto)
    }

    /**
    * Actualizacion parcial
     */
    @Patch(':id')
    partialUpdate(
        @Param('id')
        id:string,
    
        @Body()
        dto:UpdateSeguidorDto
    ){
        return this.service.partialUpdate(id,dto);
    }

    /**
     * Restaurar rol eliminado 
     */
    @Patch(':id/restaurar')
    restore(
        @Param('id')
        id:string,
    ){
        return this.service.restore(id);
    }

    /**
     * Eliminacion logica de la relacion por id
     */
    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ) {
        return this.service.remove(id);
    }
}
