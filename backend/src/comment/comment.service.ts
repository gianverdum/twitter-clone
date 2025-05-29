import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

  ) { }


  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const author = await this.userRepository.findOneBy({ id: createCommentDto.authorId });

    if (!author) throw new NotFoundException('Author not found');

    const post = await this.postRepository.findOneBy({ id: createCommentDto.postId });

    if (!post) throw new NotFoundException('Post not found');

    let parent: Comment | null = null;

    if (createCommentDto.parentId) {
      parent = await this.commentRepository.findOneBy({ id: createCommentDto.parentId });
      if (!parent) throw new NotFoundException('Parent comment not found');
    }

    const comment = this.commentRepository.create({
      comment: createCommentDto.comment,
      author,
      post,
      parent,
    } as Partial<Comment>)

    return this.commentRepository.save(comment);
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find({relations: ['post', 'author']});
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['post', 'author']
    });

    if (!comment) throw new NotFoundException('Comment not found');

    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(id);

    Object.assign(comment, updateCommentDto);

    return this.commentRepository.save(comment);
  }

  async remove(id: string): Promise<void> {
    const comment = await this.findOne(id);

    await this.commentRepository.remove(comment);
  }
}
