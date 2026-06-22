import { ApiTags } from "@nestjs/swagger";
import { Controller, Post, Body, Get, Param, Query, Delete, Put } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsuariosService } from "./usuarios.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { SearchUserDto } from "./dto/search-user.dto";

@ApiTags('usuarios')
@Controller('usuarios')

export class UsuariosController {
    constructor(private readonly service:
        UsuariosService,
    ){}

    @Post()
    create(dto: CreateUserDto){
        return this.service.create(dto);    
    }

    @Get()
    findAll(
        @Query()
        serach:SearchUserDto,
    ){
        return this.service.findAll(serach);
    }
    @Get(':id')
    findOne(
        @Param('id')
        id: string
    ){
        return this.service.findOne(id);
    }
    @Put(':id')
    update(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateUserDto,
    ){
        return this.service.update(id,dto);
    }
    
    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ){
    return this.service.remove(id);
    }
}