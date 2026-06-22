import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesSchema, Role } from './schemas/roles.schemas';


@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports:[
    MongooseModule.forFeature([
    {
      name:Role.name,
      schema:RolesSchema,

    },
    ]),
  ]
})
export class RolesModule {}
