import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comentario, ComentarioDocument } from './schemas/comentario.schema';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Injectable()
export class ComentariosService {
    constructor(
        @InjectModel(Comentario.name)
        private readonly comentarioModel: Model<ComentarioDocument>,
    ) {}

    /**
     * Crear un comentario
     */
    async create(dto: CreateComentarioDto){

    const comentario = await this.comentarioModel.create(dto);
    return ResponseHelper.succes(comentario, 201);
    }


    /**
     * Metodo para consultar comentarios
     */
    async findAll(){
        const comentario=
        await this.comentarioModel.find({activo:true,});

        return ResponseHelper.succes(comentario);
    }

    /**
     * consulta comentarios eliminados logicamente
     */
    async findInactive(){
        const comentario= await this.comentarioModel.find({activo: false});
        return ResponseHelper.succes(comentario);
    }

    /**
     * Consulta de comentario por id
     */
    async findOne(id: string) {
        const comentario = await this.comentarioModel
            .findById(id)

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        return ResponseHelper.succes(comentario);
    }

    /**
     * Actualizar el contenido de un comentario
     */
    async update(id: string, dto: UpdateComentarioDto) {
        const comentario = await this.comentarioModel.findById(id);

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        const updateComentario = await this.comentarioModel.findByIdAndUpdate(
            id,
            { contenido: dto.contenido },
            { new: true },
        );

        return ResponseHelper.succes(updateComentario);
    }

    /**
     * Eliminacion logica (soft delete)
     */
    async remove(id: string) {
        const comentario = await this.comentarioModel.findById(id);

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        const deleteComentario = await this.comentarioModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true },
        );

        return ResponseHelper.succes(deleteComentario);
    }

    /**
     * Restaurar un comentario eliminado logicamente
     */
    async restore(id: string) {
        const comentario = await this.comentarioModel.findById(id);

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        const restoreComentario = await this.comentarioModel.findByIdAndUpdate(
            id,
            { activo: true },
            { new: true },
        );

        return ResponseHelper.succes(restoreComentario);
    }
}
