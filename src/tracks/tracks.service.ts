import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './tracks.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';

@Injectable()
export class TracksService {
	constructor(
		@InjectModel(Track) private trackRepository: typeof Track,
		@InjectModel(Comment) private commentRepository: typeof Comment
	) {}

	async create(dto: CreateTrackDto): Promise<Track> {
		const track = await this.trackRepository.create({ ...dto, listens: 0 });
		return track;
	}

	async getAll(): Promise<Track[]> {
		const tracks = await this.trackRepository.findAll();
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
}
