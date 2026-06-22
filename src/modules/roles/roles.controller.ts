import { Controller, Post, Body, Get,Param,Put,Patch,Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
    constructor(
        private readonly service:
        RolesService,
    ){}

/**
 * Crear rol
 */
    @Post()
    create(
        @Body()
        dto:CreateRoleDto,
){
        return this.service.create(
        dto,
    );
}
/**
 * Consultar roles
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
        return this.service.findInicactive();
    }

    /**
     * Buscar rol por id 
     */
    @Get(':id')
    findOne(
        @Param('id')
        id:string,
    ){
        return this.service.findOne(id,);
    }
    /**
     * Actualizar  rol 
     */
    @Put(':id')
    update(
        @Param('id')
        id:string,

        @Body()
        dto:UpdateRoleDto,
    ){
        return this.service.update(
            id,dto
        )
    }
    /**
     * Actualizacion  parcial 
     */
    @Patch(':id')
    partialUpdate(
        @Param('id')
        id:string,

        @Body()
        dto:UpdateRoleDto
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
     * Eliminacion logica 
     */
    @Delete(':id')
    remove(
        @Param('id')
        id:string,
    ){
        return this.service.remove(id);
    }


}
