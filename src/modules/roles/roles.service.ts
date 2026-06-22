import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleDocument, Role } from './schemas/roles.schemas';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { UpdateRoleDto } from './dto/update-role.dto';


@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name)
        private roleModel:
        Model<RoleDocument>,
    ){}

    /**
     * metodo para crear un rol
     */
    async create(
        dto:CreateRoleDto,
    ){
        const role=
        await this.roleModel.create(dto);

        return ResponseHelper.succes(
            role,
            201,
        );
    }

    /**
     * Metodos para consultar roles
     */

    async findAll(){
        const roles=
        await this.roleModel.find({activo:true,});

        return ResponseHelper.succes(roles);
    }

    /**
     * Consulta roles eliminados logicamente
     */

    async findInicactive(){
        const roles = await this.roleModel.find({activo:false});
        return ResponseHelper.succes(roles);
    }

    /**
     * Buscar un rol por id 
     */
    async findOne(id:string){
        const role= await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('ROL no Encontrado');
        }

        return ResponseHelper.succes(role,);
    }

    /**
     * Actualizar completamente un rol
     */
    async update(id:string, dto:UpdateRoleDto){
        const role= await this.roleModel.findById(id);
        if(!role){
            throw new NotFoundException('ROL no Encontrado');
        }
        const UpdateRole= await this.roleModel.findByIdAndUpdate(id, dto,{const : true });
        return ResponseHelper.succes(UpdateRole);
    }
    
    /**
     * Actualizacion Parcial 
     */
    async partialUpdate(id:string, dto:UpdateRoleDto){
        const role= await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('ROL no encontrado');
        }

        const UpdateRole= await this.roleModel.findByIdAndUpdate(id,{$set:dto,},{new:true})

        return ResponseHelper.succes(UpdateRole,);

    }

    /**
     * Eliminacion logica 
     */
    async remove (id:string){
        const role= await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('ROL no Encontrado');
        }

        const deletedRole= await this.roleModel.findByIdAndUpdate(id,{activo:false,},{new:true});

        return ResponseHelper.succes(deletedRole);
    }

    /**
     * Restaurara rol eliminado
     */
    async restore(id:string){
        const role = await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('ROL no Econtrado')
        }

        const restoreRole= await this.roleModel.findByIdAndUpdate(id,{activo:true},{new:true});
        return ResponseHelper.succes(restoreRole);
    }


}
