import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reaccion, ReaccionDocument } from './schemas/reaccion.schema';
import { Publicacion, PublicacionDocument } from '../publicaciones/schemas/publicacion.schema';
import { CreateReaccionDto } from './dto/create-reaccion.dto';
import { UpdateReaccionDto } from './dto/update-reaccion.dto';
import { SearchReaccionDto } from './dto/search-reaccion.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Injectable()
export class ReaccionesService {
    constructor(
        @InjectModel(Reaccion.name)
        private readonly reaccionModel: Model<ReaccionDocument>,

        @InjectModel(Publicacion.name)
        private readonly publicacionModel: Model<PublicacionDocument>,
    ) {}

    /**
     * Crear (o actualizar) la reaccion de un usuario sobre una publicacion.
     * Un usuario solo puede tener una reaccion por publicacion: si ya existe,
     * se actualiza el tipo y se reactiva en vez de crear un duplicado.
     */
    async create(dto: CreateReaccionDto) {
        const reaccion =  await this.reaccionModel.create(dto);

        return ResponseHelper.succes(reaccion, 201);
    }

    /**
     * Metodo para consultar roles
     */
    async findAll(){
        const reaccion=
        await this.reaccionModel.find({activo:true,});

        return ResponseHelper.succes(reaccion);
    }

    /**
     * consulta roles eliminados logicamente
     */
    async findInactive(){
        const reaccion= await this.reaccionModel.find({activo: false});
        return ResponseHelper.succes(reaccion);
    }

    /**
     * Consulta de reaccion por id
     */
    async findOne(id: string) {
        const reaccion = await this.reaccionModel
            .findById(id)

        if (!reaccion) {
            throw new NotFoundException('Reaccion no encontrada');
        }

        return ResponseHelper.succes(reaccion);
    }

    /**
     * Actualizar el tipo de una reaccion existente
     */
    async update(id: string, dto: UpdateReaccionDto) {
        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException('Reaccion no encontrada');
        }

        const updateReaccion = await this.reaccionModel.findByIdAndUpdate(
            id,
            { tipo: dto.tipo },
            { new: true },
        );

        return ResponseHelper.succes(updateReaccion);
    }

    /**
     * Eliminacion logica (soft delete) por id
     */
    async remove(id: string) {
        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException('Reaccion no encontrada');
        }

        const deleteReaccion = await this.reaccionModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true },
        );

        return ResponseHelper.succes(deleteReaccion);
    }

    /**
     * Restaurar una reaccion eliminada logicamente
     */
    async restore(id: string) {
        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException('Reaccion no encontrada');
        }

        const restoreReaccion = await this.reaccionModel.findByIdAndUpdate(
            id,
            { activo: true },
            { new: true },
        );

        return ResponseHelper.succes(restoreReaccion);
    }
}
