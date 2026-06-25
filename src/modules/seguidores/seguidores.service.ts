import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seguidor, SeguidorDocument } from './schemas/seguidor.schema';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Injectable()
export class SeguidoresService {
    constructor(
        @InjectModel(Seguidor.name)
        private readonly seguidorModel: Model<SeguidorDocument>,

    ) {}

    /**
     * Crear seguimiento de un usuario 
     */
    async create(dto: CreateSeguidorDto) {
        const seguidor = await this.seguidorModel.create(dto);

        return ResponseHelper.succes(seguidor, 201);
    }

    
    /**
     * Metodo para consultar roles
     */
    async findAll(){
        const seguidor=
        await this.seguidorModel.find({activo:true,});

        return ResponseHelper.succes(seguidor);
    }

    /**
     * consulta roles eliminados logicamente
     */
    async findInactive(){
        const seguidor= await this.seguidorModel.find({activo: false});
        return ResponseHelper.succes(seguidor);
    }

    /**
     * Consulta de relacion de seguimiento por id
     */
    async findOne(id: string) {
        const seguidor = await this.seguidorModel
            .findById(id)

        if (!seguidor) {
            throw new NotFoundException('Relacion de seguimiento no encontrada');
        }

        return ResponseHelper.succes(seguidor);
    }

    /**
     * Actualizar completamente un seguidor
     */
    async update(id:string, dto:UpdateSeguidorDto){
        const seguidor= await this.seguidorModel.findById(id);
        if(!seguidor){
            throw new NotFoundException('seguidor no encontrado');
        }

        const updateSeguidor= await this.seguidorModel.findByIdAndUpdate(id, dto,{new: true});
        return ResponseHelper.succes(updateSeguidor);
    }

    /**
     * Actualizacion parcial
     */
    async partialUpdate(id:string, dto:UpdateSeguidorDto){
        const seguidor= await this.seguidorModel.findById(id);
    
        if(!seguidor){
            throw new NotFoundException('seguidor no encontrado');
        }
    
        const updatedSeguidor= await this.seguidorModel.findByIdAndUpdate(id,{$set:dto,},{new: true})
        return ResponseHelper.succes(updatedSeguidor,);
    }

    /**
     * Eliminacion logica por id (dejar de seguir)
     */
    async remove(id: string) {
        const seguidor = await this.seguidorModel.findById(id);

        if (!seguidor) {
            throw new NotFoundException('Seguidor no encontrada');
        }

        const deleteRelacion = await this.seguidorModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true },
        );

        return ResponseHelper.succes(deleteRelacion);
    }

    /**
     * Restaurar rol eliminado
     */
    async restore(id:string){
        const seguidor= await this.seguidorModel.findById(id);

        if (!seguidor){
            throw new NotFoundException('Seguidor no encontrado')
        }
        const restoreSeguidor= await this.seguidorModel.findByIdAndUpdate(id,{activo: true},{new:true});
        return ResponseHelper.succes(restoreSeguidor);
    }
}