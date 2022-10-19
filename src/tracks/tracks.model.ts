import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Comment } from './comments.model';

interface TrackCreationAttrs {}

@Table({ tableName: 'tracks' })
export class Track extends Model<Track, TrackCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		unique: true
	})
	id: number;

	@Column({ type: DataType.STRING })
	name: string;

	@Column({ type: DataType.STRING })
	artist: string;

	@Column({ type: DataType.STRING })
	text: string;

	@Column({ type: DataType.STRING })
	listens: string;

	@Column({ type: DataType.STRING })
	picture: string;

	@Column({ type: DataType.STRING })
	audio: string;

	@HasMany(() => Comment)
	comments: Comment[];
}
