import { Track } from './tracks.model';

import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';

interface CommentCreationAttrs {}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		unique: true
	})
	id: number;

	@Column({ type: DataType.STRING })
	username: string;

	@Column({ type: DataType.STRING })
	text: string;

	@ForeignKey(() => Track)
	@Column({ type: DataType.INTEGER })
	trackId: number;

	@BelongsTo(() => Track)
	track: Track;
}
