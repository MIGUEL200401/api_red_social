import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publicacion, PublicacionDocument } from './schemas/publicacion.schema';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Injectable()
export class PublicacionesService {
    constructor(
        @InjectModel(Publicacion.name)
        private readonly publicacionModel: Model<PublicacionDocument>,
    ) {}

    /**
     * Crear una publicacion
     */
    async create(dto: CreatePublicacionDto) {
        const publicacion = await this.publicacionModel.create(dto);

        return ResponseHelper.succes(publicacion, 201);
    }

    /**
     * Metodo para consultar publicaciones
     */
    async findAll(){
        const publicacion=
        await this.publicacionModel.find({activo:true,});

        return ResponseHelper.succes(publicacion);
    }

    /**
     * consulta publicaciones eliminadas logicamente
     */
    async findInactive(){
        const publicacion= await this.publicacionModel.find({activo: false});
        return ResponseHelper.succes(publicacion);
    }
    
    /**
     * Consulta de publicacion por id
     */
    async findOne(id: string) {
        const publicacion = await this.publicacionModel
            .findById(id)

        if (!publicacion) {
            throw new NotFoundException('Publicacion no encontrada');
        }

        return ResponseHelper.succes(publicacion);
    }

    /**
     * Actualizacion completa de una publicacion
     */
    async update(id: string, dto: UpdatePublicacionDto) {
        const publicacion = await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('Publicacion no encontrada');
        }

        const updatePublicacion = await this.publicacionModel.findByIdAndUpdate(
            id,
            dto,
            { new: true },
        );

        return ResponseHelper.succes(updatePublicacion);
    }

    /**
     * Actualizacion parcial de una publicacion
     */
    async partialUpdate(id: string, dto: UpdatePublicacionDto) {
        const publicacion = await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('Publicacion no encontrada');
        }

        const updatePublicacion = await this.publicacionModel.findByIdAndUpdate(
            id,
            { $set: dto },
            { new: true },
        );

        return ResponseHelper.succes(updatePublicacion);
    }

    /**
     * Eliminacion logica (soft delete)
     */
    async remove(id: string) {
        const publicacion = await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('Publicacion no encontrada');
        }

        const deletePublicacion = await this.publicacionModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true },
        );

        return ResponseHelper.succes(deletePublicacion);
    }

    /**
     * Restaurar una publicacion eliminada logicamente
     */
    async restore(id: string) {
        const publicacion = await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('Publicacion no encontrada');
        }

        const restorePublicacion = await this.publicacionModel.findByIdAndUpdate(
            id,
            { activo: true },
            { new: true },
        );

        return ResponseHelper.succes(restorePublicacion);
    }
}
