import { Injectable, NotFoundException } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {User,UserDocument} from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { ResponseHelper } from "src/common/helpers/response.helper";
import { SearchUserDto } from "./dto/search-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()
export class UsuariosService{
    constructor(
        @InjectModel(User.name)
        private readonly userModel:
        Model<UserDocument>
    ){}

/**
 * Motodo para la creacion de usuario
 */
async create(dto: CreateUserDto){

        /**Verificacion de correo */
        const exists= await this.userModel.findOne({correo:dto.correo})

        /** si existe correo */
        if(exists){
            throw new BadRequestException('Correo ya registrado')
        }

        const hashePassword = await bcrypt.hash(dto.password, 10);

        const user = await this.userModel.create({...dto,password:hashePassword});

        return ResponseHelper.succes(user,201);
    }

    /**
     * Consulta usuario
     */
    async findAll(search:SearchUserDto){
        //  Crear filtro
        const filter: any={activo:true};

        // Filtro por nombre

        if(search.nombre){
            filter.nombre={
                $regex:search.nombre,
                $options:'i'
            };
        }

        const page= Number(search.page) || 1;
        const limit = Number(search.limit) || 10;
        
        //Consulta

        const data = await this.userModel.find(filter).populate('rol_id').skip((page-1)*limit).limit(limit);
        //Contador de documentos= contador de usuarios 
        const total = await this.userModel.countDocuments(filter);

        return ResponseHelper.succes( {total, page, limit, data});
    }

    /**
     * consulta por id de usuario
     */

    async findOne(id:string){
        const user = await this.userModel.findById(id).populate('rol_id');

        if(!user){
        throw new NotFoundException('Usuario no encontrado')
        }
    
        return ResponseHelper.succes(user)
    }

    /**
     * Actualizacion de horario  
     */

    async update(id:string, dto:UpdateUserDto){
        const user = await this.userModel.findById(id)

        if(!user){
            throw new NotFoundException('No se encontro el usuario')
        }

        const updateuser = await this.userModel.findByIdAndUpdate(id, dto,{new:true})

        return ResponseHelper.succes(updateuser)

    }

    /**
     * Soft delete
     */
    async remove(id:string){
        const user= await this.userModel.findById(id)

        if(!user){
            throw new NotFoundException('Usuario no encontrado')
        }

        const deleteUser = await this.userModel.findByIdAndUpdate(id,{activo:false});

        return ResponseHelper.succes(deleteUser);
    }
}