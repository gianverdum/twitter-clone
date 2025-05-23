import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from 'src/comment/entities/comment.entity';


@Entity('posts')
export class Post {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

    @Column({ length: 100 })
    title: string;

    @Column('text')
    content: string;

    @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
    author: User;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
 }
