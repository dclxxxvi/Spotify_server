import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './tracks/comments.model';
import { Track } from './tracks/tracks.model';
import { TracksModule } from './tracks/tracks.module';
import { FilesModule } from './files/files.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [Track, Comment],
			autoLoadModels: true
		}),
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static')
		}),
		TracksModule,
		FilesModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
