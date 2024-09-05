import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { VistoriasModule } from './modules/vistorias/vistorias.module';
import { AmbientesModule } from './modules/ambientes/ambientes.module';
import { SubAmbientesModule } from './modules/sub-ambientes/sub-ambientes.module';
import { FotosModule } from './modules/fotos/fotos.module';

@Module({
  imports: [
    UsersModule,
    VistoriasModule,
    AmbientesModule,
    SubAmbientesModule,
    FotosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
