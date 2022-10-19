import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './tracks.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { FilesService, FileType } from 'src/files/files.service';
import { Op } from 'sequelize';

@Injectable()
export class TracksService {
	constructor(
		@InjectModel(Track) private trackRepository: typeof Track,
		@InjectModel(Comment) private commentRepository: typeof Comment,
		private fileService: FilesService
	) {}

	async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
		const audioPath = await this.fileService.createFile(
			FileType.AUDIO,
			audio
		);
		const picturePath = await this.fileService.createFile(
			FileType.IMAGE,
			picture
		);
		const track = await this.trackRepository.create({
			...dto,
			listens: 0,
			audio: audioPath,
			picture: picturePath
		});
		return track;
	}

	async getAll(
		count = 10,
		offset = 0,
		query = ''
	): Promise<{ rows: Track[]; count: number }> {
		const tracks = await this.trackRepository.findAndCountAll({
			limit: count,
			offset: offset,
			where: {
				[Op.or]: [
					{ name: { [Op.substring]: query } },
					{ artist: { [Op.substring]: query } }
				]
			}
		});
		return tracks;
	}

	async getOne(id: number): Promise<Track> {
		const track = await this.trackRepository.findOne({
			where: { id },
			include: { all: true }
		});
		return track;
	}

	async delete(id: number) {
		return await this.trackRepository.destroy({ where: { id } });
	}

	async addComment(dto: CreateCommentDto): Promise<Comment> {
		const track = await this.trackRepository.findOne({
			where: { id: dto.trackId },
			include: { all: true }
		});
		const comment = await this.commentRepository.create({ ...dto });
		track.comments.push(comment);
		await track.save();
		return comment;
	}

	async listen(id: number) {
		const track = await this.trackRepository.findOne({ where: { id } });
		track.listens += 1;
		track.save();
	}
}
